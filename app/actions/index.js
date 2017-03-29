import Actions from './const'
import ApiService from '../lib/apiService'



export const LoadingModal = (b = true) => {
  return {
    type : Actions.LOADINGMODAL ,
    isLoading : b
  }
}



export const onceLoader = fn => {
  return setTimeout(function(){
    fn()
  },0)
}
