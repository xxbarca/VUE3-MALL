import { createRouter, createWebHistory } from 'vue-router'
import Entry from '../views/entry/index'

const routes = [
	{
		path: '/',
		redirect: '/home',
		name: 'Entry',
		children: [{
			path: 'home',
			name: 'Home',
			component: () => import(/** home */'../views/home/index.vue')
		}, {
			path: 'category',
			name: 'Category',
			component: () => import(/** Category */'../views/category/index')
		}, {
			path: 'cart',
			name: 'Cart',
			component: () => import(/** Cart */'../views/cart/index')
		}, {
			path: 'my',
			name: 'My',
			component: () => import(/** My */'../views/my/index')
		}],
		component: Entry
	},
	{
		path: '/detail/:pid',
		name: 'Detail',
		component: () => import(/** detail */'../views/detail/index')
	}
	

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
