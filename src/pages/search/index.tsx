import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Input, Icon, Text } from '@tarojs/components'
import './index.styl'
import util from '../../utils/util'

const TYPE = ['可回收垃圾', '有害垃圾', '厨余(湿)垃圾', '其他(干)垃圾']
const SPECIAL_PERSON = {
  '郑鑫': '☺️小仙女',
  '朱宝华': '😄大帅比',
  '尹垆华': '你是个大帅比哦'
}

interface garbageInfo {
  name: string
  type: number
  explain: string
  contain: string
  tip: string
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
    navigationBarTitleText: '搜索'
  }

  state = {
    garbageName: '',
    isLoading: false,
    list: [] as garbageInfo[],
    historyRecord: [] as string[],
    hotRecord: ['小龙虾', '西瓜皮', '啤酒瓶', '塑料袋', '卫生纸', '避孕套', '烂水果', '大闸蟹', '眼镜', '鱼', '鼠标垫', '剩饭', '头发']
  }

  componentWillMount () {
    this.getHistoryRecord()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='search'>
        <View className='header'>
          <View className='input-wrap'>
            <Icon type='search' size='16' className='icon-search'/>
            <Input
              placeholder='请输入垃圾名称'
              className='input'
              focus={true}
              value={this.state.garbageName}
              onInput={util.debounce((e: any) => this.search(e), 300)}
              confirm-type='search'
              onConfirm={this.search}
            />
            {
              this.state.garbageName ? 
                <Icon
                  type='clear'
                  size='18'
                  className='icon-clear'
                  onClick={this.clearGarbageName}
                />
                :
                null
            }
            { 
              !this.state.garbageName ?
                <Image src='../../imgs/icon_camera_search.png' className='icon-camera' onClick={this.jumpToCameraPage}></Image>
                :
                null
            }
          </View>
          {/* {
            <View className='cancel-btn'>取消</View>
          } */}
        </View>
        {
          !this.state.garbageName && this.state.hotRecord.length > 0 ? 
            <View className='history-header'>
              <Text>热门搜索</Text>
              {/* <Image src={require('../../imgs/icon_clear_history.png')} className='icon-clear-history' onClick={this.clearHistoryRecord} /> */}
            </View>
            :
            null
        }
        <View className='history-list'>
          {
            !this.state.garbageName ?
              this.state.hotRecord.map((item) => <View className='history-item' key={item} onClick={this.clickHistoryItem.bind(this, item)}>{item}</View>)
              :
              null
          }
        </View>
        {
          !this.state.garbageName && this.state.historyRecord.length > 0 ? 
            <View className='history-header'>
              <Text>历史搜索</Text>
              <Image src={require('../../imgs/icon_clear_history.png')} className='icon-clear-history' onClick={this.clearHistoryRecord} />
            </View>
            :
            null
        }
        <View className='history-list'>
          {
            !this.state.garbageName ?
              this.state.historyRecord.map((item) => <View className='history-item' key={item} onClick={this.clickHistoryItem.bind(this, item)}>{item}</View>)
              :
              null
          }
        </View>
        <View className='list'>
          {
            this.state.list.map((item, index) => 
              <View className='item' key={index} onClick={this.jumpToDetail.bind(this, item)}>
                <View className='name'>{item.name}</View>
                <View className='type'>{TYPE[item.type]}</View>
                {/* { item.type === 2 ? <View className='type'>湿垃圾</View> : null } */}
                {/* { item.type === 3 ? <View className='type'>干垃圾</View> : null } */}
              </View>
            )
          }
        </View>
        {Object.keys(SPECIAL_PERSON).includes(this.state.garbageName) ? <View className="empty">{SPECIAL_PERSON[this.state.garbageName]}</View> : null}
        {!this.state.isLoading && this.state.list.length === 0 && this.state.garbageName && !Object.keys(SPECIAL_PERSON).includes(this.state.garbageName)? <View className='empty'>（︶︿︶）未匹配到相应信息</View> : null}
        {/* {!this.state.garbageName ? <Image src='https://cdn.pixabay.com/photo/2016/04/20/15/36/recycling-1341372_1280.png' className='recycle' /> : null} */}
      </View>
    )
  }

  jumpToCameraPage () {
    Taro.navigateTo({
      url: '/pages/camera/index'
    })
  }

  inputGarbageName (e: any) {
    this.setState({
      garbageName: e.detail.value
    })

    // this.state.garbageName && this.search()
  }

  clearGarbageName () {
    this.setState({
      garbageName: '',
      list: []
    })
  }

  search (e?: any) {
    const value = e && e.detail.value || ''

    this.setState({
      garbageName: value
    }, () => {
      if (!this.state.garbageName) {
        this.setState({
          list: [],
        })
      }

      if (this.state.garbageName && e.type === 'confirm') {
        this.saveHistoryRecord()
      }
    })

    if (value) {
      this.setState({
        isLoading: true
      });

      Taro
        .request({
          // url: `https://api.tianapi.com/txapi/lajifenlei/?key=633cadcfeccda00555fdc80463b609ca&word=${this.state.garbageName}`,
          url: 'https://api.tianapi.com/txapi/lajifenlei/',
          data: {
            key: '633cadcfeccda00555fdc80463b609ca',
            word: value || this.state.garbageName
          },
          success: res => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.setState({
                list: res.data.newslist,
                isLoading: false
              });
            } else {
              this.setState({
                isLoading: false
              });
            }
          }
        })
    }
  }

  saveHistoryRecord (item?: string) {
    let arr = this.state.historyRecord.slice(0)
    arr.unshift(item || this.state.garbageName)

    Taro
      .setStorage({
        key: 'search_history',
        data: [...new Set(arr)]
      })
      .then(() => this.getHistoryRecord())
  }

  getHistoryRecord () {
    Taro
      .getStorage({
        key: 'search_history',
      })
      .then(res => {
        console.log(res.data)
        res.data && this.setState({
          historyRecord: res.data
        })
      })
  }

  clearHistoryRecord () {
    Taro.showModal({
      title: '提示',
      content: '是否确认删除历史记录',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          Taro
            .setStorage({ 
              key: 'search_history',
              data: []
            })
            .then(() => this.getHistoryRecord())
        }
      }
    })
  }

  clickHistoryItem (item: any) {
    this.setState({
      garbageName: item
    })
    this.search({
      detail: {
        value: item
      }
    })
  }

  jumpToDetail (item: garbageInfo) {
    Taro.navigateTo({
      url: `/pages/detail/index?garbageInfo=${JSON.stringify(item)}`
    })
    this.saveHistoryRecord(item.name)
  }

  onShareAppMessage () {
    return {}
  }


}
