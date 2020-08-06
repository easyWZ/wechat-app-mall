import {
  request
} from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    adress: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  /**
   * 结算
   * // 哪些人 哪些账号 可以实现微信支付
   * 1.企业账号
   * 2.企业账号的小程序后台 必须给开发者 添加上白名单
   *  一个appid可以同时绑定多个开发者
   *  这些开发者就可以共用
   */


  async handleOrderPay() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return;
    } else {
      // 创建订单
      // 请求头
      const header = {
        Authorization: token
      };
      // 请求体
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const {
        cart
      } = this.data;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = {
        order_price,
        consignee_addr,
        goods
      };
      // 发送请求创建订单
      const res = await request({
        url: "/my/orders/create",
        mdethod: "POST",
        data: orderParams,
        header: header
      })
      // 
      console.log(res);
    

    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取缓存中收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中购物车数据
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.checked);
    let totalPrice = 0,
      totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    })
    // 
    this.setData({
      cart,
      address,
      totalPrice,
      totalNum
    })
  }
})