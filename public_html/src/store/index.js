/**
 * Vuex store
 *
 * @description Vuex store initialization
 * @license YetiForce Public License 3.0
 * @author Tomasz Poradzewski <t.poradzewski@yetiforce.com>
 */

import Vuex from 'vuex'
import KnowledgeBase from './modules/KnowledgeBase.js'
import Notification from './modules/Notification.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
Vue.config.devtools = process.env.NODE_ENV !== 'production'
const vuexStore = new Vuex.Store({
	modules: {
		KnowledgeBase,
		Notification
	},
	strict: debug
})

export default vuexStore
