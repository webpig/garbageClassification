import Taro, { Component, Config } from '@tarojs/taro'
import { View, CoverView, Text, Image, Camera, Button } from '@tarojs/components'
import './index.styl'

interface garbageInfo {
  title: string,
  type: string,
  desc: string,
  type_name: string
}

const TYPE = ['可回收垃圾', '有害垃圾', '厨余(湿)垃圾', '其他(干)垃圾']

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '拍照识别'
  }

  state = {
    src: '',
    isCompletedQuery: false,
    imgHeight: 0,
    imgWidth: 0,
    list: [] as garbageInfo[]
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        {
          !this.state.isCompletedQuery ? 
            <Camera devicePosition='back' flash='off' className='camera' onError={this.checkIfAuthorizeCamera}>
              <CoverView onClick={this.takePhoto} className='btn' />
            </Camera>
            :
            null
        }
        {
          this.state.isCompletedQuery && this.state.list.length > 0 ?
            <View className='mask'>
              <View className='modal'>
                <View className='modal-title'>识别结果</View>
                <View className='modal-content'>
                  {
                    this.state.src ? 
                      <Image
                        src={this.state.src}
                        className='img'
                        // style={`height: ${this.state.imgHeight}px; width: ${this.state.imgWidth}px`}
                      />
                      :
                      null
                  }
                  <View>
                    <View className='title'>图中包含的垃圾有：</View>
                      {
                        this.state.list.map((item) => {
                          return (
                            <View className='item' key={item.title}>
                              <View>{item.title.split('-')[0]}</View>
                              <View className='type'>{TYPE[parseInt(item.type) - 1]}</View>
                            </View>
                          )
                        })
                      }
                  </View>
                </View>   
                <View className='btn-row'>
                  <View className='btn-item exit' onClick={this.exit}>退出</View>
                  <View className='btn-item continue' onClick={this.continue}>继续</View>
                </View>
              </View>
            </View>
            :
            null
        }
        {/* <Image mode="widthFix" src={this.state.src}></Image> */}
      </View>
    )
  }

  takePhoto () {
    const ctx = Taro.createCameraContext()

    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        Taro.showLoading({
          title: '正在识别中...',
          mask: true
        })

        this.setState({
          src: res.tempImagePath
        })
        
        // this.setImgSize(res.tempImagePath)
        res.tempImagePath && this.filePathToBase64(res.tempImagePath)
      }
    })
  }

  filePathToBase64 (tempImagePath: string) {
    wx
      .getFileSystemManager()
      .readFile({
        filePath: tempImagePath, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: (res: any) => { //成功的回调
          this.requestAPI(res.data)
        }
      });
  }

  requestAPI (base64: string) {
    Taro.request({
      url: 'https://www.toolnb.com/ext/lajifenlei.json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        token: '519a6560c8815be7e839166becc9f687',
        body: base64,
        suffix: 'jpg',
        type: 'file'
      },
      success: res => {
        Taro.hideLoading()
        let arr = ['1', '2', '3', '4']
        this.setState({
          list: res.data.data.filter((item: any) => arr.includes(item.type)),
          isCompletedQuery: true
        }, () => {
          this.promptNoResults()
        })
      }
    })
  }

  promptNoResults () {
    if (this.state.list.length === 0) {
      Taro.showModal({
        title: '提示',
        content: '未识别到相应结果，请选择重新拍照或者去手动搜索',
        confirmText: '重新拍照',
        cancelText: '去搜索',
        success: res => {
          if (res.cancel) {
            Taro.navigateTo({
              url: '/pages/search/index'
            })
          }

          this.setState({
            isCompletedQuery: false
          })
        }
      })
    }
  }

  setImgSize (src: string) {
    Taro
      .getImageInfo({
        src,
      })
      .then(res => {
        console.log(res)
        this.setState({
          imgHeight: res.height,
          imgWidth: res.width
        })
      })
  }

  exit () {
    Taro.navigateBack()
  }

  continue () {
    this.setState({
      isCompletedQuery: false
    })
  }

  checkIfAuthorizeCamera () {
    Taro.getSetting({
      success: (res: any) => {
        if (!res.authSetting['scope.camera']) {
          this.setState({
            isCompletedQuery: true
          })
          Taro.showModal({
            title: '提示',
            content: '您未授权使用摄像头，请授权后再使用',
            confirmText: '去授权',
            cancelText: '不使用',
            success: res => {
              if (res.confirm) {
                Taro.openSetting({
                  complete: () => {
                    this.checkIfAuthorizeCamera()
                    this.setState({
                      isCompletedQuery: false
                    })
                  }
                })
              } else if (res.cancel) {
                Taro.navigateBack()
              }
            }
          })
        }
      }
    })
  }

  onShareAppMessage () {
    return {}
  }
}
