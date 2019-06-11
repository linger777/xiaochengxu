## generatorColor插件 - 随机生成搭配的背景色和文本色
#### [code索引](xcxmodule/src/plugins/generateColor.js)
#### 主要功能
随机生成搭配的背景色和文本色
#### 使用说明
1. 引入插件
```
import GenerateColor from "@/plugins/generateColor"
```
2. 调用插件
```
new GenerateColor().createColor()
```
得到颜色对象：
```
{
  bgColor : rgba(24,72,254,.2), //背景色
  color : rgb(231,183,1) //文本色
}
```
#### 备注
这个插件，用的是颜色值相反来设计的搭配。以后若遇到更好的颜色搭配理论支撑，将及时调整实现。


* * *
PS：小伙伴们在使用过程中，如有好的想法，欢迎提出宝贵建议，一起改进。
