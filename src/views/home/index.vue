<template>
	<img class="top-theme" :src="themeA.entrance_img" />
	<SpuScroll :theme="themeE" :spu-list="themeESpu" />
</template>

<script>
	import {onMounted, reactive, toRefs} from 'vue'
	import {Theme} from "../../../models/Theme"
	import SpuScroll from '../../components/spu-scroll'
	export default {
		name: "home",
		components: {
			SpuScroll
		},
		setup() {
			let state = reactive({
				themeA: {},
				themeE: {},
				themeESpu: []
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
