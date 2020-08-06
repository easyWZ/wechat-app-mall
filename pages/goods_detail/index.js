import {
  request
} from "../../request/index.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    this.getGoodsDetail(goods_id);
    // console.log('%c'+goods_id, 'color: yellow;font-size: 24px;font-weight: bold;text-decoration: underline;');
    var res = wx.getSystemInfoSync()
    console.log(res.system)
  },

  // 获取商品详情
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    });
    this.goodsInfo = goodsObj;
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机 不识别webp图片格式
        goods_introduce: goodsObj.goods_introduce.replace(/.webp/g, '.jpg'),
        // goods_introduce: goodsObj.goods_introduce,
        pics: goodsObj.pics
      }
    })
  },
  // 点击轮播图放大预览
  handlePrevewImage(e) {
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击加入购物车
  handleCartAdd(){
    // <!-- 点击加入购物车
    // 1.绑定点击事件
    // 2.获取缓存中的购物车数据 数组格式
    // 3.判断当前商品是否存在于购物车 已存在则++
    // 4.弹出提示
    //  -->
    let cart = wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index===-1){
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon:'success',
      // true 防止用户手抖 疯狂点击按钮 1.5s后才能点击
      mask:true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})