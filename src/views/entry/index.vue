<template>
    <div id="entry" ref="entry">
		<van-nav-bar title="商城"/>
		<div class="content" :style='style'>
			<router-view></router-view>
		</div>
		<TabBar />
	</div>
</template>

<script>
	import {onMounted, ref, reactive} from 'vue'
	import {useStore} from 'vuex'
	import * as types from '../../store/action-types'
	import TabBar from '../../components/tabbar/index'
	export default {
		name: 'entry',
		components: {
			TabBar
		},
		setup() {
			const entry = ref(null)
			let style = reactive({
				overflow: 'scroll'
			})
			const store = useStore()
			onMounted(() => {
				const height = document.body.clientHeight - 50 - 46
				style.height = `${height}px`
				localStorage.setItem('height', height)
			})
			return {
				entry,
				style
			}
		}
	}
</script>

<style scoped lang='scss'>
    @import './index.scss';
</style>
