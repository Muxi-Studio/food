import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import MxIcon from '../../components/common/MxIcon/index';
import './index.scss'
import Fetch from '../../service/fetch';



export default class Index extends Component {

    // eslint-disable-next-line react/sort-comp
    config = {
     // navigationBarTitleText: '首页',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    }

    constructor() {
      super(...arguments);
      this.state = {
        datas:[],
        types:['label1','label2','label3','label4','label5'],
        page:1
      };
    }
    onPullDownRefresh() {
      this.getEat();
    }
    onReachBottom() {
      this.getEat();
    }
    componentWillMount () { }
  
    componentDidMount () { 
      this.getEat();
    }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }

    getEat(){
      let ndatas=this.state.datas
      Fetch(
        '/api/v1/food/recommend',
        'GET',
        {
          page:this.state.page,
          limit:5
        },
    ).then(res=>{
        console.log(res);
        if(res.code==0){
          let newdatas=res.data;
          if(this.state.page>1){
            if(newdatas!=null){
              ndatas=ndatas.concat(newdatas)
              this.setState({
                datas:ndatas,
                page:this.state.page+1
              })
            }}else{
              this.setState({
                datas:newdatas,
                // page:this.state.page+1
              });
            }
          if(newdatas==null){
            Taro.showToast({
              title:'到底了',
              duration: 2000
            });
          }
       }
      })
    }
    refresh(){
      this.setState({
        page:this.state.page+1
      },
      ()=>{
        this.getEat()
      }
      )
    }
  
    render () {
      const types=this.state.types
      let number=-1
      let count=0
      const content = (
      <View>
      {this.state.datas.map(data => {
        count=count+1
        if(number<4)
        {
          number=number+1
        }else{
          number=0
        }
      return (
        // eslint-disable-next-line react/jsx-key
        <View className='boxes'>
          <View className='card'>
            <View className='icon'>
              {/* <Image src={data.picture_url}></Image> */}
              <MxIcon type='shop' width='3.2083rem' height='3.0rem'></MxIcon>
            </View>
            <View className='news'>
              <View className='name'>
                 {data.name}
              </View>
              <View className='owner'>
                 {data.resaurant_name}
              </View>
              <View className='label'>
                <Text className='num'>{count}</Text>
                <MxIcon type={types[number]} width='1.25rem' height='1.667rem'></MxIcon>
              </View>
              <View className='introduce'>
                {data.introduction}
              </View>
              <View className='mess'>
                 {data.canteen_name}
              </View>
              <View className='position'>
                <MxIcon type='position' width='0.875rem' height='0.8333rem'></MxIcon>
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
        <View onClick={this.refresh.bind(this)} className='fresh'>
          加载更多...
        </View>
        </View>
      );
  }
}