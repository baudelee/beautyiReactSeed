import Actions from '../actions/const'

const initialState = {
  isLoading : false,
  limit: 10,
  skip: 0,
}

export default function home (state = initialState, action) {
  switch (action.type) {
    case Actions.LOADINGMODAL :
      return Object.assign({} , state , {isLoading : action.isLoading} )
    case Actions.GETHOMEINFO:
      return Object.assign({} , state , {isLoading : action.isLoading} , {homeInfo : action.data  })
    default:
      return state
  }
}


export  { home }
