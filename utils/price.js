
// 主价格
function mainPrice(price, discount_price) {
	if (!discount_price) {
		return {
			price: price,
			display: true
		}
	} else {
		return {
			display: true,
			price: discount_price
		}
	}
}

//
function slashPrice(price, discount_price) {
	if (discount_price) {
		return {
			display: true,
			price: price
		}
	} else {
		return {
			display: false,
			price: null
		}
	}
}

module.exports = {
	mainPrice: mainPrice,
	slashPrice: slashPrice
}
