import React, {Component} from 'react';
import { Link } from 'react-router';
import { getNamesFromType , getObjectFromType , getMovieDataFromArray , getHash , getModuleDataFromKey , getHashLen , movieHashData , getHashChang , getHashChangContunt} from '../../lib/utils'
import MissionItem from '../common/MissionItem.jsx'
import  TMPagination  from '../common/TMPagination.jsx'
import { MissionModuleTxt } from '../../lib/MissionModuleTxt'
import queryString from 'query-string'
import { mapConfigFilter , getObjectFromTid } from '../../config/mapConfig'


class TMDrama extends Component {

    constructor(props){
      super(props)

      this.state = {

      }

    }



    componentDidMount() {

    }



    render() {
      const { DramaData : { scenarioName , scenarioContent } } = this.props
      const tid = queryString.parse(location.search).tid
      const _intro = getObjectFromTid('sharedBicycle' , tid)



        return (
          <div>
            <div id="drama"  className="dramaModal fn-hide"  data-type='drama'>
                <div className="dramaModal-icon">
                  <img src="../images/drama3.png" height="100" />
                </div>
                <div className="dramaModal-title">
                  {_intro.title}
                </div>
                <div className="dramaModal-line"></div>
                <div className="dramaModal-txt">
                  <h3>背景：</h3>
                  <div className="dramaModal-txt-css">{_intro.backgroundIntro}</div>
                  <h3 className="line">剧情：</h3>
                  <div className="dramaModal-txt-css">{_intro.introduction}</div>

                </div>
            </div>

          </div>

        );
    }
}


export default TMDrama;
