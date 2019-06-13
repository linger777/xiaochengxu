export default class TimeCD {
  constructor (conf) {
    let self = this
    // 默认配置
    self.conf = Object.assign({
      lastTime: 0, //剩余时间戳（s）
      startTime: 0, // 开始时间戳
      endTime: 0, // 结束时间戳
      format(val){
        return val < 10 ? '0'+val : val
      },    // 对 this.days,...,this.seconds 的值格式化
      onYearChange(){},   // 年数变化时回调
      onDayChange(){},    // 天数变化时回调
      onHourChange(){},   // 小时变化时回调
      onMinuteChange(){}, // 分钟变化时回调
      onSecondChange(){}, // 秒数变化时回调
      onFinish(){},       // 倒计时结束回调
    }, conf)
    self.lastTime = conf.lastTime ? Math.floor(conf.lastTime) : Math.floor(( conf.endTime - conf.startTime )/1000)
    self.ticks = 0
    self.countDown()
  }
  countDown () {
    let self = this,
      {conf} = self
    let seconds = self.lastTime,
              s = self.lastTime % 60,
        minutes = Math.floor(seconds / 60),
              m = Math.floor(minutes % 60),
          hours = Math.floor(minutes / 60),
              h = Math.floor(hours % 24),
           days = Math.floor(hours / 24),
              d = Math.floor(days % 365),
          years = Math.floor(days / 365)   
    let cbs = []   // 回调队列
    if(self.ticks++){
      self.s !== s && cbs.push(conf.onSecondChange)
      self.m !== m && cbs.push(conf.onMinuteChange)
      self.h !== h && cbs.push(conf.onHourChange)
      self.d !== d && cbs.push(conf.onDayChange)
      self.seconds !== seconds && cbs.push(conf.onSecondChange)
      self.minutes !== minutes && cbs.push(conf.onSecondChange)
      self.hours !== hours && cbs.push(conf.onSecondChange)
      self.days !== days && cbs.push(conf.onSecondChange)
      self.years !== years && cbs.push(conf.onSecondChange)
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
      seconds, minutes, hours, days, years,
      s: conf.format(s),
      m: conf.format(m),
      h: conf.format(h),
      d: conf.format(d),
    })
    cbs.forEach(cb => cb.call(self))
  }
}