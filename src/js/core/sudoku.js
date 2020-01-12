// 生成数独游戏
// 1. 生成完成的解决方案
// 2.随机去除部分数据：按一定比例 

// const Generator = require('./generator')
import Generator from './generator'

// module.exports = class Sudoku {
export default class Sudoku {
  constructor() {
    // 生成完成的解决方案
    const generator = new Generator()
    generator.generate()
    this.solutionMatrix = generator.matrix
  }
  // 每行消除5个数
  make(level = 5) {
    // 生成迷盘
    this.puzzleMatrix = this.solutionMatrix.map(row => {
      return row.map(cell => Math.random() * 9 < level ? 0 : cell)
    })
  }
}