// pages/cart/index.js
//获取用户的收货地址 1.绑定点击事件2调用小程序内置api获取用户收货地址
// 上述操作取消
// 获取用户对小程序所授予获取地址的权限状态 scope
//1.假设用户点击获取收货地址的提示框 确定 scope true
//2.假设取消 scope false 诱导用户自己打开授权设置页面 当用户重新给与 获取收货地址
//3 从没调用过收货地址api scope undefined

// onload onShow 页面加载完毕后 获取本地存储中的地址数据
//把数据设置给data中的一个变量
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx.js";
// import regeneratorRuntime from '../../lib/runtime/runtime';
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
  //点击收货地址
  async handleChooseAddress() {
    try {
      //获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      //判断权限状态
      if (scopeAddress == false) {
        await openSetting();
      }
      //调用收货地址api
      const address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName+ address.detailInfo;
      //存入到缓存中
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error);

    }

  },
  /**
   * 商品选中事件
   * @param {*} e 
   */
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    console.log(goods_id);
    //获取购物车数组
    let {
      cart
    } = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  /**
   * 设置购物车状态重新计算工具栏 全选 总价格 
   * @param {*} cart 
   */
  setCart(cart) {
    let allChecked = true,
      totalPrice = 0,
      totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    // 
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);

  },
  /**
   * 商品全选
   */
  handleItemAllCheck() {
    let {
      cart,
      allChecked
    } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  /**
   * 结算
   */
  async handlePay(){
    const {address,totalNum}=this.data;
    if(!address.userName){
      await showToast({title:'您还没有选择收货地址'});
      return;
    }
    if(totalNum===0){
      await showToast({title:'您还没有选购商品'});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    })

  },
  /**
   * +-商品
   */
  async handleItemNumEdit(e) {
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    // 获取购物车数组
    let {
      cart
    } = this.data;
    // 找到需要修改的商品索引
    const index = cart.findIndex(v => v.goods_id === id);
    //判断是否删除
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({
        content: '您是否要删除?'
      });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      } else if (res.cancel) {
        console.log('cancel');
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取缓存中收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中购物车数据
    const cart = wx.getStorageSync('cart') || [];
    // 空数组调用every 返回值就是true
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    this.setData({
      address
    })
    this.setCart(cart);

  }
})