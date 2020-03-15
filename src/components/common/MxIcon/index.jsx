import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image, View } from '@tarojs/components';
import MxComponent from '../../../common/component';
import mobile from '../../../assets/svg/mobile.svg';
import search from '../../../assets/svg/search.svg';
import label1 from '../../../assets/svg/label1.svg';
import label2 from '../../../assets/svg/label2.svg';
import label3 from '../../../assets/svg/label3.svg';
import label4 from '../../../assets/svg/label4.svg';
import label5 from '../../../assets/svg/label5.svg';
import back from '../../../assets/svg/back.svg';
import check from '../../../assets/svg/check.svg';
import uncheck from '../../../assets/svg/uncheck.svg';
import pull from '../../../assets/svg/pull.svg';
import hall from '../../../assets/svg/hall.svg';
import shop from '../../../assets/svg/shop.svg';
import example from '../../../assets/svg/example.svg';
import position from '../../../assets/svg/position.svg';


import './index.scss';

export default class MxIcon extends MxComponent {
  static options = {
    addGlobalClass: true
  };
  constructor() {
    super(...arguments);
    if (process.env.NODE_ENV === 'test') {
      Taro.initPxTransform({ designWidth: 750 });
    }
  }

  handleClick() {
    this.props.onClick(...arguments);
  }

  render() {
    const { className, width, height, type, outerStyle,color } = this.props;
    const map = new Map([
      ['mobile', mobile],
      ['search', search],
      ['label1', label1],
      ['label2', label2],
      ['label3', label3],
      ['label4', label4],
      ['label5', label5],
      ['back', back],
      ['pull', pull],
      ['hall', hall],
      ['shop', shop],
      ['example', example],
      ['check', check],
      ['uncheck', uncheck],
      ['position', position]
    ]);

    const rootStyle = {
      width: `${Taro.pxTransform(parseInt(width))}`,
      height: `${Taro.pxTransform(parseInt(height))}`,
      color:`${color}`
    };
    return (
      <View
        style={outerStyle}
        className={classNames('image-container', className)}
      >
        <Image
          className='image-icon'
          style={rootStyle}
          src={map.get(type)}
          onClick={this.handleClick.bind(this)}
        ></Image>
      </View>
    );
  }
}
MxIcon.defaultProps = {
  className: '',
  width: 40,
  height: 40,
  type: '',
  color:'',
  outerStyle: {},
  onClick: () => {}
};

MxIcon.propTypes = {
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  outerStyle: PropTypes.object,
  onClick: PropTypes.func,
  color:PropTypes.string,
};