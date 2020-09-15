(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{746:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(166),c=n(95),l=n(165),i=n(632),u=n.n(i);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t,n,a,r,o,c){try{var l=e[o](c),i=l.value}catch(e){return void n(e)}l.done?t(i):Promise.resolve(i).then(a,r)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var o=e.apply(t,n);function c(e){s(o,a,r,c,l,"next",e)}function l(e){s(o,a,r,c,l,"throw",e)}c(void 0)}))}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=w(e);if(t){var r=w(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return k(this,n)}}function k(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?_(e):t}function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=new(n(29).a),b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(n,e);var t=p(n);function n(){var e;d(this,n);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return g(_(e=t.call.apply(t,[this].concat(o))),"state",{name:"",description:"",start_date:"",start_time:"",end_date:"",end_time:"",company:e.props.company,contractor:"-1",work_at_height:!1,lifting_work:!1,confined_space:!1,hot_work:!1,chemical_handling:!1,work_alone:!1,work_at_sensitive_area:!1,cold_work:!1,error:!1}),g(_(e),"handleChange",(function(t){e.setState(g({},t.target.name,t.target.value))})),g(_(e),"handleCheck",(function(t){e.setState(g({},t.target.name,t.target.checked))})),g(_(e),"silenceSubmit",(function(e){e.preventDefault()})),g(_(e),"handleCreateProject",h(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.handleSubmit().then((function(){e.props.history.goBack()})).catch((function(t){console.error(t),e.setState({error:"Project creation failed! Please check your input and try again! In case this problem repeats, please contact your administrator!"})}));case 2:case"end":return t.stop()}}),t)})))),g(_(e),"handleDocumentCreationRedirect",h(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.handleSubmit().then((function(t){e.props.history.push("/projects/".concat(t.id,"/documents/new"))})).catch((function(t){console.error(t),e.setState({error:"Project creation failed! Please check your input and try again! In case this problem repeats, please contact your administrator!"})}));case 2:case"end":return t.stop()}}),t)})))),g(_(e),"handleSubmit",h(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(e.state),!(parseInt(e.state.contractor)<0)){t.next=5;break}e.setState({error:"Contractor was not selected! Please, choose contractor form the list"}),t.next=10;break;case 5:return e.formData=e.state,delete e.formData.error,t.next=9,E.createEntityOf("projects",e.formData);case 9:return t.abrupt("return",t.sent);case 10:case"end":return t.stop()}}),t)})))),g(_(e),"componentDidMount",h(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.getProfileFetch().then((function(){return e.props.getContractorList()}));case 2:case"end":return t.stop()}}),t)})))),g(_(e),"render",(function(){return r.a.createElement(l.U,null,r.a.createElement(l.k,null,r.a.createElement(l.v,{onSubmit:e.silenceSubmit},r.a.createElement(u.a,null),r.a.createElement(l.w,null,r.a.createElement(l.K,{htmlFor:"name"},"Name"),r.a.createElement(l.D,{id:"name",name:"name",placeholder:"Enter project name",value:e.state.name,onChange:e.handleChange,required:!0})),r.a.createElement(l.w,null,r.a.createElement(l.K,{htmlFor:"description"},"Description"),r.a.createElement(l.gb,{id:"descrption",name:"description",placeholder:"Please, enter short description of the projet",value:e.state.description,onChange:e.handleChange,required:!0})),r.a.createElement(l.w,null,r.a.createElement(l.U,null,r.a.createElement(l.k,{lg:"6"},r.a.createElement(l.K,{htmlFor:"start_date"},"Start Date"),r.a.createElement(l.D,{type:"date",id:"start_date",name:"start_date",placeholder:"date",value:e.state.start_date,onChange:e.handleChange,required:!0})),r.a.createElement(l.k,{lg:"6"},r.a.createElement(l.K,{htmlFor:"start_time"},"Start Time"),r.a.createElement(l.D,{type:"time",id:"start_time",name:"start_time",value:e.state.start_time,onChange:e.handleChange,required:!0})))),r.a.createElement(l.w,null,r.a.createElement(l.U,null,r.a.createElement(l.k,{lg:"6"},r.a.createElement(l.K,{htmlFor:"end_date"},"End Date"),r.a.createElement(l.D,{type:"date",id:"end_date",name:"end_date",placeholder:"date",value:e.state.end_date,onChange:e.handleChange,required:!0})),r.a.createElement(l.k,{lg:"6"},r.a.createElement(l.K,{htmlFor:"end_time"},"End Time"),r.a.createElement(l.D,{type:"time",id:"end_time",name:"end_time",value:e.state.end_time,onChange:e.handleChange,required:!0})))),r.a.createElement(l.w,null,r.a.createElement(l.K,{htmlFor:"contractor"},"Contractor"),r.a.createElement(l.V,{id:"contractor",name:"contractor",placeholder:"Choose contractor",value:e.state.contractor,onChange:e.handleChange,required:!0},r.a.createElement("option",{key:"-1",value:"-1",disabled:!0},"Choose contractor"),e.props.options?e.props.options.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.username)})):null)),r.a.createElement(l.w,{variant:"checkbox",className:"checkbox"},r.a.createElement(l.w,null,r.a.createElement(l.E,{id:"work_at_height",name:"work_at_height",value:"work_at_height",onChange:e.handleCheck}),r.a.createElement(l.K,{variant:"checkbox",className:"form-check-label",htmlFor:"work_at_height"},"Work at height")),r.a.createElement(l.w,null,r.a.createElement(l.E,{id:"lifting_work",name:"lifting_work",value:"lifting_work",onChange:e.handleCheck}),r.a.createElement(l.K,{variant:"checkbox",className:"form-check-label",htmlFor:"lifting_work"},"Lifting work")),r.a.createElement(l.w,null,r.a.createElement(l.E,{id:"confined_space",name:"confined_space",value:"confined_space",onChange:e.handleCheck}),r.a.createElement(l.K,{variant:"checkbox",className:"form-check-label",htmlFor:"confined_space"},"Confined space")),r.a.createElement(l.w,null,r.a.createElement(l.E,{id:"hot_work",name:"hot_work",value:"hot_work",onChange:e.handleCheck}),r.a.createElement(l.K,{variant:"checkbox",className:"form-check-label",htmlFor:"hot_work"},"Hot work")),r.a.createElement(l.w,null,r.a.createElement(l.E,{id:"chemical_handling",name:"chemical_handling",value:"chemical_handling",onChange:e.handleCheck}),r.a.createElement(l.K,{variant:"checkbox",className:"form-check-label",htmlFor:"chemical_handling"},"Chemical handling")),r.a.createElement(l.w,null,r.a.createElement(l.E,{id:"work_alone",name:"work_alone",value:"work_alone",onChange:e.handleCheck}),r.a.createElement(l.K,{variant:"checkbox",className:"form-check-label",htmlFor:"work_alone"},"Work alone")),r.a.createElement(l.w,null,r.a.createElement(l.E,{id:"work_at_sensitive_area",name:"work_at_sensitive_area",value:"work_at_sensitive_area",onChange:e.handleCheck}),r.a.createElement(l.K,{variant:"checkbox",className:"form-check-label",htmlFor:"work_at_sensitive_area"},"Work at sensitive area")),r.a.createElement(l.w,null,r.a.createElement(l.E,{id:"cold_work",name:"cold_work",value:"cold_work",onChange:e.handleCheck}),r.a.createElement(l.K,{variant:"checkbox",className:"form-check-label",htmlFor:"cold_work"},"Cold work"))),r.a.createElement(l.w,null,r.a.createElement(l.e,{onClick:e.handleDocumentCreationRedirect,color:"dark",variant:"outline",block:!0},"Create Project and go to document creation")),e.state.error?r.a.createElement("p",null,e.state.error):null)))})),e}return n}(a.Component);t.default=Object(c.b)((function(e){return{company:e.currentUser.company,options:e.entityListTable.tableData}}),(function(e){return{getProfileFetch:function(){return e(Object(o.g)())},getContractorList:function(){return e(Object(o.d)())}}}))(b)}}]);
//# sourceMappingURL=27.main.js.map