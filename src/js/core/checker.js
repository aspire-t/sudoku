// 检查数据解决方案
const Toolkit = require('./toolkit')

// 对数组进行检查
// 测试用例
// console.log(checkArray([1, 2, 3, 4, 5, 6, 7, 8, 9]))
// console.log(checkArray([0, 2, 3, 5, 5, 6, 7, 8, 0]))

function checkArray(array) {
	const length = array.length
	const marks = new Array(length)
	marks.fill(true)

	for (let i = 0; i < length; i++) {
		// 优化，如果该位置已经为false不用检查了
		if (!marks[i]) {
			continue
		}

		const v = array[i];
		// 是否有效，0-无效 1-9有效
		if (!v) {
			marks[i] = false
			continue
		}

		// 是否有重复： i+1- 9，是否和 i 位置的数据重复 
		for (let j = i + 1; j < length; j++) {
			if (v === array[j]) {
				marks[i] = marks[j] = false
			}
		}
	}

	return marks
}

// 输入 matrix矩阵 用户完成的数独数据 9*9
// 处理： 对matrix 行、列、宫进行检查、并填写 marks
// 输出：检查是否成功 、 marks
class Checker {
	constructor(matrix) {
		this._matrix = matrix
		this._matrixMarks = Toolkit.matrixToolkit.makeMatrix(true)
	}

	get matrixMarks() {
		return this._matrixMarks
	}

	get isSuccess() {
		return this._success
	}

	check() {
		this.checkRows()
		this.checkColS()
		this.checkBoxes()

		// 检查是否成功，使用every函数
		this._success = this._matrixMarks.every(row => row.every(mark => mark))
		return this._success
	}
}