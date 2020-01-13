import $ from 'jquery'
import './css/main.less'
import {
  Grid
} from './js/ui/gird'
import PopupNumbers from './js/ui/popupnumbers'

const grid = new Grid($('#container'))
const popupNumbers = new PopupNumbers($('#popupNumbers'))
grid.build()
grid.layout()
grid.bindPopup(popupNumbers)

// 检查按钮
$('#check').on('click', e => {
  grid.check()
  // if (grid.check()) {
  //   alert('成功')
  // }

})
// 重置按钮
$('#reset').on('click', e => {
  grid.reset()
})
// 清理按钮
$('#clear').on('click', e => {
  grid.clear()
})
// 重建按钮
$('#rebuild').on('click', e => {
  grid.rebuild()
})