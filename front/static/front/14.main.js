(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{633:function(e,t,r){"use strict";var n=r(1),o=r.n(n),a=r(95),c=r(29),i=r(166),u=r(165),l=r(60);function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var c,i=e[Symbol.iterator]();!(n=(c=i.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==i.return||i.return()}finally{if(o)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function p(e,t,r,n,o,a,c){try{var i=e[a](c),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(n,o)}var m=new c.a,d=[{Works_started:"Works started"},{Works_finished:"Works finished"},{Extended:"Extended"},{Closed:"Closed"}],y=function(){var e,t=(e=regeneratorRuntime.mark((function e(t,r){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.value,o=t.props,e.next=3,m.patchEntityOf("projects",o.item.id,{status:n}).then((function(){o.getProjectList()}));case 3:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function c(e){p(a,n,o,c,i,"next",e)}function i(e){p(a,n,o,c,i,"throw",e)}c(void 0)}))});return function(e,r){return t.apply(this,arguments)}}();t.a=Object(a.b)((function(e){return{role:e.currentUser.role}}),(function(e){return{getProjectList:function(){return e(Object(i.h)())}}}))((function(e){return"CliAdm"===e.role&&"Application processing"!==e.item.work_status?o.a.createElement(u.q,null,o.a.createElement(u.t,{className:"project-table-toggle"},o.a.createElement(l.a,{style:{margin:"0"},className:"table-dropdown-icon",name:"cilSettings"})),o.a.createElement(u.s,{className:"p-0 foxtable-dropdown-menu",placement:"bottom-end"},d.map((function(t,r){var n=s(Object.entries(t)[0],2),a=n[0],c=n[1];return o.a.createElement(u.r,{key:r,value:a,onClick:function(t){return y({value:a,props:e},t)}},c)})))):null}))},634:function(e,t,r){"use strict";var n=r(1),o=r.n(n),a=r(95),c=r(165),i=r(633);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=y(e);if(t){var o=y(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return m(this,r)}}function m(e,t){return!t||"object"!==u(t)&&"function"!=typeof t?d(e):t}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(r,e);var t=p(r);function r(){var e;s(this,r);for(var n=arguments.length,a=new Array(n),u=0;u<n;u++)a[u]=arguments[u];return b(d(e=t.call.apply(t,[this].concat(a))),"alertOnClick",(function(t,r){e.props.history.push("".concat(e.props.match.url,"/").concat(t))})),b(d(e),"render",(function(){var t,r=e.props.fields?e.props.fields[0]:"username";return o.a.createElement(c.V,null,o.a.createElement(c.l,null,o.a.createElement(c.f,null,o.a.createElement(c.i,{className:"d-flex justify-content-between"},o.a.createElement(c.k,null,e.props.tableName),"Projects"===e.props.tableName&&"Contr"===e.props.role?null:o.a.createElement(c.M,{className:"btn btn-pill btn-outline-success",to:"".concat(e.props.match.url,"/new")},"Add new")),o.a.createElement(c.g,null,o.a.createElement(c.p,{items:e.props.tableData?e.props.tableData:[],fields:e.props.fields?e.props.fields:[],clickableRows:!0,hover:!0,striped:!0,bordered:!0,sorter:!0,tableFilter:!0,columnFilter:!0,size:"sm",itemsPerPage:10,itemsPerPageSelect:!0,pagination:!0,scopedSlots:(t={},b(t,r,(function(t){return o.a.createElement("td",null,o.a.createElement(c.M,{to:"".concat(e.props.match.url,"/").concat(t.id)},t[r]))})),b(t,"application_status",(function(t){return o.a.createElement("td",null,o.a.createElement(c.a,{shape:"pill",color:e.props.getBadge(t.application_status)},t.application_status))})),b(t,"work_status",(function(t){return o.a.createElement("td",{className:"d-flex align-items-center"},o.a.createElement(c.a,{shape:"pill",color:e.props.getBadge(t.work_status)},t.work_status),o.a.createElement(i.a,l({key:t.id,item:t},e.props)))})),t)})))))})),e}return r}(n.Component);t.a=Object(a.b)((function(e){return{role:e.currentUser.role}}),null)(h)},742:function(e,t,r){"use strict";r.r(t);var n=r(1),o=r.n(n),a=r(634);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var i=[{id:0,name:"John Doe",registered:"2018/01/01",role:"Guest",status:"Pending"},{id:1,name:"Samppa Nori",registered:"2018/01/01",role:"Member",status:"Active"},{id:2,name:"Estavan Lykos",registered:"2018/02/01",role:"Staff",status:"Banned"}],u=function(e){switch(e){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}},l=["name","registered","role","status"],s=function(){alert("Clicked!")};t.default=function(){return o.a.createElement(a.a,c({},(void 0).props,{tableName:"Current Works",fields:l,getBadge:u,usersData:i,onRowClick:s}))}}}]);
//# sourceMappingURL=14.main.js.map