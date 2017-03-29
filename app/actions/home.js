import Actions from './const'
import ApiService from '../lib/apiService'
import { LoadingModal , onceLoader } from './index'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { userManage , baseUrlMaster , casUrl} from '../config/config'
import message from 'antd/lib/message'
import { getCookie } from '../lib/utils'


function isFunction(fn) {
   return Object.prototype.toString.call(fn)=== '[object Function]';
}


export const doLogout = (cb) => {

  return dispatch => {
    dispatch(showLoading())
    const _url = getCookie('TGT')

    _url && ApiService.fetch({
      url : _url,
      method : 'DELETE' ,
      mock : true ,
      success : function(data){
        onceLoader(function(){dispatch(hideLoading())})
        onceLoader(function(){
          cb && cb(data)
          dispatch(GetUserInfo(data))
          $.ajax({
	        'method': 'POST',
	        'url': `${baseUrlMaster}/logout`,
	        'xhrFields': {
	            'withCredentials': true
            },
            success : function(data,status,request){
              location.reload()
            }
        });


        })

      },
      error : function (req) {
        onceLoader(function(){dispatch(hideLoading())})

      }
    })
  }

}


export const doPostLoginCoach = (data,cb) => {
  return dispatch => {
    dispatch(showLoading())
    ApiService.fetch({
      url : casUrl,
      method : 'POST' ,
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      } ,
      mock : true ,
      JSONString : true,
      data :data || {},
      success : function(data,status,request){
        onceLoader(function(){dispatch(hideLoading())})
        onceLoader(function(){

          request.getResponseHeader('Location') && ApiService.fetch({
            url : request.getResponseHeader('Location'),
            method : 'POST' ,
            headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            } ,
            mock : true ,
            JSONString : true,
            data :{
              service : `${baseUrlMaster}/sandboxes/user`
            },
            success : function(data,status,request){
              onceLoader(function(){dispatch(hideLoading())})
              onceLoader(function(){



                data && $.ajax({
                  url:`${baseUrlMaster}/sandboxes/user?ticket=${data}`,
                  xhrFields: { withCredentials: true }
                }).then(function (serviceData){
                  onceLoader(function(){dispatch(hideLoading())})
                  onceLoader(function(){
                  cb && cb(serviceData.data)



                  })

                })

              })

            },
            error : function (req) {
              onceLoader(function(){dispatch(hideLoading())})
            }
          })



        })

      },
      error : function (req) {
        onceLoader(function(){dispatch(hideLoading())})
      }
    })
  }
}


export const doPostLogin = (data,cb) => {
  return dispatch => {
    dispatch(showLoading())
    ApiService.fetch({
      url : casUrl,
      method : 'POST' ,
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      } ,
      mock : true ,
      JSONString : true,
      data :data || {},
      success : function(data,status,request){
        onceLoader(function(){dispatch(hideLoading())})
        onceLoader(function(){

          request.getResponseHeader('Location') && (document.cookie="TGT=" + request.getResponseHeader('Location') + ";")  && ApiService.fetch({
            url : request.getResponseHeader('Location'),
            method : 'POST' ,
            headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            } ,
            mock : true ,
            JSONString : true,
            data :{
              service : `${userManage}/users/session`
            },
            success : function(data,status,request){
              onceLoader(function(){dispatch(hideLoading())})
              onceLoader(function(){



                data && $.ajax({
                  url:`${userManage}/users/session?ticket=${data}`,
                  xhrFields: { withCredentials: true }
                }).then(function (serviceData){
                  onceLoader(function(){dispatch(hideLoading())})
                  onceLoader(function(){
                  cb && cb(serviceData.data)



                  })

                })

              })

            },
            error : function (req) {
              onceLoader(function(){dispatch(hideLoading())})
            }
          })



        })

      },
      error : function (req) {
        onceLoader(function(){dispatch(hideLoading())})
      }
    })
  }
}




export const doGetHomeInfo = (id ,cb) => {
  return dispatch => {
    dispatch(showLoading())

    ApiService.fetch({
      url : '/sandboxes/user',
      data :{
        userId : id ? id : null
      },
      success : function(data){
        onceLoader(function(){dispatch(hideLoading())})
        onceLoader(function(){
          cb && cb(data)
          dispatch(GetHomeInfo(data))
        })
      },
      error : function (data,status,request) {
        onceLoader(function(){dispatch(hideLoading())})
        cb && cb(data)


      }
    })
  }
}


export const doGetUserInfo = (id ,cb) => {
  return dispatch => {
    dispatch(showLoading())

    ApiService.fetch({
      url : `${userManage}/users/session`,
      data :{
        userId : id ? id : null
      },
      mock : true ,
      success : function(data){
        onceLoader(function(){dispatch(hideLoading())})
        onceLoader(function(){
          cb && cb(data)
          dispatch(GetUserInfo(data))
        })

      },
      error : function (req) {
        onceLoader(function(){dispatch(hideLoading())})

      }
    })
  }
}



export const Login = (data) => {
  return {
    type : Actions.LOGIN ,
    data : data
  }
}


export const GetUserInfo = (data) => {
  return {
    type : Actions.GETUSERINFO ,
    data
  }
}

export const GetHomeInfo = (data) => {
  return {
    type : Actions.GETHOMEINFO ,
    data : data
  }
}
