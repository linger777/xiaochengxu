### timeCountDown - 倒计时
#### code索引
- [code索引](../plugins/timeCountDown.js)
- [demo索引](../pages/plugins.wpy)
#### 主要功能
倒计时。通过此插件，可以获取不同形式的时间数：单个时间总数-年、天、时、分、秒；组合形式的时间数-年天时分秒。
#### 使用说明
1. 引入插件
```
import TimeCD from '@/plugins/timeCountDown'
```
2. 调用插件
```
this.timeCD = new TimeCD({
    startTime: new Date().getTime(),
    endTime: new Date('2020-06-13').getTime(),
    onSecondChange(){
        that.$apply()
    },
    onFinish() {
        console.log('==倒计时结束＝＝＝')
        that.$emit('time end')
    }
})
```
这里，
##### 倒计时的时间段的设置：
* 有两种属性：lastTime 和 startTime+endTime 。
* lastTime的优先级较高。
* 单位是毫秒。
##### 回调方法有：
* onYearChange(){},   // 年数变化时回调
* onDayChange(){},    // 天数变化时回调
* onHourChange(){},   // 小时变化时回调
* onMinuteChange(){}, // 分钟变化时回调
* onSecondChange(){}, // 秒数变化时回调
* onFinish(){},       // 倒计时结束回调
##### 返回的倒计时对象属性有：
* seconds 秒（总数）
* minutes 分钟（总数）
* hours 小时（总数） 
* days 天（总数） 
* years 年数
* d 天（组合）
* h 小时（组合） 
* m 分钟（组合）
* s 秒（组合）
#### 赋值使用
单个总数形式 —— 距离还剩：years年（或days年 或hours小时 或minutes分钟 或seconds秒）
组合形式 —— 距离还剩：years 年 d 天 h 小时 m 分钟 s 秒
代码如下：
```
<view class="li_plugins">距结束还剩:<text>{{timeCD.years}}</text>年<text>{{timeCD.d}}</text>天<text>{{timeCD.h}}</text>小时<text>{{timeCD.m}}</text>分<text>{{timeCD.s}}</text>秒</view>
```
展示如下：
![a1b5caddab53fd34c73734015649882d.jpeg](evernotecid://BD840B2A-B2EC-4152-A894-E41BDCB39D5B/appyinxiangcom/24754128/ENResource/p15)

说明：
分别抛出这些属性，方便按需灵活组合使用。
