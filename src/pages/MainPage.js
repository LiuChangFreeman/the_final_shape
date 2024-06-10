import React, {PureComponent} from 'react';
import {connect} from 'dva'
import Game from "./game";


@connect(({util, cloudreve}) => ({
  util
}))
class MainPage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}


  render() {
    const {util, dispatch, history} = this.props;
    const {} = util;
    return (<Game/>)

  }
}

export default connect()(MainPage);
