import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Text, Button } from '@tarojs/components'
import './index.styl'

const TYPE = ['可回收垃圾', '有害垃圾', '厨余(湿)垃圾', '其他(干)垃圾']
const options = [{
  logo: 'https://s2.ax1x.com/2019/07/18/ZjcNfH.png',
  type: 0,
  typeName: TYPE[0]
}, {
  logo: 'https://s2.ax1x.com/2019/07/18/Zjctte.png',
  type: 1,
  typeName: TYPE[1]
}, {
  logo: 'https://s2.ax1x.com/2019/07/18/Zjcapd.png',
  type: 2,
  typeName: TYPE[2]
}, { 
  logo: 'https://s2.ax1x.com/2019/07/18/Zjcd1A.png',
  type: 3,
  typeName: TYPE[3]
}]

interface hotRecordItem {
  name: string,
  type: number,
  index: number
}

interface testResultItem {
  name: string,
  checkedType: number,
  correctType: number
}

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '测试'
  }

  state = {
    hotRecord: [],
    topics: [] as hotRecordItem[],
    checkedType: null as null | number,
    current: 0,
    testResult: [] as testResultItem[],
    score: 0
  }

  componentWillMount () { 
    this.getHotSearch()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Swiper className='swiper' current={this.state.current}>
        {
          this.state.topics.map((topic: hotRecordItem, index) =>
            <SwiperItem className="test-item" key={topic.name} onTouchMove={this.handleTouchMove}> 
              <View className='test-wrap'>
                <View className='topic'>{index + 1}、{topic.name}属于什么垃圾？</View>
                <View className='options'>
                {
                  options.map(option => 
                    <View
                      className={
                        this.state.checkedType === topic.type && this.state.checkedType === option.type 
                          ? 'option checked'
                          : this.state.checkedType === option.type && this.state.checkedType !== topic.type
                          ? 'option wrong'
                          : 'option'
                      } 
                      key={option.type} onClick={this.chooseAnAnswer.bind(this, option.type, topic)}>
                      <Image src={option.logo} className='logo'></Image>
                      {option.typeName}
                    </View> 
                  )
                }
                </View>
                <View className="count">{this.state.current + 1} / 10</View>
              </View>
            </SwiperItem>
          )
        }
        {
          this.state.topics.length > 0 ?
            <SwiperItem onTouchMove={this.handleTouchMove} className='complete-page'>
              <View className='title'>本次得分<Text className='score'>{this.state.score}</Text></View>
              <View className='table'>
                <View className='table-item'>
                  <View className='table-title'>垃圾名称</View>
                  <View className='table-title'>你的答案</View>
                  <View className='table-title'>正确答案</View>
                </View>
                {
                  this.state.testResult.map(item => 
                    <View className='table-item' key={item.name}>
                      <View className='table-content'>{item.name}</View>
                      <View className={item.checkedType === item.correctType ? 'table-content correct' : 'table-content error'}>{TYPE[item.checkedType]}</View>
                      <View className='table-content correct'>{TYPE[item.correctType]}</View>
                    </View>
                  )
                }
              </View>
              <View className="btn-row">
                <Button type='primary' openType='share'>分享给好友</Button>
                <Button type='default' onClick={this.retest}>再测一次</Button>
              </View>
            </SwiperItem>
            :
            null
        }
        </Swiper>
      </View> 
    )
  }

  getHotSearch () {
    Taro.showLoading({
      title: '正在获取题库'
    })
    Promise.all([
      this.requestHotSearch(0),
      this.requestHotSearch(1),
      this.requestHotSearch(2),
      this.requestHotSearch(3)
    ])
    .then((res: any) => {
      Taro.hideLoading()
      this.setState({
        hotRecord: res[0].concat(res[1], res[2], res[3])
      }, () => this.setTopics())
    })
  }

  setTopics () {
    let count = 0, arr = [], hotRecord = this.state.hotRecord

    while (count < 10) {
      count++
      arr.push(hotRecord[Math.floor(Math.random() * hotRecord.length)])
    }

    this.setState({
      topics: arr
    })
  }

  requestHotSearch (type: number) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: 'https://api.tianapi.com/txapi/hotlajifenlei/',
          data: {
            key: '633cadcfeccda00555fdc80463b609ca',
            type: type
          },
          success: res => resolve(res.data.newslist),
          fail: res => reject(res)
        })
    })
  }

  chooseAnAnswer (checkedType: number, topic: hotRecordItem) {
    this.setState({
      checkedType
    }, () => {
      if (checkedType !== topic.type) {
        Taro.showModal({
          title: '提示',
          content: `${topic.name}属于${TYPE[topic.type]}`,
          showCancel: false,
          confirmColor: '#409eff',
          confirmText: '我知道了',
          success: res => {
            if (res.confirm) {
              setTimeout(() => {
                this.resetCheckedTypeAndGoNext()
              }, 300)
            }
          }
        })
      } else {
        this.setState({
          score: this.state.score + 10
        })
        setTimeout(() => {
          this.resetCheckedTypeAndGoNext()
        }, 400)
      }
    })

    this.setState({
      testResult: this.state.testResult.concat([{
        name: topic.name,
        checkedType,
        correctType: topic.type
      }])
    })
  }

  resetCheckedTypeAndGoNext () {
    this.setState({
      checkedType: null
    }, () => {
      this.setState({
        current: this.state.current + 1,
      })
    })
  }

  handleTouchMove (e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

  retest () {
    // Taro.reLaunch({
    //   url: '/pages/test/index'
    // })
    this.setState({
      hotRecord: [],
      topics: [],
      checkedType: null,
      current: 0,
      testResult: [],
      score: 0
    })
    this.getHotSearch()
  }

  onShareAppMessage () {
    return {
      title: '垃圾分类知识问答，等你来挑战！',
      path: '/pages/test/index',
    //   imageUrl: 'https://dataset.flyai.com/Garbage_flyai.png'
      imageUrl: 'http://tva1.sinaimg.cn/large/007X8olVly1g6rh20qsqcj31370u07wh.jpg'
    }
  }
}
