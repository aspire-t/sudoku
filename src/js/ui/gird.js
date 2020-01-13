// 生成九宫格
// const Sudoku = require('../core/sudoku')
import Sudoku from '../core/sudoku'
import $ from 'jquery'
import Checker from '../core/checker'

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
  // 检查用户解密的结果，成功则进行提示，失败显示错误的标记
  check() {
    // 从界面获取需要检查的数据
    const data = this._container.children().map((rowIndex, div) => {
        return $(div).children()
          .map((colIndex, span) => parseInt($(span).text()) || 0)
      })
      .toArray() //转换成原生数组
      .map($data => $data.toArray())
    // console.log(data)
    const checker = new Checker(data)
    if (checker.check()) {
      return true
    }

    // 检查不成功，进行标记
    const marks = checker.matrixMarks
    this._container.children()
      .each((rowIndex, div) => {
        $(div).children().each((colIndex, span) => {
          const $span = $(span)
          if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
            $span.removeClass('error')
          } else {
            $span.addClass('error')
          }
        })
      })
  }
  // 重置当前迷盘到初始状态
  reset() {
    this._container.find('span:not(.fixed)')
      .removeClass('error mark1 mark2')
      .addClass('empty')
      .text(0)
  }
  // 清理错误标记
  clear() {
    this._container.find('span.error')
      .removeClass('error')
  }
  rebuild() {
    this._container.empty()
    this.build()
    this.layout()
  }

  bindPopup(popupNumbers) {
    // console.log(this._container)
    this._container.on('click', "span", e => {
      const $cell = $(e.target)
      if ($cell.is('.fixed')) {
        return
      }
      popupNumbers.popup($cell)
    })
  }
}