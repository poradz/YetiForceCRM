/**
 * Knowledge base module
 *
 * @description Knowledge base vuex module
 * @license YetiForce Public License 3.0
 * @author Tomasz Poradzewski <t.poradzewski@yetiforce.com>
 */

const state = {
	defaultTreeIcon: 'mdi-subdirectory-arrow-right',
	record: false,
	dialog: false,
	maximized: true,
	moduleName: '',
	iconSize: '18px',
	tree: {
		topCategory: {
			icon: 'mdi-file-tree',
			label: 'JS_KB_MAIN_CATEGORIES'
		},
		categories: {}
	}
}

// getters
const getters = {
	moduleName(state) {
		return state.moduleName
	},
	record(state) {
		return state.record
	},
	dialog(state) {
		return state.dialog
	},
	maximized(state) {
		return state.maximized
	},
	previewDialog(state) {
		return state.previewDialog
	},
	previewMaximized(state) {
		return state.previewMaximized
	},
	coordinates(state) {
		return state.coordinates
	},
	iconSize(state) {
		return state.iconSize
	},
	tree(state) {
		return state.tree
	},
	defaultTreeIcon(state) {
		return state.defaultTreeIcon
	}
}

// actions
const actions = {
	fetchCategories({ state, commit, getters }) {
		const aDeferred = $.Deferred()
		return AppConnector.request({
			module: 'Notification',
			action: 'NotificationAjax',
			mode: 'categories'
		}).done(data => {
			commit('setTreeCategories', data.result)
			aDeferred.resolve(data.result)
		})
	},
	initState({ state, commit }, data) {
		commit('setState', data)
	}
}

// mutations
const mutations = {
	setState(state, payload) {
		state = Object.assign(state, payload)
	},
	setRecord(state, payload) {
		state.record = payload
	},
	setDialog(state, payload) {
		state.dialog = payload
	},
	setMaximized(state, payload) {
		state.maximized = payload
	},
	setCoordinates(state, payload) {
		state.coordinates = payload
	},
	setTreeCategories(state, payload) {
		state.tree.categories = payload
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
