import React, {Component} from 'react';
import { connect } from 'react-redux'
import { doGetHomeInfo } from '../../actions/home'




class Basic extends Component {

    constructor(props){
      super(props)

    }

    componentDidUpdate(prevProps, prevState) {

    }

    initSandbox(id,cb){
      const { doGetSandBox } = this.props
      doGetSandBox(id,cb)
    }

    saveSandbox(id,data,cb){

      const { doSaveSandBoxAction } = this.props
      doSaveSandBoxAction(id,data,cb)

    }

     updateSandbox(id,data,cb){

      const { doPutSandBox } = this.props
      doPutSandBox(id,data,cb)

    }

    getHistorySandbox(id,cb){
      const {doGetHistorySandBox}=this.props
      doGetHistorySandBox(id,cb)
    }

     putHistorySandbox(id,step,cb){
      const {doPutHistorySandBox}=this.props
      doPutHistorySandBox(id,step,cb)
    }

    retartSandbox(id,cb){
      const {doGetRestartSandBox}=this.props
      doGetRestartSandBox(id,cb)
    }

}



export const mapStateToProps = (state) => {
    // const data = state.sandbox.data ? state.sandbox.data : null
    return data ? {
      isLoading : true,

    } : {}
}

export const mapDispatchToProps = dispatch => {
  return {

    doGetHomeInfo : ( id ,cb) => dispatch(doGetHomeInfo( id ,cb)) ,
  }
}

export default Basic
