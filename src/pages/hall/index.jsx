import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView,Text } from '@tarojs/components'
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
        hall:'hall',
        datas:[],
        hidden: false,
        page:1,
        s:1,
        c:'',
        cn:'',
        mask:false,
        maskshow: 'maskshow',
        masklist: 'masklist',
        per:1,
        id: 1,
        details:'',
        floor:false,
        bill:[
          {name:'菜名菜名',price:'5元'},
          {name:'菜名菜名',price:'5元'},
          {name:'菜名菜名',price:'5元'},
          {name:'菜名菜名',price:'5元'},
          {name:'菜名菜名',price:'5元'},
        ]
      };
    }

    handleCancel() {
      this.setState({
        mask:false,
        maskshow: 'unmaskshow',
        masklist: 'unmasklist',
      });
    }

    handlePull(){
      this.setState({
        hidden:!this.state.hidden
      })
    }

    handleList(id){
      this.setState({
        mask:true,
        maskshow: 'maskshow',
        masklist: 'masklist',
        id:id
      },
      ()=>{
        this.getMenu();
      }
      )
    }

    ChangeTohome() {
      Taro.navigateTo({
        url: '/pages/home/index'
      });
    }
  
    componentWillMount () { 
      let cn=this.$router.params.title;
      if (cn.length==3)
      {
        this.setState({
          hall:'hall1'
        })
      }
      this.setState({
        cn:cn
      });
      let n=cn.search('食堂');
      if(n==-1){
        this.setState({
          c:cn
        });
      }else{
        this.setState({
          c:cn.substr(0,2)
        })
      }
    }
  
    componentDidMount () { 
      this.getHall();
    }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }

    getHall(){
      let ndatas=this.state.datas
      console.log(this.state.c)
      Fetch(
        '/api/v1/restaurant/list/',
        'GET',
        {
          page:this.state.page,
          limit:5,
          c:this.state.c,
          s:this.state.s
        },
      ).then(res=>{
        console.log(res);
        if(res.code==0){
          let newdatas=res.data;
          if(this.state.page>1){
            if(newdatas!=null){
              ndatas=ndatas.concat(newdatas)
              this.setState({
                datas:ndatas
              })
            }}else{
              this.setState({
                datas:newdatas,
              });
            }
          if(newdatas==null){
            this.setState({
              datas:[]
            })
            Taro.showToast({
              title:'到底了',
              duration: 2000
            });
          }
       }
      })
    }

    getMenu(){
      let id=this.state.id;
      Fetch(
        `/api/v1/restaurant/detail/${id}`,
        'GET',
        {},
      ).then(res=>{
        console.log(res);
        if(res.code==0){
          let newdatas=res.data;
          if(newdatas!=null){
            this.setState({
              details:newdatas.introduction,
              per:newdatas.average_price,
              // bill:newdatas.menus
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
    onScrollToLower(){
      this.setState({
        page:this.state.page+1
      },
      ()=>{
        this.getHall()
      }
      )
    }

    onCheck2(){
      this.setState({
        s:2,
        floor:!this.state.floor
      },
      ()=>{
        this.getHall();
      })
    }
    onCheck1(){
      this.setState({
        s:1,
        floor:!this.state.floor
      },
      ()=>{
        this.getHall();
      })
    }
  
    render () {
    const hidden = this.state.hidden;
    const hall = this.state.cn;
    const mask = this.state.mask;
    const per = this.state.per;
    const details=this.state.details;
    const floor=this.state.floor;
    const Threshold=10
    const list =(
      <View>
         <View
           className={this.state.maskshow}
           onClick={this.handleCancel.bind(this)}
         ></View>
         <View className={this.state.masklist}>
           <View className='list'>
             <View className='picture'>
               <MxIcon type='example' width='12.958rem' height='4.958rem'></MxIcon>
             </View>
             <View className='window'>
               窗口介绍
             </View>
             <View className='price'>(人均价格:{per}元)</View>
             <View className='evaluate'>
               {details}
             </View>
             <View className='content'>
               菜单内容：
             </View>
             {this.state.bill.map(b=>{
               return(
                 // eslint-disable-next-line react/jsx-key
                 <View className='bill'>
                   <View className='dish'>
                     {b.name}
                   </View>
                   <View className='money'>
                     {b.price}
                   </View>
                 </View>
             );
             })}
           </View>
         </View>
      </View>
    )
    const content = (
    <ScrollView
      style='height:27.0833rem'
      scrollY
      lowerThreshold={Threshold}
      upperThreshold={Threshold}
      scrollWithAnimation
      onScrollToLower={this.onScrollToLower.bind(this)}
    >
    {this.state.datas.map(data => {
    return (
      // eslint-disable-next-line react/jsx-key
      <View className='boxes'>
      <View className='box' onClick={this.handleList.bind(this,data.restaurant_id)}>
        <MxIcon type='example' width='14.083rem' height='5.0rem'></MxIcon>
        <View className='place'>
            {data.restaurant_name}
        </View>
      </View>
    </View>
    );
    })
  }
  </ScrollView>
  );
    return(
      <View className='indexh'>
        {mask && list}
      <View className='bar'>
       <View className='back' onClick={this.ChangeTohome.bind(this)}>
          <MxIcon type='back' width='1.7rem' height='1.7rem'></MxIcon>
       </View>
       <View className={this.state.hall}>
         {hall}
       </View>
       <View className='one'>
         {!floor&&<Text>一楼</Text>}
         {floor&&<Text>二楼</Text>}
        <View className='pull' onClick={this.handlePull.bind(this)}>
          <MxIcon type='pull' width='0.5rem' height='0.292rem'></MxIcon>
        </View>
       </View>
      </View>
      {hidden && 
        <View className='select'>
         {!floor&&
          <View className='floor1'>
          一楼
          <View className='check'>
            <MxIcon type='check' width='0.625rem' height='0.625rem'></MxIcon>
          </View>
        </View>
         }
         {!floor&&
          <View className='floor2'>
             二楼
            <View className='uncheck' onClick={this.onCheck2.bind(this)}>
               <MxIcon type='uncheck' width='0.625rem' height='0.625rem'></MxIcon>
             </View>
           </View>}
        {floor&&
          <View className='floor2'>
          一楼
          <View className='uncheck' onClick={this.onCheck1.bind(this)}>
            <MxIcon type='uncheck' width='0.625rem' height='0.625rem'></MxIcon>
          </View>
        </View>
         }
        {floor&&
          <View className='floor1'>
             二楼
            <View className='check'>
               <MxIcon type='check' width='0.625rem' height='0.625rem'></MxIcon>
             </View>
          </View>}
         </View>
         }
      {content}
      </View>
    );
}
}
