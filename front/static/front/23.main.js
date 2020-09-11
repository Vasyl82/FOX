(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{740:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(166),i=n(95),c=n(165),l=n(632),u=n.n(l),s=n(33);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t,n,r,a,o,i){try{var c=e[o](i),l=c.value}catch(e){return void n(e)}c.done?t(l):Promise.resolve(l).then(r,a)}function f(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){p(o,r,a,i,c,"next",e)}function c(e){p(o,r,a,i,c,"throw",e)}i(void 0)}))}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=w(e);if(t){var a=w(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return g(this,n)}}function g(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?b(e):t}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=[{id:-1,position:"Choose manager position"},{id:"SafeMan",position:"Safety Manager"},{id:"SecMan",position:"Security Manager"},{id:"SecOff",position:"Security Officer"},{id:"SiteOwn",position:"Site Owner"},{id:"WorkOwn",position:"Owner of Work"},{id:"SecGrd",position:"Security Guards"}],S=new s.a,C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(n,e);var t=y(n);function n(){var e;d(this,n);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return E(b(e=t.call.apply(t,[this].concat(o))),"state",{username:"",name:"",email:"",position:-1,department:"",company:e.props.company,role:"CliMan",error:!1}),E(b(e),"handleChange",(function(t){e.setState(E({},t.target.name,t.target.value))})),E(b(e),"handleSubmit",function(){var t=f(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),-1!==parseInt(e.state.position)){t.next=5;break}e.setState({error:"Client manager position was not selected! Please, choose position form the list"}),t.next=9;break;case 5:return e.formData=e.state,delete e.formData.error,t.next=9,S.createEntityOf("client_managers",e.formData).then((function(){e.props.history.goBack()}),(function(t){console.error(t),e.setState({error:"Client manager creation failed! Please check your input and try again! In case this problem repeats, please contact your administrator!"})}));case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),E(b(e),"componentDidMount",(function(){e.props.getProfileFetch()})),E(b(e),"render",(function(){return a.a.createElement(c.U,null,a.a.createElement(c.k,null,a.a.createElement(c.v,{onSubmit:e.handleSubmit},a.a.createElement(u.a,null),a.a.createElement(c.w,null,a.a.createElement(c.K,{htmlFor:"username"},"Enter client manager username. This will be used for login"),a.a.createElement(c.D,{id:"username",name:"username",placeholder:"Username",value:e.state.username,onChange:e.handleChange,required:!0})),a.a.createElement(c.w,null,a.a.createElement(c.K,{htmlFor:"name"},"Enter client manager verbose name"),a.a.createElement(c.D,{id:"name",name:"name",placeholder:"Verbose name",value:e.state.name,onChange:e.handleChange,required:!0})),a.a.createElement(c.w,null,a.a.createElement(c.K,{htmlFor:"email"},"Enter client manager email"),a.a.createElement(c.D,{id:"email",type:"email",name:"email",placeholder:"Email",value:e.state.email,onChange:e.handleChange,required:!0})),a.a.createElement(c.w,null,a.a.createElement(c.K,{htmlFor:"position"},"Client Manager Position"),a.a.createElement(c.V,{id:"position",name:"position",placeholder:"Choose position",value:e.state.position,onChange:e.handleChange,required:!0},v.map((function(e){return a.a.createElement("option",{key:e.id,value:e.id},e.position)})))),a.a.createElement(c.w,null,a.a.createElement(c.K,{htmlFor:"department"},"Enter client manager department"),a.a.createElement(c.D,{id:"department",name:"department",placeholder:"Department",value:e.state.department,onChange:e.handleChange,required:!0})),a.a.createElement(c.w,null,a.a.createElement(c.e,{type:"submit",color:"dark",variant:"outline",block:!0},"Create client manager")),e.state.error?a.a.createElement("p",null,e.state.error):null)))})),e}return n}(r.Component);t.default=Object(i.b)((function(e){return{company:e.currentUser.company}}),(function(e){return{getProfileFetch:function(){return e(Object(o.g)())}}}))(C)}}]);
//# sourceMappingURL=23.main.js.map