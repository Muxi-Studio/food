import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
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
          {title:'东一食堂'},
          {title:'东二食堂'},
          {title:'学子食堂'},
          {title:'桂香园'},
          {title:'博雅园'},
          {title:'南湖食堂'},
        ]
      };
    }
    handleHall(title) {
      console.log(title);
      Taro.navigateTo({
        url: `../hall/index?title=${title}`
      });
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
        <View className='cards'>
          <View className='fiche'>
               <View className='title'onClick={this.handleHall.bind(this,data.title)}>
                   {data.title}
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