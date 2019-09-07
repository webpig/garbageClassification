import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './app.styl'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/start/index',
      'pages/search/index',
      'pages/detail/index',
      'pages/camera/index',
      'pages/graphic/index',
      'pages/classification/index',
      'pages/qrCode/index',
      'pages/test/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      // custom: true,
      // borderStyle: 'white',
      // backgroundColor: '#f8f8f8',
      color: '#000',
      selectedColor: '#1789E5',
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './imgs/icon_home.png',
        selectedIconPath: './imgs/icon_home_HL.png',
      }, {
        pagePath: 'pages/classification/index',
        text: '分类',
        iconPath: './imgs/icon_classification.png',
        selectedIconPath: './imgs/icon_classification_HL.png',
      },  {
        pagePath: 'pages/test/index',
        text: '测试',
        iconPath: './imgs/icon_test.png',
        selectedIconPath: './imgs/icon_test_HL.png',
      }, {
        pagePath: 'pages/graphic/index',
        text: '图文',
        iconPath: './imgs/icon_graphic.png',
        selectedIconPath: './imgs/icon_graphic_HL.png',
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
