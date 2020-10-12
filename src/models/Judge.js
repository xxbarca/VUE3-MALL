import {SkuCode} from "./SkuCode"

class Judger {
	fenceGroup
	pathDict = []
	// 记录用户选择的规格值
	skuPending
	constructor(fenceGroup) {
		this.fenceGroup = fenceGroup
		this._initPathDict()
	}
	
	_initPathDict() {
		this.fenceGroup.spu.sku_list.forEach(s => {
			const skuCode = new SkuCode(s.code)
			this.pathDict = this.pathDict.concat(skuCode.totalSegments)
		})
	}
	
	_initSkuPending() {
	
	}
}

export {
	Judger
}
