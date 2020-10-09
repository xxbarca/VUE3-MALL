import instance from "../../utils/http"

class Banner {
	
	static locationB = 'b-1'
	static locationG = 'b-2'
	
	static async getHomeLocationB() {
		return await instance.request({
			method: 'GET',
			url: `/api/v1/banner/name/${Banner.locationB}`,
		})
	}
	
	static async getHomeLocationG() {
		return await instance.request({
			method: "GET",
			url: `/api/v1/banner/name/${Banner.locationG}`,
		})
	}
}

export {Banner}
