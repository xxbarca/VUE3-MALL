<template>
</template>

<script>
	import {toRefs, onMounted, watch} from 'vue'
	import {Spu} from "../../models/Spu"
	import {FenceGroup} from "../../models/FenceGroup"

	export default {
		name: "realm",
		props: ['spu'],
		setup(props) {
			watch(
				() => props.spu,
				(spu, preSpu) => {
					if (Spu.isNoSpec(spu)) { // => 无规格

					} else { // => 有规格
						processHasSpec(spu)
					}
				}
			)

			function processHasSpec(spu) {
				const fenceGroup = new FenceGroup(spu)
				fenceGroup.initFences()
				console.log(fenceGroup)
			}

			return {
				...toRefs(props)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
