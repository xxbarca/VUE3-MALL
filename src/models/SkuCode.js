import {combination} from "../../utils/util"

class SkuCode {
	code
	spuId
	totalSegments = []
	constructor(code) {
		this.code = code
		this._splitToSegment()
	}
	
	_splitToSegment() {
		const spuAndSpec = this.code.split("$")
		this.spuId = spuAndSpec[0]
		const specCodeArray = spuAndSpec[1].split("#")
		for (let i = 0; i <= specCodeArray.length; i++) {
			const segments = combination(specCodeArray, i)
			const newSegments = segments.map(segs => {
				return segs.join('#')
			})
			this.totalSegments = this.totalSegments.concat(newSegments)
		}
	}
}

export {
	SkuCode
}
