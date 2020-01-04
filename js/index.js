const toolkit = {
  makeRow (v = 0) {
    const array = new Array(9)
    array.fill(v)
    return array
  },

  makeMatrix (v = 0) {
    return Array.from({ length: 9 }, () => this.makeRow(v))
  },

  /**
   * Fisher-Yates 洗牌算法
   * @param {*} array 
   */
  shuffle (array) {
    const endIndex = array.length - 2
    for (let i = 0; i <= endIndex; i++) {
      // Math.floor 向下取整
      const j = i + Math.floor(Math.random() * (array.length - i));
      // console.log(j);
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
}

class Grid {
  constructor(container) {
    this._container = container
  }

  build () {
    const matrix = toolkit.makeMatrix()

    const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"]
    const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"]

    const $cells = matrix.map(rowValues =>
      rowValues.map((cellValue, index) => {
        return $('<span>')
          .addClass(colGroupClasses[index % 3])
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
}

new Grid($('#container')).build()