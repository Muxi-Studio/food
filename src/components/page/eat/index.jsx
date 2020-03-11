import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MxIcon from '../../common/MxIcon/index';
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
          {name:'菜名菜名菜名',owner:'店家名称',introduce:'简短介绍：简短介绍简短介绍',hall:'所在食堂'},
          {name:'菜名菜名菜名',owner:'店家名称',introduce:'简短介绍：简短介绍简短介绍',hall:'所在食堂'},
          {name:'菜名菜名菜名',owner:'店家名称',introduce:'简短介绍：简短介绍简短介绍',hall:'所在食堂'}
        ]
      };
    }
    componentWillMount () { }
  
    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }
  
    render () {
      const content = (
      <View>
      {this.state.datas.map(data => {
      return (
        // eslint-disable-next-line react/jsx-key
        <View className='boxes'>
          <View className='card'>
            <View className='icon'>
            <MxIcon type='shop' width='77' height='72'></MxIcon>
            </View>
            <View className='news'>
              <View className='name'>
                 {data.name}
              </View>
              <View className='owner'>
                 {data.owner}
              </View>
              <View className='label'>
                <MxIcon type='label1' width='19' height='30'></MxIcon>
              </View>
              <View className='introduce'>
                {data.introduce}
              </View>
              <View className='mess'>
                 {data.hall}
              </View>
              <View className='position'>
                <MxIcon type='position' width='21' height='20'></MxIcon>
              </View>
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
        {content}
        </View>
      );
  }
}