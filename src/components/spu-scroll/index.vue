<template>
	<div class="container">
		<img :src="theme.title_img" class="title" />
		<div class="scroll-view">
			<div class="inner" v-for="(item) in spuList">
				<img class="spu-img" :src="item.img" />
				<span class="spu-text">{{item.title.length >= 8 ? item.title.substring(0, 7) + '...' : item.title}}</span>
				<span class="price">¥{{mainPrice(item.price, item.discount_price).price}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {toRefs, computed} from 'vue'
	import {mainPrice} from '../../../utils/price'
	export default {
		name: "spu-scroll",
		props: {
			theme: {
				type: Object
			},
			spuList: {
				type: Array
			}
		},
		setup(props, context) {
			return {
				...toRefs(props),
				mainPrice
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "index.scss";
</style>
