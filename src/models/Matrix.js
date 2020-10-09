class Matrix {
	matrix
	constructor(matrix) {
		this.matrix = matrix
	}
	get rowsNum() {
		return this.matrix.length
	}
	
	get colsNum() {
		return this.matrix[0].length
	}
	
	transpose() {
		const desArr = []
		for (let j = 0; j < this.colsNum; j++) {
			desArr[j] = []
			for (let i = 0; i < this.rowsNum; i++) {
				desArr[j][i] = this.matrix[i][j]
			}
		}
		return desArr
	}
}

export {
	Matrix
}
