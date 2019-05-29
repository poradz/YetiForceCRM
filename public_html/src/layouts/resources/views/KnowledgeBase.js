/* {[The file is published on the basis of YetiForce Public License 3.0 that can be found in the following directory: licenses/LicenseEN.txt or yetiforce.com]} */

import Quasar from '../../../libraries/quasar.js'
import KnowledgeBaseComponent from './KnowledgeBase.vue'
import FullScreenComponent from './FullScreen.vue'
import store from '../../../libraries/vuex.js'

let VueInstance = null
window.KnowledgeBase = {
	component: KnowledgeBaseComponent,
	mount(config) {
		KnowledgeBaseComponent.moduleName = config.moduleName
		VueInstance = new window.Vue(KnowledgeBaseComponent).$mount(config.el)
		return VueInstance
	},
	store
}
window.KnowledgeBaseFullScreen = {
	component: FullScreenComponent,
	mount(config) {
		FullScreenComponent.moduleName = config.moduleName
		VueInstance = new window.Vue(FullScreenComponent).$mount(config.el)
		return VueInstance
	}
}
export default VueInstance
