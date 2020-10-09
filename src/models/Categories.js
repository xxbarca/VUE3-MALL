import instance from "../../utils/http"

class Categories {
	
	roots = []
	subs = []
	
	async getAll() {
		const data = await instance.request({
			method: "GET",
			url: `/api/v1/category/all`
		})
		this.roots = data.roots
		this.subs = data.subs
	}
	
	getRoots() {
		return this.roots
	}
	
	getRoot(rootId) {
		return this.roots.find(r => r.id == rootId)
	}
	
	getSubs(parentId) {
		return this.subs.filter(sub => sub.parent_id == parentId)
	}
}

export {
	Categories
}
