(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{765:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(56),c=n(47),u=n(12),i=n(635),l=n.n(i);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){E(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var c,u=e[Symbol.iterator]();!(r=(c=u.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function h(e,t,n,r,o,a,c){try{var u=e[a](c),i=u.value}catch(e){return void n(e)}u.done?t(i):Promise.resolve(i).then(r,o)}function y(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function c(e){h(a,r,o,c,u,"next",e)}function u(e){h(a,r,o,c,u,"throw",e)}c(void 0)}))}}function b(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function w(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=_(e);if(t){var o=_(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return g(this,n)}}function g(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?O(e):t}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var j=new(n(22).a),D=[{id:1,name:"URL"},{id:2,name:"File upload"}],S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(n,e);var t=w(n);function n(){var e;b(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return E(O(e=t.call.apply(t,[this].concat(a))),"state",{name:"",file:"",project:e.props.match.params.id,url_to_doc:"",error:!1,upload_option:2}),E(O(e),"handleChange",(function(t){e.setState(E({},t.target.name,t.target.value))})),E(O(e),"handleFileUpload",(function(t){e.setState(E({},t.target.name,t.target.files[0]))})),E(O(e),"downloadFile",y(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.downloadDocument(e.props.match.params.doc_id).then((function(t){var n=window.URL.createObjectURL(new Blob([t])),r=document.createElement("a");r.href=n;var o=e.state.file.split("/").pop();r.setAttribute("download",o),document.body.appendChild(r),r.click(),r.parentNode.removeChild(r)})).catch((function(e){console.error("File download failed!"),console.error(e)}));case 2:case"end":return t.stop()}}),t)})))),E(O(e),"handleSubmit",function(){var t=y(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),e.requestData=e.state,"1"===e.requestData.upload_option?e.requestData.file="":e.requestData.url_to_doc="",delete e.requestData.error,delete e.requestData.upload_option,e.formData=new FormData,Object.entries(e.requestData).forEach((function(t){var n=d(t,2),r=n[0],o=n[1];e.formData.append(r,o)})),t.next=9,j.patchEntityWithFiles("documents",e.props.match.params.doc_id,e.formData).then((function(){e.props.history.goBack()}),(function(t){console.error(t),e.setState({error:"Document update failed! Please check your input and try again! In case this problem repeats, please contact your administrator!"})}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),E(O(e),"componentDidMount",y(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.getProfileFetch().then((function(){return j.getDetailsOf("documents",e.props.match.params.doc_id)})).then((function(t){t.url_to_doc?e.setState(s({upload_option:1},t)):e.setState(s({},t))}));case 2:case"end":return t.stop()}}),t)})))),E(O(e),"render",(function(){return o.a.createElement(u.ab,null,o.a.createElement(u.q,null,o.a.createElement(u.B,{onSubmit:e.handleSubmit},o.a.createElement(l.a,null),o.a.createElement(u.C,null,o.a.createElement(u.Q,{htmlFor:"name"},"Name"),o.a.createElement(u.J,{id:"name",name:"name",placeholder:"Enter document name",value:e.state.name,onChange:e.handleChange,required:!0})),o.a.createElement(u.C,null,o.a.createElement(u.Q,{htmlFor:"upload_option"},"File upload option"),o.a.createElement(u.bb,{id:"upload_option",name:"upload_option",placeholder:"Choose contractor",value:e.state.upload_option,onChange:e.handleChange,required:!0},D.map((function(e){return o.a.createElement("option",{key:e.id,value:e.id},e.name)})))),1==e.state.upload_option?o.a.createElement(u.C,null,o.a.createElement(u.Q,{htmlFor:"url_to_doc"},"Url to document"),o.a.createElement(u.J,{type:"url",id:"url_to_doc",name:"url_to_doc",placeholder:"https://example.com",pattern:"https://.*",value:e.state.url_to_doc,onChange:e.handleChange,required:!0})):o.a.createElement(o.a.Fragment,null,o.a.createElement(u.C,null,o.a.createElement(u.e,{variant:"outline",color:"success",onClick:e.downloadFile},"Link to download current file")),o.a.createElement(u.C,null,o.a.createElement(u.Q,{htmlFor:"file"},"Upload new File"),o.a.createElement(u.L,{id:"file",name:"file",onChange:e.handleFileUpload,required:!0}))),o.a.createElement(u.C,null,o.a.createElement(u.e,{type:"submit",color:"dark",variant:"outline",block:!0},"Update Document")),e.state.error?o.a.createElement("p",null,e.state.error):null)))})),e}return n}(r.Component);t.default=Object(c.b)(null,(function(e){return{getProfileFetch:function(){return e(Object(a.h)())}}}))(S)}}]);
//# sourceMappingURL=30.main.js.map