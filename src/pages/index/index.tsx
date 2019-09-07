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
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }

  state = {
    currTabName: 'recyclable',
    statusBarHeight: 0,
    navBarHeight: 0,
    screenWidth: 0,
    menuButtonInfo: {} as {
      height: number,
      width: number,
      top: number,
      left: number,
      right: number,
      bottom: number
    }
  }

  componentWillMount () {
    process.env.TARO_ENV === 'weapp' && this.getScreenWidthAndMenuButtonInfo()
    // this.setState({
    //   menuButtonInfo
    // })
    // Taro.getSystemInfo({
    //   success: ({statusBarHeight, system}) => {
    //     this.setState({
    //       statusBarHeight,
    //       navBarHeight: system.indexOf('iOS') > -1 ? 44 : 48,
    //       menuButtonInfo
    //     })
    //   }
    // })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    // this.$scope.getTabBar().setData({
    //   selected: 0 // 当前页面对应的 index
    // })
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='header'>
          <Image src='http://tva1.sinaimg.cn/large/0060lm7Tly1g5c92rzcluj30u00u00x9.jpg' className='type-item recyclable'></Image>
          <View className='input-box' onClick={this.jumpToSearchPage}>
            <Icon type='search' size='16' color='#999' className='icon-search'/>
            <Text className='placeholder'>请输入垃圾名称</Text>
            <Image src='../../imgs/icon_camera_search.png' className='icon-camera' onClick={this.clickCameraIcon}></Image>
          </View>
        </View>
        {/* <Image src='https://s2.ax1x.com/2019/07/18/ZXViCV.jpg' className='banner' mode='widthFix' /> */}
        {/* <View className='type-container'>
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
        </View> */}
        {
          process.env.TARO_ENV === 'weapp' &&
            <View className='nav-bar' style={`top:${this.state.menuButtonInfo.top}px;left:${this.state.screenWidth - this.state.menuButtonInfo.right}px`}>
              <View className='btn-wrap' style={`height:${this.state.menuButtonInfo.height}px;width:${this.state.menuButtonInfo.width}px`}>
                <View className='Image-wrap'>
                  {/* <Image src={require('../../imgs/icon_money.png')} className='icon-share' onClick={this.previewAppreciateCode} /> */}
                  <Image src={require('../../imgs/icon_share.png')} className='icon-share' />
                  <Button openType='share' className='share-btn'></Button>
                </View>
                <View className='Image-wrap'>
                  <Image src={require('../../imgs/icon_money.png')} className='icon-share' onClick={this.previewAppreciateCode} />
                  {/* <Image src={require('../../imgs/icon_notice.png')} className='icon-notice' onClick={this.jumpToQrCodePage}></Image> */}
                </View>
              </View>
            </View>
        }
        <View className='bottom'>
          <Image src={require('../../imgs/icon_contact_gray.png')} className='icon-contact' onClick={this.jumpToQrCodePage}></Image>
          有问题？<Text className='feed-back'>点我反馈</Text>
          <Button openType='contact'></Button>
        </View>
      </View>
    )
  }

  getScreenWidthAndMenuButtonInfo () {
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()

    Taro.getSystemInfo({
      success: ({screenWidth}) => {
        this.setState({
          screenWidth,
          menuButtonInfo
        })
      }
    })
  }

  jumpToSearchPage () {
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }

  jumpToQrCodePage () {
    Taro.navigateTo({
      url: '/pages/qrCode/index'
    })
  }

  previewAppreciateCode () {
    Taro.previewImage({
      urls: ['http://tva1.sinaimg.cn/large/0060lm7Tly1g57jkjiuy5j30u00u0t9l.jpg'],
      current: 'http://tva1.sinaimg.cn/large/0060lm7Tly1g57jkjiuy5j30u00u0t9l.jpg'
    })
  }

  jumpToClassificationPage (classification: string) {
    Taro.navigateTo({
      url: `/pages/classification/index?classification=${classification}`
    })
  }

  clickCameraIcon (e: any) {
    e.stopPropagation()
    process.env.TARO_ENV === 'weapp' && this.jumpToCameraPage()
    // process.env.TARO_ENV === 'alipay' && this.chooseImage()
  }

  jumpToCameraPage () {
    Taro.navigateTo({
      url: '/pages/camera/index'
    })
  }

  chooseImage () {
    Taro.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: res => {
        console.log(res)
      }
    })
  }

  onShareAppMessage () {
    return {
      title: '超实用的垃圾分类工具(支持文字搜索、图像识别等功能)',
      path: '/pages/index/index',
      // imageUrl: 'https://s2.ax1x.com/2019/07/18/ZXmsKO.png'
      imageUrl: 'http://tva1.sinaimg.cn/large/007X8olVly1g6re2i1ss8j30dw0dw74k.jpg'
    }
  }
}
