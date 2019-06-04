## navbar组件 —— ### 顶部导航
### 主要功能
1. 自定义 小程序 顶部导航 ：* 微信版本号 <7 的无此功能 *
2. 去首页 功能 ：* 首页没有此功能 *
3. 返回 功能：* 无上一页没有此功能 *
4. 模拟系统默认样式：* 和系统默认右边胶囊样式一模一样 *
### 使用说明
0. 定义页面自定义顶部导航
`config = { navigationStyle: "custom" };`
1. 引入组件
`import navbar from '@/components/navbarNew'`
2. 注册组件
`components = {	navbar, }`
3. 调用组件
`<navbar :navbar.sync="navbar"></navbar>`
4. 赋值
`
data = {
		navbar: {
			flag: true, //是否使用navbar
      title: '顶部导航',	// 自定义导航标题
     	height: ''	// 导航高度
    },
}
`
5. 如页面遇到有 sticky \ fixed 定位的view，按需要可以通过加入style进行调整
`style="top: {{navbar.flag ? navbar.height : 0}}rpx;"`
### 说明
1. 在开发者工具上，看不到组件，因为 微信版本号<7 .
