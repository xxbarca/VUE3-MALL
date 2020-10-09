import instance from "../utils/http"

class Activity {
	static locationD = 'a-2'
	
	static async getHomeLocationD() {
		return await instance.request({
			method: "GET",
			url: `/api/v1/activity/name/${Activity.locationD}`,
		})
	}
	
	static async getActivityWithCoupon(activityName) {
		return await instance.request({
			method: "GET",
			url: `/api/v1/activity/name/${activityName}/with_coupon`
		})
	}
}

export {
	Activity
}
