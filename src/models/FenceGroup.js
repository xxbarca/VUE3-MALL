import {Matrix} from "./Matrix"
import {Fence} from "./Fence"

class FenceGroup {
	spu
	skuList = []
	fences = []
	constructor(spu) {
		this.spu = spu;
		this.skuList = spu.sku_list
	}
	
	initFences() {
		const matrix = this._createMatrix(this.skuList)
		const fences = []
		const AT = matrix.transpose()
		AT.forEach(r => {
			const fence = new Fence(r)
			fence.init()
			fences.push(fence)
		})
		this.fences = fences
	}
	
	_createMatrix(skuList) {
		const m = []
		skuList.forEach(sku => {
			m.push(sku.specs)
		})
		return new Matrix(m)
	}
	
	eachCell(callback) {
		for (let i = 0; i < this.fences.length; i++) {
			for (let j = 0; j < this.fences[i].cells.length; j++) {
				const cell = this.fences[i].cells[j]
				callback(cell, i, j)
			}
		}
	}
	
	getSku(code) {
		const fullSkuCode = `${this.spu.id}$${code}`
		const sku = this.skuList.find(s => s.code === fullSkuCode)
		return sku ? sku : null
	}
	
	setCellStatusById(cellId, status) {
		this.eachCell((cell) => {
			if (cell.id === cellId) {
				cell.status = status
			}
		})
	}
	
	setCellStatusByXY(x, y, status) {
		this.fences[x].cells[y].status = status
	}
	
	// 获取默认的sku
	getDefaultSku() {
		const defaultSkuId = this.spu.default_sku_id
		if (!defaultSkuId) {
			return
		}
		return this.skuList.find(s => s.id === defaultSkuId)
	}
	
}
export {
	FenceGroup
}
