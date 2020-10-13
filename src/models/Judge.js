import {SkuCode} from "./SkuCode"
import {CellTagStatus} from "../core/enum/CellTagStatus"
import {SkuPending} from "./SkuPending"
import {Joiner} from "../../utils/joiner"

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
		// 是否初始化的时候调用
		if (!isInit) {
			// 用户不点击不存在 cell, x, y, 用户点击才需要调用
			this._changeCurrentCellStatus(cell, x, y)
		}
		this.fenceGroup.eachCell((cell, x, y) => {
			const path = this._findPotentialPath(cell, x, y)
			if (!path) {
				return
			}
			const isIn = this._isInDict(path)
			if (isIn) {
				// this.fenceGroup.fences[x].cells[y].status = CellTagStatus.WAITING
				this.fenceGroup.setCellStatusByXY(x, y, CellTagStatus.WAITING)
			} else {
				// this.fenceGroup.fences[x].cells[y].status = CellTagStatus.FORBIDDEN
				this.fenceGroup.setCellStatusByXY(x, y, CellTagStatus.FORBIDDEN)
			}
		})
	}
	
	_isInDict(path) {
		return this.pathDict.includes(path)
	}
	
	/**
	 * 获取cell潜在路径
	 * */
	_findPotentialPath(cell, x, y) {
		const joiner = new Joiner("#")
		for (let i = 0; i < this.fenceGroup.fences.length; i++) {
			const selected = this.skuPending.findSelectedCellByX(i)
			if (x === i) {
				// 是当前行 cell id 1-42
				if (this.skuPending.isSelected(cell, x)) {
					return
				}
				const cellCode = this._getCellCode(cell.spec)
				joiner.join(cellCode)
			} else {
				// 非当前行
				if (selected) {
					// 有已选元素则添加, 否则什么也不做
					const selectedCellCode = this._getCellCode(selected.spec)
					joiner.join(selectedCellCode)
				}
			}
		}
		return joiner.getStr()
	}
	
	_getCellCode(spec) {
		return spec.key_id + '-' + spec.value_id
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
		const defaultSku = this.fenceGroup.getDefaultSku()
		if (!defaultSku) {
			return
		}
		this.skuPending.init(defaultSku)
		this._initSelectedCell()
		this.judge(null, null, null, true)
	}
	
	_initSelectedCell() {
		this.skuPending.pending.forEach(cell => {
			this.fenceGroup.setCellStatusById(cell.id, CellTagStatus.SELECTED)
		})
	}
}

export {
	Judger
}
