import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Image } from "@tarojs/components";
import "./index.scss";
import MxIcon from "../../components/common/MxIcon";
import Fetch from "../../service/fetch";

export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    // navigationBarTitleText: '首页'
    enablePullDownRefresh: true,
    onReachBottomDistance: 50
  };

  constructor(props) {
    super(props);
    this.state = {
      foodList: [],
      shopList: [],
      checkedItem: "food",
      value: this.$router.params.st
    };
    this.pageF = 0;
    this.pageS = 0;
    this.history = [];
  }
  componentWillMount() {
    if(Taro.getStorageSync('history')){
      this.history = Taro.getStorageSync('history').concat([this.state.value]);
      this.newArr(this.history);
      Taro.setStorageSync('history',this.history);
    }else{
      this.history.push(this.state.value);
      this.newArr(this.history);
      Taro.setStorageSync('history',this.history);
    }
  }

  componentDidMount() {
    Fetch("/api/v1//search/food?st=" + this.state.value + "&page=1&limit=30").then(
      res => {
        if (res) {
          console.log(res);
          this.setState({
            foodList: res.data
          });
          this.pageF = this.pageF + 1;
        }
      }
    );
  }


  newArr(arr){
    return Array.from(new Set(arr))
  }

  getData() {
    const url =
      this.state.checkedItem == "food"
        ? "search/food?st="
        : "search/restaurant?st=";
    const food = this.state.checkedItem == "food" ? "true" : false;
    const page = this.state.checkedItem == "food" ? this.pageF : this.pageS;
    Fetch(url + this.state.value + "&limit=30&page=" + page).then(res => {
      console.log(res);
      if (res) {
        if (food) {
          this.setState({
            foodList: this.state.foodList.concat(res.data)
          });
          this.pageF = this.pageF + 1;
        } else {
          this.setState({
            shopList: this.state.shopList.concat(res.data)
          });
          this.pageS = this.pageS + 1;
        }
      }
    });
  }
  onPullDownRefresh() {
    this.getData();
  }
  onReachBottom() {
    this.getData();
  }
  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleCheck() {
    this.setState(
      {
        checkedItem: this.state.checkedItem == "food" ? "shop" : "food",
        foodList: this.state.checkedItem == "food" ? [] : this.state.foodList,
        shopList: this.state.checkedItem == "food" ? this.state.shopList : []
      },
      ()=>{
        this.state.checkedItem == 'food' ? (this.pageF = 1): (this.pageS = 1);
        this.getData()}
    );
  }

  handleConfirm(e) {
    const url =
      this.state.checkedItem == "food"
        ? "search/food?st="
        : "search/restaurant?st=";
    const food = this.state.checkedItem == "food" ? "true" : false;
    this.history.push(e.target.value);
    this.newArr(this.history);
    Taro.setStorageSync('history',this.history);
    Fetch(url + e.target.value + "&limit=30&page=1").then(res => {
      if (res) {
        if (food) {
          this.setState({
            foodList: res.data
          });
          this.pageF = 2;
        } else {
          this.setState({
            shopList: res.data
          });
          this.pageS = 2;
        }
      }
    });
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  handleBack() {
    Taro.navigateTo({ url: "/pages/home/index" });
  }
  render() {
    const { foodList, shopList } = this.state;
    const isCheckedF =
      this.state.checkedItem == "food" ? "sr_bar-item-checked" : "sr_bar-item";
    const isCheckedS =
      this.state.checkedItem == "shop" ? "sr_bar-item-checked" : "sr_bar-item";
    return (
      <View className='sr_index'>
        <View className='sr_navigationbar'>
          <View className='sr_back-icon' onClick={this.handleBack.bind(this)}>
            <MxIcon type='back'></MxIcon>
          </View>
          <View className='sr_search'>
            <View className='sr_search-icon'>
              <MxIcon type='search'></MxIcon>
            </View>
            <Input
              className='sr_input'
              placeholderClass='sr_input-placeholder'
              confirmType='search'
              onConfirm={this.handleConfirm.bind(this)}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            ></Input>
          </View>
        </View>

        <View className='sr_switch-bar'>
          <Text className={isCheckedF} onClick={this.handleCheck.bind(this)}>
            食物
          </Text>
          <Text className={isCheckedS} onClick={this.handleCheck.bind(this)}>
            窗口
          </Text>
        </View>
        {!foodList && !shopList && (
          <View className='sr_no-answer'>未查询到结果，换其他关键词试试叭</View>
        )}
        <View className='sr_result-container'>
          {foodList &&
            foodList.map((item, index) => {
              return (
                <View key={index * 0.3} className='sr_item'>
                  <View className='sr_image-box'>
                    <Image src={item.picture_url} className='sr_image'></Image>
                  </View>
                  <View className='sr_info'>
                    <View className='sr_fir-line'>
                      <Text className='sr_fir-name'>{item.name}</Text>
                      <Text className='sr_sec-name'>
                        {item.restaurant_name}
                      </Text>
                    </View>
                    <View className='sr_sec-line'>
                      <Text className='sr_canteen'>
                        所在食堂：{item.canteen_name}
                      </Text>
                      <Text className='sr_storey'>楼层：{item.storey}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          {shopList &&
            shopList.map((item, index) => {
              return (
                <View
                  key={index * 0.3}
                  className='sr_item'
                  onClick={() => {
                    Taro.navigateTo({
                      url: "/pages/shopdetail?id=" + item.restaurant_id
                    });
                  }}
                >
                  <View className='sr_image-box'>
                    <Image src={item.picture_url} className='sr_image'></Image>
                  </View>
                  <View className='sr_info'>
                    <View className='sr_fir-line'>
                      <Text className='sr_fir-name'>{item.name}</Text>
                    </View>
                    <View className='sr_sec-line'>
                      <Text className='sr_canteen'>
                        所在食堂：{item.canteen_name}
                      </Text>
                      <Text className='sr_storey'>楼层：{item.storey}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    );
  }
}
