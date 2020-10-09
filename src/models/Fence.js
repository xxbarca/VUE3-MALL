import {Cell} from "./Cell"

class Fence {
	cells = []
	specs
	
	// 规格名
	title
	// 规格名主键
	id
	constructor(specs) {
		this.specs = specs
		this.title = specs[0].key
		this.id = specs[0].key_id
	}
	
	init() {
		this._initCells()
	}
	
	_initCells() {
		this.specs.forEach(s => {
			const existed = this.cells.some(c => {
				return c.id === s.value_id
			})
			if (existed) {
				return
			}
			const cell = new Cell(s)
			this.cells.push(cell)
		})
	}
}

export {
	Fence
}
