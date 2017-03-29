const EX_PHONE = /^1[3-8][0-9]{9}$/;
const EX_EMAIL = /^[a-zA-Z0-9_+\\.\\-]{2,}\@(([0-9a-zA-Z\\-]+)[.])+[a-zA-Z]{2,4}$/;
const EX_PWD = /^[A-Za-z0-9]{6,30}$/;
const EX_VCODE = /^[0-9]{6}$/;
const USERNAME = /^[^\u4e00-\u9fa5\s]{5,50}$/
const PASSWORD = /^[^\u4e00-\u9fa5\s]{5,20}$/
const ZH_CN = {
  ERRORMAILANDPHONE : '邮箱/手机号错误' ,
  ERRORPASSWORD : '密码为6-30位数字字符'
}

export { EX_PHONE , EX_EMAIL , EX_PWD , EX_VCODE , ZH_CN , USERNAME , PASSWORD}
