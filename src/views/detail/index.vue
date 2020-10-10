<template>
	<div>
		<van-nav-bar title="商城"/>
		<van-popup v-model:show="show" position="bottom" :style="{ maxHeight: '500px', minHeight: '350px' }">
			<Realm :spu="spu" />
		</van-popup>
	</div>
</template>

<script>
	import {ref, onMounted, reactive, toRefs} from 'vue'
	import {useRoute} from 'vue-router'
	import {Spu} from "../../models/Spu"
	import Realm from '../../components/realm'
	export default {
		name: "detail",
		components: {Realm},
		setup() {
			let show = ref(true)
			const state = reactive({
				spu: {}
			})
			const route = useRoute()
			onMounted(async () => {
				const pid = route.params.pid
				const spu = await Spu.getDetail(pid)
				state.spu = spu
			})
			return {
				show,
				...toRefs(state)
			}
		}
	}
</script>

<style scoped>

</style>
