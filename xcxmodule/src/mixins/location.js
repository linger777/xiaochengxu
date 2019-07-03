import wepy from 'wepy'
class Location extends wepy.mixin {
  constructor () {
    super()
    this.lbs = {
      lbs_location : '北京',
      lbs_city_id : '1'
    }
  }
  getLocation () {
    // return this.lbs
    return new Promise((resolve, reject) => {
      // 只有第一次打开或才从后台切到前台时才定位
      if (wx.getStorageSync('isRefresh')) {
        wx.setStorageSync('isRefresh', false)
        let res = {
          lbs : this.lbs,
          isFresh : true
        }
        
      } else {
        wx.setStorageSync('lbs', this.lbs)
        let res = {
          lbs : this.lbs,
          isFresh : false
        }
        resolve(res);
      }
    })
  }
}
export default new Location()