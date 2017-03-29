import React, {Component} from 'react';
import { connect } from 'react-redux'
import {  doPostLogin , doGetHomeInfo , doGetUserInfo , doPostLoginCoach , doLogout} from '../actions/home'
import Time from 'react-time'
import { Link } from 'react-router';
import Modal from '../lib/jquery.modal.min'
import { EX_PHONE , EX_EMAIL , EX_PWD , ZH_CN , USERNAME , PASSWORD } from '../lib/regexp'
import keydown from 'keydown'
import queryString from 'query-string'





const headers = {
  'Content-Type':'application/json',
  'Data-Type' : 'json' ,
  'X-Requested-With' : 'XMLHttpRequest',
  'Access-Control-Max-Age' : 17288888
}

import LoadingBar from 'react-redux-loading-bar'



class Home extends Component {

    constructor(props){
      super(props)
      this.state = {

      }

    }

    componentDidMount() {

      const { doGetHomeInfo } = this.props

      doGetHomeInfo('1233')
    }




    componentWillUnmount() {
    }




    render() {


        return (
            <div className="homePage">
              <LoadingBar style={{ backgroundColor: '#38A93F' }} />
              <h2>首页</h2>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
  return {
    doGetHomeInfo : ( id ,cb) => dispatch(doGetHomeInfo( id ,cb)) ,

  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Home)
