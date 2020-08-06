import {
  request
} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品分类
    Cates: [],
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 缓存
    const cates = wx.getStorageSync("cates");
    if (!cates) {
      _this.getGoodsCateList();
    } else {
      if (Date.now() - cates.time > 1000 * 60 * 5) {
        _this.getGoodsCateList();
      } else {
        _this.Cates = cates.data;
        let leftMenuList = _this.Cates.map(function (v) {
          return v.cat_name;
        })
        let rightContent = _this.Cates[0].children;
        _this.setData({
          leftMenuList,
          rightContent
        })

      }
    }

  },

  // 商品分类
  async getGoodsCateList() {
    let _this = this;
    const res = await request({
      url: "/categories"
    });
    _this.Cates = res;
    // 把接口数据存储到本地存储
    wx - wx.setStorageSync("cates", {
      time: Date.now(),
      data: _this.Cates
    })
    let leftMenuList = _this.Cates.map(function (v) {
      return v.cat_name;
    })
    let rightContent = _this.Cates[0].children;
    _this.setData({
      leftMenuList,
      rightContent
    })
    // request({
    //     url: "/categories"
    //   })
    //   .then(res => {
    //     _this.Cates = res;
    //     // 把接口数据存储到本地存储
    //     wx - wx.setStorageSync("cates", {
    //       time: Date.now(),
    //       data: _this.Cates
    //     })
    //     let leftMenuList = _this.Cates.map(function (v) {
    //       return v.cat_name;
    //     })
    //     let rightContent = _this.Cates[0].children;
    //     _this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
  },
  // 左侧菜单点击事件
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置右侧内容的滚动条
      scrollTop: 0
    })

  },
})