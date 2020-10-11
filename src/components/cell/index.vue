<template>
	<div :class="['container', outer]">
		<div :class="['inner-container', inner]">
			<img :src="cell.skuImg" class="img" v-if="cell.skuImg" />
			<span>{{cell.title}}</span>
		</div>
	</div>
</template>

<script>
	import {toRefs, computed} from 'vue'
	export default {
		name: "index",
		props: ['x', 'y', 'cell'],
		setup(props, context) {
			const outer = computed(() => {
				if (props.cell.status === 'forbidden') {
					return 'forbidden'
				}
				if (props.cell.status === 'selected') {
					return 's-outer'
				}
			})
			const inner = computed(() => {
				if (props.cell.status === 'forbidden') {
					return ''
				}
				if (props.cell.status === 'selected') {
					return 's-inner'
				}
			})

			return {
				...toRefs(props),
				inner,
				outer,

			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
