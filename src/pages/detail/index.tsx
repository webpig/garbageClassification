import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.styl'

interface garbageInfo {
    name: string
    type: number
    explain: string
    contain: string
    tip: string
}

const TYPE = ['可回收垃圾', '有害垃圾', '厨余(湿)垃圾', '其他(干)垃圾']

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: ''
  }

  state = {
    garbageInfo: {} as garbageInfo  
  }

  componentWillMount () { 
    this.setState({
      garbageInfo: JSON.parse(this.$router.params.garbageInfo)
    }, () => {
      Taro.setNavigationBarTitle({
        title: this.state.garbageInfo.name
      })
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {
      type,
      explain,
      contain,
      tip
    } = this.state.garbageInfo
    return (
      <View className='index'>
        <View className='item'>
          <View className="title">垃圾类型</View>
          <View className="detail">{TYPE[type]}</View>
        </View>
        <View className='item'>
          <View className="title">分类解释</View>
          <View className="detail">{explain}</View>
        </View>
        <View className='item'>
          <View className="title">包含类型</View>
          <View className="detail">{contain}</View>
        </View>
        <View className='item'>
          <View className="title">投放提示</View>
          <View className="detail">{tip}</View>
        </View>
          {/* <Text className='strong'>垃圾类型：</Text>{TYPE[type]}</View> */}
        {/* <View className='item'><Text className='strong'>分类解释：</Text>{explain}</View>
        <View className='item'><Text className='strong'>包含类型：</Text>{contain}</View>
        <View className='item'><Text className='strong'>投放提示：</Text>{tip}</View> */}
      </View>
    )
  }

}
