export default class GenerateColor {
  createColor () {
    let c = [Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)] 
    let bgColor = 'rgba('+c[0]+','+c[1]+','+c[2]+',.2)'
    let color = 'rgb('+ (255-c[0]) + ',' + (255-c[1]) + ',' + (255-c[2]) + ')'
    return "background-color:" + bgColor + ";color:" + color + ";"
  }
}