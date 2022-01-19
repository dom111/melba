"use strict";var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};return __assign.apply(this,arguments)};var __spreadArray=this&&this.__spreadArray||function(to,from,pack){if(pack||arguments.length===2)for(var i=0,l=from.length,ar;i<l;i++){if(ar||!(i in from)){if(!ar)ar=Array.prototype.slice.call(from,0,i);ar[i]=from[i]}}return to.concat(ar||Array.prototype.slice.call(from))};Object.defineProperty(exports,"__esModule",{value:true});exports.Melba=void 0;var matchesFunction=function(){var element=document.createElement("a");return["matches","msMatchesSelector","webkitMatchesSelector"].filter((function(property){return property in element}))}()[0],focusedSelector=function(){var element=document.createElement("a");try{element[matchesFunction](":focus-within");return":focus-within, :focus, :hover"}catch(e){return":focus, :hover"}}();var Melba=function(){function Melba(_a){var _this=this;var _b=_a.animation,animation=_b===void 0?Melba.defaults.animation:_b,_c=_a.animationDuration,animationDuration=_c===void 0?Melba.defaults.animationDuration:_c,_d=_a.closeLabel,closeLabel=_d===void 0?Melba.defaults.closeLabel:_d,_e=_a.container,container=_e===void 0?null:_e,_f=_a.containerClass,containerClass=_f===void 0?Melba.defaults.containerClass:_f,_g=_a.containerElement,containerElement=_g===void 0?Melba.defaults.containerElement:_g,content=_a.content,_h=_a.events,events=_h===void 0?{}:_h,_j=_a.hide,hide=_j===void 0?Melba.defaults.hide:_j,_k=_a.root,root=_k===void 0?Melba.defaults.root:_k,_l=_a.toastClass,toastClass=_l===void 0?Melba.defaults.toastClass:_l,_m=_a.toastElement,toastElement=_m===void 0?Melba.defaults.toastElement:_m,_o=_a.toastEvents,toastEvents=_o===void 0?__spreadArray([],Melba.defaults.toastEvents,true):_o,_p=_a.toastHideClass,toastHideClass=_p===void 0?Melba.defaults.toastHideClass:_p,_q=_a.toastShowClass,toastShowClass=_q===void 0?Melba.defaults.toastShowClass:_q,_r=_a.type,type=_r===void 0?Melba.defaults.toastType:_r;if(!content){throw new TypeError("'content' cannot be empty.")}this.animation=animation;this.events=events;this.toastHideClass=toastHideClass;this.toastShowClass=toastShowClass;if(!container){container=this.getContainer({containerClass:containerClass,containerElement:containerElement,root:root})}this.container=container;if(hide===true){hide=Melba.defaults.hideDelay}if(hide!==false&&hide<100){hide*=1e3}this.hideDelay=hide;if(animationDuration<100){animationDuration*=1e3}this.build({closeLabel:closeLabel,content:content,toastClass:toastClass,toastElement:toastElement,toastEvents:toastEvents,type:type});if(this.hideDelay!==false){this.autohide({animationDuration:animationDuration})}if(this.animation){window.requestAnimationFrame((function(){return _this.show()}));return}this.show()}Melba.prototype.autohide=function(_a){var _this=this;var animationDuration=_a.animationDuration;if(!this.hideDelay){return}return window.setTimeout((function(){return _this.hide()}),this.hideDelay+(this.animation?animationDuration:0))};Melba.prototype.build=function(_a){var _this=this;var closeLabel=_a.closeLabel,content=_a.content,toastClass=_a.toastClass,toastElement=_a.toastElement,toastEvents=_a.toastEvents,type=_a.type;this.element=document.createElement(toastElement);this.element.setAttribute("title",content);this.element.setAttribute("role","status");this.element.setAttribute("tabindex","0");this.element.classList.add(toastClass);this.element.classList.add("toast--".concat(type));this.element.appendChild(this.buildClose(closeLabel));this.element.appendChild(document.createTextNode(content));this.element.addEventListener("keydown",(function(event){if(event.key==="Escape"){event.preventDefault();_this.hide()}}));toastEvents.forEach((function(eventName){_this.element.addEventListener(eventName,(function(event){_this.trigger(eventName,event)}))}));this.container.appendChild(this.element);this.trigger("build")};Melba.prototype.show=function(){this.element.classList.remove(this.toastHideClass);this.element.classList.add(this.toastShowClass);this.trigger("show")};Melba.prototype.hide=function(force){var _this=this;if(force===void 0){force=false}if(!force&&this.hasFocus){return}if(!force&&this.element[matchesFunction](focusedSelector)){this.element.addEventListener("mouseout",(function(){_this.hasFocus=false;if(_this.hideDelay>0){_this.hide()}}))}this.element.classList.remove(this.toastShowClass);this.element.classList.add(this.toastHideClass);this.trigger("hide");if(this.animation){var transitionEndHandler_1=function(){return _this.remove()},transitionStartHandler_1=function(){if(bound_1){return}_this.element.addEventListener("transitionend",(function(){return transitionEndHandler_1()}));bound_1=true},mouseOverHandler_1=function(){_this.show();_this.element.removeEventListener("transitionstart",(function(){return transitionStartHandler_1()}));_this.element.removeEventListener("transitionend",(function(){return transitionEndHandler_1()}));_this.element.removeEventListener("mouseover",(function(){return mouseOverHandler_1()}));_this.element.addEventListener("mouseout",(function(){return _this.hide()}))};var bound_1=false;this.element.addEventListener("mouseover",(function(){return mouseOverHandler_1()}));this.element.addEventListener("transitionstart",(function(){return transitionStartHandler_1()}));return}this.remove()};Melba.prototype.remove=function(){if(this.element.parentNode===this.container){this.container.removeChild(this.element);this.trigger("remove")}};Melba.prototype.buildClose=function(closeLabel){var _this=this;var closeButton=document.createElement("button");closeButton.setAttribute("title",closeLabel);closeButton.appendChild(document.createTextNode(closeLabel));closeButton.addEventListener("click",(function(){return _this.hide()}));return closeButton};Melba.prototype.getContainer=function(_a){var containerClass=_a.containerClass,containerElement=_a.containerElement,root=_a.root;var existingContainer=root.querySelector("".concat(containerElement,".").concat(containerClass));if(existingContainer){return existingContainer}var container=document.createElement(containerElement);container.classList.add(containerClass);root.appendChild(container);return container};Melba.prototype.on=function(event,callable){if(!this.events[event]){this.events[event]=[]}this.events[event].push(callable)};Melba.prototype.off=function(event,callable){if(callable===void 0){callable=null}if(!callable){this.events[event]=[];return}var hasEvent=this.events[event].indexOf(callable);if(hasEvent===-1){this.events[event].splice(hasEvent,1)}};Melba.prototype.trigger=function(event){var _this=this;var args=[];for(var _i=1;_i<arguments.length;_i++){args[_i-1]=arguments[_i]}(this.events[event]||[]).forEach((function(callable){return callable.apply(void 0,__spreadArray([_this,_this.element],args,false))}))};Melba.settings=function(settings){Melba.defaults=__assign(__assign({},Melba.defaults),settings)};Melba.defaults={animation:true,animationDuration:400,closeLabel:"Close",containerClass:"toast__container",containerElement:"div",hide:false,hideDelay:5,root:document.body,toastClass:"toast",toastElement:"div",toastEvents:["click","focus","keydown"],toastHideClass:"toast--hide",toastShowClass:"toast--show",toastType:"info"};return Melba}();exports.Melba=Melba;exports.default=Melba;