(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{772:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(26),i=n(37),c=n(10),u=n(635),l=n.n(u),s=n(22),f=n(35),p=n(27);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function y(e,t,n,r,a,o,i){try{var c=e[o](i),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,a)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){y(o,r,a,i,c,"next",e)}function c(e){y(o,r,a,i,c,"throw",e)}i(void 0)}))}}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=C(e);if(t){var a=C(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return w(this,n)}}function w(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?E(e):t}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k=new s.a,j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(n,e);var t=S(n);function n(){var e;g(this,n);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return O(E(e=t.call.apply(t,[this].concat(o))),"state",{worker:e.props.match.params.id,name:"",file:"",issued_by:"",submitCallback:"",error:!1}),O(E(e),"handleChange",(function(t){e.setState(O({},t.target.name,t.target.value))})),O(E(e),"handleFileUpload",(function(t){e.setState(O({},t.target.name,t.target.files[0]))})),O(E(e),"handleSubmit",function(){var t=h(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),e.props.changeSubmitState(),e.requestData=e.state,delete e.requestData.error,e.formData=new FormData,Object.entries(e.requestData).forEach((function(t){var n=b(t,2),r=n[0],a=n[1];e.formData.append(r,a)})),t.next=8,k.createEntityWithFile("worker_special_competencies",e.formData).then((function(){e.state.submitCallback()})).catch((function(t){console.error(t),e.setState({error:"Document creation failed! Please check your input and try again! In case this problem repeats, please contact your administrator!"})})).finally((function(){return e.props.changeSubmitState()}));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),O(E(e),"handleSimpleSubmit",(function(){e.setState({submitCallback:function(){return e.props.history.push("/workers/".concat(e.props.match.params.id,"/competencies"))}})})),O(E(e),"handleSubmitOneMore",(function(){e.setState({submitCallback:function(){return e.setState({name:"",file:"",issued_by:"",submitCallback:""})}})})),O(E(e),"componentDidMount",h(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.getProfileFetch().catch((function(e){return console.log(e)})).finally((function(){return e.props.changeLoadingState()}));case 2:case"end":return t.stop()}}),t)})))),O(E(e),"render",(function(){return a.a.createElement(c.bb,null,a.a.createElement(c.q,null,a.a.createElement(c.f,null,a.a.createElement(c.i,null,a.a.createElement(c.k,null,"New Special competency"),a.a.createElement(c.j,null,"Please, fill in this form to create new special competency for worker.")),a.a.createElement(c.g,null,a.a.createElement(p.d,{loading:e.props.loading},a.a.createElement(c.B,{onSubmit:e.handleSubmit},a.a.createElement(l.a,null),a.a.createElement(c.C,null,a.a.createElement(c.K,{id:"name",name:"name",placeholder:"Competency name",value:e.state.name,onChange:e.handleChange,disabled:e.props.submitting,readOnly:e.props.submitting,required:!0})),a.a.createElement(c.C,null,a.a.createElement(c.R,{htmlFor:"file"},"File"),a.a.createElement(c.L,{id:"file",name:"file",onChange:e.handleFileUpload,key:e.state.file,disabled:e.props.submitting,readOnly:e.props.submitting,required:!0})),a.a.createElement(c.C,null,a.a.createElement(c.K,{id:"issued_by",name:"issued_by",placeholder:"Competency issued by",value:e.state.issued_by,onChange:e.handleChange,disabled:e.props.submitting,readOnly:e.props.submitting,required:!0})),a.a.createElement(c.C,null,a.a.createElement(c.bb,null,a.a.createElement(c.q,{md:"6"},a.a.createElement(c.e,{shape:"pill",onClick:e.handleSimpleSubmit,type:"submit",color:"dark",variant:"outline",disabled:e.props.submitting,block:!0},a.a.createElement(p.b,{submitting:e.state.submitting}),"Create Competency")),a.a.createElement(c.q,{md:"6"},a.a.createElement(c.e,{shape:"pill",onClick:e.handleSubmitOneMore,type:"submit",color:"primary",variant:"outline",disabled:e.props.submitting,block:!0},a.a.createElement(p.b,{submitting:e.state.submitting}),"Create and add one more Competency")))),e.state.error?a.a.createElement("p",null,e.state.error):null))))))})),e}return n}(r.Component);t.default=Object(i.b)((function(e){return{company:e.currentUser.company}}),(function(e){return{getProfileFetch:function(){return e(Object(f.j)())}}}))(Object(o.h)(Object(p.c)(j)))}}]);
//# sourceMappingURL=36.main.js.map