/**
 * Notification components initializations
 *
 * @description Notification views' instances
 * @license YetiForce Public License 3.0
 * @author Tomasz Poradzewski <t.poradzewski@yetiforce.com>
 */
console.log('asdfasdf')
import NotificationModal from './Notification/NotificationModal.vue'
import store from '../../../store/index.js'
Vue.mixin({
	methods: {
		translate(key) {
			return app.vtranslate(key)
		}
	}
})

window.NotificationModalVueComponent = {
	component: NotificationModal,
	mount(config) {
		NotificationModal.state = config.state
		return new Vue({
			// store,
			render: h => h(NotificationModal)
		}).$mount(config.el)
	}
}
