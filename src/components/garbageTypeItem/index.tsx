import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.styl'

interface GarbageTypeItemInfo {
    logo: string,
    classification: string,
    desc: string,
    tip: string[],
    list: string[]
}

type Props = {
  data: GarbageTypeItemInfo,
  id: string
}

const TYPES = ['recyclable', 'harmful', 'wet', 'dry']

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

  state = {
    isShowTip: true,
    isShowIntroduction: true,
    isShowGarbageList: true,
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {
      logo,
      desc,
      classification,
      tip,
      list
    } = this.props.data || {
      logo: '',
      desc: '',
      classification: '',
      tip: '',
      list: ''
    }

    return (
      <View className='item' id={this.props.id}>
        {/* <View className={`${this.state.isShowIntroduction ? 'active title' : 'title'}`} onClick={this.showIntroduction}>类型简介</View>  */}
        {
          this.state.isShowIntroduction ?
            <View className='item-header'>
              <View className='recyclable-img'>
                <Image src={logo} className='recyclable-img' />
              </View>
              <View className={`desc ${classification}`}>{desc}</View>
            </View>
            :
            null
        }
        <View className={`tip-header ${classification}`}>投放要求</View>
        {/* <View className={`${this.state.isShowTip ? 'active title': 'title'}`} onClick={this.showTip}>投放要求</View> */}
        {
          this.state.isShowTip ?
            <View className=''>
            {
              tip.map((item) => <View className={`tip-item ${classification}`} key={item}>{item}</View>)
            }
            </View>
            :
            null
        }
        {/* <View className={`${this.state.isShowGarbageList ? 'active title': 'title'}`} onClick={this.showGarbageList}>生活常见</View> */}
        {
          this.state.isShowGarbageList ?
            <View className='garbage-list'>
            {
              list.map((item, index) => {
                return (
                  <View key={item} className={`${index <= 2 ? 'border-top garbage-item': 'garbage-item'}`}>{item}</View>
                )
              })
            }
            </View>
            :
            null
        }
      </View>
    )
  }

  jumpToSearchPage () {
    Taro.navigateTo({
      url: '/pages/search/index'
    })
  }

  showTip () {
    this.setState({
      isShowTip: !this.state.isShowTip
    })
  }

  showIntroduction () {
    this.setState({
      isShowIntroduction: !this.state.isShowIntroduction
    })
  }

  showGarbageList () {
    this.setState({
      isShowGarbageList: !this.state.isShowGarbageList
    })
  }
}
