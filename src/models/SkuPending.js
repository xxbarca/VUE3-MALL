class SkuPending {
	size
	pending = []
	constructor(size) {
		this.size = size
	}
	
	insertCell(cell, x) {
		this.pending[x] = cell
	}
	
	removeCell(x) {
		this.pending[x] = null
	}
}

export {
	SkuPending
}
