import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MxIcon from '../../components/common/MxIcon/index';
import './index.scss'

export default class Index extends Component {

    // eslint-disable-next-line react/sort-comp
    config = {
      navigationBarTitleText: '首页'
    }

    constructor() {
      super(...arguments);
      this.state = {
        datas:[
          {hall:'巧媳妇面馆'},
          {hall:'巧媳妇面馆'},
          {hall:'巧媳妇面馆'}
        ],
        hidden: false
      };
    }

    handlePull(){
      this.setState({
        hidden:!this.state.hidden
      })
    }

    ChangeTohome() {
      Taro.navigateTo({
        url: '/pages/home/index'
      });
    }
  
    componentWillMount () { }
  
    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }
  
    render () {
    const hidden = this.state.hidden;
    const content = (
    <View>
    {this.state.datas.map(data => {
    return (
      // eslint-disable-next-line react/jsx-key
      <View className='boxes'>
      <View className='box'>
        <MxIcon type='example' width='338' height='119'></MxIcon>
        <View className='place'>
            {data.hall}
        </View>
      </View>
    </View>
    );
    })
  }
  </View>
  );
    return(
      <View className='index'>
      <View className='bar'>
       <View className='back' onClick={this.ChangeTohome.bind(this)}>
          <MxIcon type='back' width='43' height='43'></MxIcon>
       </View>
       <View className='hall'>
         东一食堂
       </View>
       <View className='one'>
         一楼
        <View className='pull' onClick={this.handlePull.bind(this)}>
          <MxIcon type='pull' width='12' height='7'></MxIcon>
        </View>
       </View>
      </View>
      {hidden && 
        <View className='select'>
          <View className='floor1'>
            一楼
            <View className='check'>
              <MxIcon type='check' width='15' height='15'></MxIcon>
            </View>
          </View>
          <View className='floor2'>
            二楼
            <View className='uncheck'>
              <MxIcon type='uncheck' width='15' height='15'></MxIcon>
            </View>
          </View>
        </View>}
      {content}
      </View>
    );
}
}
