(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{634:function(t,e,r){"use strict";var n=r(1),o=r.n(n),c=r(37),a=r(22),u=r(35),i=r(10),l=r(64);function s(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},c=Object.keys(t);for(n=0;n<c.length;n++)r=c[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(n=0;n<c.length;n++)r=c[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){S(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function y(){return(y=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function b(t){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function m(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var r=[],n=!0,o=!1,c=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,c=t}finally{try{n||null==u.return||u.return()}finally{if(o)throw c}}return r}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return d(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return d(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function h(t,e,r,n,o,c,a){try{var u=t[c](a),i=u.value}catch(t){return void r(t)}u.done?e(i):Promise.resolve(i).then(n,o)}function g(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var c=t.apply(e,r);function a(t){h(c,n,o,a,u,"next",t)}function u(t){h(c,n,o,a,u,"throw",t)}a(void 0)}))}}function O(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=E(t);if(e){var o=E(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return j(this,r)}}function j(t,e){return!e||"object"!==b(e)&&"function"!=typeof e?P(t):e}function P(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function E(t){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function S(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var _=new a.a,x=[{Works_started:"Works started"},{Works_finished:"Works finished"},{Extended:"Extended"},{Closed:"Closed"}],k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(r,t);var e=w(r);function r(){var t;O(this,r);for(var n=arguments.length,c=new Array(n),a=0;a<n;a++)c[a]=arguments[a];return S(P(t=e.call.apply(e,[this].concat(c))),"handleClick",function(){var e=g(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Extended"!==r){e.next=4;break}t.props.showExtendModal({modalType:"extendModal",projectId:t.props.item.id,updateList:t.props.updateList}),e.next=6;break;case 4:return e.next=6,_.patchEntityOf("projects",t.props.item.id,{status:r}).then((function(){t.props.getProjectList()}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),S(P(t),"render",(function(){return"CliAdm"===t.props.role&&"Application processing"!==t.props.item.work_status?o.a.createElement(o.a.Fragment,null,o.a.createElement(i.w,null,o.a.createElement(i.z,{className:"project-table-toggle"},o.a.createElement(l.a,{style:{margin:"0"},className:"table-dropdown-icon",name:"cilSettings"})),o.a.createElement(i.y,{className:"p-0 foxtable-dropdown-menu",placement:"bottom-end"},x.map((function(e,r){var n=m(Object.entries(e)[0],2),c=n[0],a=n[1];return o.a.createElement(i.x,{key:r,value:c,onClick:function(e){return t.handleClick(c,e)}},a)}))))):null})),t}return r}(n.Component);e.a=Object(c.b)((function(t){return{role:t.currentUser.role}}),(function(t){return{getProjectList:function(e){var r=y({},e);return t(Object(u.k)(f({},r)))},showExtendModal:function(e){var r=e.modalType,n=s(e,["modalType"]);return t(Object(u.t)(f({modalType:r},n)))}}}))(k)},635:function(t,e,r){"use strict";var n=r(1),o=r.n(n),c=r(37),a=r(10),u=r(634);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=m(t);if(e){var o=m(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return y(this,r)}}function y(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?b(t):e}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function d(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var h=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(r,t);var e=f(r);function r(){var t;s(this,r);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return d(b(t=e.call.apply(e,[this].concat(c))),"alertOnClick",(function(e,r){t.props.history.push("".concat(t.props.match.url,"/").concat(e))})),d(b(t),"render",(function(){var e,r=t.props.fields?t.props.fields[0]:"username";return o.a.createElement(a.cb,null,o.a.createElement(a.r,null,o.a.createElement(a.g,null,o.a.createElement(a.j,{className:"d-flex justify-content-between"},o.a.createElement(a.l,null,t.props.tableName),t.props.showNewButton?o.a.createElement(a.T,{className:"btn btn-pill btn-outline-success",to:"".concat(t.props.match.url,"/new")},"Add new"):null),o.a.createElement(a.h,null,o.a.createElement(a.v,{items:t.props.tableData?t.props.tableData:[],fields:t.props.fields?t.props.fields:[],loading:t.props.loading,clickableRows:!0,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:!0,columnFilter:!0,size:"sm",itemsPerPage:10,itemsPerPageSelect:!0,pagination:!0,scopedSlots:(e={},d(e,r,(function(e){return o.a.createElement("td",null,o.a.createElement(a.T,{to:"".concat(t.props.match.url,"/").concat(e.id)},e[r]))})),d(e,"application_status",(function(e){return o.a.createElement("td",null,o.a.createElement(a.a,{shape:"pill",color:t.props.getBadge(e.application_status)},e.application_status))})),d(e,"work_status",(function(e){return o.a.createElement("td",{className:"d-flex align-items-center"},o.a.createElement(a.a,{shape:"pill",color:t.props.getBadge(e.work_status)},e.work_status),o.a.createElement(u.a,l({key:e.id,item:e},t.props)))})),e)})))))})),t}return r}(n.Component);e.a=Object(c.b)((function(t){return{role:t.currentUser.role}}),null)(h)},637:function(t,e,r){"use strict";r.d(e,"a",(function(){return n.a})),r.d(e,"b",(function(){return x}));var n=r(635),o=r(1),c=r.n(o),a=r(37),u=r(10),i=r(64),l=r(634),s=r(22),p=r(35);function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function y(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},c=Object.keys(t);for(n=0;n<c.length;n++)r=c[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(n=0;n<c.length;n++)r=c[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}function b(t){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function m(){return(m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function d(t,e,r,n,o,c,a){try{var u=t[c](a),i=u.value}catch(t){return void r(t)}u.done?e(i):Promise.resolve(i).then(n,o)}function h(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var c=t.apply(e,r);function a(t){d(c,n,o,a,u,"next",t)}function u(t){d(c,n,o,a,u,"throw",t)}a(void 0)}))}}function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function O(t,e){return(O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=P(t);if(e){var o=P(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return w(this,r)}}function w(t,e){return!e||"object"!==b(e)&&"function"!=typeof e?j(t):e}function j(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function P(t){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function E(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var S=new s.a,_=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}(r,t);var e=v(r);function r(){var t;g(this,r);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];return E(j(t=e.call.apply(e,[this].concat(o))),"state",{error:""}),E(j(t),"getEntityFromTableName",(function(){t.props.tableName.toLowercase()})),E(j(t),"callDeleteModal",(function(e){t.props.updateModal({modalType:"deleteModal",entity:"entity",confirmDelete:function(){return t.confirmDelete(e)}})})),E(j(t),"confirmDelete",function(){var e=h(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.props.tableName.toLowerCase().replace(" ","_"),e.next=3,S.deleteEntityOf(n,r).then(h(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.props.updateList({role:t.props.role});case 2:case"end":return e.stop()}}),e)})))).then((function(){return t.props.updateModal("",{})})).catch((function(e){console.error(e),t.setState({error:"Could not delete entity! Please check your input and try again! In case this problem repeats, please contact your administrator!"})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),E(j(t),"render",(function(){var e,r=t.props.fields?t.props.fields[0]:"username";return c.a.createElement(u.cb,null,c.a.createElement(u.r,null,c.a.createElement(u.g,null,c.a.createElement(u.j,{className:"d-flex justify-content-between"},c.a.createElement(u.l,null,t.props.tableName),t.props.showNewButton?c.a.createElement(u.T,{className:"btn btn-pill btn-outline-success",to:"".concat(t.props.match.url,"/new")},"Add new"):null),c.a.createElement(u.h,null,c.a.createElement(u.v,{items:t.props.tableData?t.props.tableData:[],fields:t.props.fields,loading:t.props.loading,clickableRows:!0,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:!0,columnFilter:!0,size:"sm",itemsPerPage:10,itemsPerPageSelect:!0,pagination:!0,scopedSlots:(e={},E(e,r,(function(e){return c.a.createElement("td",null,c.a.createElement(u.T,{to:"".concat(t.props.match.url,"/").concat(e.id)},e[r]))})),E(e,"application_status",(function(e){return c.a.createElement("td",null,c.a.createElement(u.a,{shape:"pill",color:t.props.getBadge(e.application_status)},e.application_status))})),E(e,"work_status",(function(e){return c.a.createElement("td",{className:"d-flex align-items-center"},c.a.createElement(u.a,{shape:"pill",color:t.props.getBadge(e.work_status)},e.work_status),c.a.createElement(l.a,m({key:e.id,item:e},t.props)))})),E(e,"delete_item",(function(e,r){return c.a.createElement("td",null,c.a.createElement(u.e,{color:"danger",variant:"ghost",size:"sm",onClick:function(){return t.callDeleteModal(e.id)},block:!0},c.a.createElement(i.a,{name:"cilTrash"})))})),e)})))))})),t}return r}(o.Component),x=Object(a.b)((function(t){return{role:t.currentUser.role}}),(function(t){return{updateModal:function(e){var r=e.modalType,n=y(e,["modalType"]);return t(Object(p.t)(function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){E(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({modalType:r},n)))}}}))(_)},744:function(t,e,r){"use strict";r.r(e);var n=r(1),o=r.n(n),c=r(37),a=r(637),u=r(35),i=r(27);function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){w(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function f(){return(f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function y(t,e,r,n,o,c,a){try{var u=t[c](a),i=u.value}catch(t){return void r(t)}u.done?e(i):Promise.resolve(i).then(n,o)}function b(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var c=t.apply(e,r);function a(t){y(c,n,o,a,u,"next",t)}function u(t){y(c,n,o,a,u,"throw",t)}a(void 0)}))}}function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){return(d=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=v(t);if(e){var o=v(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return g(this,r)}}function g(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?O(t):e}function O(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function v(t){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function w(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var j=function(t){switch(t){case"Created":return"secondary";case"Submitted":return"warning";case"Approved":return"success";case"Rejected":return"danger";case"Application processing":return"secondary";case"Ready to start":return"success";case"Works started":return"info";case"Works finished":return"warning";case"Extended":return"primary";case"Closed":return"dark";default:return"primary"}},P=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&d(t,e)}(r,t);var e=h(r);function r(){var t;m(this,r);for(var n=arguments.length,c=new Array(n),u=0;u<n;u++)c[u]=arguments[u];return w(O(t=e.call.apply(e,[this].concat(c))),"componentDidMount",b(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.props.setProjectId(t.props.match.params.id),e.next=3,t.props.getProfileFetch().then((function(){return t.props.getProjectList({role:t.props.role,signal:t.abortController.signal})})).catch((function(t){return console.log(t)})).finally((function(){return t.props.changeLoadingState()}));case 3:case"end":return e.stop()}}),e)})))),w(O(t),"componentWillUnmount",b(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.abortController.abort(),e.next=3,t.props.clearList();case 3:case"end":return e.stop()}}),e)})))),w(O(t),"abortController",new window.AbortController),w(O(t),"render",(function(){return"CliAdm"==t.props.role?o.a.createElement(a.b,f({},t.props,{tableName:"Projects",fields:t.props.projectTable.fields,getBadge:j,tableData:t.props.projectTable.tableData,updateList:function(){var e=b(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=f({},r),e.next=3,t.props.getProjectList(p({signal:t.abortController.signal},n));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),loading:t.props.loading,showNewButton:!0})):o.a.createElement(a.a,f({},t.props,{tableName:"Projects",fields:t.props.projectTable.fields,getBadge:j,tableData:t.props.projectTable.tableData,loading:t.props.loading}))})),t}return r}(n.Component);e.default=Object(c.b)((function(t){return{projectTable:t.entityListTable,role:t.currentUser.role}}),(function(t){return{getProfileFetch:function(){return t(Object(u.j)())},getProjectList:(e=b(regeneratorRuntime.mark((function e(r){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=f({},r),e.next=3,t(Object(u.k)(p({},n)));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)}))),function(t){return e.apply(this,arguments)}),setProjectId:function(){return t(Object(u.s)())},clearList:function(){return t(Object(u.c)())}};var e}))(Object(i.c)(P))}}]);
//# sourceMappingURL=8.main.js.map