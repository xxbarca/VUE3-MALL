<template>
	<img class="top-theme" :src="themeA.entrance_img" />
	<van-swipe :autoplay="1000" indicator-color="white">
		<van-swipe-item v-for="(item, index) in bannerB.items" :key="index">
			<img class="banner_image" :src="item.img" />
		</van-swipe-item>
	</van-swipe>
	<CategoryGrid :grid="grid" />
	<SpuScroll :theme="themeE" :spu-list="themeESpu" />
</template>

<script>
	import {onMounted, reactive, toRefs} from 'vue'
	import {Theme} from "../../../models/Theme"
	import {Banner} from '../../../models/Banner'
	import SpuScroll from '../../components/spu-scroll'
	import {Category} from "../../../models/Category"
	import CategoryGrid from '../../components/category-grid'
	export default {
		name: "home",
		components: {
			SpuScroll,
			CategoryGrid
		},
		setup() {
			let state = reactive({
				themeA: {},
				themeE: {},
				themeESpu: [],
				bannerB: [],
				grid: []
			})
			onMounted(() => {
				methods.initAllData()
			})

			const methods = {
				async initAllData() {
					const theme = new Theme()
					await theme.getThemes()

					state.themeA = theme.getHomeLocationA()
					state.themeE = theme.getHomeLocationE()
					state.bannerB = await Banner.getHomeLocationB()
					state.grid = await Category.getHomeLocationC()
					console.log(state.grid)

					if (state.themeE.online) {
						const data = await Theme.getHomeLocationESpu()
						if (data) {
							state.themeESpu = data.spu_list.slice(0, 8)
						}
					}
				}
			}

			return {
				...toRefs(state)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
