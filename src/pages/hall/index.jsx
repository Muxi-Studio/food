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
        datas:[],
        hidden: false,
        page:1,
        c:'',
        mask:false,
        maskshow: 'maskshow',
        masklist: 'masklist',
        per:1,
        id: 1,
        details:'',
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
      let cn=this.$router.params.title
      this.setState({
        c:cn
      })
    }
  
    componentDidMount () { 
      this.getHall();
    }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }

    getHall(){
      console.log(this.state.c)
      Fetch(
        '/api/v1/restaurant/list/',
        'GET',
        {
          page:this.state.page,
          limit:10,
          c:this.state.c,
          s:'1'
        },
      ).then(res=>{
        console.log(res);
        if(res.code==0){
          let newdatas=res.data;
          if(newdatas!=null){
            this.setState({
              datas:newdatas,
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
  
    render () {
    const hidden = this.state.hidden;
    const hall = this.state.c;
    const mask = this.state.mask;
    const per = this.state.per;
    const details=this.state.details;
    const list =(
      <View>
         <View
           className={this.state.maskshow}
           onClick={this.handleCancel.bind(this)}
         ></View>
         <View className={this.state.masklist}>
           <View className='list'>
             <View className='picture'>
               <MxIcon type='example' width='311' height='119'></MxIcon>
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
    <View>
    {this.state.datas.map(data => {
    return (
      // eslint-disable-next-line react/jsx-key
      <View className='boxes'>
      <View className='box' onClick={this.handleList.bind(this,data.restaurant_id)}>
        <MxIcon type='example' width='338' height='119'></MxIcon>
        <View className='place'>
            {data.restaurant_name}
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
        {mask && list}
      <View className='bar'>
       <View className='back' onClick={this.ChangeTohome.bind(this)}>
          <MxIcon type='back' width='43' height='43'></MxIcon>
       </View>
       <View className='hall'>
         {hall}
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
