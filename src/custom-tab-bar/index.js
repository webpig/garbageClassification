Component({
    data: {
        selected: 0,
        color: "#000",
        selectedColor: "#1afa29",
        list: [{
          pagePath: "/pages/index/index",
          iconPath: "../imgs/icon_home.png",
          selectedIconPath: "../imgs/icon_home_HL.png",
          text: "首页"
        }, {
          pagePath: "/pages/graphic/index",
          iconPath: "../imgs/icon_graphic.png",
          selectedIconPath: "../imgs/icon_graphic_HL.png",
          text: "图文"
        }]
    },
    attached() {
    },
    methods: {
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      },
      jumpToCameraPage () {
        wx.navigateTo({
          url: '/pages/camera/index'
        })
      }
    }
  })