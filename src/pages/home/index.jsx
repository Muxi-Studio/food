import Taro from "@tarojs/taro";
import { View,Input } from "@tarojs/components";
import { MxTabs } from "../../components/common/tabs";
import { MxTabsPane } from "../../components/common/tabs-pane";
import { Shake } from "../../components/page/shake";

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
        <View className='input-container'>
            <Input></Input>
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
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>
              标签页二的内容
            </View>
          </MxTabsPane>
          <MxTabsPane current={this.state.current} index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>
              标签页三的内容
            </View>
          </MxTabsPane>
        </MxTabs>
      </View>
    );
  }
}
