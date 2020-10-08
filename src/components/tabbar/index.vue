<template>
	<van-tabbar route active-color="#167658" inactive-color="#000">
		<van-tabbar-item icon="wap-home-o" replace to="/home">首页</van-tabbar-item>
		<van-tabbar-item icon="search" replace to="/category">分类</van-tabbar-item>
		<van-tabbar-item icon="shopping-cart-o" replace to="/cart">购物车</van-tabbar-item>
		<van-tabbar-item icon="friends-o" replace to="/my">我的</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	import {ref} from 'vue'
	export default {
		name: "tabBar",
		setup() {
			return {
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
