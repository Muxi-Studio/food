import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MxIcon from '../../components/common/MxIcon/index';
import './index.scss'
import Fetch from '../../service/fetch';



export default class Index extends Component {

    // eslint-disable-next-line react/sort-comp
    config = {
      navigationBarTitleText: '首页'
    }

    constructor() {
      super(...arguments);
      this.state = {
        datas:[
          // {name:'菜名菜名菜名',owner:'店家名称',introduce:'简短介绍：简短介绍简短介绍',hall:'所在食堂'},
          // {name:'菜名菜名菜名',owner:'店家名称',introduce:'简短介绍：简短介绍简短介绍',hall:'所在食堂'},
          // {name:'菜名菜名菜名',owner:'店家名称',introduce:'简短介绍：简短介绍简短介绍',hall:'所在食堂'}
        ],
        page:1
      };
    }
    componentWillMount () { }
  
    componentDidMount () { 
      this.getEat();
    }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }

    getEat(){
      Fetch(
        '/api/v1/food/recommend/',
        'GET',
        {
          page:this.state.page,
          limit:10
        },
    ).then(res=>{
        console.log(res);
        if(res.code==0){
          let newdatas=res.data;
        if(newdatas!=null){
          this.setState({
            datas:newdatas
          });
        }else{
          Taro.showToast({
            title:'到底了',
            duration: 2000
          });
        }
        }
      })
    }
  
    render () {
      const content = (
      <View>
      {this.state.datas.map(data => {
      return (
        // eslint-disable-next-line react/jsx-key
        <View className='boxes'>
          <View className='card'>
            <View className='icon'>
              {/* <Image src={data.picture_url}></Image> */}
              <MxIcon type='shop' width='77' height='72'></MxIcon>
            </View>
            <View className='news'>
              <View className='name'>
                 {data.name}
              </View>
              <View className='owner'>
                 {data.resaurant_name}
              </View>
              <View className='label'>
                <MxIcon type='label1' width='19' height='30'></MxIcon>
              </View>
              <View className='introduce'>
                {data.introduction}
              </View>
              <View className='mess'>
                 {data.canteen_name}
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