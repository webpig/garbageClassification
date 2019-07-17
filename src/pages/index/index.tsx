import Taro, { Component, Config } from '@tarojs/taro'
import { View, Icon, Text, Image, Camera, CoverImage, CoverView } from '@tarojs/components'
import './index.styl'
import GarbageTypeItem from '../../components/garbageTypeItem'

const recyclableItem = {
  logo: 'http://ku.90sjimg.com/element_origin_min_pic/17/05/23/f1dd924c97438f48c7f3630a8b4032ab.jpg',
  desc: '可回收垃圾就是可以再生循环的垃圾。本身或材质可再利用的纸类、硬纸板、玻璃、塑料、金属、塑料包装等',
  tip: ['1、可回收物应轻投轻放，清洁干燥、避免污染；', '2、废纸尽量平整；', '3、立体包装物请清空内容物，清洁后压扁投放；', '4、有尖锐边角的，应包裹后投放。'],
  list: ['纸板箱', '报纸', '书本', '快递纸袋', '打印纸', '信封', '广告单', '利乐包', '饮料瓶', '洗发水瓶', '乳液罐', '食用油桶', '塑料碗盆', '塑料盒', '塑料玩具', '塑料衣架', 'PE塑料', 'PVC塑料', '亚克力板', '塑料卡片', 'KT板', '泡沫塑料', '帆布袋', '调料瓶', '酒瓶', '化妆品瓶', '玻璃杯', '窗玻璃', '放大镜', '碎玻璃', '小型木制品', '易拉罐', '食品罐桶', '菜刀', '锅', '刀片', '指甲钳', '螺丝刀', '铁钉', '铁皮', '铅箔', '旧衣服', '床单', '枕头', '棉被', '皮鞋', '毛绒玩具', '棉袄', '包', '皮带', '丝绸制品', '电路板', '充电宝/U盘', '电线', '家电']
}

const harmfulItem = {
  logo: 'http://pic.51yuansu.com/pic3/cover/03/43/86/5b9c86c12b568_610.jpg',
  desc: '有害垃圾指废电池、废灯管、废药品、废油漆及其容器等对人体健康或者自然环境造成直接或者潜在危害的生活废弃物。',
  tip: ['1、分类投放有害垃圾时，应注意轻放。', '2、废灯管等易破损的有害垃圾应连带包装或包裹后投放；', '3、废弃药品宜连带包装一并投放；杀虫剂等压力罐装容器，应排空内容物后投放；', '4、在公共场所产生有害垃圾且未发现对应收集容器时，应携带至有害垃圾投放点妥善投放。'],
  list: ['充电电池', '镉镍电池', '铅酸电池', '蓄电池', '纽扣电池', '荧光灯管', '日光灯管', '卤素灯', '药品', '药品内包装', '油漆桶', '染发剂壳', '指甲油', '洗甲水', '矿物油及包装', '含水银温度计', '含水银血压计', '老鼠药', '杀虫喷雾罐', '消毒剂', 'X光片', '相片底片']
}

const wetItem = {
  logo: 'http://ku.90sjimg.com/element_origin_min_pic/17/12/28/b0b1644acf04eb59eb26c5f7d7d21223.jpg!/fwfh/804x857/quality/90/unsharp/true/compress/true',
  desc: '厨余垃圾是指居民日常生活及食品加工、饮食服务、单位供餐等活动中产生的垃圾，包括丢弃不用的菜叶、剩菜、剩饭、果皮、蛋壳、茶渣、骨头等。',
  tip: ['1、湿垃圾投放需破袋处理。盛放湿垃圾的容器，如塑料袋等，在投放时应予去除。', '2、湿垃圾应从产生时就与其他品种垃圾分开收集，投放前尽量沥干水分。', '3、有包装物的湿垃圾应将包装物去除后分类投放，包装物应投放到对应的可回收物或干垃圾收集容器。'],
  list: ['五谷杂粮', '米面豆制品', '肉', '内脏', '蛋', '蛋壳', '鱼', '鱼骨', '虾', '虾壳', '鱿鱼', '蔬菜', '菌菇', '调料/酱料', '小骨/碎骨', '茶叶渣', '咖啡渣', '糕饼', '糖果', '肉干', '香菇干', '宠物饲料', '果肉', '软果皮', '软果籽', '家养绿植', '中药材', '中药药渣']
}

const dryItem = {
  logo: 'http://gd.news.sina.com.cn/2010/0307/S10148T1267970093634.jpg',
  desc: '其他(干)垃圾包括砖瓦陶瓷、渣土、卫生间废纸、瓷器碎片等难以回收的废弃物。',
  tip: ['1、禁止混投。', '2、干垃圾应投入干垃圾收集容器，并保持周边环境整洁。'],
  list: ['大骨头', '硬贝壳', '椰子壳', '榴莲壳', '核桃壳', '玉米衣', '甘蔗皮', '粽叶', '榴莲核', '菠萝蜜核', '餐巾纸', '卫生间用纸', '一次性纸杯', '一次性餐具', '一次性手套', '零食包装袋', '尿不湿', '湿纸巾', '卫生纸', '面膜', '眼影', '口红', '粉底液', '睫毛膏', '防晒霜', '护肤霜', '卸妆棉', '卸妆油', '棉签', '粉扑', '假睫毛', '隐形眼镜', '污损塑料袋', '毛巾', '丝袜', '内衣', '污损纸张', '玻璃钢', '猫砂', '狗屎垫', '干燥剂', '烟蒂', '编织袋', '尼龙制品', '毛发', '防碎气泡膜', '炉渣', '灰土', '胶带', '橡皮泥', '竹制品', '陶瓷碗盆', '打火机', '镜子', '伞', '笔']
}
const recyclableArr = ['纸板箱', '报纸', '书本', '快递纸袋', '打印纸', '信封', '广告单', '饮料瓶', '洗发水瓶', '乳液罐', '食用油桶', '塑料碗盆', '塑料盒', '塑料玩具', '塑料衣架', 'PE塑料', 'PVC塑料', '亚克力板', '塑料卡片', 'KT板', '泡沫塑料', '帆布袋', '调料瓶', '酒瓶', '化妆品瓶', '玻璃杯', '窗玻璃', '放大镜', '碎玻璃', '小型木制品', '易拉罐', '食品罐桶', '菜刀', '锅', '刀片', '指甲钳', '螺丝刀', '铁钉', '铁皮', '铅箔', '旧衣服', '床单', '枕头', '棉被', '皮鞋', '毛绒玩具', '棉袄', '包', '皮带', '丝绸制品', '电路板', '充电宝/U盘', '电线', '家电']
const harmfulArr = ['充电电池', '镉镍电池', '铅酸电池', '纽扣电池', '荧光灯管', '日光灯管', '卤素灯', '药品', '药品内包装', '油漆桶', '染发剂壳', '指甲油', '洗甲水', '矿物油及包装', '含水银温度计', '含水银血压计', '老鼠药', '杀虫喷雾罐', '消毒剂', 'X光片', '相片底片']
const wetArr = ['五谷杂粮', '米面豆制品', '肉', '内脏', '蛋', '蛋壳', '鱼', '鱼骨', '虾', '虾壳', '鱿鱼', '蔬菜', '菌菇', '调料/酱料', '小骨/碎骨', '茶叶渣', '咖啡渣', '糕饼', '糖果', '肉干', '香菇干', '宠物饲料', '果肉', '软果皮', '软果籽', '家养绿植', '中药材', '中药药渣']
const dryArr = ['大骨头', '硬贝壳', '椰子壳', '榴莲壳', '核桃壳', '玉米衣', '甘蔗皮', '粽叶', '榴莲核', '菠萝蜜核', '餐巾纸', '卫生间用纸', '一次性纸杯', '一次性餐具', '一次性手套', '零食包装袋', '尿不湿', '湿纸巾', '卫生纸', '面膜', '眼影', '口红', '粉底液', '睫毛膏', '防晒霜', '护肤霜', '卸妆棉', '卸妆油', '棉签', '粉扑', '假睫毛', '隐形眼镜', '污损塑料袋', '毛巾', '丝袜', '内衣', '污损纸张', '玻璃钢', '猫砂', '狗屎垫', '干燥剂', '烟蒂', '编织袋', '尼龙制品', '毛发', '防碎气泡膜', '炉渣', '灰土', '胶带', '橡皮泥', '竹制品', '陶瓷碗盆', '打火机', '镜子', '伞', '笔']

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

  componentWillMount () { 
    // Taro.request({
    //   url: 'https://www.toolnb.com/ext/lajifenlei.json',
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   data: {
    //     token: '519a6560c8815be7e839166becc9f687',
    //     body: '牛奶瓶',
    //     type: 'name'
    //   },
    //   success: res => {
    //     console.log(res)
    //   }
    // })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    this.$scope.getTabBar().setData({
      selected: 0 // 当前页面对应的 index
    })
  }

  componentDidHide () { }

  onShareAppMessage () {
    return {}
  }

  render () {
    return (
      <View className='index'>
        <View className='input-box' onClick={this.jumpToSearchPage}>
          <Icon type='search' size='16' className='icon-search'/>
          <Text className='placeholder'>请输入垃圾名称</Text>
        </View>
        <Image src='http://qqpublic.qpic.cn/qq_public/0/0-3201262570-411CEC86E0E84BB440D0DD4FBFFDD6C2/0?fmt=jpg&size=26&h=405&w=900&ppv=1' className='banner' mode='widthFix' />
        <View className='tab-container'>
          <View className={this.state.currTabName === 'recyclable' ? `${'tab-item'} ${'active'}` : 'tab-item'} onClick={() => this.changeTab('recyclable')} hoverClass='hover-bg'>可回收垃圾</View>
          <View className={this.state.currTabName === 'harmful' ? `${'tab-item'} ${'active'}` : 'tab-item'} onClick={() => this.changeTab('harmful')} hoverClass='hover-bg'>有害垃圾</View>
          <View className={this.state.currTabName === 'wet' ? `${'tab-item'} ${'active'}` : 'tab-item'} onClick={() => this.changeTab('wet')} hoverClass='hover-bg'>厨余(湿)垃圾</View>
          <View className={this.state.currTabName === 'dry' ? `${'tab-item'} ${'active'}` : 'tab-item'} onClick={() => this.changeTab('dry')} hoverClass='hover-bg'>其他(干)垃圾</View>
        </View>
        <View className='list'>
          {
            this.state.currTabName === 'recyclable' ?
              <GarbageTypeItem data={recyclableItem}></GarbageTypeItem>
              :
              null
          }
          {
            this.state.currTabName === 'harmful' ?
              <GarbageTypeItem data={harmfulItem}></GarbageTypeItem>
              :
              null
          }
          {
            this.state.currTabName === 'wet' ?
              <GarbageTypeItem data={wetItem}></GarbageTypeItem>
              :
              null
          }
          {
            this.state.currTabName === 'dry' ?
              <GarbageTypeItem data={dryItem}></GarbageTypeItem>
              :
              null
          }
        </View>
        {/* <View className='slogan'>垃圾分类</View>
        <View className='slogan'>从我做起</View> */}
        {/* <View className='next-btn'></View> */}
        {/* <View className='title' onClick={this.jumpToQrCodePage}> */}
          <Image src={require('../../imgs/icon_notice.png')} className='icon-notice' onClick={this.jumpToQrCodePage}></Image>
          {/* <View>征婚启事</View> */}
        {/* </View> */}
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
}
