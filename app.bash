#!/bin/bash

project_name=`cat ./server.conf | grep project_name | awk '{print $2}'`
version="";
branch="";
environment="dev";
publish_user=root;

d_txt="export const userManage ='http://xxxxxx' \nexport const baseUrlMaster = 'http://xxxxx' \nexport const casUrl = 'https://xxxx/v1/tickets'"
p_txt="export const userManage ='http://xxxx.net:8282' \nexport const baseUrlMaster = 'http://xxxx.net:8282' \nexport const casUrl = 'https://xxxx/v1/tickets'"
line_txt="export const userManage ='http://xxxx:8282' \nexport const baseUrlMaster = 'http://xxxxnet:8282' \nexport const casUrl = 'https://xxxx/v1/tickets'"


echo "======================项目名称========================";

echo -e "\033[14;31m" "获取发布Tag列表: ${project_name}" '\033[0m';

git tag

echo -e "\033[14;35m" "准备发布: ${project_name}" '\033[0m';



if [[ "x$1" == "x" ]]; then
    echo "======================项目名称========================";
    echo "请输入要发布的版本号码!例如: [0.0.1]";
    read -t 30  version;
fi


if [[ "x$1" == "x" ]]; then
    echo "======================项目名称========================";
    echo "请输入要发布的分支!例如: [master]";
    read -t 30  branch;
fi

if [[ "x$2" == "x" ]]; then
    echo "======================项目名称========================";
    echo "请输入要发布环境!例如: [dev|pro|line]";
    read -t 30 environment;
fi


confirm="N";


echo "======================项目名称========================";

echo -e "\033[14;35m" "将要发布 项目:"${project_name} "\033[0m";

echo "分支:${branch}-- 版本:${version}  -- 发布到: ${environment} : ${SERVERS} -- 是否继续 [N/y]"
read confirm

case "${confirm}" in
    [yY]) ;;
    *) exit 1;;
esac


echo -e "\033[14;35m"  "正在切换分支"  "\033[0m" ;

git add .

git cm -am "发布提交 ${version}"

git tag -a $version -m '发布提交 ${version}'

echo $branch

git checkout $branch

echo -e "\033[14;35m"  "正在检查远端是否有更新"  "\033[0m" ;


git fetch;

echo -e "\033[14;35m"  "正在清除目录旧目录..."  "\033[0m" ;


rm -rf ./dist/*.js ./dist/*.html ./dist/stylesheets

_env='development'


if [ $environment == 'dev' ]; then
  c_txt=$d_txt
  _env='development'
elif [ $environment == 'pro' ] ; then
  c_txt=$p_txt
  _env='production'
else
  c_txt=$line_txt
  _env='production'
fi


echo -e $c_txt > ./app/config/config.js


echo "======================项目名称========================";



echo -e "\033[41;37m" "开始webpack 请稍等............. " '\033[0m'

if [ $environment == 'dev' ]; then
  npm run build
elif [ $environment == 'pro' ] ; then
  npm run buildLine
else
  npm run buildLine
fi


echo -e "\033[41;37m" "打包完成 " '\033[0m'



confirm="N"

read -t 30 -p "是否要同步到112服务器上！:[N/Y]" confirm

case "${confirm}" in
    [yY]) ;;
    *) exit 1;;
esac


npm run upload

echo -e "\033[14;35m" "112发布成功！！！" '\033[0m'


confirm="N"

echo -e "\033[41;37m" "================请注意是否发布到online!================" '\033[0m'


read -t 30 -p "是否要同步到线上！:[N/Y]" confirm


case "${confirm}" in
    [yY]) ;;
    *) exit 1;;
esac


confirm="N"

read -t 30 -p "请再次确认是否要发布到线上！:[N/Y]" confirm

case "${confirm}" in
    [yY]) ;;
    *) exit 1;;
esac


npm run uploadDev


echo -e "\033[41;37m" "线上发布成功！！！" '\033[0m'
