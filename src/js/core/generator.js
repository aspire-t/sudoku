//　生成数独解决方案
import { makeMatrix, checkFillable, shuffle } from './toolkit'

export class Generator {
  generate () {
    // 生成一个值都是0的 9*9的矩阵
    this.matrix = makeMatrix()
    // 生成一个值是随机的 9*9的矩阵
    this.orders = makeMatrix()
      .map(row => row.map((v, i) => i))// 给矩阵赋值1-9
      .map(row => shuffle(row))// 打乱排序

    // 入口方法
    for (let n = 0; n < 9; n++) {
      this.fillNumber(n)
    }
  }

  fillNumber (n) {
    this.fillRow(n, 0)
  }

  fillRow (n, rowIndex) {
    if (rowIndex > 8) {
      return true
    }

    const row = this.matrix[rowIndex]
    const orders = this.orders[rowIndex]// 从一个乱序的数组中取值，为了保证，取出来的矩阵是不规则的
    for (let i = 0; i < 9; i++) {
      const colIndex = orders[i]
      // 如果这个位置已经有值，跳过
      if (row[colIndex]) {
        continue
      }

      // 检查这个位置是否可以填 n
      if (!checkFillable()) {
        continue
      }

      row[colIndex] = n
      // 去下一行填写n, 如果没填进去，就继续寻找当前行下一个位置
      if (!this.fillRow(n, rowIndex + 1)) { // 当前行填写n成功，递归调用fillRow，来在下一行中来填写n
        // 如果填写失败，要恢复这个值为0
        row[colIndex] = 0
        continue
      }
      return true
    }

    return false
  }
}