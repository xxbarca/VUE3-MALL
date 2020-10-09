import {CellTagStatus} from "../core/enum/CellTagStatus"

class Cell {
	title
	id
	
	status = CellTagStatus.WAITING
	spec
	skuImg
	
	constructor(spec) {
		this.title = spec.value
		this.id = spec.value_id
		this.spec = spec
	}
	
	getCellCode() {
		return this.spec.key_id + '-' + this.spec.value_id
	}
}

export {
	Cell
}
