<template>
	<div class="realm" ref="root">
		<div class="container" :style="style">
			<div class="inner-container">
				<div class="sku-preview">
					<img :src="previewImg" class="sku-img" />
					<div class="sku-description">
						<span class="title">{{title}}</span>
						<div>
							<div class="price-row">
								<span class="price">¥{{mainPrice(price, discountPrice).price}}</span>
								<span class="discount-price"
									v-if="slashPrice(price, discountPrice).display">{{slashPrice(price, discountPrice).price}}</span>
								<span v-if="stock && stock >= 10" class="stock">库存: {{stock}} 件</span>
								<span v-if="stock && stock < 10 && stock != 0" class="stock-pinch">仅剩: {{stock}} 件</span>
							</div>
						</div>
					</div>
				</div>
				<div class="hr"></div>
				<Fence v-for="(item, index) in fences" :key="index" :x="index" :fence="item" />
			</div>
		</div>
		<div v-if="!outStock" @click="onBuyOrCart" class="bottom-btn">
			<span v-if="orderWay === 'cart'">加入购物车</span>
			<span v-else>立即购买</span>
		</div>

		<div v-else class="bottom-btn out-stock">
			<span>暂时缺货</span>
		</div>
	</div>
</template>

<script>
	import {toRefs, onMounted, watch, ref, reactive} from 'vue'
	import {Spu} from "../../models/Spu"
	import {FenceGroup} from "../../models/FenceGroup"
	import {mainPrice, slashPrice} from '../../../utils/price'
	import Fence from '../../components/fence'
	import bus from '../../../utils/bus'
	import {Judger} from "../../models/Judge"

	export default {
		name: "realm",
		props: ['spu'],
		components: {
			Fence
		},
		setup(props) {

			let previewImg = ref('')
			let title = ref('')
			let price = ref('')
			let discountPrice = ref('')
			let stock = ref(0)
			let outStock = ref(false)
			let orderWay = ref('cart')
			const root = ref(null)
			const style = reactive({})
			const state = reactive({
				fences: [],
				judger: {}
			})
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
				state.judger = new Judger(fenceGroup)
				const defaultSku = fenceGroup.getDefaultSku()
				if (defaultSku) {
					bindSkuData(defaultSku)
				} else {
					bindSpuData()
				}
				bindFenceGroupData(fenceGroup)
			}

			function bindFenceGroupData(fenceGroup) {
				state.fences = fenceGroup.fences
			}

			function bindSkuData(sku) {
				previewImg.value = sku.img
				title.value = sku.title
				price.value = sku.price
				discountPrice.value = sku.discount_price
				stock.value = sku.stock
			}

			function bindSpuData() {
				const spu = props.spu
				previewImg.value = spu.img
				title.value = spu.title
				price.value = spu.price
				discountPrice.value = spu.discount_price
			}

			function onBuyOrCart() {

			}


			onMounted(() => {
				bus.$on('cellTap', ({x, y, cell}) => {
					state.judger.judge(cell, x, y)
				})
			})

			return {
				...toRefs(props),
				...toRefs(state),
				outStock,
				orderWay,
				root,
				style,
				previewImg,
				title,
				price,
				discountPrice,
				stock,
				onBuyOrCart,
				mainPrice,
				slashPrice
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
