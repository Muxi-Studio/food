import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Fetch from '../../../service/fetch';
import md5 from './md5.min.js';
import "./index.scss";

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    // navigationBarTitleText: '首页'
  };
  constructor(props){
    super(props);
    this.latitude;
    this.longitude;
    this.state ={
      recommend:[]
    }
}
  componentWillMount() {}

  componentDidMount() {
    // if (location.protocol != 'https:') {
    //   location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    //  }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getMotionPermisson() {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission()
        .then(response => {
          alert("Orientation tracking " + response);

          if (response == "granted") {
            window.addEventListener("devicemotion", e => {
              //getNearby事件触发条件
              // document.getElementById("request").style.visibility = "hidden";
            });
          }
        })
        .catch(console.error);
    } else {
      alert("DeviceMotionEvent is not defined");
    }
  }

  getLocation(){
    return new Promise( (resolve,rejected)=>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // (position) =>{
          //   this.latitude = position.coords.latitude;
          //   this.longitude = position.coords.longitude;
          // }
          e => resolve(e)
        );
      } else {
        alert("Geolocation is not supported by this browser.");
        rejected("Geolocation is not supported by this browser");
      }
    })
  }

  getNearby(){
   this.getLocation.then(
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
              for(var i = 0; dis[i].distance < 20000; i++){
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
        Fetch('/api/v1/restaurant/random','GET',{canteen_name: near}).then(
          res =>{
            this.setState({recommend:res.data})
          }
        )
      }
    ).catch( err => console.error(err));
  }

  render() {
    var list = this.state.recommend;
    return (
      <View className='index'>
        {list.map((item,index)=>{
          return(
            <View key={index*0.3}></View>
          )
        })}
      </View>
    );
  }
}
