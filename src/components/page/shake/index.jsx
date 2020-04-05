import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Fetch from '../../../service/fetch';
import md5 from './md5.min.js';
import Shake from './shake.js';
import MxIcon from '../../../components/common/MxIcon';
import exam from '../../../assets/png/shop.png';
import Img from '../../../assets/svg/mobile.svg';
import "./index.scss";

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    // navigationBarTitleText: '首页'
  };
    // "restaurant_name": "休闲食品",
    // "canteen_name": "东一",
    // "storey": 1,
    // "average_price": 0,
    // "picture_url": "",
    // "recommendation": null
  constructor(props){
    super(props);
    this.latitude;
    this.longitude;
    this.recommend=[{restaurant_name:'休闲食品',canteen_name:'东一',storey:'一楼',average_price:'7',picture_url:exam,recommendation:'辣条'}]
    this.state ={
      present:0
    }
  }
  componentWillMount() {}

  componentDidMount() {
    // if (location.protocol != 'https:') {
    //   location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    //  }
    this.Motion();
    this.getNearby();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  Motion() {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission()
        .then(response => {
          alert("Orientation tracking " + response);

          if (response == "granted") {
            // window.addEventListener("devicemotion", e => {
            //   //getNearby事件触发条件
            //   // document.getElementById("request").style.visibility = "hidden";
            // });
            var myShakeEvent = new Shake();
            myShakeEvent.start();
            window.addEventListener('shake', this.shakeEventDidOccur, false);
          }
        })
        .catch(console.error);
    } else {
      // alert("DeviceMotionEvent is not defined");
    }
  }

  shakeEventDidOccur(){
    var size = this.recommend.length;
    this.setState({
      present: (this.state.present + 1)==size?0:this.state.present + 1
    })
    alert('shake!');
  }
  getLocation(){
    // function success(pos) {
    //   var crd = pos.coords;
    //   console.log('Your current position is:');
    //   console.log('Latitude : ' + crd.latitude);
    //   console.log('Longitude: ' + crd.longitude);
    //   console.log('More or less ' + crd.accuracy + ' meters.');
    // };
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    return new Promise( (resolve)=>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // (position) =>{
          //   this.latitude = position.coords.latitude;
          //   this.longitude = position.coords.longitude;
          // }
          e => {console.log(e);resolve(e)},error);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    })
  }

  getNearby(){
   this.getLocation().then(
      position =>{
        //调用tencent webservice
        var sig = md5('/ws/distance/v1/?'
        +'from='+position.coords.latitude+','+position.coords.longitude
        +'&key=BQBBZ-TRBCW-J3WRO-OUTER-2YMG5-2MF5X'+'&mode=walking'
        +'&to=28.086060,115.053455;28.069227,116.044310'
        +'8kjYTMrC9zaOW9xTLS5N3EnB7HWviv')
        
        Taro.request({url:'https://apis.map.qq.com/ws/distance/v1/?'
        +'from='+position.coords.latitude+','+position.coords.longitude
        +'&key=BQBBZ-TRBCW-J3WRO-OUTER-2YMG5-2MF5X'+'&mode=walking'
        +'&to=28.086060,115.053455;28.069227,116.044310'
        +'&sig='+sig,method:'GET'}).then(
          res => {
            if(res.status == 0){
              var dis = res.result.element.sort( (a,b) => a.distance - b.distance );
              var map = new Map([
                [28.086060,'东一'],
                [28.069227,'学子']
              ]);
              var nearby = '';
              for(var i = 0; dis[i].distance < 10000; i++){
                nearby = i ?nearby+','+ map[dis[i].to.lat]:nearby+map[dis[i].to.lat];
              }
              return new Promise( resolve =>{
                resolve(nearby);
              })
            }
          }
        )
      }
    ).then(
      near =>{
        console.log(near);
        Fetch('/api/v1/restaurant/random?limit=20','GET',{canteen_name: near}).then(
          res =>{
            this.recommend = res.data;
            this.setState({present:res.data[0]})
          }
        )
      }
    ).catch( err => console.error(err));
  }

  imitateShake(){
    this.shakeEventDidOccur();
  }
  render() {
    var item = this.recommend[this.state.present];
    // "restaurant_name": "休闲食品",
    // "canteen_name": "东一",
    // "storey": 1,
    // "average_price": 0,
    // "picture_url": "",
    // "recommendation": null
    return (
      <View className='sha_index'>
        <View className='sha_card-container'>
          <View className='sha_img-container'><Image className='sha_pic' src={item.picture_url} mode='aspectFill'></Image></View>
          <View className='sha_info'>
            <View className='sha_shop'>{item.restaurant_name}</View>
            <View className='sha_locate'>{item.canteen_name}{' '}{item.storey}</View>
            <View className='sha_price'>{"人均价格:"+item.average_price+"¥"}</View>
            <View className='sha_recomm'>{"特色推荐:"+item.recommendation}</View>
          </View>
        </View>
        <View className='sha_icon' onClick={this.imitateShake.bind(this)}><Image src={Img} className='sha_src'></Image></View>
      </View>
    );
  }
}
