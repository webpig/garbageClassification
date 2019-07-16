import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
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
    navigationBarTitleText: '图文'
  }

  state = {
    screenWidth: 0,
    imgHeight: 0,
    isIpX: false
  }

  componentWillMount () { 
    Taro.getSystemInfo({
      success: (res: any) => {
        console.log(res)
        this.setState({
          screenWidth: res.screenWidth,
          isIpX: res.model.includes('iPhone X')
        })
        this.setImgHeight()
      }
    })
    
  }

  setImgHeight () {
    Taro
      .getImageInfo({
        src: '../../imgs/graphic.jpeg',
      })
      .then(res => {
        this.setState({
          imgHeight: res.height * this.state.screenWidth / res.width
        })
      })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    this.$scope.getTabBar().setData({
      selected: 1 // 当前页面对应的 index
    })
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index' style={`padding-bottom: ${this.state.isIpX ? 75 : 44}px`}>
        {/* <Image src='http://218.16.125.44/img/20180519/131711963478424405.png'></Image> */}
        <Image src={require('../../imgs/graphic.jpeg')} className='graphic-img' style={`height: ${this.state.imgHeight}px`}></Image>
      </View>
    )
  }
}
