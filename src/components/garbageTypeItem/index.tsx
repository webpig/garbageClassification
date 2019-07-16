import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.styl'

interface GarbageTypeItemInfo {
    logo: string,
    desc: string,
    list: string[]
}

type Props = {
  data: GarbageTypeItemInfo
}

export default class GarbageTypeItem extends Component<Props, {}> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='item'>
        <View className='item-header'>  
        <View className='recyclable-img'>
            <Image src={this.props.data.logo} className='recyclable-img' />
        </View>
        <View className='desc'>{this.props.data.desc}</View>
        </View>
        <View className='garbage-list'>
        {
          this.props.data.list.map((item) => {
            return (
              <View key={item} className='garbage-item'>{item}</View>
            )
          })
        }
        </View>
      </View>
    )
  }

  jumpToSearchPage () {
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }
}
