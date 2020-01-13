// 生成九宫格
// const Sudoku = require('../core/sudoku')
import Sudoku from '../core/sudoku'
import $ from 'jquery'

export class Grid {
  constructor(container) {
    this._container = container
  }

  build() {
    const sudoku = new Sudoku()
    sudoku.make()
    const matrix = sudoku.puzzleMatrix

    const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"]
    const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"]

    const $cells = matrix.map(rowValues =>
      rowValues.map((cellValue, index) => {
        return $('<span>')
          .addClass(colGroupClasses[index % 3])
          .addClass(cellValue ? "fixed" : "empty") // 如果值是0，增加empty 的class
          .text(cellValue)
      }))

    const $divArray = $cells.map(($spanArray, index) => {
      return $('<div>')
        .addClass('row')
        .addClass(rowGroupClasses[index % 3])
        .append($spanArray)
    })

    this._container.append($divArray)
  }

  layout() {
    const width = $('span:first', this._$container).width()
    $('span', this._$container)
      .height(width)
      .css({
        'line-height': `${width}px`,
        'font-size': width < 32 ? `${width / 2}px` : ''
      })
  }

  bindPopup(popupNumbers) {
    // console.log(this._container)
    this._container.on('click', "span", e => {
      const $cell = $(e.target)
      popupNumbers.popup($cell)
    })
  }
}