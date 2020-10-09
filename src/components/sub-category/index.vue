<template>
	<div class="sub-category">
		<img class="banner" v-if="bannerImg" :src="bannerImg" />
		<span class="title">- 全部分类 -</span>
		<van-grid :column-num="3">
			<van-grid-item v-for="item in categories">
				<van-image :src="item.img" />
				<span>{{item.name}}</span>
			</van-grid-item>
		</van-grid>
	</div>
</template>

<script>
	import {toRefs} from 'vue'
	export default {
		name: "sub-category",
		props: ['bannerImg', 'categories'],
		setup(props, context) {
			return {
				...toRefs(props)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
