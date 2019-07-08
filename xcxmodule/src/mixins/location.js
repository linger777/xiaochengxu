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
    let that = this
    return new Promise((resolve, reject) => {
      // 只有第一次打开或才从后台切到前台时才定位
      if (wx.getStorageSync('isRefresh')) {
        wx.setStorageSync('isRefresh', false)
        wx.getLocation({
          type: 'wgs84',
          success : (res) => {
            let lat = res.latitude
            let lng = res.longitude
            if (!(lat && lng && lat != '0' && lng != '0') {
              return 
            }
            let old_lng = wepy.getStorageSync('lng');
            let old_lat = wepy.getStorageSync('lat');
            if (old_lng == lng && old_lat == lat) {
              resolve({
                id: wepy.getStorageSync('cityId'),
                choose_name: wepy.getStorageSync('cityName'),
                lbs_name: wepy.getStorageSync('cityName'),
                isFresh: false
              })
              // common.senduserPosition()
            } else {
              wx.setStorageSync('lat', lat)
              wx.setStorageSync('lng', lng)
              that.getTXLbs({lat: lat, lng: lng})
            }
          },
          fail : (res) => {
            wx.setStorageSync("cityId", 0)
            wx.setStorageSync("cityName", '全部城市')
            resolve({
              id: 0,
              choose_name: '全部城市',
              lbs_name: '全部城市',
              isFresh: true
            })
            wepy.showModal({
              title: '授权提示',
              content: '小程序需要您的授权才能正常使用',
              success: res => {
                if (res.confirm) {
                  wepy.openSetting({
                    success: function(data) {
                      if (data.authSetting["scope.userLocation"] == true) {
                        wepy.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 3000
                        })
                      } else {
                        wepy.showToast({
                          title: '授权失败',
                          icon: 'success',
                          duration: 3000
                        })
                      }
                    }
                  })
                } else if (res.cancel) {}
              }
            })
          }
        })

        let res = {
          lbs : this.lbs,
          isFresh : true
        }
        resolve(res);
      } else {
        // let res = {
        //   id: wepy.getStorageSync('cityId'),
        //   choose_name: wepy.getStorageSync('cityName'),
        //   lbs_name: wepy.getStorageSync('cityName'),
        //   isFresh: false
        // };

        wx.setStorageSync('lbs', this.lbs)
        let res = {
          lbs : this.lbs,
          isFresh : false
        }
        resolve(res);
      }
    })
  }
  getTXLbs (lbs) { //根据经纬度 获取当前城市
    var QQMapWX = require('../libs/qqmap-wx-jssdk.min.js')
    var qqmapsdk = new QQMapWX({
      key: 'NPVBZ-CLYW6-ZZTSC-MTNQ3-Q4UZ2-NLBRB' // 必填
    }); 
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lbs.lat,
        longitude: lbs.lng
      },
      success: function(res){
        console.log(res);
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  }
}
export default new Location()