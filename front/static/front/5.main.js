(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{634:function(e,t,n){"use strict";var r=n(1),a=n.n(r),o=n(165);t.a=function(e){return a.a.createElement(o.f,null,a.a.createElement(o.g,null,a.a.createElement(o.w,{key:"fg-".concat(e.document.id)},a.a.createElement(o.K,{key:"lb-".concat(e.document.id),htmlFor:e.document.id},a.a.createElement("h5",null,e.document.name)," "),e.document.url_to_doc?a.a.createElement(o.U,null,a.a.createElement(o.k,null,a.a.createElement(o.L,{key:"dl-".concat(e.document.id),href:e.document.url_to_doc,target:"_blank",className:"btn btn-ghost-primary"},"Open this document in Google Docs"))):a.a.createElement(o.U,null,a.a.createElement(o.k,{md:"3"},a.a.createElement(o.e,{variant:"outline",color:"primary",key:"cb-".concat(e.document.id),id:e.document.id,name:e.document.id,value:e.document.filename,onClick:e.downloadFile},"Download template for this document")),a.a.createElement(o.k,{md:"5"},a.a.createElement(o.K,{key:"lb-".concat(e.document.id),htmlFor:e.document.id},a.a.createElement("strong",null,"Upload filled up document:")," "),a.a.createElement(o.F,{key:"of-".concat(e.document.id),id:"file-".concat(e.document.id),name:"".concat(e.document.id),onChange:e.handleFileUpload}))))))}},647:function(e,t,n){"use strict";n.d(t,"c",(function(){return l})),n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return d})),n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return y}));var r=n(1),a=n.n(r),o=n(165),c=function(e){return e.split("_").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" ")},l=function(e){return a.a.createElement(o.w,null,a.a.createElement(o.U,null,a.a.createElement(o.k,{md:"6"},a.a.createElement(o.K,{htmlFor:e.inputInfo},c(e.inputInfo)),a.a.createElement(o.D,{id:e.inputInfo,name:e.inputInfo,placeholder:(t=e.inputInfo,"Enter ".concat(c(t)," info")),value:e.inputValue,onChange:e.handleChange,required:!0})),a.a.createElement(o.k,{md:"6"},a.a.createElement(o.K,{htmlFor:e.uploadInfo},c(e.uploadInfo)),a.a.createElement(o.F,{id:e.uploadInfo,name:e.uploadInfo,onChange:e.handleFileUpload,required:!0}))));var t},i=function(e){return e.split("_").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" ")},u=function(e){return a.a.createElement(o.w,null,a.a.createElement(o.K,{htmlFor:e.inputInfo},i(e.inputInfo)),a.a.createElement(o.V,{id:e.inputInfo,name:e.inputInfo,placeholder:(t=e.inputInfo,"Choose ".concat(i(t)," info")),value:e.inputValue,onChange:e.handleChange,required:!0},e.options.map((function(e){return a.a.createElement("option",{key:e.id,value:e.id},e.position)}))));var t},f=n(666),p=function(e){return e.split("_").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" ")},d=function(e){return a.a.createElement(o.w,null,a.a.createElement(o.K,{htmlFor:e.inputInfo},p(e.inputInfo)),a.a.createElement(f.a,{id:e.inputInfo,name:e.inputInfo,placeholder:(r=e.inputInfo,"Choose ".concat(p(r)," info")),value:(t=e.inputValue,n=e.options,n.find((function(e){return e.value===t}))),onChange:e.handleChange,options:e.options,required:!0}));var t,n,r},m=function(e){return e.split("_").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" ")},s=function(e){return a.a.createElement(o.w,null,a.a.createElement(o.U,null,a.a.createElement(o.k,{md:"5"},a.a.createElement(o.K,{htmlFor:e.inputInfo},m(e.inputInfo)),a.a.createElement(o.D,{id:e.inputInfo,name:e.inputInfo,placeholder:(t=e.inputInfo,"Enter ".concat(m(t)," info")),value:e.inputValue,onChange:e.handleChange})),a.a.createElement(o.k,{md:"2",className:"d-flex align-items-center"},a.a.createElement(o.e,{variant:"outline",color:"info",id:e.downloadValue,name:e.uploadInfo,value:e.downloadValue,onClick:e.downloadFile},"Download scan")),a.a.createElement(o.k,{md:"5"},a.a.createElement(o.K,{htmlFor:e.uploadInfo},"New ".concat(m(e.uploadInfo))),a.a.createElement(o.F,{id:e.uploadInfo,name:e.uploadInfo,onChange:e.handleFileUpload}))));var t},h=function(e){return e.split("_").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" ")},y=function(e){return a.a.createElement(o.w,null,a.a.createElement(o.U,null,a.a.createElement(o.k,{md:"1"},a.a.createElement(o.K,{htmlFor:e.inputInfo},h(e.inputInfo))),a.a.createElement(o.k,{md:"2"},a.a.createElement(o.e,{variant:"outline",color:"info",id:e.downloadValue,name:e.uploadInfo,value:e.downloadValue,onClick:e.downloadFile},e.buttonText?e.buttonText:"Download scan")),a.a.createElement(o.k,{md:"5"},a.a.createElement(o.K,{htmlFor:e.uploadInfo},"New ".concat(h(e.uploadInfo))),a.a.createElement(o.F,{id:e.uploadInfo,name:e.uploadInfo,onChange:e.handleFileUpload}))))};n(634)},669:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(1),a=n.n(r),o=n(165),c=function(e){return a.a.createElement(o.O,{show:e.danger,onClose:e.setModalVisibility,color:"danger"},a.a.createElement(o.R,{closeButton:!0},a.a.createElement(o.S,null,"Confirm Deletion")),a.a.createElement(o.P,null,"Are you sure you want to delete this ".concat(e.entity,"?")),a.a.createElement(o.Q,null,a.a.createElement(o.e,{color:"danger",onClick:e.confirmDelete},"Confirm")," ",a.a.createElement(o.e,{color:"secondary",onClick:e.setModalVisibility},"Cancel")))}},763:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(166),c=n(95),l=n(165),i=n(632),u=n.n(i),f=n(29),p=n(647),d=n(669);function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){O(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var c,l=e[Symbol.iterator]();!(r=(c=l.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function E(e,t,n,r,a,o,c){try{var l=e[o](c),i=l.value}catch(e){return void n(e)}l.done?t(i):Promise.resolve(i).then(r,a)}function g(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function c(e){E(o,r,a,c,l,"next",e)}function l(e){E(o,r,a,c,l,"throw",e)}c(void 0)}))}}function w(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=_(e);if(t){var a=_(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return C(this,n)}}function C(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?I(e):t}function I(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var D=new f.a,F=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(n,e);var t=k(n);function n(){var e;w(this,n);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return O(I(e=t.call.apply(t,[this].concat(o))),"state",{worker:e.props.match.params.id,name:"",file:"",issued_by:"",modal:!1,error:!1,filename:"",doc_type:"",upload_files:{}}),O(I(e),"handleChange",(function(t){e.setState(O({},t.target.name,t.target.value))})),O(I(e),"handleFileUpload",(function(t){var n=e.state.upload_files;n[t.target.name]=t.target.files[0],e.setState(O({upload_files:n},t.target.name,""))})),O(I(e),"handleSubmit",function(){var t=g(regeneratorRuntime.mark((function t(n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),e.requestData=e.state,r=e.requestData.upload_files,delete e.requestData.modal,delete e.requestData.upload_files,delete e.requestData.error,delete e.requestData.filename,delete e.requestData.doc_type,e.formData=new FormData,Object.entries(e.requestData).forEach((function(t){var n=y(t,2),r=n[0],a=n[1];e.formData.append(r,a)})),r&&Object.entries(r).forEach((function(t){var n=y(t,2),r=n[0],a=n[1];e.formData.append(r,a)})),t.next=13,D.patchEntityWithFiles("worker_special_competencies",e.props.match.params.competency_id,e.formData).then((function(){e.props.history.goBack()}),(function(t){console.error(t),e.setState({error:"Competency update failed! Please check your input and try again! In case this problem repeats, please contact your administrator!"})}));case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),O(I(e),"confirmDelete",g(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,D.deleteEntityOf("worker_special_competencies",e.props.match.params.competency_id).then((function(){e.props.history.goBack()}),(function(t){console.error(t),e.setState({error:"Could not delete competency! Please check your input and try again! In case this problem repeats, please contact your administrator!"})}));case 2:console.log("delete special competency ".concat(e.props.match.params.competency_id));case 3:case"end":return t.stop()}}),t)})))),O(I(e),"downloadFile",function(){var t=g(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.setState({filename:n.target.value,doc_type:n.target.name},(function(){D.downloadWorkerCompetency(e.props.match.params.id,e.state.doc_type).then((function(t){var n=window.URL.createObjectURL(new Blob([t])),r=document.createElement("a");r.href=n;var a=e.state.filename.split("/").pop();r.setAttribute("download",a),document.body.appendChild(r),r.click(),r.parentNode.removeChild(r)})).catch((function(e){console.error("File download failed!"),console.error(e)}))}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),O(I(e),"setModalVisibility",(function(){e.setState({modal:!e.state.modal})})),O(I(e),"componentDidMount",g(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.getProfileFetch().then((function(){return D.getDetailsOf("worker_special_competencies",e.props.match.params.competency_id)})).then((function(t){return e.setState(h({},t))}));case 2:case"end":return t.stop()}}),t)})))),O(I(e),"render",(function(){return a.a.createElement(l.U,null,a.a.createElement(l.k,null,a.a.createElement(l.v,{onSubmit:e.handleSubmit},a.a.createElement(u.a,null),a.a.createElement(p.b,{inputValue:e.state.name,downloadValue:e.state.file,handleChange:e.handleChange,handleFileUpload:e.handleFileUpload,inputInfo:"name",uploadInfo:"file",downloadFile:e.downloadFile}),a.a.createElement(l.w,null,a.a.createElement(l.K,{htmlFor:"issued_by"},"Competency issued by"),a.a.createElement(l.D,{id:"issued_by",name:"issued_by",placeholder:"Enter legal entity",value:e.state.issued_by,onChange:e.handleChange})),a.a.createElement(l.w,null,a.a.createElement(l.e,{type:"submit",color:"dark",variant:"outline",block:!0},"Save changes")),a.a.createElement(l.e,{className:"mb-3",color:"danger",variant:"outline",onClick:e.setModalVisibility,block:!0},"Delete Competency"),e.state.error?a.a.createElement("p",null,e.state.error):null),a.a.createElement(d.a,{setModalVisibility:e.setModalVisibility,danger:e.state.modal,entity:"special competency",confirmDelete:e.confirmDelete})))})),e}return n}(r.Component);t.default=Object(c.b)((function(e){return{contractor:e.currentUser.id}}),(function(e){return{getProfileFetch:function(){return e(Object(o.g)())}}}))(F)}}]);
//# sourceMappingURL=5.main.js.map