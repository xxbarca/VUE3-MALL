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
			onMounted(() => {
				const {height} = entry.value.getBoundingClientRect()
				style.height = `${document.body.clientHeight - 50 - 46}px`
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
