(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{633:function(e,t,n){"use strict";var r=n(1),o=n.n(r),a=n(95),c=n(165);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m(e);if(t){var o=m(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?p(e):t}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(n,e);var t=s(n);function n(){var e;l(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return d(p(e=t.call.apply(t,[this].concat(a))),"alertOnClick",(function(t,n){e.props.history.push("".concat(e.props.match.url,"/").concat(t))})),d(p(e),"render",(function(){var t,n=e.props.fields?e.props.fields[0]:"username";return o.a.createElement(c.U,null,o.a.createElement(c.k,null,o.a.createElement(c.f,null,o.a.createElement(c.i,{className:"d-flex justify-content-between"},o.a.createElement(c.j,null,e.props.tableName),"Projects"===e.props.tableName&&"Contr"===e.props.role?null:o.a.createElement(c.L,{className:"btn btn-outline-success",to:"".concat(e.props.match.url,"/new")},"Add new")),o.a.createElement(c.g,null,o.a.createElement(c.o,{items:e.props.tableData?e.props.tableData:[],fields:e.props.fields?e.props.fields:[],clickableRows:!0,hover:!0,striped:!0,bordered:!0,sorter:!0,footer:!0,tableFilter:!0,columnFilter:!0,size:"sm",itemsPerPage:10,itemsPerPageSelect:!0,pagination:!0,scopedSlots:(t={},d(t,n,(function(t){return o.a.createElement("td",null,o.a.createElement(c.e,{color:"link",onClick:function(n){e.alertOnClick(t.id,n)}},t[n]))})),d(t,"project_name",(function(t){return o.a.createElement("td",null,o.a.createElement(c.e,{color:"link",onClick:function(n){e.alertOnClick(t.id,n)}},t.project_name))})),t)})))))})),e}return n}(r.Component);t.a=Object(a.b)((function(e){return{role:e.currentUser.role}}),null)(b)},739:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(633);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var i=[{id:0,name:"John Doe",registered:"2018/01/01",role:"Guest",status:"Pending"},{id:1,name:"Samppa Nori",registered:"2018/01/01",role:"Member",status:"Active"},{id:2,name:"Estavan Lykos",registered:"2018/02/01",role:"Staff",status:"Banned"}],l=function(e){switch(e){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}},u=["name","registered","role","status"],s=function(){alert("Clicked!")};t.default=function(){return o.a.createElement(a.a,c({},(void 0).props,{tableName:"Current Works",fields:u,getBadge:l,usersData:i,onRowClick:s}))}}}]);
//# sourceMappingURL=13.main.js.map