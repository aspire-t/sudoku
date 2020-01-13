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
export default class Checker {
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
	// 检查行
	checkRows() {
		for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
			const row = this._matrix[rowIndex];
			const marks = checkArray(row)
			console.log(marks)
			for (let colIndex = 0; colIndex < marks.length; colIndex++) {
				if (!marks[colIndex]) {
					this._matrixMarks[rowIndex][colIndex] = false
				}
			}
		}
	}
	// 检查列
	checkColS() {
		for (let colIndex = 0; colIndex < 9; colIndex++) {
			const cols = [];
			for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
				cols[rowIndex] = this._matrix[rowIndex][colIndex]
			}

			const marks = checkArray(cols)
			for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
				if (!marks[rowIndex]) {
					this._matrixMarks[rowIndex][colIndex] = false
				}
			}
		}
	}
	// 检查宫
	checkBoxes() {
		for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
			const boxes = Toolkit.boxToolkit.getBoxCells(this._matrix, boxIndex);
			// console.log(boxes)
			const marks = checkArray(boxes)
			for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
				if (!marks[cellIndex]) {
					const {
						rowIndex,
						colIndex
					} = Toolkit.boxToolkit.convertFromBoxIndex(boxIndex, cellIndex)
					this._matrixMarks[rowIndex][colIndex] = false
				}
			}
		}
	}
}

// const Generator = require('./generator')
// const gen = new Generator
// gen.generate()
// const matrix = gen.matrix
// const checker = new Checker(matrix)
// console.log("check result", checker.check())
// console.log(checker.matrixMarks)

// matrix[1][1] = 0
// matrix[2][3] = matrix[3][5] = 5
// const checker2 = new Checker(matrix)
// console.log("check result", checker2.check())
// console.log(checker2._matrixMarks)