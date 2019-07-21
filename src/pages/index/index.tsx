import Taro, { Component, Config } from '@tarojs/taro'
import { View, Icon, Text, Image, Button, CoverImage, CoverView } from '@tarojs/components'
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
    navigationBarTitleText: '首页'
  }

  state = {
    currTabName: 'recyclable'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    this.$scope.getTabBar().setData({
      selected: 0 // 当前页面对应的 index
    })
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='header'>
          <View className='input-box' onClick={this.jumpToSearchPage}>
            <Icon type='search' size='16' className='icon-search'/>
            <Text className='placeholder'>请输入垃圾名称</Text>
            <Image src='../../imgs/icon_camera_search.png' className='icon-camera' onClick={this.jumpToCameraPage}></Image>
          </View>
        </View>
        {/* <Image src='https://s2.ax1x.com/2019/07/18/ZXViCV.jpg' className='banner' mode='widthFix' /> */}
        <View className='type-container'>
          <View onClick={this.jumpToClassificationPage.bind(this, 'recyclable')}>
            <Image src='https://s2.ax1x.com/2019/07/18/ZjcNfH.png' className='type-item recyclable'></Image>
          </View>
          <View onClick={this.jumpToClassificationPage.bind(this, 'harmful')}>
            <Image src='https://s2.ax1x.com/2019/07/18/Zjctte.png' className='type-item harmful'></Image>
          </View>
          <View onClick={this.jumpToClassificationPage.bind(this, 'wet')}>
            <Image src='https://s2.ax1x.com/2019/07/18/Zjcapd.png' className='type-item wet'></Image>
          </View>
          <View onClick={this.jumpToClassificationPage.bind(this, 'dry')}>
            <Image src='https://s2.ax1x.com/2019/07/18/Zjcd1A.png' className='type-item dry'></Image>
          </View>
        </View>
        <View className='fixed'>
          <View className='btn-wrap'>
            <Image src={require('../../imgs/icon_share.png')} className='icon-share' />
            <Button openType='share' className='share-btn'></Button>
          </View>
          <Image src={require('../../imgs/icon_notice.png')} className='icon-notice' onClick={this.jumpToQrCodePage}></Image>
        </View>
      </View>
    )
  }

  jumpToSearchPage () {
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }

  changeTab (tabName: string) {
    this.setState({
      currTabName: tabName
    })
  }

  jumpToQrCodePage () {
    Taro.navigateTo({
      url: '/pages/qrCode/index'
    })
  }

  jumpToClassificationPage (classification: string) {
    Taro.navigateTo({
      url: `/pages/classification/index?classification=${classification}`
    })
  }

  jumpToCameraPage (e: any) {
    e.stopPropagation()
    Taro.navigateTo({
      url: '/pages/camera/index'
    })
  }

  onShareAppMessage () {
    return {
      title: '超实用的垃圾分类工具(支持文字搜索、图像识别等功能)',
      path: '/pages/index/index',
      // imageUrl: 'https://s2.ax1x.com/2019/07/18/ZXmsKO.png'
    }
  }
}
