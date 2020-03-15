import Taro, { Component } from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import './index.scss'
import MxIcon from '../../components/common/MxIcon'
import Fetch from '../../service/fetch'

export default class Index extends Component {

  // eslint-disable-next-line react/sort-comp
  config = {
    // navigationBarTitleText: '首页'
  }
  constructor(props){
      super(props);
      this.state = {
          hotList:[],
          recentList:[]
      }
  }

  componentWillMount () {}

  componentDidMount () { 
      Fetch('search/hot').then(
          res =>{
              if(res){
                  console.log(res);
                  this.setState({
                      hotList:res.data
                  })
              }
          }
      )
      this.setState({
          recentList: Taro.getStorageSync('history')
      })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleConfirm (e){
    Taro.navigateTo({url: '/pages/searchResult/index?st='+ e.target.value})
  }
  handleBack(){
      Taro.navigateBack();
  }
  handleClear(){
      Taro.clearStorage();
      this.setState({
          recentList:[]
      })
  }
  handleTag(item){
      Taro.navigateTo({url: '/pages/searchResult/index?st='+ item})
  }
  render () {
    const {hotList,recentList} = this.state;
    return (
      <View className='s_index'>
        <View className='s_search-bar'>
            <View className='s_input-container'>
                <View className='s_icon'><MxIcon type='search'></MxIcon></View>
                <Input className='s_input' 
                  placeholder='搜索食物、店家' 
                  placeholderClass='s_input-placeholder'
                  confirmType='search' 
                  onConfirm={this.handleConfirm.bind(this)}
                ></Input>
            </View>
            <View className='s_click-back' onClick={this.handleBack.bind(this)}>取消</View>
        </View>
        <View className='s_recent'>
            <View className='s_title-container'>
                <View className='s_title'>最近搜索</View>
                <View className='s_clear' onClick={this.handleClear.bind(this)}>清空</View>
            </View>
            <View className='s_item-container'>
                {recentList.map((item,index)=>{
                    return(
                    <View key={index*0.3} className='s_item' onClick={this.handleTag.bind(this,item)}>{item}</View>
                    )
                })}
            </View>
        </View>
        <View className='s_hot'>
            <View className='s_title-container'>
                <View className='s_title'>大家都在搜</View>
            </View>
            <View className='s_item-container'>
                {hotList.map((item,index)=>{
                    return(
                    <View key={index*0.3} className='s_item' onClick={this.handleTag.bind(this,item)}>{item}</View>
                    )
                })}
            </View>
        </View>
      </View>
    )
  }
}
