import $ from 'jquery'
import './css/main.less'
import { Grid } from './js/ui/gird'

const grid = new Grid($('#container'))
grid.build()
grid.layout()