/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/App.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/common/app.js */ \"./src/common/app.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'App',\n  data: function data() {\n    return {\n      links: ['home', 'tasks', 'add', 'account'],\n      paths: {\n        home: '/',\n        tasks: '/task',\n        add: '/task/new',\n        account: '/account'\n      },\n      linkDisplay: {\n        home: 'Home',\n        tasks: 'Todo Tasks',\n        account: 'Account',\n        add: 'Add Task'\n      },\n      allTasks: null\n    };\n  },\n  mounted: function mounted() {\n    this.refreshTasks();\n    this.$store.dispatch('authUser');\n  },\n  methods: {\n    refreshTasks: function refreshTasks() {\n      var _this = this;\n\n      _common_app_js__WEBPACK_IMPORTED_MODULE_0__[\"axios\"].get('task').then(function (response) {\n        _this.allTasks = response.data.task;\n\n        _this.allTasks.sort(function (a, b) {\n          return a.priority > b.priority ? 1 : -1;\n        });\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/App.vue?vue&type=template&id=7ba5bd90 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nvar _hoisted_1 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(\"h1\", null, \"Task Master\", -1\n/* HOISTED */\n);\n\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  var _component_router_link = Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"resolveComponent\"])(\"router-link\");\n\n  var _component_router_view = Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"resolveComponent\"])(\"router-view\");\n\n  return Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createBlock\"])(vue__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createCommentVNode\"])(\" <home-page v-bind:allTasks=\\\"allTasks.sort((a,b) => (a.priority > b.priority) ? 1:-1)\\\"></home-page> \"), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(\"div\", null, [_hoisted_1, Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(\"nav\", null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(\"ul\", null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(\"li\", null, [(Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"openBlock\"])(true), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createBlock\"])(vue__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"renderList\"])($data.links, function (link) {\n    return Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"openBlock\"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createBlock\"])(_component_router_link, {\n      key: link,\n      to: $data.paths[link]\n    }, {\n      default: Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"withCtx\"])(function () {\n        return [Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createTextVNode\"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"toDisplayString\"])($data.linkDisplay[link]), 1\n        /* TEXT */\n        )];\n      }),\n      _: 2\n      /* DYNAMIC */\n\n    }, 1032\n    /* PROPS, DYNAMIC_SLOTS */\n    , [\"to\"]);\n  }), 128\n  /* KEYED_FRAGMENT */\n  ))])])]), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createCommentVNode\"])(\" <button @click=\\\"$router.push('/task/new')\\\">Add Task</button> \"), Object(vue__WEBPACK_IMPORTED_MODULE_0__[\"createVNode\"])(_component_router_view, {\n    allTasks: $data.allTasks,\n    onUpdateTasks: _cache[1] || (_cache[1] = function ($event) {\n      return $options.refreshTasks($event);\n    })\n  }, null, 8\n  /* PROPS */\n  , [\"allTasks\"])])], 2112\n  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */\n  );\n}\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./src/assets/taskmaster.css?vue&type=style&index=0&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./src/assets/taskmaster.css?vue&type=style&index=0&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n#app {\\n    font-family: Avenir, Helvetica, Arial, sans-serif;\\n    -webkit-font-smoothing: antialiased;\\n    -moz-osx-font-smoothing: grayscale;\\n    text-align: center;\\n    color: #2c3e50;\\n    margin-top: 60px;\\n}\\nnav ul {\\n    list-style-type: none;\\n}\\nnav ul li {\\n    display: inline-block;\\n}\\nnav ul li a:link,\\na:visited,\\na:hover,\\na:active {\\n    /* Ref: https://stackoverflow.com/a/49783868 for why inline-block is added */\\n    display: inline-block;\\n    text-transform: capitalize;\\n    padding: 5px;\\n    margin: 5px;\\n    cursor: pointer;\\n    color: var(--blue);\\n    font-weight: bold;\\n}\\nnav ul li a.router-link-active:link,\\na.router-link-active:visited,\\na.router-link-active:hover,\\na.router-link-active:active {\\n    text-decoration: none;\\n    color: var(--black);\\n    background-color: var(--light-blue);\\n    cursor: inherit;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/assets/taskmaster.css?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./src/assets/taskmaster.css?vue&type=style&index=0&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./src/assets/taskmaster.css?vue&type=style&index=0&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader-v16/dist/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!./taskmaster.css?vue&type=style&index=0&lang=css */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./src/assets/taskmaster.css?vue&type=style&index=0&lang=css\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"b7c1c488\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/assets/taskmaster.css?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90 */ \"./src/App.vue?vue&type=template&id=7ba5bd90\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js */ \"./src/App.vue?vue&type=script&lang=js\");\n/* empty/unused harmony star reexport *//* harmony import */ var _assets_taskmaster_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/assets/taskmaster.css?vue&type=style&index=0&lang=css */ \"./src/assets/taskmaster.css?vue&type=style&index=0&lang=css\");\n\n\n\n\n\n_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render = _App_vue_vue_type_template_id_7ba5bd90__WEBPACK_IMPORTED_MODULE_0__[\"render\"]\n/* hot reload */\nif (false) {}\n\n_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].__file = \"src/App.vue\"\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js":
/*!*********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader-v16/dist??ref--0-1!./App.vue?vue&type=script&lang=js */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_App_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* empty/unused harmony star reexport */ \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90":
/*!***************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90 ***!
  \***************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_App_vue_vue_type_template_id_7ba5bd90__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader-v16/dist??ref--0-1!./App.vue?vue&type=template&id=7ba5bd90 */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_App_vue_vue_type_template_id_7ba5bd90__WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/assets/taskmaster.css?vue&type=style&index=0&lang=css":
/*!*******************************************************************!*\
  !*** ./src/assets/taskmaster.css?vue&type=style&index=0&lang=css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_taskmaster_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader-v16/dist/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!./taskmaster.css?vue&type=style&index=0&lang=css */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./src/assets/taskmaster.css?vue&type=style&index=0&lang=css\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_taskmaster_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_taskmaster_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_taskmaster_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_taskmaster_css_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/assets/taskmaster.css?");

/***/ }),

/***/ "./src/common/app.js":
/*!***************************!*\
  !*** ./src/common/app.js ***!
  \***************************/
/*! exports provided: axios */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"axios\", function() { return axios; });\nvar _process$env$VUE_APP_;\n\nvar axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\").create({\n  baseURL: (_process$env$VUE_APP_ = Object({\"NODE_ENV\":\"development\",\"VUE_APP_APIURL\":\"http://e28api.trinigooner.me\",\"BASE_URL\":\"/\"}).VUE_APP_API_URL) !== null && _process$env$VUE_APP_ !== void 0 ? _process$env$VUE_APP_ : 'http://e28api.trinigooner.loc/',\n  responseType: 'json',\n  withCredentials: true\n});\n\n//# sourceURL=webpack:///./src/common/app.js?");

/***/ }),

/***/ "./src/common/router.js":
/*!******************************!*\
  !*** ./src/common/router.js ***!
  \******************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"router\", function() { return router; });\n/* harmony import */ var _Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm-bundler.js\");\n/* harmony import */ var _common_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/common/store */ \"./src/common/store.js\");\n\n\n\n\n\n\n // Define all the routes of our application\n\nvar routes = [{\n  path: '/',\n  // Rather than having to have separate import statements at the top of this page for each component\n  // Here’s a simple way we can directly make our components available\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! @/components/pages/HomePage.vue */ \"./src/components/pages/HomePage.vue\"));\n  }\n}, {\n  path: '/task',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! @/components/pages/TasksPage.vue */ \"./src/components/pages/TasksPage.vue\"));\n  }\n}, {\n  path: '/task/new',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! @/components/pages/AddTaskPage.vue */ \"./src/components/pages/AddTaskPage.vue\"));\n  },\n  meta: {\n    requiresAuth: true\n  }\n}, {\n  path: '/account',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! @/components/pages/AccountsPage.vue */ \"./src/components/pages/AccountsPage.vue\"));\n  }\n}, {\n  // This is a route we can direct the user to if they try to access \n  // a part of the site they don’t have privileges for\n  path: '/denied',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! @/components/pages/AccessDeniedPage.vue */ \"./src/components/pages/AccessDeniedPage.vue\"));\n  }\n}]; // Initialize our router\n\nvar router = Object(vue_router__WEBPACK_IMPORTED_MODULE_5__[\"createRouter\"])({\n  history: Object(vue_router__WEBPACK_IMPORTED_MODULE_5__[\"createWebHistory\"])(),\n  routes: routes\n}); // beforeEach provides a way to execute some code before a route is resolved\n// Ref: https://router.vuejs.org/guide/advanced/navigation-guards.html\n\nrouter.beforeEach( /*#__PURE__*/function () {\n  var _ref = Object(_Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(to) {\n    var requiresAuth, decide, authUser;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            // Exact the meta information from our routes\n            // Ref: https://router.vuejs.org/guide/advanced/meta.html#route-meta-fields\n            requiresAuth = to.matched.some(function (record) {\n              return record.meta.requiresAuth;\n            }); // Put the “decide what to do” code into a method so we can wait to invoke it\n            // once we have the user data\n\n            decide = function decide(user) {\n              if (requiresAuth && !user) {\n                // If they’re trying to access a requiresAuth route and they’re not logged in, \n                // they get sent to “Access Denied” page\n                return '/denied';\n              } else {\n                // Otherwise, allow them to intended destination\n                return true;\n              }\n            }; // If we don’t have the user yet, dispatch our Vuex authUser action\n\n\n            if (!(_common_store__WEBPACK_IMPORTED_MODULE_6__[\"store\"].state.user === null)) {\n              _context.next = 10;\n              break;\n            }\n\n            _context.next = 5;\n            return _common_store__WEBPACK_IMPORTED_MODULE_6__[\"store\"].dispatch('authUser');\n\n          case 5:\n            authUser = _context.sent;\n\n            if (!(authUser !== null)) {\n              _context.next = 8;\n              break;\n            }\n\n            return _context.abrupt(\"return\", decide(_common_store__WEBPACK_IMPORTED_MODULE_6__[\"store\"].state.user));\n\n          case 8:\n            _context.next = 11;\n            break;\n\n          case 10:\n            return _context.abrupt(\"return\", decide(_common_store__WEBPACK_IMPORTED_MODULE_6__[\"store\"].state.user));\n\n          case 11:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n}());\n\n\n//# sourceURL=webpack:///./src/common/router.js?");

/***/ }),

/***/ "./src/common/store.js":
/*!*****************************!*\
  !*** ./src/common/store.js ***!
  \*****************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"store\", function() { return store; });\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-browser.js\");\n/* harmony import */ var _common_app_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/common/app.js */ \"./src/common/app.js\");\n\n\n // Only load the createLogger plugin when in development mode\n\nvar debug = \"development\" !== 'production';\nvar plugins = debug ? [Object(vuex__WEBPACK_IMPORTED_MODULE_1__[\"createLogger\"])({})] : [];\nvar store = Object(vuex__WEBPACK_IMPORTED_MODULE_1__[\"createStore\"])({\n  plugins: plugins,\n  state: function state() {\n    return {\n      user: null\n    };\n  },\n  mutations: {\n    // [...existing mutations...]\n    setUser: function setUser(state, payload) {\n      state.user = payload;\n    }\n  },\n  actions: {\n    // [...existing actions...]\n    authUser: function authUser(context) {\n      return new Promise(function (resolve) {\n        _common_app_js__WEBPACK_IMPORTED_MODULE_2__[\"axios\"].post('auth').then(function (response) {\n          if (response.data.authenticated) {\n            context.commit('setUser', response.data.user);\n          } else {\n            context.commit('setUser', false);\n          }\n\n          resolve();\n        });\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/common/store.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Applications_XAMPP_xamppfiles_htdocs_e28_p3_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _common_store_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/common/store.js */ \"./src/common/store.js\");\n/* harmony import */ var _common_router_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/common/router.js */ \"./src/common/router.js\");\n\n\n\n\n\n\n\n // import HomePage from '@/components/pages/HomePage.vue'\n// import TasksPage from '@/components/pages/TasksPage.vue'\n// const router = createRouter({\n//     history: createWebHistory(),\n//     routes: [\n//         { path: '/', component: HomePage},\n//         { path: '/task', component: TasksPage}\n//     ]\n// })\n\nObject(vue__WEBPACK_IMPORTED_MODULE_4__[\"createApp\"])(_App_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]).use(_common_router_js__WEBPACK_IMPORTED_MODULE_7__[\"router\"]).use(_common_store_js__WEBPACK_IMPORTED_MODULE_6__[\"store\"]).mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });