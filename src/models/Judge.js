import {SkuCode} from "./SkuCode"
import {CellTagStatus} from "../core/enum/CellTagStatus"
import {SkuPending} from "./SkuPending"

class Judger {
	fenceGroup
	pathDict = []
	// 记录用户选择的规格值
	skuPending
	constructor(fenceGroup) {
		this.fenceGroup = fenceGroup
		this._initPathDict()
		this._initSkuPending()
	}
	
	_initPathDict() {
		this.fenceGroup.spu.sku_list.forEach(s => {
			const skuCode = new SkuCode(s.code)
			this.pathDict = this.pathDict.concat(skuCode.totalSegments)
		})
	}
	
	judge(cell, x, y, isInit = false) {
		if (!isInit) {
			this._changeCurrentCellStatus(cell, x, y)
		}
		this.fenceGroup.each((cell, x, y) => {
		})
	}
	
	_changeCurrentCellStatus(cell, x, y) {
		if (cell.status === CellTagStatus.WAITING) {
			this.fenceGroup.setCellStatusByXY(x, y, CellTagStatus.SELECTED)
			this.skuPending.insertCell(cell, x)
			return
		}
		if (cell.status === CellTagStatus.SELECTED) {
			this.fenceGroup.setCellStatusByXY(x, y, CellTagStatus.WAITING)
			this.skuPending.removeCell(x)
			return
		}
	}
	
	_initSkuPending() {
		const specsLength = this.fenceGroup.fences.length
		this.skuPending = new SkuPending(specsLength)
	}
}

export {
	Judger
}
