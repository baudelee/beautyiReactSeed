import { baseUrlMaster , Hiclass } from '../config/config'
import { message} from 'antd';

const ApiService =  {

  fetch(options){

    const JSONString = options.JSONString || false
    const mock = options.mock || false
    const start = Date.now();
    const method = options.method || 'GET';
    const url = options.url;
    const data = _.pick(options.data || {}, function(val, key, obj){return !_.isNull(val);});
    const success = options.success;
    const error = (data,status,request) => {

      if(data.status != 999){
        message.error(data.message)
      }

      options.error(data,status,request)
    };
    const timeout = 12000;
    const headers = _.extend({
      'Content-Type':'application/json',
      'Data-Type' : 'json' ,
      'X-Requested-With' : 'XMLHttpRequest',
      'Access-Control-Max-Age' : 17288888
    },options.headers);

    const realUrl = mock ? `${url}` : `${baseUrlMaster}${url}`

    $.ajax({
      url : realUrl,
      type : method,
      timeout: timeout,
      headers : headers,
      xhrFields:{
        withCredentials:true
      },
      data : method === 'GET' ? data : (JSONString ? data : JSON.stringify(data) ),
      success : function(data,status,request){

        const oldLocation = location.href
        !(data.status) ? success(data,status,request) : error(data,status,request)

        if(data.status==999 && location.pathname != '/'){
          location.href = "/" +  "?callback=" + oldLocation
        }

        // data.status==999 && location.pathname != '/' && (location.href = data.data + (data.data.indexOf('?') != -1 ? '&' : '?') + "callback=" + oldLocation)

      },
      error : (data,status,request) => {
        if(data.status == 400){
          message.error("用户名密码错误")
          options.error(data,status,request)
        }else{
          error(data,status,request)
        }
      }
    })
  }
}

export default ApiService
