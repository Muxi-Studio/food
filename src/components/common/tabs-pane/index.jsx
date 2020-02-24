import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import PropTypes from "prop-types";
import classNames from "classnames";
import './index.scss';

export default class MxTabsPane extends Component {
  render() {
    const { index, current } = this.props;
    return (
      <View
        className={classNames({
          "at-tabs-pane": true,
          "at-tabs-pane--active": index === current,
          "at-tabs-pane--inactive": index !== current
        })}
      >
        {this.props.children}
      </View>
    );
  }
}

MxTabsPane.defaultProps = {
  index: 0,
  current: 0
};
MxTabsPane.propTypes = {
  index: PropTypes.number,
  current: PropTypes.number
};
