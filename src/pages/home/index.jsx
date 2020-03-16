import Taro from "@tarojs/taro";
import { View,Input,Text } from "@tarojs/components";
import MxTabs from "../../components/common/tabs/index";
import  MxTabsPane  from "../../components/common/tabs-pane";
import  Shake  from "../../components/page/shake";
import Eat from "../eat/index"
import Menu from "../menu/index"
import MxIcon from "../../components/common/MxIcon"
import './index.scss'

export default class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }
  handleFocus(){
    Taro.navigateTo({url:'/pages/search/index'})
  }
  render() {
    const tabList = [
      { title: "您的附近" },
      { title: "华师必吃" },
      { title: "在线菜单" }
    ];
    return (
      <View className='homepage'>
        <View className='input-container'>
            <View className='icon'></View>
            <Text className='product-name'>匣子美食</Text>
            <View className='search'>
              <Input className='input' placeholder='搜索食物、窗口' placeholderClass='input-placehouder'
                onFocus={this.handleFocus.bind(this)}
              ></Input>
              <View className='search-icon'>
                <MxIcon type='search'></MxIcon>
              </View>
            </View>
        </View>
        <MxTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          <MxTabsPane current={this.state.current} index={0}>
            <Shake />
          </MxTabsPane>
          <MxTabsPane current={this.state.current} index={1}>
            <View style='background-color: #FAFBFC;'>
              <Eat />
            </View>
          </MxTabsPane>
          <MxTabsPane current={this.state.current} index={2}>
            <View style='background-color: #FAFBFC;'>
              <Menu />
            </View>
          </MxTabsPane>
        </MxTabs>
      </View>
    );
  }
}
