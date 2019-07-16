import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.styl'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '垃圾的小窝'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    setTimeout(() => this.jumpToSearchPage(), 500);
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Image src='http://pic.sc.chinaz.com/files/pic/psd1/201511/psd18873.jpg' className='img' mode='aspectFill'/>
      </View>
    )
  }

  jumpToSearchPage () {
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }
}
