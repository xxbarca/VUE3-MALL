<template>
	<van-grid :border="false" :column-num="3">
		<van-grid-item class="item" v-for="(item, index) in grid">
			<img class="grid-img" :src="item.img" />
			<span class="grid-title">{{item.title}}</span>
		</van-grid-item>
	</van-grid>
</template>

<script>
	import {toRefs} from 'vue'
	export default {
		name: "category-grid",
		props: {
			grid: {
				type: Array
			}
		},
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
