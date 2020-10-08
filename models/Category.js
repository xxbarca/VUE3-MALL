import instance from "../utils/http"

class Category {
	static locationB = 'b-1'
	
	static async getHomeLocationC() {
		return await instance.request({
			url: `/api/v1/category/grid/all`,
		})
	}
}

export {
	Category
}
