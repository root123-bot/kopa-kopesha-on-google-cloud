(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[862],{28434:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/testingFrontendFailedToPayback",function(){return n(53756)}])},53756:function(e,t,n){"use strict";n.r(t);var o=n(34051),r=n.n(o),s=n(85893),c=n(67294),a=n(95712),i=n(80967),l=n(9008),u=n(51837),f=n(72248),d=n(58697);function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t,n,o,r,s,c){try{var a=e[s](c),i=a.value}catch(l){return void n(l)}a.done?t(i):Promise.resolve(i).then(o,r)}function g(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var s=e.apply(t,n);function c(e){p(s,o,r,c,a,"next",e)}function a(e){p(s,o,r,c,a,"throw",e)}c(void 0)}))}}function b(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}function x(e,t){return!t||"object"!==k(t)&&"function"!==typeof t?h(e):t}function w(e,t){return w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},w(e,t)}var k=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function T(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=v(e);if(t){var r=v(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return x(this,n)}}var O=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(p,e);var t,n,o,c=T(p);function p(){var e;b(this,p),m(h(e=c.apply(this,arguments)),"state",{loading:!1});var t=h(e);return m(h(e),"onCheckFailedToPayback",g(r().mark((function e(){var n,o,s,c,a,i,l,h,p,g,b,y,m,v,x,w,T,O;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.setState({loading:!0});case 2:return e.next=4,f.Z.eth.getAccounts();case 4:return n=e.sent,e.next=7,u.Z.methods.getDeployedMikopo().call();case 7:o=e.sent,s=0;case 9:if(!(s<o.length)){e.next=85;break}return e.next=12,(0,d.Z)(o[s]);case 12:return c=e.sent,e.next=15,c.methods.getAfterBorrowingMoneyLength().call();case 15:a=e.sent,i=0;case 17:if(!(i<a)){e.next=82;break}return e.next=20,c.methods.ListOfAfterBorrowingMoney(i).call();case 20:if(l=e.sent,h=l.issuedAt,p=l[1].duration,console.log("We accessed isssued at of this abm which we can use it together with duration to calculate deadline"),console.log(h,p),0!=h){e.next=29;break}return e.abrupt("continue",79);case 29:if(console.log("We might have some problem here!, Eminem Quote"),g=(new Date).getTime(),console.log("This is seconds of current time since epoch"),console.log(g,h),b=1e3*parseInt(l.issuedAt)+24*parseInt(p)*60*60*1e3,y=new Date(b),m=y.toDateString(),console.log("THIS IS DEADLINE DATE FOR YOUR CONTRACT... "+m),console.log("These below is seconds since epoch for current time and deadline..."),console.log(g,b),!(parseInt(g)<parseInt(b))){e.next=78;break}return console.log("The deadline is already been passed, You failed to payback your debt!"),console.log("This is acccount 1 for you "+n[0]),console.log("This is abm to be passed...."),v=l.deniDetail.madeAt,console.log("This is created at for you!"),console.log(v),console.log("undefined"===typeof v?"undefined":k(v)),v=parseInt(v),console.log("undefined"===typeof v?"undefined":k(v)),e.prev=49,e.next=52,c.methods.failedToPayBack(v).send({from:n[0],gas:"10000000"});case 52:return console.log("I HAVE BEEN DELETED!"),e.next=55,c.methods.message().call();case 55:return x=e.sent,e.next=58,c.methods.getCA().call();case 58:return w=e.sent,e.next=61,c.methods.getABM().call();case 61:return T=e.sent,e.next=64,c.methods.urlList().call();case 64:O=e.sent,console.log("This is message for you all"),console.log(x),console.log(w),console.log(T),console.log(O),e.next=76;break;case 72:e.prev=72,e.t0=e.catch(49),console.log("This is error for you"),console.log(e.t0.message);case 76:e.next=79;break;case 78:console.log("You still have time to payback the debt!");case 79:i++,e.next=17;break;case 82:s++,e.next=9;break;case 85:return e.next=87,t.setState({loading:!1});case 87:case"end":return e.stop()}}),e,null,[[49,72]])})))),e}return t=p,(n=[{key:"render",value:function(){return(0,s.jsxs)(a.Z,{children:[(0,s.jsxs)(l.default,{children:[(0,s.jsx)("title",{children:"Kopa | Lipa"}),(0,s.jsx)("link",{rel:"stylesheet",href:"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",integrity:"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T",crossorigin:"anonymous"}),(0,s.jsx)("link",{rel:"stylesheet",href:"//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"})]}),(0,s.jsx)("h2",{children:"Click below button to clear failed to payBack Debts."}),(0,s.jsx)("span",{children:"This will help us to test if our server code is wrong or good enough..."}),(0,s.jsx)(i.Z,{loading:this.state.loading,primary:!0,onClick:this.onCheckFailedToPayback,children:"Clear"})]})}}])&&y(t.prototype,n),o&&y(t,o),p}(c.Component);t.default=O}},function(e){e.O(0,[774,482,714,587,532,697,888,179],(function(){return t=28434,e(e.s=t);var t}));var t=e.O();_N_E=t}]);