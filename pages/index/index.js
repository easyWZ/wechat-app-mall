import {
  request
} from "../../request/index.js"
wx - Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    cateList:[],
    // 楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.getSwiperList();
    _this.getCateList();
    _this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList() {
    let _this = this;
    request({
        url: "/home/swiperdata"
      })
      .then(res => {
        _this.setData({
          swiperList: res
        })
      })
  },
  // 分类导航
  getCateList(){
    let _this = this;
    request({
        url: "/home/catitems"
      })
      .then(res => {
        _this.setData({
          cateList: res
        })
      })
  },
  // 楼层数据
  getFloorList(){
    let _this = this;
    request({
        url: "/home/floordata"
      })
      .then(res => {
        _this.setData({
          floorList: res
        })
      })
  },

})