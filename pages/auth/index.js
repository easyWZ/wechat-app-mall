// pages/auth/index.js
import {
  login
} from "../../utils/asyncWx.js";
import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handleGetUserInfo(e) {
    try {
      const {
        encryptedData,
        rawData,
        iv,
        signature
      } = e.detail;
      const {
        code
      } = await login();
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
      //发送请求 获取用户的token
      const res = await request({
        url: '/users/wxlogin,data:loginParams',
        method: "post"
      })
      //必须有企业账号
      console.log(res);
      wx.setStorageSync('token', "tokenasdfgbvcxzqwertyuu");
      wx.navigateBack({
        delta: 1
      })
    } catch (error) {
      console.log(error);

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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