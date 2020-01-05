/**
 * 矩阵和数据 工具集
 */
export const matrixToolkit = {
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
  },
  /**
   * 检查指定位置可以填写数字n
   */
  checkFillable () {
    return true
  }
}

/**
 * 共坐标系工具
 */
export const boxToolkit = {

}