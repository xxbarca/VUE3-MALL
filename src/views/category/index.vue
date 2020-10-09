<template>
	<van-search @click="onGotoSearch" disabled placeholder="请输入搜索关键词" />
	<div class="container" :style='style'>
		<div class="segment">
			<van-sidebar v-model="activeKey" @change="onSegChange">
				<van-sidebar-item v-for="item in roots" :title="item.name" :key="item.id" />
			</van-sidebar>
		</div>
		<div class="right">
			<SubCategory :banner-img="currentBannerImg" :categories="currentSubs" />
		</div>

	</div>

</template>

<script>
	import {onMounted, reactive, ref, toRefs} from 'vue'
	import {Categories} from "../../models/Categories"
	import SubCategory from '../../components/sub-category'
	export default {
		name: "category",
		components: {
			SubCategory
		},
		setup() {
			let state = reactive({
				roots: [],
				currentSubs: [],
				categories: null
			})
			let categories = null
			let style = reactive({})
			let activeKey = ref(0)
			let currentBannerImg = ref('')
			onMounted(() => {
				initCategoryData()
				const height = `${localStorage.getItem('height') - 54}px`
				style.height = height
			})

			async function initCategoryData() {
				categories = new Categories()
				await categories.getAll()
				state.roots = categories.getRoots()
				const defaultRoot = getDefaultRoot(state.roots)
				state.currentSubs = categories.getSubs(defaultRoot.id)
				currentBannerImg.value = defaultRoot.img
			}

			function getDefaultRoot(roots) {
				let defaultRoot = roots.find(r => r.id === state.defaultRootId)
				if (!defaultRoot) {
					defaultRoot = roots[0]
				}
				return defaultRoot
			}

			function onGotoSearch() {
			}

			function onSegChange(index) {
				const rootId = state.roots[index].id
				state.currentSubs = categories.getSubs(rootId)
				currentBannerImg.value = categories.getRoot(rootId).img
			}

			return {
				...toRefs(state),
				currentBannerImg,
				style,
				activeKey,
				onGotoSearch,
				onSegChange
			}

		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
