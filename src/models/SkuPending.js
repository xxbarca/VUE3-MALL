import {Cell} from "./Cell"
import {Joiner} from "../../utils/joiner"

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
	
	findSelectedCellByX(x) {
		return this.pending[x]
	}
	
	isSelected(cell, x) {
		const pendingCell = this.pending[x]
		if (!pendingCell) {
			return false
		}
		return cell.id === pendingCell.id
	}
	init(sku) {
		// this.size = sku.specs.length
		for (let i = 0; i < sku.specs.length; i++) {
			const cell = new Cell(sku.specs[i])
			this.insertCell(cell, i)
		}
	}
	isIntact() {
		for (let i = 0; i < this.size; i++) {
			if (this._isEmptyPart(i)) {
				return false
			}
		}
		return true
	}
	
	getSkuCode() {
		const joiner = new Joiner('#')
		this.pending.forEach(cell => {
			const cellCode = cell.getCellCode()
			joiner.join(cellCode)
		})
		return joiner.getStr()
	}
	
	_isEmptyPart(index) {
		return this.pending[index] ? false : true
	}
}

export {
	SkuPending
}
