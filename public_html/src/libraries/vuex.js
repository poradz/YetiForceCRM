import Vuex from 'vuex'

window.Vue.use(Vuex)

const vuexStore = new Vuex.Store({
	state: {
		something: ['something']
	}
})
export default vuexStore
