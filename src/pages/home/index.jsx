import Taro from "@tarojs/taro";
import { View,Input } from "@tarojs/components";
import MxTabs from "../../components/common/tabs/index";
import  MxTabsPane  from "../../components/common/tabs-pane";
import  Shake  from "../../components/page/shake";
import Eat from "../../components/page/eat/index"
import Menu from "../../components/page/menu"

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
  render() {
    const tabList = [
      { title: "您的附近" },
      { title: "华师必吃" },
      { title: "在线菜单" }
    ];
    return (
      <View className='index'>
        {/* <View className='input-container'>
            <Input style='width:155px; height:32px; border:1px solid rgba(216,216,216,1)'></Input>
        </View> */}
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
