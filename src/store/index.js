import { createStore } from 'vuex'
import * as types from './action-types'

export default createStore({
	state: {
		entryContentHeight: 0
    },
    mutations: {
		[types.SET_ENTRY_CONTENT_HEIGHT](state, payload) {
			state.entryContentHeight = payload
			console.log(payload)
		}
    },
    actions: {
    },
    modules: {
    }
})
