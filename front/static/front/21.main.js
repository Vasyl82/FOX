(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{769:function(e,t,r){"use strict";r.r(t);var n=r(1),o=r.n(n),a=r(165),u=r(95),c=r(24),i=r(632),s=r.n(i),l=r(166);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=g(e);if(t){var o=g(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return h(this,r)}}function h(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?d(e):t}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function w(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(c,e);var t,r,n,u=b(c);function c(){var e;p(this,c);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return w(d(e=u.call.apply(u,[this].concat(r))),"state",{username:e.props.username,password:"",password2:""}),w(d(e),"handleChange",(function(t){e.setState(w({},t.target.name,t.target.value),(function(){e.state.password!==e.state.password2?e.props.registerError():e.props.allowRegistration(e.props.registrationToken)}))})),w(d(e),"handleSubmit",(function(t){t.preventDefault(),e.props.userRegisterFetch({password:e.state.password,token:e.props.registrationToken})})),e}return t=c,(r=[{key:"render",value:function(){return console.log(this.props.errorMessage),o.a.createElement(a.n,{fluid:!0},o.a.createElement(a.V,{className:"mt-2 mb-2"},o.a.createElement(a.l,{sm:"8",className:"mx-auto"},o.a.createElement(a.w,{onSubmit:this.handleSubmit},o.a.createElement(s.a,null),o.a.createElement(a.x,null,o.a.createElement(a.L,{htmlFor:"username"},"Name"),o.a.createElement(a.E,{id:"username",name:"username",placeholder:"Enter your name",value:this.state.username,onChange:this.handleChange,readOnly:!0,required:!0})),o.a.createElement(a.x,null,o.a.createElement(a.L,{htmlFor:"nf-password"},"Password"),o.a.createElement(a.E,{type:"password",id:"password",name:"password",placeholder:"Enter Password..",value:this.state.password,onChange:this.handleChange,required:!0}),o.a.createElement(a.L,{htmlFor:"nf-password"},"Confirm Password"),o.a.createElement(a.E,{type:"password",id:"password2",name:"password2",placeholder:"Confirm Password..",value:this.state.password2,onChange:this.handleChange,required:!0})),o.a.createElement(a.x,null,o.a.createElement(a.E,{type:"submit",value:"Submit",color:"info",disabled:this.state.password!==this.state.password2})),this.props.registerErrorFlag?o.a.createElement("p",null,this.props.errorMessage?this.props.errorMessage:"INVALID CREDENTIALS! PLEASE, CHECK YOUR PASSWORD AND PASSWORD CONFIRMATION FIELDS!"):null))))}}])&&y(t.prototype,r),n&&y(t,n),c}(n.Component),v=Object(u.b)((function(e){return{registerErrorFlag:e.registerError,registrationToken:e.registrationToken,errorMessage:e.errorMessage}}),(function(e){return{userRegisterFetch:function(t){return e(Object(l.o)(t))},registerError:function(){return e(Object(l.l)())},allowRegistration:function(t){return e(Object(l.a)(t))}}}))(E);function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function S(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function R(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=C(e);if(t){var o=C(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return _(this,r)}}function _(e,t){return!t||"object"!==O(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}(c,e);var t,r,n,u=P(c);function c(){return S(this,c),u.apply(this,arguments)}return t=c,(r=[{key:"render",value:function(){return o.a.createElement(a.f,null,o.a.createElement(a.i,{color:"dark",textColor:"light"},"Register"),o.a.createElement(v,{username:this.props.username}))}}])&&R(t.prototype,r),n&&R(t,n),c}(n.Component);function D(e){return(D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function A(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function F(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=M(e);if(t){var o=M(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return N(this,r)}}function N(e,t){return!t||"object"!==D(t)&&"function"!=typeof t?L(e):t}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function M(e){return(M=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function I(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var V=o.a.createElement("div",{className:"pt-3 text-center"},o.a.createElement(a.fb,{size:"sm",variant:"grow",style:{width:"4rem",height:"4rem"}})),q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(s,e);var t,r,u,i=F(s);function s(){var e;x(this,s);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return I(L(e=i.call.apply(i,[this].concat(r))),"componentDidMount",(function(){e.props.userRegisterValidationFetch(e.props.token)})),e}return t=s,(r=[{key:"render",value:function(){return this.props.registerAllowed?o.a.createElement(n.Suspense,{fallback:V},o.a.createElement("div",{className:"c-app c-default-layout flex-row align-items-center"},o.a.createElement(a.n,null,o.a.createElement(a.V,{className:"justify-content-center"},o.a.createElement(a.l,{md:"6"},o.a.createElement(k,{username:this.props.username})))))):o.a.createElement(c.a,{to:"/login"})}}])&&A(t.prototype,r),u&&A(t,u),s}(n.Component);t.default=Object(u.b)((function(e){return{userRegistered:e.userRegistered,registerAllowed:e.registerAllowed}}),(function(e){return{userRegisterValidationFetch:function(t){return e(Object(l.p)(t))}}}))(q)}}]);
//# sourceMappingURL=21.main.js.map