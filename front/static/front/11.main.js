(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{670:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=["work_at_height","lifting_work","confined_space","hot_work","chemical_handling","work_alone","work_at_sensitive_area","cold_work"]},672:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var r=n(1),o=n.n(r),a=n(10),c=n(22),i=n(27);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=d(e);if(t){var o=d(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?m(e):t}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=new c.a,y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(n,e);var t=p(n);function n(){var e;u(this,n);for(var r=arguments.length,c=new Array(r),l=0;l<r;l++)c[l]=arguments[l];return h(m(e=t.call.apply(t,[this].concat(c))),"state",{items:[],show:!1}),h(m(e),"handleClick",(function(){e.setState({show:!e.state.show})})),h(m(e),"componentDidMount",(function(){b.getEntityList("activities",{project_id:e.props.projectId}).then((function(t){e.setState({items:t})})).then((function(){return e.props.changeLoadingState()})).catch((function(e){return console.log(e)}))})),h(m(e),"render",(function(){var t=e.state,n=t.items,r=t.show;return o.a.createElement(a.f,null,o.a.createElement(a.i,null,o.a.createElement("strong",null,"Activity log"),o.a.createElement(a.e,{color:"link",onClick:e.handleClick},r?"Hide":"Show")),o.a.createElement(a.r,{show:r},o.a.createElement(i.d,{loading:e.props.loading},o.a.createElement(a.g,null,o.a.createElement(a.T,{flush:!0},n?n.map((function(e){return o.a.createElement(a.U,{key:e.id},e.message)})):null)))))})),e}return n}(r.Component),g=Object(i.c)(y)},756:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(37),c=n(635),i=n.n(c),l=n(10),u=n(35),s=n(22),p=n(672),f=n(648),m=n(642),d=n(670),h=n(27);function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){P(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function E(e,t,n,r,o,a,c){try{var i=e[a](c),l=i.value}catch(e){return void n(e)}i.done?t(l):Promise.resolve(l).then(r,o)}function v(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function c(e){E(a,r,o,c,i,"next",e)}function i(e){E(a,r,o,c,i,"throw",e)}c(void 0)}))}}function O(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=C(e);if(t){var o=C(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return k(this,n)}}function k(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?S(e):t}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var R=new s.a,D=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(n,e);var t=j(n);function n(){var e;O(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return P(S(e=t.call.apply(t,[this].concat(a))),"state",{name:"",location:"",description:"",start_date:"",end_date:"",extend_date:"",company:e.props.company,contractor:"-1",work_at_height:!1,lifting_work:!1,confined_space:!1,hot_work:!1,chemical_handling:!1,work_alone:!1,work_at_sensitive_area:!1,cold_work:!1,error:!1}),P(S(e),"handleChange",(function(t){e.setState(P({},t.target.name,t.target.value))})),P(S(e),"handleCheck",(function(t){e.setState(P({},t.target.name,t.target.checked))})),P(S(e),"handleSubmit",function(){var t=v(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),!(parseInt(e.state.contractor)<0)){t.next=5;break}e.setState({error:"Contractor was not selected! Please, choose contractor form the list"}),t.next=10;break;case 5:return e.props.changeSubmitState(),e.formData=e.state,delete e.formData.error,t.next=10,R.patchEntityOf("projects",e.props.match.params.id,e.formData).then((function(){e.props.history.goBack()})).catch((function(t){console.error(t),e.setState({error:"Project update failed! Please check your input and try again! In case this problem repeats, please contact your administrator!"})})).finally((function(){return e.props.changeSubmitState()}));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),P(S(e),"componentDidMount",v(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.getProfileFetch().then((function(){return R.getDetailsOf("projects",e.props.match.params.id)})).then((function(t){return e.setState(w({},t))})).then((function(){return e.props.getContractorList({signal:e.abortController.signal})})).then((function(){return e.props.setProjectId(e.props.match.params.id)})).catch((function(e){return console.log(e)})).finally((function(){return e.props.changeLoadingState()}));case 2:case"end":return t.stop()}}),t)})))),P(S(e),"componentWillUnmount",v(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.abortController.abort(),t.next=3,e.props.clearList();case 3:case"end":return t.stop()}}),t)})))),P(S(e),"abortController",new window.AbortController),P(S(e),"render",(function(){var t=e.props.options?e.props.options.map((function(e){return{value:e.id,label:e.username}})):null;return o.a.createElement(l.bb,null,o.a.createElement(l.q,null,"CliAdm"===e.props.role?o.a.createElement(l.f,null,o.a.createElement(l.i,null,o.a.createElement(l.k,null,"Project Details")),o.a.createElement(l.g,null,o.a.createElement(h.d,{loading:e.props.loading},o.a.createElement(l.B,{onSubmit:e.handleSubmit},o.a.createElement(i.a,null),o.a.createElement(l.C,null,o.a.createElement(l.R,{htmlFor:"name"},"Name"),o.a.createElement(l.K,{id:"name",name:"name",placeholder:"Enter project name",value:e.state.name,onChange:e.handleChange,readOnly:e.props.submitting,disabled:e.props.submitting,required:!0})),o.a.createElement(l.C,null,o.a.createElement(l.R,{htmlFor:"location"},"Location of works"),o.a.createElement(l.K,{id:"location ",name:"location",placeholder:"Project Works Location",value:e.state.location,onChange:e.handleChange,readOnly:e.props.submitting,disabled:e.props.submitting,required:!0})),o.a.createElement(l.C,null,o.a.createElement(l.R,{htmlFor:"description"},"Description"),o.a.createElement(l.ob,{id:"descrption",name:"description",placeholder:"Please, enter short description of the project",value:e.state.description,onChange:e.handleChange,disabled:e.props.submitting,readOnly:e.props.submitting,required:!0})),o.a.createElement(l.C,null,o.a.createElement(l.bb,null,o.a.createElement(l.q,{lg:"6"},o.a.createElement(l.R,{htmlFor:"start_date"},"Start Date"),o.a.createElement(l.K,{type:"datetime-local",id:"start_date",name:"start_date",value:e.state.start_date,onChange:e.handleChange,disabled:e.props.submitting,readOnly:e.props.submitting,required:!0})),o.a.createElement(l.q,{lg:"6"},o.a.createElement(l.R,{htmlFor:"end_date"},"End Date"),o.a.createElement(l.K,{type:"datetime-local",id:"end_date",name:"end_date",value:e.state.end_date,onChange:e.handleChange,disabled:e.props.submitting,readOnly:e.props.submitting,required:!0})))),o.a.createElement(m.e,{options:t,inputInfo:"contractor",inputValue:e.state.contractor,handleChange:e.handleReactSelect,disabled:e.props.submitting,readOnly:e.props.submitting}),o.a.createElement(l.C,null,o.a.createElement(l.S,{className:"btn btn-outline-dark mr-3",to:"".concat(e.props.match.url,"/ptw")},"See Permission To Work"),o.a.createElement(l.S,{className:"btn btn-outline-dark",to:"".concat(e.props.match.url,"/documents")},"Attached Documents")),o.a.createElement(f.b,{groupLabel:"Choose the related hazardous work from the list below:",options:d.a,handleCheck:e.handleCheck,parentState:e.state,readOnly:e.props.submitting,disabled:e.props.submitting}),o.a.createElement(l.e,{disabled:e.props.submitting,shape:"pill",type:"submit",color:"dark",variant:"outline",block:!0},o.a.createElement(h.b,{submitting:e.props.submitting}),"Save changes"),e.state.error?o.a.createElement("p",null,e.state.error):null)))):o.a.createElement(o.a.Fragment,null,o.a.createElement(p.a,{projectId:e.props.match.params.id}),o.a.createElement(l.z,{ratio:"16by9"},o.a.createElement("iframe",{src:"".concat(window.location.origin,"/api/ptw/").concat(e.props.match.params.id)})))))})),e}return n}(r.Component);t.default=Object(a.b)((function(e){return{company:e.currentUser.company,options:e.entityListTable.tableData,role:e.currentUser.role}}),(function(e){return{getProfileFetch:function(){return e(Object(u.j)())},getContractorList:function(t){var n=b({},t);return e(Object(u.f)(w({},n)))},setProjectId:function(t){return e(Object(u.s)(t))},clearList:function(){return e(Object(u.c)())}}}))(Object(h.c)(D))}}]);
//# sourceMappingURL=11.main.js.map