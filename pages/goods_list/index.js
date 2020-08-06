import {
  request
} from "../../request/index.js"
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        title: "综合",
        isActive: true
      },
      {
        id: 1,
        title: "销量",
        isActive: false
      },
      {
        id: 2,
        title: "价格",
        isActive: false
      }
    ],

    goodsList: [],
    totalPageNum: 1
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断有没有下一页
    if (this.QueryParams.pagenum >= this.totalPageNum) {
      wx.showToast({
        title: '没有下一页了',
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  },

  // 获取商品列表
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    });
    // 总条数
    const total = res.total;

    this.totalPageNum = Math.ceil(total / this.QueryParams.pagesize);
    // 拼接数组
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 手动关闭等待效果 （没有调用下拉也可以调用）
    wx - wx.stopPullDownRefresh();
  },

  handleTabsItemChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },



})