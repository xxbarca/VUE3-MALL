<template>
	<div id="fence">
		<span class="title">{{fence.title}}</span>
		<div class="row-container">
			<Cell class="cell" v-for="(item, index) in fence.cells" :x="x" :y="index" :cell="item" :key="index" />
		</div>
	</div>
</template>

<script>
	import {toRefs} from 'vue'
	import Cell from '../cell'
	export default {
		name: "fence",
		props: ['x', 'fence'],
		components: {
			Cell
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
