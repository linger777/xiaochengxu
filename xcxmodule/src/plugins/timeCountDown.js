export default class TimeCD {
  constructor (conf) {
    let self = this
    // 默认配置
    self.conf = Object.assign({
      lastTime: 0, //剩余时间戳（s）
      format(val){
        return val < 10 ? '0'+val : val
      },    // 对 this.days,...,this.seconds 的值格式化
      onDayChange(){},    // 天数变化时回调
      onHourChange(){},   // 小时变化时回调
      onMinuteChange(){}, // 分钟变化时回调
      onSecondChange(){}, // 秒数变化时回调
      onFinish(){},       // 倒计时结束回调
    }, conf)
    self.lastTime = conf.lastTime
    self.ticks = 0
    self.countDown()
  }
  countDown () {
    let self = this,
      {conf} = self
    let s = self.lastTime % 60,
        m = Math.floor(self.lastTime % 3600 / 60),
        h = Math.floor(self.lastTime / 3600),
        d = Math.floor(h/24) % 365
    let cbs = []   // 回调队列
    if(self.ticks++){
      self.s !== s && cbs.push(conf.onSecondChange)
      self.m !== m && cbs.push(conf.onMinuteChange)
      self.h !== h && cbs.push(conf.onHourChange)
      self.d !== d && cbs.push(conf.onDayChange)
    }
    if(self.lastTime <= 0){
      cbs.push(conf.onFinish)
    }else{
      setTimeout(()=>{self.countDown()}, 1000)
    }
    if(self.lastTime >= 1){
      self.lastTime -= 1;
    }else{
      self.lastTime = 0;
    }
    Object.assign(self, {
      // private
      s, m, h, d,
      // public
      seconds: conf.format(s),
      minutes: conf.format(m),
      hours: conf.format(h),
      days: conf.format(d),
    })
    cbs.forEach(cb => cb.call(self))
  }
}