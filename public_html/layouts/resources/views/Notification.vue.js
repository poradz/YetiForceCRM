(function(){'use strict';//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import DragResize from './components/DragResize.vue'
// import Notification from './Notification.vue'
// import { createNamespacedHelpers } from 'vuex'
// const { mapGetters, mapActions } = createNamespacedHelpers('Notification')
function a(a,b){var c=M?b.media||"default":a,d=O[c]||(O[c]={ids:new Set,styles:[]});if(!d.ids.has(a)){d.ids.add(a);var e=b.source;if(b.map&&(e+="\n/*# sourceURL="+b.map.sources[0]+" */",e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(b.map))))+" */"),d.element||(d.element=document.createElement("style"),d.element.type="text/css",b.media&&d.element.setAttribute("media",b.media),N.appendChild(d.element)),"styleSheet"in d.element)d.styles.push(e),d.element.styleSheet.cssText=d.styles.filter(Boolean).join("\n");else{var f=d.ids.size-1,g=document.createTextNode(e),h=d.element.childNodes;h[f]&&d.element.removeChild(h[f]),h.length?d.element.insertBefore(g,h[f]):d.element.appendChild(g)}}}// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js
function b(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function d(a){if(R===setTimeout)//normal enviroments in sane situations
return setTimeout(a,0);// if setTimeout wasn't available but was latter defined
if((R===b||!R)&&setTimeout)return R=setTimeout,setTimeout(a,0);try{// when when somebody has screwed with setTimeout but no I.E. maddness
return R(a,0)}catch(b){try{// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return R.call(null,a,0)}catch(b){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return R.call(this,a,0)}}}function e(a){if(S===clearTimeout)//normal enviroments in sane situations
return clearTimeout(a);// if clearTimeout wasn't available but was latter defined
if((S===c||!S)&&clearTimeout)return S=clearTimeout,clearTimeout(a);try{// when when somebody has screwed with setTimeout but no I.E. maddness
return S(a)}catch(b){try{// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return S.call(null,a)}catch(b){// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return S.call(this,a)}}}function f(){V&&T&&(V=!1,T.length?U=T.concat(U):W=-1,U.length&&g())}function g(){if(!V){var a=d(f);V=!0;for(var b=U.length;b;){for(T=U,U=[];++W<b;)T&&T[W].run();W=-1,b=U.length}T=null,V=!1,e(a)}}function h(a){var b=Array(arguments.length-1);if(1<arguments.length)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];U.push(new j(a,b)),1!==U.length||V||d(g)}// v8 likes predictible objects
function j(a,b){this.fun=a,this.array=b}function k(){}/**
   * vuex v3.1.1
   * (c) 2019 Evan You
   * @license MIT
   */function l(a){/**
     * Vuex init hook, injected into each instances init hooks list.
     */function b(){var a=this.$options;// store injection
a.store?this.$store="function"==typeof a.store?a.store():a.store:a.parent&&a.parent.$store&&(this.$store=a.parent.$store)}var c=+a.version.split(".")[0];if(2<=c)a.mixin({beforeCreate:b});else{// override init and inject vuex init procedure
// for 1.x backwards compatibility.
var d=a.prototype._init;a.prototype._init=function(a){void 0===a&&(a={}),a.init=a.init?[b].concat(a.init):b,d.call(this,a)}}}function m(a){ba&&(a._devtoolHook=ba,ba.emit("vuex:init",a),ba.on("vuex:travel-to-state",function(b){a.replaceState(b)}),a.subscribe(function(a,b){ba.emit("vuex:mutation",a,b)}))}/**
   * Get the first item that pass the test
   * by second argument function
   *
   * @param {Array} list
   * @param {Function} f
   * @return {*}
   */ /**
   * forEach for object
   */function n(a,b){Object.keys(a).forEach(function(c){return b(a[c],c)})}function o(a){return null!==a&&"object"==typeof a}function p(a){return a&&"function"==typeof a.then}function q(a,b){if(!a)throw new Error("[vuex] "+b)}function r(a,b){return function(){return a(b)}}// Base data struct for store's module, package with some attribute and method
function s(a,b,c){// update nested modules
if(t(a,c),b.update(c),c.modules)for(var d in c.modules){if(!b.getChild(d))return void console.warn("[vuex] trying to add a new module '"+d+"' on hot reloading, manual reload is needed");s(a.concat(d),b.getChild(d),c.modules[d])}}function t(a,b){Object.keys(ha).forEach(function(c){if(b[c]){var d=ha[c];n(b[c],function(b,e){q(d.assert(b),u(a,c,e,b,d.expected))})}})}function u(a,b,c,d,e){var f=b+" should be "+e+" but \""+b+"."+c+"\"";return 0<a.length&&(f+=" in module \""+a.join(".")+"\""),f+=" is "+JSON.stringify(d)+".",f}function v(a,b){return 0>b.indexOf(a)&&b.push(a),function(){var c=b.indexOf(a);-1<c&&b.splice(c,1)}}function w(a,b){a._actions=Object.create(null),a._mutations=Object.create(null),a._wrappedGetters=Object.create(null),a._modulesNamespaceMap=Object.create(null);var c=a.state;// init all modules
// reset vm
y(a,c,[],a._modules.root,!0),x(a,c,b)}function x(a,b,c){var d=a._vm;// bind store public getters
a.getters={};var e=a._wrappedGetters,f={};n(e,function(b,c){// use computed to leverage its lazy-caching mechanism
// direct inline function use will lead to closure preserving oldVm.
// using partial to return function with only arguments preserved in closure enviroment.
f[c]=r(b,a),Object.defineProperty(a.getters,c,{get:function(){return a._vm[c]},enumerable:!0// for local getters
})});// use a Vue instance to store the state tree
// suppress warnings just in case the user has added
// some funky global mixins
var g=fa.config.silent;fa.config.silent=!0,a._vm=new fa({data:{$$state:b},computed:f}),fa.config.silent=g,a.strict&&E(a),d&&(c&&a._withCommit(function(){d._data.$$state=null}),fa.nextTick(function(){return d.$destroy()}))}function y(a,b,c,d,e){var f=!c.length,g=a._modules.getNamespace(c);// set state
if(d.namespaced&&(a._modulesNamespaceMap[g]=d),!f&&!e){var h=F(b,c.slice(0,-1)),i=c[c.length-1];a._withCommit(function(){fa.set(h,i,d.state)})}var j=d.context=z(a,g,c);d.forEachMutation(function(b,c){B(a,g+c,b,j)}),d.forEachAction(function(b,c){var d=b.root?c:g+c,e=b.handler||b;C(a,d,e,j)}),d.forEachGetter(function(b,c){D(a,g+c,b,j)}),d.forEachChild(function(d,f){y(a,b,c.concat(f),d,e)})}/**
   * make localized dispatch, commit, getters and state
   * if there is no namespace, just use root ones
   */function z(a,b,c){var d=""===b,e={dispatch:d?a.dispatch:function(c,d,e){var f=G(c,d,e),g=f.payload,h=f.options,i=f.type;return h&&h.root||(i=b+i,!!a._actions[i])?a.dispatch(i,g):void console.error("[vuex] unknown local action type: "+f.type+", global type: "+i)},commit:d?a.commit:function(c,d,e){var f=G(c,d,e),g=f.payload,h=f.options,i=f.type;return h&&h.root||(i=b+i,!!a._mutations[i])?void a.commit(i,g,h):void console.error("[vuex] unknown local mutation type: "+f.type+", global type: "+i)}};return Object.defineProperties(e,{getters:{get:d?function(){return a.getters}:function(){return A(a,b)}},state:{get:function(){return F(a.state,c)}}}),e}function A(a,b){var c={},d=b.length;return Object.keys(a.getters).forEach(function(e){// skip if the target getter is not match this namespace
if(e.slice(0,d)===b){// extract local getter type
var f=e.slice(d);// Add a port to the getters proxy.
// Define as getter property because
// we do not want to evaluate the getters in this time.
Object.defineProperty(c,f,{get:function(){return a.getters[e]},enumerable:!0})}}),c}function B(a,b,c,d){var e=a._mutations[b]||(a._mutations[b]=[]);e.push(function(b){c.call(a,d.state,b)})}function C(a,b,c,d){var e=a._actions[b]||(a._actions[b]=[]);e.push(function(b,e){var f=c.call(a,{dispatch:d.dispatch,commit:d.commit,getters:d.getters,state:d.state,rootGetters:a.getters,rootState:a.state},b,e);return p(f)||(f=Promise.resolve(f)),a._devtoolHook?f.catch(function(b){throw a._devtoolHook.emit("vuex:error",b),b}):f})}function D(a,b,c,d){return a._wrappedGetters[b]?void console.error("[vuex] duplicate getter key: "+b):void(a._wrappedGetters[b]=function(a){return c(d.state,// local state
d.getters,// local getters
a.state,// root state
a.getters// root getters
)})}function E(a){a._vm.$watch(function(){return this._data.$$state},function(){q(a._committing,"do not mutate vuex store state outside mutation handlers.")},{deep:!0,sync:!0})}function F(a,b){return b.length?b.reduce(function(a,b){return a[b]},a):a}function G(a,b,c){return o(a)&&a.type&&(c=b,b=a,a=a.type),q("string"==typeof a,"expects string as the type, but found "+typeof a+"."),{type:a,payload:b,options:c}}function H(a){return fa&&a===fa?void console.error("[vuex] already installed. Vue.use(Vuex) should be called only once."):void(fa=a,l(fa))}/**
   * Reduce the code which written in Vue.js for getting the state.
   * @param {String} [namespace] - Module's namespace
   * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
   * @param {Object}
   */ /**
   * Normalize the map
   * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
   * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
   * @param {Array|Object} map
   * @return {Object}
   */function I(a){return Array.isArray(a)?a.map(function(a){return{key:a,val:a}}):Object.keys(a).map(function(b){return{key:b,val:a[b]}})}/**
   * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
   * @param {Function} fn
   * @return {Function}
   */function J(a){return function(b,c){return"string"==typeof b?"/"!==b.charAt(b.length-1)&&(b+="/"):(c=b,b=""),a(b,c)}}/**
   * Search a special module from store by namespace. if module not exist, print error message.
   * @param {Object} store
   * @param {String} helper
   * @param {String} namespace
   * @return {Object}
   */function K(a,b,c){var d=a._modulesNamespaceMap[c];return d||console.error("[vuex] module namespace not found in "+b+"(): "+c),d}var L={name:"NotificationModal",components:{Notification,DragResize},data(){return{coordinates:{width:Quasar.plugins.Screen.width-100,height:Quasar.plugins.Screen.height-100,top:0,left:Quasar.plugins.Screen.width-(Quasar.plugins.Screen.width-50)}}},computed:{...mapGetters(["maximized","moduleName"]),dialog:{set(a){this.$store.commit("Notification/setDialog",a)},get(){return this.$store.getters["Notification/dialog"]}},maximized:{set(a){this.$store.commit("Notification/setMaximized",a)},get(){return this.$store.getters["Notification/maximized"]}}},methods:{...mapActions(["fetchCategories","initState"]),onChangeCoordinates:function(a){this.coordinates=a}},async created(){await this.initState(this.$options.state)}},M="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase()),N=document.head||document.getElementsByTagName("head")[0],O={};/* style inject SSR */var P=function(a,b,c,d,e,f/* server only */,g,h,i,j){"boolean"!=typeof g&&(i=h,h=g,g=!1);// Vue.extend constructor export interop.
var k="function"==typeof c?c.options:c;// render functions
a&&a.render&&(k.render=a.render,k.staticRenderFns=a.staticRenderFns,k._compiled=!0,e&&(k.functional=!0)),d&&(k._scopeId=d);var l;if(f?(l=function(a){a=a||// cached call
this.$vnode&&this.$vnode.ssrContext||// stateful
this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,a||"undefined"==typeof __VUE_SSR_CONTEXT__||(a=__VUE_SSR_CONTEXT__),b&&b.call(this,i(a)),a&&a._registeredComponents&&a._registeredComponents.add(f)},k._ssrRegister=l):b&&(l=g?function(){b.call(this,j(this.$root.$options.shadowRoot))}:function(a){b.call(this,h(a))}),l)if(k.functional){// register for functional component in vue file
var m=k.render;k.render=function(a,b){return l.call(b),m(a,b)}}else{// inject component registration as beforeCreate hook
var n=k.beforeCreate;k.beforeCreate=n?[].concat(n,l):[l]}return c}({render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("q-dialog",{attrs:{maximized:a.maximized,"transition-show":"slide-up","transition-hide":"slide-down","content-class":"quasar-reset"},model:{value:a.dialog,callback:function(b){a.dialog=b},expression:"dialog"}},[c("q-card",{staticClass:"NotificationModal full-height"},[c("q-bar",{staticClass:"bg-yeti text-white dialog-header",attrs:{dark:""}},[c("div",{staticClass:"flex items-center"},[c("div",{staticClass:"flex items-center no-wrap ellipsis q-mr-sm-sm"},[c("span",{class:["userIcon-"+a.moduleName,"q-mr-sm"]}),a._v("\n          "+a._s(a.translate("JS_"+a.moduleName.toUpperCase()))+"\n        ")])]),a._v("\n      asd\n      "),c("q-space"),a._v(" "),a.$q.platform.is.desktop?[c("a",{directives:[{name:"show",rawName:"v-show",value:!a.maximized,expression:"!maximized"}],staticClass:"flex grabbable text-decoration-none text-white",attrs:{href:"#"}},[c("q-icon",{staticClass:"js-drag",attrs:{name:"mdi-drag",size:"19px"}})],1),a._v(" "),c("q-btn",{attrs:{dense:"",flat:"",icon:a.maximized?"mdi-window-restore":"mdi-window-maximize"},on:{click:function(){a.maximized=!a.maximized}}},[c("q-tooltip",[a._v(a._s(a.maximized?a.translate("JS_KB_MINIMIZE"):a.translate("JS_KB_MAXIMIZE")))])],1)]:a._e(),a._v(" "),c("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"mdi-close"}},[c("q-tooltip",[a._v(a._s(a.translate("JS_CLOSE")))])],1)],2),a._v(" "),c("div")],1)],1)},staticRenderFns:[]},function(a){a&&a("data-v-57d763ad_0",{source:".dialog-header{padding-top:3px!important;padding-bottom:3px!important;height:unset!important}.modal-full-height{max-height:calc(100vh - 31.14px)!important}.grabbable:hover{cursor:move;cursor:grab;cursor:-moz-grab;cursor:-webkit-grab}.grabbable:active{cursor:grabbing;cursor:-moz-grabbing;cursor:-webkit-grabbing}.contrast-50{filter:contrast(50%)}",map:void 0,media:void 0})},L,void 0,!1,void 0,function(){return function(b,c){return a(b,c)}},void 0),Q="undefined"==typeof global?"undefined"==typeof self?"undefined"==typeof window?{}:window:self:global,R=b,S=c;"function"==typeof Q.setTimeout&&(R=setTimeout),"function"==typeof Q.clearTimeout&&(S=clearTimeout);var T,U=[],V=!1,W=-1;j.prototype.run=function(){this.fun.apply(null,this.array)};var X=Q.performance||{},Y=X.now||X.mozNow||X.msNow||X.oNow||X.webkitNow||function(){return new Date().getTime()},Z=new Date,_={nextTick:h,title:"browser",browser:!0,env:{},argv:[],version:"",versions:{},on:k,addListener:k,once:k,off:k,removeListener:k,removeAllListeners:k,emit:k,binding:function(){throw new Error("process.binding is not supported")},cwd:function(){return"/"},chdir:function(){throw new Error("process.chdir is not supported")},umask:function(){return 0}// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
,hrtime:// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function(a){var b=Math.floor,c=1e-3*Y.call(X),d=b(c),e=b(1e9*(c%1));return a&&(d-=a[0],e-=a[1],0>e&&(d--,e+=1e9)),[d,e]},platform:"browser",release:{},config:{},uptime:function(){var a=new Date;return(a-Z)/1e3}},aa="undefined"==typeof window?"undefined"==typeof Q?{}:Q:window,ba=aa.__VUE_DEVTOOLS_GLOBAL_HOOK__,ca=function(a,b){this.runtime=b,this._children=Object.create(null),this._rawModule=a;var c=a.state;// Store the origin module's state
this.state=("function"==typeof c?c():c)||{}},da={namespaced:{configurable:!0}};da.namespaced.get=function(){return!!this._rawModule.namespaced},ca.prototype.addChild=function(a,b){this._children[a]=b},ca.prototype.removeChild=function(a){delete this._children[a]},ca.prototype.getChild=function(a){return this._children[a]},ca.prototype.update=function(a){this._rawModule.namespaced=a.namespaced,a.actions&&(this._rawModule.actions=a.actions),a.mutations&&(this._rawModule.mutations=a.mutations),a.getters&&(this._rawModule.getters=a.getters)},ca.prototype.forEachChild=function(a){n(this._children,a)},ca.prototype.forEachGetter=function(a){this._rawModule.getters&&n(this._rawModule.getters,a)},ca.prototype.forEachAction=function(a){this._rawModule.actions&&n(this._rawModule.actions,a)},ca.prototype.forEachMutation=function(a){this._rawModule.mutations&&n(this._rawModule.mutations,a)},Object.defineProperties(ca.prototype,da);var ea=function(a){// register root module (Vuex.Store options)
this.register([],a,!1)};ea.prototype.get=function(a){return a.reduce(function(a,b){return a.getChild(b)},this.root)},ea.prototype.getNamespace=function(a){var b=this.root;return a.reduce(function(a,c){return b=b.getChild(c),a+(b.namespaced?c+"/":"")},"")},ea.prototype.update=function(a){s([],this.root,a)},ea.prototype.register=function(a,b,c){var d=this;void 0===c&&(c=!0),t(a,b);var e=new ca(b,c);if(0===a.length)this.root=e;else{var f=this.get(a.slice(0,-1));f.addChild(a[a.length-1],e)}// register nested modules
b.modules&&n(b.modules,function(b,e){d.register(a.concat(e),b,c)})},ea.prototype.unregister=function(a){var b=this.get(a.slice(0,-1)),c=a[a.length-1];b.getChild(c).runtime&&b.removeChild(c)};var fa,ga={assert:function(a){return"function"==typeof a},expected:"function"},ha={getters:ga,mutations:ga,actions:{assert:function(a){return"function"==typeof a||"object"==typeof a&&"function"==typeof a.handler},expected:"function or object with \"handler\" function"}},ia=function a(b){var c=this;void 0===b&&(b={}),!fa&&"undefined"!=typeof window&&window.Vue&&H(window.Vue),q(fa,"must call Vue.use(Vuex) before creating a store instance."),q("undefined"!=typeof Promise,"vuex requires a Promise polyfill in this browser."),q(this instanceof a,"store must be called with the new operator.");var d=b.plugins;void 0===d&&(d=[]);var e=b.strict;void 0===e&&(e=!1),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new ea(b),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new fa;// bind commit and dispatch to self
var f=this,g=this,h=g.dispatch,i=g.commit;this.dispatch=function(a,b){return h.call(f,a,b)},this.commit=function(a,b,c){return i.call(f,a,b,c)},this.strict=e;var j=this._modules.root.state;// init root module.
// this also recursively registers all sub-modules
// and collects all module getters inside this._wrappedGetters
y(this,j,[],this._modules.root),x(this,j),d.forEach(function(a){return a(c)});var k=b.devtools===void 0?fa.config.devtools:b.devtools;k&&m(this)},ja={state:{configurable:!0}};ja.state.get=function(){return this._vm._data.$$state},ja.state.set=function(){q(!1,"use store.replaceState() to explicit replace store state.")},ia.prototype.commit=function(a,b,c){var d=this,e=G(a,b,c),f=e.type,g=e.payload,h=e.options,i={type:f,payload:g},j=this._mutations[f];// check object-style commit
return j?void(this._withCommit(function(){j.forEach(function(a){a(g)})}),this._subscribers.forEach(function(a){return a(i,d.state)}),h&&h.silent&&console.warn("[vuex] mutation type: "+f+". Silent option has been removed. Use the filter functionality in the vue-devtools")):void console.error("[vuex] unknown mutation type: "+f)},ia.prototype.dispatch=function(a,b){var c=this,d=G(a,b),e=d.type,f=d.payload,g={type:e,payload:f},h=this._actions[e];// check object-style dispatch
if(!h)return void console.error("[vuex] unknown action type: "+e);try{this._actionSubscribers.filter(function(a){return a.before}).forEach(function(a){return a.before(g,c.state)})}catch(a){console.warn("[vuex] error in before action subscribers: "),console.error(a)}var i=1<h.length?Promise.all(h.map(function(a){return a(f)})):h[0](f);return i.then(function(a){try{c._actionSubscribers.filter(function(a){return a.after}).forEach(function(a){return a.after(g,c.state)})}catch(a){console.warn("[vuex] error in after action subscribers: "),console.error(a)}return a})},ia.prototype.subscribe=function(a){return v(a,this._subscribers)},ia.prototype.subscribeAction=function(a){var b="function"==typeof a?{before:a}:a;return v(b,this._actionSubscribers)},ia.prototype.watch=function(a,b,c){var d=this;return q("function"==typeof a,"store.watch only accepts a function."),this._watcherVM.$watch(function(){return a(d.state,d.getters)},b,c)},ia.prototype.replaceState=function(a){var b=this;this._withCommit(function(){b._vm._data.$$state=a})},ia.prototype.registerModule=function(a,b,c){// reset store to update getters...
void 0===c&&(c={}),"string"==typeof a&&(a=[a]),q(Array.isArray(a),"module path must be a string or an Array."),q(0<a.length,"cannot register the root module by using registerModule."),this._modules.register(a,b),y(this,this.state,a,this._modules.get(a),c.preserveState),x(this,this.state)},ia.prototype.unregisterModule=function(a){var b=this;"string"==typeof a&&(a=[a]),q(Array.isArray(a),"module path must be a string or an Array."),this._modules.unregister(a),this._withCommit(function(){var c=F(b.state,a.slice(0,-1));fa.delete(c,a[a.length-1])}),w(this)},ia.prototype.hotUpdate=function(a){this._modules.update(a),w(this,!0)},ia.prototype._withCommit=function(a){var b=this._committing;this._committing=!0,a(),this._committing=b},Object.defineProperties(ia.prototype,ja);var ka=J(function(a,b){var c={};return I(b).forEach(function(b){var d=b.key,e=b.val;c[d]=function(){var b=this.$store.state,c=this.$store.getters;if(a){var d=K(this.$store,"mapState",a);if(!d)return;b=d.context.state,c=d.context.getters}return"function"==typeof e?e.call(this,b,c):b[e]},c[d].vuex=!0}),c}),la=J(function(a,b){var c={};return I(b).forEach(function(b){var d=b.key,e=b.val;c[d]=function(){for(var b=[],c=arguments.length;c--;)b[c]=arguments[c];// Get the commit method from store
var d=this.$store.commit;if(a){var f=K(this.$store,"mapMutations",a);if(!f)return;d=f.context.commit}return"function"==typeof e?e.apply(this,[d].concat(b)):d.apply(this.$store,[e].concat(b))}}),c}),ma=J(function(a,b){var c={};return I(b).forEach(function(b){var d=b.key,e=b.val;e=a+e,c[d]=function(){return a&&!K(this.$store,"mapGetters",a)?void 0:e in this.$store.getters?this.$store.getters[e]:void console.error("[vuex] unknown getter: "+e)},c[d].vuex=!0}),c}),na=J(function(a,b){var c={};return I(b).forEach(function(b){var d=b.key,e=b.val;c[d]=function(){for(var b=[],c=arguments.length;c--;)b[c]=arguments[c];// get dispatch function from store
var d=this.$store.dispatch;if(a){var f=K(this.$store,"mapActions",a);if(!f)return;d=f.context.dispatch}return"function"==typeof e?e.apply(this,[d].concat(b)):d.apply(this.$store,[e].concat(b))}}),c}),oa={Store:ia,install:H,version:"3.1.1",mapState:ka,mapMutations:la,mapGetters:ma,mapActions:na,createNamespacedHelpers:function(a){return{mapState:ka.bind(null,a),mapGetters:ma.bind(null,a),mapMutations:la.bind(null,a),mapActions:na.bind(null,a)}}};/**
   * Reduce the code which written in Vue.js for committing the mutation
   * @param {String} [namespace] - Module's namespace
   * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
   * @return {Object}
   */ /**
   * Knowledge base module
   *
   * @description Knowledge base vuex module
   * @license YetiForce Public License 3.0
   * @author Tomasz Poradzewski <t.poradzewski@yetiforce.com>
   */const pa={moduleName(a){return a.moduleName},record(a){return a.record},dialog(a){return a.dialog},maximized(a){return a.maximized},previewDialog(a){return a.previewDialog},previewMaximized(a){return a.previewMaximized},coordinates(a){return a.coordinates},iconSize(a){return a.iconSize},tree(a){return a.tree},defaultTreeIcon(a){return a.defaultTreeIcon}},qa={fetchRecord({state:a,commit:b,getters:c},d){console.log("fetch");const e=$.Deferred(),f=$.progressIndicator({blockInfo:{enabled:!0}});return AppConnector.request({module:c.moduleName,action:"KnowledgeBaseAjax",mode:"detail",record:d}).done(a=>{let c=a.result;c.related.base.Articles&&(c.related.base.Articles=Object.keys(c.related.base.Articles).map(function(a){return{...c.related.base.Articles[a],id:a}})),b("setRecord",c),f.progressIndicator({mode:"hide"}),e.resolve(c)})},fetchCategories({state:a,commit:b,getters:c}){const d=$.Deferred();return AppConnector.request({module:c.moduleName,action:"KnowledgeBaseAjax",mode:"categories"}).done(a=>{b("setTreeCategories",a.result),d.resolve(a.result)})},initState({state:a,commit:b},c){b("setState",c)}},ra={setState(a,b){a=Object.assign(a,b)},setRecord(a,b){a.record=b},setDialog(a,b){a.dialog=b},setMaximized(a,b){a.maximized=b},setCoordinates(a,b){a.coordinates=b},setTreeCategories(a,b){a.tree.categories=b}};/**
   * Knowledge base module
   *
   * @description Knowledge base vuex module
   * @license YetiForce Public License 3.0
   * @author Tomasz Poradzewski <t.poradzewski@yetiforce.com>
   */const sa={moduleName(a){return a.moduleName},record(a){return a.record},dialog(a){return a.dialog},maximized(a){return a.maximized},previewDialog(a){return a.previewDialog},previewMaximized(a){return a.previewMaximized},coordinates(a){return a.coordinates},iconSize(a){return a.iconSize},tree(a){return a.tree},defaultTreeIcon(a){return a.defaultTreeIcon}},ta={fetchCategories({state:a,commit:b,getters:c}){const d=$.Deferred();return AppConnector.request({module:"Notification",action:"NotificationAjax",mode:"categories"}).done(a=>{b("setTreeCategories",a.result),d.resolve(a.result)})},initState({state:a,commit:b},c){b("setState",c)}},ua={setState(a,b){a=Object.assign(a,b)},setRecord(a,b){a.record=b},setDialog(a,b){a.dialog=b},setMaximized(a,b){a.maximized=b},setCoordinates(a,b){a.coordinates=b},setTreeCategories(a,b){a.tree.categories=b}};Vue.use(oa);const va="production"!==_.env.NODE_ENV;Vue.config.devtools="production"!==_.env.NODE_ENV;new oa.Store({modules:{KnowledgeBase:{namespaced:!0,state:{defaultTreeIcon:"mdi-subdirectory-arrow-right",record:!1,dialog:!0,maximized:!0,moduleName:"",iconSize:"18px",tree:{topCategory:{icon:"mdi-file-tree",label:"JS_KB_MAIN_CATEGORIES"},categories:{}// getters
}},getters:pa,actions:qa,mutations:ra},Notification:{namespaced:!0,state:{defaultTreeIcon:"mdi-subdirectory-arrow-right",record:!1,dialog:!1,maximized:!0,moduleName:"",iconSize:"18px",tree:{topCategory:{icon:"mdi-file-tree",label:"JS_KB_MAIN_CATEGORIES"},categories:{}// getters
}},getters:sa,actions:ta,mutations:ua}},strict:va});/**
   * Notification components initializations
   *
   * @description Notification views' instances
   * @license YetiForce Public License 3.0
   * @author Tomasz Poradzewski <t.poradzewski@yetiforce.com>
   */console.log("asdfasdf"),Vue.mixin({methods:{translate(a){return app.vtranslate(a)}}}),window.NotificationModalVueComponent={component:P,mount(a){return P.state=a.state,new Vue({// store,
render:a=>a(P)}).$mount(a.el)}}})();
//# sourceMappingURL=Notification.vue.js.map
