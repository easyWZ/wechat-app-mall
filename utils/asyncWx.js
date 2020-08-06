/**
 * promise getSetting
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
/**
 * promise chooseAddress
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
/**
 * promise openSetting
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
/**
 * promise showModal
 */
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
/**
 * promise showToast
 */
export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon:'none',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}
/**
 * promise login
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}