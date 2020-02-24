import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import PropTypes from "prop-types";
import classNames from "classnames";
// import { Component } from 'react'

const MIN_DISTANCE = 100;
const MAX_INTERVAL = 10;

export default class MxTabs extends Component {
  constructor() {
    super(...arguments);
    this.touchDot = 0;
    this.timer = null;
    this.interval = 0;
    this.isMoving = false;
  }
  handleClick() {
    this.props.onClick(...arguments);
  }

  handleTouchStart (e) {
    // 获取触摸时的原点
    this._touchDot = e.touches[0].pageX
    // 使用js计时器记录时间
    this._timer = setInterval(() => {
      this._interval++
    }, 100)
  }

  handleTouchMove(e) {
    const { current, tabList } = this.props;

    const touchMove = e.touches[0].pageX; //此时的点
    const moveDistance = touchMove - this.touchDot;
    const maxIndex = tabList.length;

    //为什么要小于10 interval，因为缓慢移动是不希望它去滚动的！
    if (!this.isMoving && this.interval < MAX_INTERVAL && this.touchDot > 20) {
      // 向左滑动
      if (current + 1 < maxIndex && moveDistance <= -MIN_DISTANCE) {
        this.isMoving = true;
        this.handleClick(current + 1);

        // 向右滑动
      } else if (current - 1 >= 0 && moveDistance >= MIN_DISTANCE) {
        this.isMoving = true;
        this.handleClick(current - 1);
      }
    }
  }

  handleTouchEnd() {
    clearInterval(this.timer);
    this.interval = 0;
    this.isMoving = false;
  }
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    const { tabList, current } = this.props;

    const tabItems = tabList.map((item, idx) => {
      const itemCls = classNames({
        "at-tabs__item": true,
        "at-tabs__item--active": current === idx
      });
      //tabitems 的内容
      return (
        <View
          className={itemCls}
          id={`tab${idx}`}
          key={item.title}
          onClick={this.handleClick.bind(this, idx)}
        >
          {item.title}
          {/* 这里又有个下划线？？ */}
          <View className='at-tabs__item-underline'></View>
        </View>
      );
    });
    return (
      <View className='container'>
        <View className='at-tabs__header'>{tabItems}</View>

        <View
          className='at-tabs__body'
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
          onTouchMove={this.handleTouchMove.bind(this)}
        >
          {/* 调整下划线的那部分，这个不是我需要的underline */}
          {/* <View className='at-tabs__underline'></View> */}
          {this.props.children}
        </View>
      </View>
    );
  }
}

MxTabs.defaultProps = {
  current: 0,
  tabList: [],
  onClick: () => {}
};

MxTabs.propTypes = {
  current: PropTypes.number,
  tabList: PropTypes.array,
  onClick: PropTypes.func
};
