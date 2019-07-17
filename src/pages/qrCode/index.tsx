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
    navigationBarTitleText: '征婚启事'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='sub-title'>优质单身男青年，求撩😄</View>
        <Image src='https://tva1.sinaimg.cn/large/0060lm7Tly1g52v6387f9j30by0bywes.jpg' className='qrcode' onClick={this.preview}></Image>
      </View>
    )
  }

  preview () {
    Taro.previewImage({
      current: 'https://tva1.sinaimg.cn/large/0060lm7Tly1g52v6387f9j30by0bywes.jpg',
      urls: ['https://tva1.sinaimg.cn/large/0060lm7Tly1g52v6387f9j30by0bywes.jpg']
    })
  }
}
