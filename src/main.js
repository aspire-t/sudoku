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