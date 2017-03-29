import React, { Component } from 'react';
import { connect } from 'react-redux'

class TM404 extends Component {

  constructor(props) {
    super(props)

  }


  render() {

    return (
      <div >

        <div className="notFound404"></div>

      </div>
    );
  }
}



const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TM404)
