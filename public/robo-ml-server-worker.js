"use strict";(()=>{var QA=Object.create;var Wd=Object.defineProperty;var ZA=Object.getOwnPropertyDescriptor;var ek=Object.getOwnPropertyNames;var tk=Object.getPrototypeOf,rk=Object.prototype.hasOwnProperty;var Ey=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var H=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),nk=(t,e)=>{for(var r in e)Wd(t,r,{get:e[r],enumerable:!0})},ik=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of ek(e))!rk.call(t,i)&&i!==r&&Wd(t,i,{get:()=>e[i],enumerable:!(n=ZA(e,i))||n.enumerable});return t};var de=(t,e,r)=>(r=t!=null?QA(tk(t)):{},ik(e||!t||!t.__esModule?Wd(r,"default",{value:t,enumerable:!0}):r,t));var Kn=H(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});var Bd;function zd(){if(Bd===void 0)throw new Error("No runtime abstraction layer installed");return Bd}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Bd=r}t.install=e})(zd||(zd={}));Vd.default=zd});var Xd=H(Ra=>{"use strict";Object.defineProperty(Ra,"__esModule",{value:!0});Ra.Disposable=void 0;var ok;(function(t){function e(r){return{dispose:r}}t.create=e})(ok=Ra.Disposable||(Ra.Disposable={}))});var ro=H(to=>{"use strict";Object.defineProperty(to,"__esModule",{value:!0});to.Emitter=to.Event=void 0;var sk=Kn(),ak;(function(t){let e={dispose(){}};t.None=function(){return e}})(ak=to.Event||(to.Event={}));var Yd=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,sk.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},Yl=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Yd),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};to.Emitter=Yl;Yl._noop=function(){}});var $y=H(Jl=>{"use strict";Object.defineProperty(Jl,"__esModule",{value:!0});Jl.AbstractMessageBuffer=void 0;var lk=13,uk=10,ck=`\r
`,Jd=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let l=this._chunks[r];for(n=0;n<l.length;){switch(l[n]){case lk:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case uk:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=l.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(ck);if(a.length<2)return s;for(let l=0;l<a.length-2;l++){let u=a[l],c=u.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=u.substr(0,c),m=u.substr(c+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};Jl.AbstractMessageBuffer=Jd});var Py=H(tp=>{"use strict";Object.defineProperty(tp,"__esModule",{value:!0});var _y=Kn(),Fo=Xd(),fk=ro(),dk=$y(),Ql=class t extends dk.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};Ql.emptyBuffer=new Uint8Array(0);var Qd=class{constructor(e){this.socket=e,this._onData=new fk.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,_y.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Fo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Fo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Fo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Zd=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Fo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Fo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Fo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},pk=new TextEncoder,Ny=Object.freeze({messageBuffer:Object.freeze({create:t=>new Ql(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(pk.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Qd(t),asWritableStream:t=>new Zd(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function ep(){return Ny}(function(t){function e(){_y.default.install(Ny)}t.install=e})(ep||(ep={}));tp.default=ep});var Uo=H(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.stringArray=tr.array=tr.func=tr.error=tr.number=tr.string=tr.boolean=void 0;function mk(t){return t===!0||t===!1}tr.boolean=mk;function Iy(t){return typeof t=="string"||t instanceof String}tr.string=Iy;function hk(t){return typeof t=="number"||t instanceof Number}tr.number=hk;function yk(t){return t instanceof Error}tr.error=yk;function gk(t){return typeof t=="function"}tr.func=gk;function Dy(t){return Array.isArray(t)}tr.array=Dy;function Tk(t){return Dy(t)&&t.every(e=>Iy(e))}tr.stringArray=Tk});var Ap=H(V=>{"use strict";Object.defineProperty(V,"__esModule",{value:!0});V.Message=V.NotificationType9=V.NotificationType8=V.NotificationType7=V.NotificationType6=V.NotificationType5=V.NotificationType4=V.NotificationType3=V.NotificationType2=V.NotificationType1=V.NotificationType0=V.NotificationType=V.RequestType9=V.RequestType8=V.RequestType7=V.RequestType6=V.RequestType5=V.RequestType4=V.RequestType3=V.RequestType2=V.RequestType1=V.RequestType=V.RequestType0=V.AbstractMessageSignature=V.ParameterStructures=V.ResponseError=V.ErrorCodes=void 0;var no=Uo(),Oy;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Oy=V.ErrorCodes||(V.ErrorCodes={}));var rp=class t extends Error{constructor(e,r,n){super(r),this.code=no.number(e)?e:Oy.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};V.ResponseError=rp;var Rr=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};V.ParameterStructures=Rr;Rr.auto=new Rr("auto");Rr.byPosition=new Rr("byPosition");Rr.byName=new Rr("byName");var Xe=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Rr.auto}};V.AbstractMessageSignature=Xe;var np=class extends Xe{constructor(e){super(e,0)}};V.RequestType0=np;var ip=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType=ip;var op=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType1=op;var sp=class extends Xe{constructor(e){super(e,2)}};V.RequestType2=sp;var ap=class extends Xe{constructor(e){super(e,3)}};V.RequestType3=ap;var lp=class extends Xe{constructor(e){super(e,4)}};V.RequestType4=lp;var up=class extends Xe{constructor(e){super(e,5)}};V.RequestType5=up;var cp=class extends Xe{constructor(e){super(e,6)}};V.RequestType6=cp;var fp=class extends Xe{constructor(e){super(e,7)}};V.RequestType7=fp;var dp=class extends Xe{constructor(e){super(e,8)}};V.RequestType8=dp;var pp=class extends Xe{constructor(e){super(e,9)}};V.RequestType9=pp;var mp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType=mp;var hp=class extends Xe{constructor(e){super(e,0)}};V.NotificationType0=hp;var yp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType1=yp;var gp=class extends Xe{constructor(e){super(e,2)}};V.NotificationType2=gp;var Tp=class extends Xe{constructor(e){super(e,3)}};V.NotificationType3=Tp;var vp=class extends Xe{constructor(e){super(e,4)}};V.NotificationType4=vp;var Rp=class extends Xe{constructor(e){super(e,5)}};V.NotificationType5=Rp;var xp=class extends Xe{constructor(e){super(e,6)}};V.NotificationType6=xp;var Sp=class extends Xe{constructor(e){super(e,7)}};V.NotificationType7=Sp;var wp=class extends Xe{constructor(e){super(e,8)}};V.NotificationType8=wp;var bp=class extends Xe{constructor(e){super(e,9)}};V.NotificationType9=bp;var vk;(function(t){function e(i){let o=i;return o&&no.string(o.method)&&(no.string(o.id)||no.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&no.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(no.string(o.id)||no.number(o.id)||o.id===null)}t.isResponse=n})(vk=V.Message||(V.Message={}))});var Cp=H(Wn=>{"use strict";var Ly;Object.defineProperty(Wn,"__esModule",{value:!0});Wn.LRUCache=Wn.LinkedMap=Wn.Touch=void 0;var cr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(cr=Wn.Touch||(Wn.Touch={}));var Zl=class{constructor(){this[Ly]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=cr.None){let n=this._map.get(e);if(n)return r!==cr.None&&this.touch(n,r),n.value}set(e,r,n=cr.None){let i=this._map.get(e);if(i)i.value=r,n!==cr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case cr.None:this.addItemLast(i);break;case cr.First:this.addItemFirst(i);break;case cr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(Ly=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==cr.First&&r!==cr.Last)){if(r===cr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===cr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Wn.LinkedMap=Zl;var kp=class extends Zl{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=cr.AsNew){return super.get(e,r)}peek(e){return super.get(e,cr.None)}set(e,r){return super.set(e,r,cr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Wn.LRUCache=kp});var Np=H(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.CancellationTokenSource=io.CancellationToken=void 0;var Rk=Kn(),xk=Uo(),Ep=ro(),$p;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Ep.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Ep.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||xk.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})($p=io.CancellationToken||(io.CancellationToken={}));var Sk=Object.freeze(function(t,e){let r=(0,Rk.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),eu=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?Sk:(this._emitter||(this._emitter=new Ep.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},_p=class{get token(){return this._token||(this._token=new eu),this._token}cancel(){this._token?this._token.cancel():this._token=$p.Cancelled}dispose(){this._token?this._token instanceof eu&&this._token.dispose():this._token=$p.None}};io.CancellationTokenSource=_p});var My=H(Bn=>{"use strict";Object.defineProperty(Bn,"__esModule",{value:!0});Bn.ReadableStreamMessageReader=Bn.AbstractMessageReader=Bn.MessageReader=void 0;var Ip=Kn(),qo=Uo(),Pp=ro(),wk;(function(t){function e(r){let n=r;return n&&qo.func(n.listen)&&qo.func(n.dispose)&&qo.func(n.onError)&&qo.func(n.onClose)&&qo.func(n.onPartialMessage)}t.is=e})(wk=Bn.MessageReader||(Bn.MessageReader={}));var tu=class{constructor(){this.errorEmitter=new Pp.Emitter,this.closeEmitter=new Pp.Emitter,this.partialMessageEmitter=new Pp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${qo.string(e.message)?e.message:"unknown"}`)}};Bn.AbstractMessageReader=tu;var Dp;(function(t){function e(r){let n,i,o,s=new Map,a,l=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let u of r.contentDecoders)s.set(u.name,u);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,l.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let u of r.contentTypeDecoders)l.set(u.name,u)}return a===void 0&&(a=(0,Ip.default)().applicationJson.decoder,l.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:l}}t.fromOptions=e})(Dp||(Dp={}));var Op=class extends tu{constructor(e,r){super(),this.readable=e,this.options=Dp.fromOptions(r),this.buffer=(0,Ip.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Ip.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Bn.ReadableStreamMessageReader=Op});var Fy=H(ru=>{"use strict";Object.defineProperty(ru,"__esModule",{value:!0});ru.Semaphore=void 0;var bk=Kn(),Lp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,bk.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};ru.Semaphore=Lp});var Gy=H(zn=>{"use strict";Object.defineProperty(zn,"__esModule",{value:!0});zn.WriteableStreamMessageWriter=zn.AbstractMessageWriter=zn.MessageWriter=void 0;var Uy=Kn(),xa=Uo(),Ak=Fy(),qy=ro(),kk="Content-Length: ",jy=`\r
`,Ck;(function(t){function e(r){let n=r;return n&&xa.func(n.dispose)&&xa.func(n.onClose)&&xa.func(n.onError)&&xa.func(n.write)}t.is=e})(Ck=zn.MessageWriter||(zn.MessageWriter={}));var nu=class{constructor(){this.errorEmitter=new qy.Emitter,this.closeEmitter=new qy.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${xa.string(e.message)?e.message:"unknown"}`)}};zn.AbstractMessageWriter=nu;var Mp;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,Uy.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,Uy.default)().applicationJson.encoder}}t.fromOptions=e})(Mp||(Mp={}));var Fp=class extends nu{constructor(e,r){super(),this.writable=e,this.options=Mp.fromOptions(r),this.errorCount=0,this.writeSemaphore=new Ak.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(kk,n.byteLength.toString(),jy),i.push(jy),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};zn.WriteableStreamMessageWriter=Fp});var Vy=H(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var Hy=Kn(),Nt=Uo(),Z=Ap(),Ky=Cp(),Sa=ro(),Up=Np(),ba;(function(t){t.type=new Z.NotificationType("$/cancelRequest")})(ba||(ba={}));var Wy;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(Wy=Y.ProgressToken||(Y.ProgressToken={}));var wa;(function(t){t.type=new Z.NotificationType("$/progress")})(wa||(wa={}));var qp=class{constructor(){}};Y.ProgressType=qp;var jp;(function(t){function e(r){return Nt.func(r)}t.is=e})(jp||(jp={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var $e;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})($e=Y.Trace||(Y.Trace={}));var Ek;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(Ek=Y.TraceValues||(Y.TraceValues={}));(function(t){function e(n){if(!Nt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})($e=Y.Trace||(Y.Trace={}));var tn;(function(t){t.Text="text",t.JSON="json"})(tn=Y.TraceFormat||(Y.TraceFormat={}));(function(t){function e(r){return Nt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(tn=Y.TraceFormat||(Y.TraceFormat={}));var By;(function(t){t.type=new Z.NotificationType("$/setTrace")})(By=Y.SetTraceNotification||(Y.SetTraceNotification={}));var Gp;(function(t){t.type=new Z.NotificationType("$/logTrace")})(Gp=Y.LogTraceNotification||(Y.LogTraceNotification={}));var iu;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(iu=Y.ConnectionErrors||(Y.ConnectionErrors={}));var jo=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Y.ConnectionError=jo;var zy;(function(t){function e(r){let n=r;return n&&Nt.func(n.cancelUndispatched)}t.is=e})(zy=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var Hp;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Up.CancellationTokenSource}});function e(r){let n=r;return n&&Nt.func(n.createCancellationTokenSource)}t.is=e})(Hp=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var Kp;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(ba.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Nt.func(n.sendCancellation)&&Nt.func(n.cleanup)}t.is=e})(Kp=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var Wp;(function(t){t.Message=Object.freeze({receiver:Hp.Message,sender:Kp.Message});function e(r){let n=r;return n&&Hp.is(n.receiver)&&Kp.is(n.sender)}t.is=e})(Wp=Y.CancellationStrategy||(Y.CancellationStrategy={}));var $k;(function(t){function e(r){let n=r;return n&&(Wp.is(n.cancellationStrategy)||zy.is(n.connectionStrategy))}t.is=e})($k=Y.ConnectionOptions||(Y.ConnectionOptions={}));var rn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(rn||(rn={}));function _k(t,e,r,n){let i=r!==void 0?r:Y.NullLogger,o=0,s=0,a=0,l="2.0",u,c=new Map,f,m=new Map,T=new Map,w,A=new Ky.LinkedMap,_=new Map,k=new Set,v=new Map,g=$e.Off,$=tn.Text,D,X=rn.New,ge=new Sa.Emitter,Ee=new Sa.Emitter,Ht=new Sa.Emitter,vt=new Sa.Emitter,M=new Sa.Emitter,b=n&&n.cancellationStrategy?n.cancellationStrategy:Wp.Message;function q(R){if(R===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+R.toString()}function G(R){return R===null?"res-unknown-"+(++a).toString():"res-"+R.toString()}function le(){return"not-"+(++s).toString()}function ee(R,I){Z.Message.isRequest(I)?R.set(q(I.id),I):Z.Message.isResponse(I)?R.set(G(I.id),I):R.set(le(),I)}function Q(R){}function Rt(){return X===rn.Listening}function ut(){return X===rn.Closed}function me(){return X===rn.Disposed}function Er(){(X===rn.New||X===rn.Listening)&&(X=rn.Closed,Ee.fire(void 0))}function jn(R){ge.fire([R,void 0,void 0])}function Ta(R){ge.fire(R)}t.onClose(Er),t.onError(jn),e.onClose(Er),e.onError(Ta);function Ji(){w||A.size===0||(w=(0,Hy.default)().timer.setImmediate(()=>{w=void 0,ur()}))}function ur(){if(A.size===0)return;let R=A.shift();try{Z.Message.isRequest(R)?xt(R):Z.Message.isNotification(R)?vn(R):Z.Message.isResponse(R)?Zt(R):Kt(R)}finally{Ji()}}let Oo=R=>{try{if(Z.Message.isNotification(R)&&R.method===ba.type.method){let I=R.params.id,F=q(I),B=A.get(F);if(Z.Message.isRequest(B)){let Oe=n?.connectionStrategy,Je=Oe&&Oe.cancelUndispatched?Oe.cancelUndispatched(B,Q):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){A.delete(F),v.delete(I),Je.id=B.id,vr(Je,R.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let De=v.get(I);if(De!==void 0){De.cancel(),vi(R);return}else k.add(I)}ee(A,R)}finally{Ji()}};function xt(R){if(me())return;function I(ce,Ue,Te){let ht={jsonrpc:l,id:R.id};ce instanceof Z.ResponseError?ht.error=ce.toJson():ht.result=ce===void 0?null:ce,vr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}function F(ce,Ue,Te){let ht={jsonrpc:l,id:R.id,error:ce.toJson()};vr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}function B(ce,Ue,Te){ce===void 0&&(ce=null);let ht={jsonrpc:l,id:R.id,result:ce};vr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}Qi(R);let De=c.get(R.method),Oe,Je;De&&(Oe=De.type,Je=De.handler);let St=Date.now();if(Je||u){let ce=R.id??String(Date.now()),Ue=b.receiver.createCancellationTokenSource(ce);R.id!==null&&k.has(R.id)&&Ue.cancel(),R.id!==null&&v.set(ce,Ue);try{let Te;if(Je)if(R.params===void 0){if(Oe!==void 0&&Oe.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${R.method} defines ${Oe.numberOfParams} params but received none.`),R.method,St);return}Te=Je(Ue.token)}else if(Array.isArray(R.params)){if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${R.method} defines parameters by name but received parameters by position`),R.method,St);return}Te=Je(...R.params,Ue.token)}else{if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${R.method} defines parameters by position but received parameters by name`),R.method,St);return}Te=Je(R.params,Ue.token)}else u&&(Te=u(R.method,R.params,Ue.token));let ht=Te;Te?ht.then?ht.then(er=>{v.delete(ce),I(er,R.method,St)},er=>{v.delete(ce),er instanceof Z.ResponseError?F(er,R.method,St):er&&Nt.string(er.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed with message: ${er.message}`),R.method,St):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed unexpectedly without providing any details.`),R.method,St)}):(v.delete(ce),I(Te,R.method,St)):(v.delete(ce),B(Te,R.method,St))}catch(Te){v.delete(ce),Te instanceof Z.ResponseError?I(Te,R.method,St):Te&&Nt.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed with message: ${Te.message}`),R.method,St):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed unexpectedly without providing any details.`),R.method,St)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${R.method}`),R.method,St)}function Zt(R){if(!me())if(R.id===null)R.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(R.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let I=R.id,F=_.get(I);if(Gd(R,F),F!==void 0){_.delete(I);try{if(R.error){let B=R.error;F.reject(new Z.ResponseError(B.code,B.message,B.data))}else if(R.result!==void 0)F.resolve(R.result);else throw new Error("Should never happen.")}catch(B){B.message?i.error(`Response handler '${F.method}' failed with message: ${B.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function vn(R){if(me())return;let I,F;if(R.method===ba.type.method){let B=R.params.id;k.delete(B),vi(R);return}else{let B=m.get(R.method);B&&(F=B.handler,I=B.type)}if(F||f)try{if(vi(R),F)if(R.params===void 0)I!==void 0&&I.numberOfParams!==0&&I.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${R.method} defines ${I.numberOfParams} params but received none.`),F();else if(Array.isArray(R.params)){let B=R.params;R.method===wa.type.method&&B.length===2&&Wy.is(B[0])?F({token:B[0],value:B[1]}):(I!==void 0&&(I.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${R.method} defines parameters by name but received parameters by position`),I.numberOfParams!==R.params.length&&i.error(`Notification ${R.method} defines ${I.numberOfParams} params but received ${B.length} arguments`)),F(...B))}else I!==void 0&&I.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${R.method} defines parameters by position but received parameters by name`),F(R.params);else f&&f(R.method,R.params)}catch(B){B.message?i.error(`Notification handler '${R.method}' failed with message: ${B.message}`):i.error(`Notification handler '${R.method}' failed unexpectedly.`)}else Ht.fire(R)}function Kt(R){if(!R){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(R,null,4)}`);let I=R;if(Nt.string(I.id)||Nt.number(I.id)){let F=I.id,B=_.get(F);B&&B.reject(new Error("The received response has neither a result nor an error property."))}}function ct(R){if(R!=null)switch(g){case $e.Verbose:return JSON.stringify(R,null,4);case $e.Compact:return JSON.stringify(R);default:return}}function qr(R){if(!(g===$e.Off||!D))if($===tn.Text){let I;(g===$e.Verbose||g===$e.Compact)&&R.params&&(I=`Params: ${ct(R.params)}

`),D.log(`Sending request '${R.method} - (${R.id})'.`,I)}else Ri("send-request",R)}function $r(R){if(!(g===$e.Off||!D))if($===tn.Text){let I;(g===$e.Verbose||g===$e.Compact)&&(R.params?I=`Params: ${ct(R.params)}

`:I=`No parameters provided.

`),D.log(`Sending notification '${R.method}'.`,I)}else Ri("send-notification",R)}function vr(R,I,F){if(!(g===$e.Off||!D))if($===tn.Text){let B;(g===$e.Verbose||g===$e.Compact)&&(R.error&&R.error.data?B=`Error data: ${ct(R.error.data)}

`:R.result?B=`Result: ${ct(R.result)}

`:R.error===void 0&&(B=`No result returned.

`)),D.log(`Sending response '${I} - (${R.id})'. Processing request took ${Date.now()-F}ms`,B)}else Ri("send-response",R)}function Qi(R){if(!(g===$e.Off||!D))if($===tn.Text){let I;(g===$e.Verbose||g===$e.Compact)&&R.params&&(I=`Params: ${ct(R.params)}

`),D.log(`Received request '${R.method} - (${R.id})'.`,I)}else Ri("receive-request",R)}function vi(R){if(!(g===$e.Off||!D||R.method===Gp.type.method))if($===tn.Text){let I;(g===$e.Verbose||g===$e.Compact)&&(R.params?I=`Params: ${ct(R.params)}

`:I=`No parameters provided.

`),D.log(`Received notification '${R.method}'.`,I)}else Ri("receive-notification",R)}function Gd(R,I){if(!(g===$e.Off||!D))if($===tn.Text){let F;if((g===$e.Verbose||g===$e.Compact)&&(R.error&&R.error.data?F=`Error data: ${ct(R.error.data)}

`:R.result?F=`Result: ${ct(R.result)}

`:R.error===void 0&&(F=`No result returned.

`)),I){let B=R.error?` Request failed: ${R.error.message} (${R.error.code}).`:"";D.log(`Received response '${I.method} - (${R.id})' in ${Date.now()-I.timerStart}ms.${B}`,F)}else D.log(`Received response ${R.id} without active response promise.`,F)}else Ri("receive-response",R)}function Ri(R,I){if(!D||g===$e.Off)return;let F={isLSPMessage:!0,type:R,message:I,timestamp:Date.now()};D.log(F)}function Zi(){if(ut())throw new jo(iu.Closed,"Connection is closed.");if(me())throw new jo(iu.Disposed,"Connection is disposed.")}function Hd(){if(Rt())throw new jo(iu.AlreadyListening,"Connection is already listening")}function Kd(){if(!Rt())throw new Error("Call listen() first.")}function eo(R){return R===void 0?null:R}function Lo(R){if(R!==null)return R}function zl(R){return R!=null&&!Array.isArray(R)&&typeof R=="object"}function va(R,I){switch(R){case Z.ParameterStructures.auto:return zl(I)?Lo(I):[eo(I)];case Z.ParameterStructures.byName:if(!zl(I))throw new Error("Received parameters by name but param is not an object literal.");return Lo(I);case Z.ParameterStructures.byPosition:return[eo(I)];default:throw new Error(`Unknown parameter structure ${R.toString()}`)}}function Vl(R,I){let F,B=R.numberOfParams;switch(B){case 0:F=void 0;break;case 1:F=va(R.parameterStructures,I[0]);break;default:F=[];for(let De=0;De<I.length&&De<B;De++)F.push(eo(I[De]));if(I.length<B)for(let De=I.length;De<B;De++)F.push(null);break}return F}let xi={sendNotification:(R,...I)=>{Zi();let F,B;if(Nt.string(R)){F=R;let Oe=I[0],Je=0,St=Z.ParameterStructures.auto;Z.ParameterStructures.is(Oe)&&(Je=1,St=Oe);let ce=I.length,Ue=ce-Je;switch(Ue){case 0:B=void 0;break;case 1:B=va(St,I[Je]);break;default:if(St===Z.ParameterStructures.byName)throw new Error(`Received ${Ue} parameters for 'by Name' notification parameter structure.`);B=I.slice(Je,ce).map(Te=>eo(Te));break}}else{let Oe=I;F=R.method,B=Vl(R,Oe)}let De={jsonrpc:l,method:F,params:B};return $r(De),e.write(De).catch(()=>i.error("Sending notification failed."))},onNotification:(R,I)=>{Zi();let F;return Nt.func(R)?f=R:I&&(Nt.string(R)?(F=R,m.set(R,{type:void 0,handler:I})):(F=R.method,m.set(R.method,{type:R,handler:I}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(R,I,F)=>{if(T.has(I))throw new Error(`Progress handler for token ${I} already registered`);return T.set(I,F),{dispose:()=>{T.delete(I)}}},sendProgress:(R,I,F)=>xi.sendNotification(wa.type,{token:I,value:F}),onUnhandledProgress:vt.event,sendRequest:(R,...I)=>{Zi(),Kd();let F,B,De;if(Nt.string(R)){F=R;let ce=I[0],Ue=I[I.length-1],Te=0,ht=Z.ParameterStructures.auto;Z.ParameterStructures.is(ce)&&(Te=1,ht=ce);let er=I.length;Up.CancellationToken.is(Ue)&&(er=er-1,De=Ue);let Gn=er-Te;switch(Gn){case 0:B=void 0;break;case 1:B=va(ht,I[Te]);break;default:if(ht===Z.ParameterStructures.byName)throw new Error(`Received ${Gn} parameters for 'by Name' request parameter structure.`);B=I.slice(Te,er).map(Rn=>eo(Rn));break}}else{let ce=I;F=R.method,B=Vl(R,ce);let Ue=R.numberOfParams;De=Up.CancellationToken.is(ce[Ue])?ce[Ue]:void 0}let Oe=o++,Je;return De&&(Je=De.onCancellationRequested(()=>{let ce=b.sender.sendCancellation(xi,Oe);return ce===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Oe}`),Promise.resolve()):ce.catch(()=>{i.log(`Sending cancellation messages for id ${Oe} failed`)})})),new Promise((ce,Ue)=>{let Te={jsonrpc:l,id:Oe,method:F,params:B},ht=Rn=>{ce(Rn),b.sender.cleanup(Oe),Je?.dispose()},er=Rn=>{Ue(Rn),b.sender.cleanup(Oe),Je?.dispose()},Gn={method:F,timerStart:Date.now(),resolve:ht,reject:er};qr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(Rn){Gn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,Rn.message?Rn.message:"Unknown reason")),Gn=null}Gn&&_.set(Oe,Gn)})},onRequest:(R,I)=>{Zi();let F=null;return jp.is(R)?(F=void 0,u=R):Nt.string(R)?(F=null,I!==void 0&&(F=R,c.set(R,{handler:I,type:void 0}))):I!==void 0&&(F=R.method,c.set(R.method,{type:R,handler:I})),{dispose:()=>{F!==null&&(F!==void 0?c.delete(F):u=void 0)}}},hasPendingResponse:()=>_.size>0,trace:async(R,I,F)=>{let B=!1,De=tn.Text;F!==void 0&&(Nt.boolean(F)?B=F:(B=F.sendNotification||!1,De=F.traceFormat||tn.Text)),g=R,$=De,g===$e.Off?D=void 0:D=I,B&&!ut()&&!me()&&await xi.sendNotification(By.type,{value:$e.toString(R)})},onError:ge.event,onClose:Ee.event,onUnhandledNotification:Ht.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=rn.Disposed,M.fire(void 0);let R=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let I of _.values())I.reject(R);_=new Map,v=new Map,k=new Set,A=new Ky.LinkedMap,Nt.func(e.dispose)&&e.dispose(),Nt.func(t.dispose)&&t.dispose()},listen:()=>{Zi(),Hd(),X=rn.Listening,t.listen(Oo)},inspect:()=>{(0,Hy.default)().console.log("inspect")}};return xi.onNotification(Gp.type,R=>{if(g===$e.Off||!D)return;let I=g===$e.Verbose||g===$e.Compact;D.log(R.message,I?R.verbose:void 0)}),xi.onNotification(wa.type,R=>{let I=T.get(R.token);I?I(R.value):vt.fire(R)}),xi}Y.createMessageConnection=_k});var Xp=H(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.TraceFormat=N.TraceValues=N.Trace=N.ProgressType=N.ProgressToken=N.createMessageConnection=N.NullLogger=N.ConnectionOptions=N.ConnectionStrategy=N.WriteableStreamMessageWriter=N.AbstractMessageWriter=N.MessageWriter=N.ReadableStreamMessageReader=N.AbstractMessageReader=N.MessageReader=N.CancellationToken=N.CancellationTokenSource=N.Emitter=N.Event=N.Disposable=N.LRUCache=N.Touch=N.LinkedMap=N.ParameterStructures=N.NotificationType9=N.NotificationType8=N.NotificationType7=N.NotificationType6=N.NotificationType5=N.NotificationType4=N.NotificationType3=N.NotificationType2=N.NotificationType1=N.NotificationType0=N.NotificationType=N.ErrorCodes=N.ResponseError=N.RequestType9=N.RequestType8=N.RequestType7=N.RequestType6=N.RequestType5=N.RequestType4=N.RequestType3=N.RequestType2=N.RequestType1=N.RequestType0=N.RequestType=N.Message=N.RAL=void 0;N.CancellationStrategy=N.CancellationSenderStrategy=N.CancellationReceiverStrategy=N.ConnectionError=N.ConnectionErrors=N.LogTraceNotification=N.SetTraceNotification=void 0;var je=Ap();Object.defineProperty(N,"Message",{enumerable:!0,get:function(){return je.Message}});Object.defineProperty(N,"RequestType",{enumerable:!0,get:function(){return je.RequestType}});Object.defineProperty(N,"RequestType0",{enumerable:!0,get:function(){return je.RequestType0}});Object.defineProperty(N,"RequestType1",{enumerable:!0,get:function(){return je.RequestType1}});Object.defineProperty(N,"RequestType2",{enumerable:!0,get:function(){return je.RequestType2}});Object.defineProperty(N,"RequestType3",{enumerable:!0,get:function(){return je.RequestType3}});Object.defineProperty(N,"RequestType4",{enumerable:!0,get:function(){return je.RequestType4}});Object.defineProperty(N,"RequestType5",{enumerable:!0,get:function(){return je.RequestType5}});Object.defineProperty(N,"RequestType6",{enumerable:!0,get:function(){return je.RequestType6}});Object.defineProperty(N,"RequestType7",{enumerable:!0,get:function(){return je.RequestType7}});Object.defineProperty(N,"RequestType8",{enumerable:!0,get:function(){return je.RequestType8}});Object.defineProperty(N,"RequestType9",{enumerable:!0,get:function(){return je.RequestType9}});Object.defineProperty(N,"ResponseError",{enumerable:!0,get:function(){return je.ResponseError}});Object.defineProperty(N,"ErrorCodes",{enumerable:!0,get:function(){return je.ErrorCodes}});Object.defineProperty(N,"NotificationType",{enumerable:!0,get:function(){return je.NotificationType}});Object.defineProperty(N,"NotificationType0",{enumerable:!0,get:function(){return je.NotificationType0}});Object.defineProperty(N,"NotificationType1",{enumerable:!0,get:function(){return je.NotificationType1}});Object.defineProperty(N,"NotificationType2",{enumerable:!0,get:function(){return je.NotificationType2}});Object.defineProperty(N,"NotificationType3",{enumerable:!0,get:function(){return je.NotificationType3}});Object.defineProperty(N,"NotificationType4",{enumerable:!0,get:function(){return je.NotificationType4}});Object.defineProperty(N,"NotificationType5",{enumerable:!0,get:function(){return je.NotificationType5}});Object.defineProperty(N,"NotificationType6",{enumerable:!0,get:function(){return je.NotificationType6}});Object.defineProperty(N,"NotificationType7",{enumerable:!0,get:function(){return je.NotificationType7}});Object.defineProperty(N,"NotificationType8",{enumerable:!0,get:function(){return je.NotificationType8}});Object.defineProperty(N,"NotificationType9",{enumerable:!0,get:function(){return je.NotificationType9}});Object.defineProperty(N,"ParameterStructures",{enumerable:!0,get:function(){return je.ParameterStructures}});var Bp=Cp();Object.defineProperty(N,"LinkedMap",{enumerable:!0,get:function(){return Bp.LinkedMap}});Object.defineProperty(N,"LRUCache",{enumerable:!0,get:function(){return Bp.LRUCache}});Object.defineProperty(N,"Touch",{enumerable:!0,get:function(){return Bp.Touch}});var Nk=Xd();Object.defineProperty(N,"Disposable",{enumerable:!0,get:function(){return Nk.Disposable}});var Xy=ro();Object.defineProperty(N,"Event",{enumerable:!0,get:function(){return Xy.Event}});Object.defineProperty(N,"Emitter",{enumerable:!0,get:function(){return Xy.Emitter}});var Yy=Np();Object.defineProperty(N,"CancellationTokenSource",{enumerable:!0,get:function(){return Yy.CancellationTokenSource}});Object.defineProperty(N,"CancellationToken",{enumerable:!0,get:function(){return Yy.CancellationToken}});var zp=My();Object.defineProperty(N,"MessageReader",{enumerable:!0,get:function(){return zp.MessageReader}});Object.defineProperty(N,"AbstractMessageReader",{enumerable:!0,get:function(){return zp.AbstractMessageReader}});Object.defineProperty(N,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return zp.ReadableStreamMessageReader}});var Vp=Gy();Object.defineProperty(N,"MessageWriter",{enumerable:!0,get:function(){return Vp.MessageWriter}});Object.defineProperty(N,"AbstractMessageWriter",{enumerable:!0,get:function(){return Vp.AbstractMessageWriter}});Object.defineProperty(N,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Vp.WriteableStreamMessageWriter}});var rr=Vy();Object.defineProperty(N,"ConnectionStrategy",{enumerable:!0,get:function(){return rr.ConnectionStrategy}});Object.defineProperty(N,"ConnectionOptions",{enumerable:!0,get:function(){return rr.ConnectionOptions}});Object.defineProperty(N,"NullLogger",{enumerable:!0,get:function(){return rr.NullLogger}});Object.defineProperty(N,"createMessageConnection",{enumerable:!0,get:function(){return rr.createMessageConnection}});Object.defineProperty(N,"ProgressToken",{enumerable:!0,get:function(){return rr.ProgressToken}});Object.defineProperty(N,"ProgressType",{enumerable:!0,get:function(){return rr.ProgressType}});Object.defineProperty(N,"Trace",{enumerable:!0,get:function(){return rr.Trace}});Object.defineProperty(N,"TraceValues",{enumerable:!0,get:function(){return rr.TraceValues}});Object.defineProperty(N,"TraceFormat",{enumerable:!0,get:function(){return rr.TraceFormat}});Object.defineProperty(N,"SetTraceNotification",{enumerable:!0,get:function(){return rr.SetTraceNotification}});Object.defineProperty(N,"LogTraceNotification",{enumerable:!0,get:function(){return rr.LogTraceNotification}});Object.defineProperty(N,"ConnectionErrors",{enumerable:!0,get:function(){return rr.ConnectionErrors}});Object.defineProperty(N,"ConnectionError",{enumerable:!0,get:function(){return rr.ConnectionError}});Object.defineProperty(N,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return rr.CancellationReceiverStrategy}});Object.defineProperty(N,"CancellationSenderStrategy",{enumerable:!0,get:function(){return rr.CancellationSenderStrategy}});Object.defineProperty(N,"CancellationStrategy",{enumerable:!0,get:function(){return rr.CancellationStrategy}});var Pk=Kn();N.RAL=Pk.default});var Vn=H(_r=>{"use strict";var Ik=_r&&_r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Dk=_r&&_r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Ik(e,t,r)};Object.defineProperty(_r,"__esModule",{value:!0});_r.createMessageConnection=_r.BrowserMessageWriter=_r.BrowserMessageReader=void 0;var Ok=Py();Ok.default.install();var Go=Xp();Dk(Xp(),_r);var Yp=class extends Go.AbstractMessageReader{constructor(e){super(),this._onData=new Go.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};_r.BrowserMessageReader=Yp;var Jp=class extends Go.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};_r.BrowserMessageWriter=Jp;function Lk(t,e,r,n){return r===void 0&&(r=Go.NullLogger),Go.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Go.createMessageConnection)(t,e,r,n)}_r.createMessageConnection=Lk});var Qp=H((rj,Jy)=>{"use strict";Jy.exports=Vn()});var oo=H((Qy,ou)=>{(function(t){if(typeof ou=="object"&&typeof ou.exports=="object"){var e=t(Ey,Qy);e!==void 0&&(ou.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function x(S){return typeof S=="string"}p.is=x})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function x(S){return typeof S=="string"}p.is=x})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function x(S){return typeof S=="number"&&p.MIN_VALUE<=S&&S<=p.MAX_VALUE}p.is=x})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function x(S){return typeof S=="number"&&p.MIN_VALUE<=S&&S<=p.MAX_VALUE}p.is=x})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function x(y,d){return y===Number.MAX_VALUE&&(y=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:y,character:d}}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&C.uinteger(d.line)&&C.uinteger(d.character)}p.is=S})(s=e.Position||(e.Position={}));var a;(function(p){function x(y,d,E,P){if(C.uinteger(y)&&C.uinteger(d)&&C.uinteger(E)&&C.uinteger(P))return{start:s.create(y,d),end:s.create(E,P)};if(s.is(y)&&s.is(d))return{start:y,end:d};throw new Error("Range#create called with invalid arguments[".concat(y,", ").concat(d,", ").concat(E,", ").concat(P,"]"))}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=S})(a=e.Range||(e.Range={}));var l;(function(p){function x(y,d){return{uri:y,range:d}}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&a.is(d.range)&&(C.string(d.uri)||C.undefined(d.uri))}p.is=S})(l=e.Location||(e.Location={}));var u;(function(p){function x(y,d,E,P){return{targetUri:y,targetRange:d,targetSelectionRange:E,originSelectionRange:P}}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&a.is(d.targetRange)&&C.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||C.undefined(d.originSelectionRange))}p.is=S})(u=e.LocationLink||(e.LocationLink={}));var c;(function(p){function x(y,d,E,P){return{red:y,green:d,blue:E,alpha:P}}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&C.numberRange(d.red,0,1)&&C.numberRange(d.green,0,1)&&C.numberRange(d.blue,0,1)&&C.numberRange(d.alpha,0,1)}p.is=S})(c=e.Color||(e.Color={}));var f;(function(p){function x(y,d){return{range:y,color:d}}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&a.is(d.range)&&c.is(d.color)}p.is=S})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function x(y,d,E){return{label:y,textEdit:d,additionalTextEdits:E}}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&C.string(d.label)&&(C.undefined(d.textEdit)||D.is(d))&&(C.undefined(d.additionalTextEdits)||C.typedArray(d.additionalTextEdits,D.is))}p.is=S})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var w;(function(p){function x(y,d,E,P,re,ft){var qe={startLine:y,endLine:d};return C.defined(E)&&(qe.startCharacter=E),C.defined(P)&&(qe.endCharacter=P),C.defined(re)&&(qe.kind=re),C.defined(ft)&&(qe.collapsedText=ft),qe}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&C.uinteger(d.startLine)&&C.uinteger(d.startLine)&&(C.undefined(d.startCharacter)||C.uinteger(d.startCharacter))&&(C.undefined(d.endCharacter)||C.uinteger(d.endCharacter))&&(C.undefined(d.kind)||C.string(d.kind))}p.is=S})(w=e.FoldingRange||(e.FoldingRange={}));var A;(function(p){function x(y,d){return{location:y,message:d}}p.create=x;function S(y){var d=y;return C.defined(d)&&l.is(d.location)&&C.string(d.message)}p.is=S})(A=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var _;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(_=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var k;(function(p){p.Unnecessary=1,p.Deprecated=2})(k=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function x(S){var y=S;return C.objectLiteral(y)&&C.string(y.href)}p.is=x})(v=e.CodeDescription||(e.CodeDescription={}));var g;(function(p){function x(y,d,E,P,re,ft){var qe={range:y,message:d};return C.defined(E)&&(qe.severity=E),C.defined(P)&&(qe.code=P),C.defined(re)&&(qe.source=re),C.defined(ft)&&(qe.relatedInformation=ft),qe}p.create=x;function S(y){var d,E=y;return C.defined(E)&&a.is(E.range)&&C.string(E.message)&&(C.number(E.severity)||C.undefined(E.severity))&&(C.integer(E.code)||C.string(E.code)||C.undefined(E.code))&&(C.undefined(E.codeDescription)||C.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(C.string(E.source)||C.undefined(E.source))&&(C.undefined(E.relatedInformation)||C.typedArray(E.relatedInformation,A.is))}p.is=S})(g=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function x(y,d){for(var E=[],P=2;P<arguments.length;P++)E[P-2]=arguments[P];var re={title:y,command:d};return C.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=x;function S(y){var d=y;return C.defined(d)&&C.string(d.title)&&C.string(d.command)}p.is=S})($=e.Command||(e.Command={}));var D;(function(p){function x(E,P){return{range:E,newText:P}}p.replace=x;function S(E,P){return{range:{start:E,end:E},newText:P}}p.insert=S;function y(E){return{range:E,newText:""}}p.del=y;function d(E){var P=E;return C.objectLiteral(P)&&C.string(P.newText)&&a.is(P.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var X;(function(p){function x(y,d,E){var P={label:y};return d!==void 0&&(P.needsConfirmation=d),E!==void 0&&(P.description=E),P}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&C.string(d.label)&&(C.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(C.string(d.description)||d.description===void 0)}p.is=S})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ge;(function(p){function x(S){var y=S;return C.string(y)}p.is=x})(ge=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function x(E,P,re){return{range:E,newText:P,annotationId:re}}p.replace=x;function S(E,P,re){return{range:{start:E,end:E},newText:P,annotationId:re}}p.insert=S;function y(E,P){return{range:E,newText:"",annotationId:P}}p.del=y;function d(E){var P=E;return D.is(P)&&(X.is(P.annotationId)||ge.is(P.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ht;(function(p){function x(y,d){return{textDocument:y,edits:d}}p.create=x;function S(y){var d=y;return C.defined(d)&&ut.is(d.textDocument)&&Array.isArray(d.edits)}p.is=S})(Ht=e.TextDocumentEdit||(e.TextDocumentEdit={}));var vt;(function(p){function x(y,d,E){var P={kind:"create",uri:y};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(P.options=d),E!==void 0&&(P.annotationId=E),P}p.create=x;function S(y){var d=y;return d&&d.kind==="create"&&C.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||C.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||C.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=S})(vt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function x(y,d,E,P){var re={kind:"rename",oldUri:y,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),P!==void 0&&(re.annotationId=P),re}p.create=x;function S(y){var d=y;return d&&d.kind==="rename"&&C.string(d.oldUri)&&C.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||C.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||C.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=S})(M=e.RenameFile||(e.RenameFile={}));var b;(function(p){function x(y,d,E){var P={kind:"delete",uri:y};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(P.options=d),E!==void 0&&(P.annotationId=E),P}p.create=x;function S(y){var d=y;return d&&d.kind==="delete"&&C.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||C.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||C.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=S})(b=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function x(S){var y=S;return y&&(y.changes!==void 0||y.documentChanges!==void 0)&&(y.documentChanges===void 0||y.documentChanges.every(function(d){return C.string(d.kind)?vt.is(d)||M.is(d)||b.is(d):Ht.is(d)}))}p.is=x})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var G=function(){function p(x,S){this.edits=x,this.changeAnnotations=S}return p.prototype.insert=function(x,S,y){var d,E;if(y===void 0?d=D.insert(x,S):ge.is(y)?(E=y,d=Ee.insert(x,S,y)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(y),d=Ee.insert(x,S,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(x,S,y){var d,E;if(y===void 0?d=D.replace(x,S):ge.is(y)?(E=y,d=Ee.replace(x,S,y)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(y),d=Ee.replace(x,S,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(x,S){var y,d;if(S===void 0?y=D.del(x):ge.is(S)?(d=S,y=Ee.del(x,S)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(S),y=Ee.del(x,d)),this.edits.push(y),d!==void 0)return d},p.prototype.add=function(x){this.edits.push(x)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(x){if(x===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),le=function(){function p(x){this._annotations=x===void 0?Object.create(null):x,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(x,S){var y;if(ge.is(x)?y=x:(y=this.nextId(),S=x),this._annotations[y]!==void 0)throw new Error("Id ".concat(y," is already in use."));if(S===void 0)throw new Error("No annotation provided for id ".concat(y));return this._annotations[y]=S,this._size++,y},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(x){var S=this;this._textEditChanges=Object.create(null),x!==void 0?(this._workspaceEdit=x,x.documentChanges?(this._changeAnnotations=new le(x.changeAnnotations),x.changeAnnotations=this._changeAnnotations.all(),x.documentChanges.forEach(function(y){if(Ht.is(y)){var d=new G(y.edits,S._changeAnnotations);S._textEditChanges[y.textDocument.uri]=d}})):x.changes&&Object.keys(x.changes).forEach(function(y){var d=new G(x.changes[y]);S._textEditChanges[y]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(x){if(ut.is(x)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var S={uri:x.uri,version:x.version},y=this._textEditChanges[S.uri];if(!y){var d=[],E={textDocument:S,edits:d};this._workspaceEdit.documentChanges.push(E),y=new G(d,this._changeAnnotations),this._textEditChanges[S.uri]=y}return y}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var y=this._textEditChanges[x];if(!y){var d=[];this._workspaceEdit.changes[x]=d,y=new G(d),this._textEditChanges[x]=y}return y}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new le,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(x,S,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(S)||ge.is(S)?d=S:y=S;var E,P;if(d===void 0?E=vt.create(x,y):(P=ge.is(d)?d:this._changeAnnotations.manage(d),E=vt.create(x,y,P)),this._workspaceEdit.documentChanges.push(E),P!==void 0)return P},p.prototype.renameFile=function(x,S,y,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(y)||ge.is(y)?E=y:d=y;var P,re;if(E===void 0?P=M.create(x,S,d):(re=ge.is(E)?E:this._changeAnnotations.manage(E),P=M.create(x,S,d,re)),this._workspaceEdit.documentChanges.push(P),re!==void 0)return re},p.prototype.deleteFile=function(x,S,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(S)||ge.is(S)?d=S:y=S;var E,P;if(d===void 0?E=b.create(x,y):(P=ge.is(d)?d:this._changeAnnotations.manage(d),E=b.create(x,y,P)),this._workspaceEdit.documentChanges.push(E),P!==void 0)return P},p}();e.WorkspaceChange=ee;var Q;(function(p){function x(y){return{uri:y}}p.create=x;function S(y){var d=y;return C.defined(d)&&C.string(d.uri)}p.is=S})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var Rt;(function(p){function x(y,d){return{uri:y,version:d}}p.create=x;function S(y){var d=y;return C.defined(d)&&C.string(d.uri)&&C.integer(d.version)}p.is=S})(Rt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ut;(function(p){function x(y,d){return{uri:y,version:d}}p.create=x;function S(y){var d=y;return C.defined(d)&&C.string(d.uri)&&(d.version===null||C.integer(d.version))}p.is=S})(ut=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function x(y,d,E,P){return{uri:y,languageId:d,version:E,text:P}}p.create=x;function S(y){var d=y;return C.defined(d)&&C.string(d.uri)&&C.string(d.languageId)&&C.integer(d.version)&&C.string(d.text)}p.is=S})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var Er;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function x(S){var y=S;return y===p.PlainText||y===p.Markdown}p.is=x})(Er=e.MarkupKind||(e.MarkupKind={}));var jn;(function(p){function x(S){var y=S;return C.objectLiteral(S)&&Er.is(y.kind)&&C.string(y.value)}p.is=x})(jn=e.MarkupContent||(e.MarkupContent={}));var Ta;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(Ta=e.CompletionItemKind||(e.CompletionItemKind={}));var Ji;(function(p){p.PlainText=1,p.Snippet=2})(Ji=e.InsertTextFormat||(e.InsertTextFormat={}));var ur;(function(p){p.Deprecated=1})(ur=e.CompletionItemTag||(e.CompletionItemTag={}));var Oo;(function(p){function x(y,d,E){return{newText:y,insert:d,replace:E}}p.create=x;function S(y){var d=y;return d&&C.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=S})(Oo=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var xt;(function(p){p.asIs=1,p.adjustIndentation=2})(xt=e.InsertTextMode||(e.InsertTextMode={}));var Zt;(function(p){function x(S){var y=S;return y&&(C.string(y.detail)||y.detail===void 0)&&(C.string(y.description)||y.description===void 0)}p.is=x})(Zt=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var vn;(function(p){function x(S){return{label:S}}p.create=x})(vn=e.CompletionItem||(e.CompletionItem={}));var Kt;(function(p){function x(S,y){return{items:S||[],isIncomplete:!!y}}p.create=x})(Kt=e.CompletionList||(e.CompletionList={}));var ct;(function(p){function x(y){return y.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=x;function S(y){var d=y;return C.string(d)||C.objectLiteral(d)&&C.string(d.language)&&C.string(d.value)}p.is=S})(ct=e.MarkedString||(e.MarkedString={}));var qr;(function(p){function x(S){var y=S;return!!y&&C.objectLiteral(y)&&(jn.is(y.contents)||ct.is(y.contents)||C.typedArray(y.contents,ct.is))&&(S.range===void 0||a.is(S.range))}p.is=x})(qr=e.Hover||(e.Hover={}));var $r;(function(p){function x(S,y){return y?{label:S,documentation:y}:{label:S}}p.create=x})($r=e.ParameterInformation||(e.ParameterInformation={}));var vr;(function(p){function x(S,y){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var P={label:S};return C.defined(y)&&(P.documentation=y),C.defined(d)?P.parameters=d:P.parameters=[],P}p.create=x})(vr=e.SignatureInformation||(e.SignatureInformation={}));var Qi;(function(p){p.Text=1,p.Read=2,p.Write=3})(Qi=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var vi;(function(p){function x(S,y){var d={range:S};return C.number(y)&&(d.kind=y),d}p.create=x})(vi=e.DocumentHighlight||(e.DocumentHighlight={}));var Gd;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(Gd=e.SymbolKind||(e.SymbolKind={}));var Ri;(function(p){p.Deprecated=1})(Ri=e.SymbolTag||(e.SymbolTag={}));var Zi;(function(p){function x(S,y,d,E,P){var re={name:S,kind:y,location:{uri:E,range:d}};return P&&(re.containerName=P),re}p.create=x})(Zi=e.SymbolInformation||(e.SymbolInformation={}));var Hd;(function(p){function x(S,y,d,E){return E!==void 0?{name:S,kind:y,location:{uri:d,range:E}}:{name:S,kind:y,location:{uri:d}}}p.create=x})(Hd=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var Kd;(function(p){function x(y,d,E,P,re,ft){var qe={name:y,detail:d,kind:E,range:P,selectionRange:re};return ft!==void 0&&(qe.children=ft),qe}p.create=x;function S(y){var d=y;return d&&C.string(d.name)&&C.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||C.string(d.detail))&&(d.deprecated===void 0||C.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=S})(Kd=e.DocumentSymbol||(e.DocumentSymbol={}));var eo;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(eo=e.CodeActionKind||(e.CodeActionKind={}));var Lo;(function(p){p.Invoked=1,p.Automatic=2})(Lo=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var zl;(function(p){function x(y,d,E){var P={diagnostics:y};return d!=null&&(P.only=d),E!=null&&(P.triggerKind=E),P}p.create=x;function S(y){var d=y;return C.defined(d)&&C.typedArray(d.diagnostics,g.is)&&(d.only===void 0||C.typedArray(d.only,C.string))&&(d.triggerKind===void 0||d.triggerKind===Lo.Invoked||d.triggerKind===Lo.Automatic)}p.is=S})(zl=e.CodeActionContext||(e.CodeActionContext={}));var va;(function(p){function x(y,d,E){var P={title:y},re=!0;return typeof d=="string"?(re=!1,P.kind=d):$.is(d)?P.command=d:P.edit=d,re&&E!==void 0&&(P.kind=E),P}p.create=x;function S(y){var d=y;return d&&C.string(d.title)&&(d.diagnostics===void 0||C.typedArray(d.diagnostics,g.is))&&(d.kind===void 0||C.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||C.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=S})(va=e.CodeAction||(e.CodeAction={}));var Vl;(function(p){function x(y,d){var E={range:y};return C.defined(d)&&(E.data=d),E}p.create=x;function S(y){var d=y;return C.defined(d)&&a.is(d.range)&&(C.undefined(d.command)||$.is(d.command))}p.is=S})(Vl=e.CodeLens||(e.CodeLens={}));var xi;(function(p){function x(y,d){return{tabSize:y,insertSpaces:d}}p.create=x;function S(y){var d=y;return C.defined(d)&&C.uinteger(d.tabSize)&&C.boolean(d.insertSpaces)}p.is=S})(xi=e.FormattingOptions||(e.FormattingOptions={}));var R;(function(p){function x(y,d,E){return{range:y,target:d,data:E}}p.create=x;function S(y){var d=y;return C.defined(d)&&a.is(d.range)&&(C.undefined(d.target)||C.string(d.target))}p.is=S})(R=e.DocumentLink||(e.DocumentLink={}));var I;(function(p){function x(y,d){return{range:y,parent:d}}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=S})(I=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var B;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(B=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var De;(function(p){function x(S){var y=S;return C.objectLiteral(y)&&(y.resultId===void 0||typeof y.resultId=="string")&&Array.isArray(y.data)&&(y.data.length===0||typeof y.data[0]=="number")}p.is=x})(De=e.SemanticTokens||(e.SemanticTokens={}));var Oe;(function(p){function x(y,d){return{range:y,text:d}}p.create=x;function S(y){var d=y;return d!=null&&a.is(d.range)&&C.string(d.text)}p.is=S})(Oe=e.InlineValueText||(e.InlineValueText={}));var Je;(function(p){function x(y,d,E){return{range:y,variableName:d,caseSensitiveLookup:E}}p.create=x;function S(y){var d=y;return d!=null&&a.is(d.range)&&C.boolean(d.caseSensitiveLookup)&&(C.string(d.variableName)||d.variableName===void 0)}p.is=S})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var St;(function(p){function x(y,d){return{range:y,expression:d}}p.create=x;function S(y){var d=y;return d!=null&&a.is(d.range)&&(C.string(d.expression)||d.expression===void 0)}p.is=S})(St=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ce;(function(p){function x(y,d){return{frameId:y,stoppedLocation:d}}p.create=x;function S(y){var d=y;return C.defined(d)&&a.is(y.stoppedLocation)}p.is=S})(ce=e.InlineValueContext||(e.InlineValueContext={}));var Ue;(function(p){p.Type=1,p.Parameter=2;function x(S){return S===1||S===2}p.is=x})(Ue=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function x(y){return{value:y}}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&(d.tooltip===void 0||C.string(d.tooltip)||jn.is(d.tooltip))&&(d.location===void 0||l.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=S})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var ht;(function(p){function x(y,d,E){var P={position:y,label:d};return E!==void 0&&(P.kind=E),P}p.create=x;function S(y){var d=y;return C.objectLiteral(d)&&s.is(d.position)&&(C.string(d.label)||C.typedArray(d.label,Te.is))&&(d.kind===void 0||Ue.is(d.kind))&&d.textEdits===void 0||C.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||C.string(d.tooltip)||jn.is(d.tooltip))&&(d.paddingLeft===void 0||C.boolean(d.paddingLeft))&&(d.paddingRight===void 0||C.boolean(d.paddingRight))}p.is=S})(ht=e.InlayHint||(e.InlayHint={}));var er;(function(p){function x(S){var y=S;return C.objectLiteral(y)&&n.is(y.uri)&&C.string(y.name)}p.is=x})(er=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Gn;(function(p){function x(E,P,re,ft){return new Rn(E,P,re,ft)}p.create=x;function S(E){var P=E;return!!(C.defined(P)&&C.string(P.uri)&&(C.undefined(P.languageId)||C.string(P.languageId))&&C.uinteger(P.lineCount)&&C.func(P.getText)&&C.func(P.positionAt)&&C.func(P.offsetAt))}p.is=S;function y(E,P){for(var re=E.getText(),ft=d(P,function(Mo,Xl){var Cy=Mo.range.start.line-Xl.range.start.line;return Cy===0?Mo.range.start.character-Xl.range.start.character:Cy}),qe=re.length,Zr=ft.length-1;Zr>=0;Zr--){var en=ft[Zr],Hn=E.offsetAt(en.range.start),fe=E.offsetAt(en.range.end);if(fe<=qe)re=re.substring(0,Hn)+en.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");qe=Hn}return re}p.applyEdits=y;function d(E,P){if(E.length<=1)return E;var re=E.length/2|0,ft=E.slice(0,re),qe=E.slice(re);d(ft,P),d(qe,P);for(var Zr=0,en=0,Hn=0;Zr<ft.length&&en<qe.length;){var fe=P(ft[Zr],qe[en]);fe<=0?E[Hn++]=ft[Zr++]:E[Hn++]=qe[en++]}for(;Zr<ft.length;)E[Hn++]=ft[Zr++];for(;en<qe.length;)E[Hn++]=qe[en++];return E}})(Gn=e.TextDocument||(e.TextDocument={}));var Rn=function(){function p(x,S,y,d){this._uri=x,this._languageId=S,this._version=y,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(x){if(x){var S=this.offsetAt(x.start),y=this.offsetAt(x.end);return this._content.substring(S,y)}return this._content},p.prototype.update=function(x,S){this._content=x.text,this._version=S,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var x=[],S=this._content,y=!0,d=0;d<S.length;d++){y&&(x.push(d),y=!1);var E=S.charAt(d);y=E==="\r"||E===`
`,E==="\r"&&d+1<S.length&&S.charAt(d+1)===`
`&&d++}y&&S.length>0&&x.push(S.length),this._lineOffsets=x}return this._lineOffsets},p.prototype.positionAt=function(x){x=Math.max(Math.min(x,this._content.length),0);var S=this.getLineOffsets(),y=0,d=S.length;if(d===0)return s.create(0,x);for(;y<d;){var E=Math.floor((y+d)/2);S[E]>x?d=E:y=E+1}var P=y-1;return s.create(P,x-S[P])},p.prototype.offsetAt=function(x){var S=this.getLineOffsets();if(x.line>=S.length)return this._content.length;if(x.line<0)return 0;var y=S[x.line],d=x.line+1<S.length?S[x.line+1]:this._content.length;return Math.max(Math.min(y+x.character,d),y)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),C;(function(p){var x=Object.prototype.toString;function S(fe){return typeof fe<"u"}p.defined=S;function y(fe){return typeof fe>"u"}p.undefined=y;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return x.call(fe)==="[object String]"}p.string=E;function P(fe){return x.call(fe)==="[object Number]"}p.number=P;function re(fe,Mo,Xl){return x.call(fe)==="[object Number]"&&Mo<=fe&&fe<=Xl}p.numberRange=re;function ft(fe){return x.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=ft;function qe(fe){return x.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=qe;function Zr(fe){return x.call(fe)==="[object Function]"}p.func=Zr;function en(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=en;function Hn(fe,Mo){return Array.isArray(fe)&&fe.every(Mo)}p.typedArray=Hn})(C||(C={}))})});var nt=H(fr=>{"use strict";Object.defineProperty(fr,"__esModule",{value:!0});fr.ProtocolNotificationType=fr.ProtocolNotificationType0=fr.ProtocolRequestType=fr.ProtocolRequestType0=fr.RegistrationType=fr.MessageDirection=void 0;var Ho=Vn(),Mk;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(Mk=fr.MessageDirection||(fr.MessageDirection={}));var Zp=class{constructor(e){this.method=e}};fr.RegistrationType=Zp;var em=class extends Ho.RequestType0{constructor(e){super(e)}};fr.ProtocolRequestType0=em;var tm=class extends Ho.RequestType{constructor(e){super(e,Ho.ParameterStructures.byName)}};fr.ProtocolRequestType=tm;var rm=class extends Ho.NotificationType0{constructor(e){super(e)}};fr.ProtocolNotificationType0=rm;var nm=class extends Ho.NotificationType{constructor(e){super(e,Ho.ParameterStructures.byName)}};fr.ProtocolNotificationType=nm});var su=H(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.objectLiteral=wt.typedArray=wt.stringArray=wt.array=wt.func=wt.error=wt.number=wt.string=wt.boolean=void 0;function Fk(t){return t===!0||t===!1}wt.boolean=Fk;function Zy(t){return typeof t=="string"||t instanceof String}wt.string=Zy;function Uk(t){return typeof t=="number"||t instanceof Number}wt.number=Uk;function qk(t){return t instanceof Error}wt.error=qk;function jk(t){return typeof t=="function"}wt.func=jk;function eg(t){return Array.isArray(t)}wt.array=eg;function Gk(t){return eg(t)&&t.every(e=>Zy(e))}wt.stringArray=Gk;function Hk(t,e){return Array.isArray(t)&&t.every(e)}wt.typedArray=Hk;function Kk(t){return t!==null&&typeof t=="object"}wt.objectLiteral=Kk});var rg=H(Aa=>{"use strict";Object.defineProperty(Aa,"__esModule",{value:!0});Aa.ImplementationRequest=void 0;var tg=nt(),Wk;(function(t){t.method="textDocument/implementation",t.messageDirection=tg.MessageDirection.clientToServer,t.type=new tg.ProtocolRequestType(t.method)})(Wk=Aa.ImplementationRequest||(Aa.ImplementationRequest={}))});var ig=H(ka=>{"use strict";Object.defineProperty(ka,"__esModule",{value:!0});ka.TypeDefinitionRequest=void 0;var ng=nt(),Bk;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=ng.MessageDirection.clientToServer,t.type=new ng.ProtocolRequestType(t.method)})(Bk=ka.TypeDefinitionRequest||(ka.TypeDefinitionRequest={}))});var og=H(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.DidChangeWorkspaceFoldersNotification=Si.WorkspaceFoldersRequest=void 0;var au=nt(),zk;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=au.MessageDirection.serverToClient,t.type=new au.ProtocolRequestType0(t.method)})(zk=Si.WorkspaceFoldersRequest||(Si.WorkspaceFoldersRequest={}));var Vk;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=au.MessageDirection.clientToServer,t.type=new au.ProtocolNotificationType(t.method)})(Vk=Si.DidChangeWorkspaceFoldersNotification||(Si.DidChangeWorkspaceFoldersNotification={}))});var ag=H(Ca=>{"use strict";Object.defineProperty(Ca,"__esModule",{value:!0});Ca.ConfigurationRequest=void 0;var sg=nt(),Xk;(function(t){t.method="workspace/configuration",t.messageDirection=sg.MessageDirection.serverToClient,t.type=new sg.ProtocolRequestType(t.method)})(Xk=Ca.ConfigurationRequest||(Ca.ConfigurationRequest={}))});var lg=H(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.ColorPresentationRequest=wi.DocumentColorRequest=void 0;var lu=nt(),Yk;(function(t){t.method="textDocument/documentColor",t.messageDirection=lu.MessageDirection.clientToServer,t.type=new lu.ProtocolRequestType(t.method)})(Yk=wi.DocumentColorRequest||(wi.DocumentColorRequest={}));var Jk;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=lu.MessageDirection.clientToServer,t.type=new lu.ProtocolRequestType(t.method)})(Jk=wi.ColorPresentationRequest||(wi.ColorPresentationRequest={}))});var cg=H(Ea=>{"use strict";Object.defineProperty(Ea,"__esModule",{value:!0});Ea.FoldingRangeRequest=void 0;var ug=nt(),Qk;(function(t){t.method="textDocument/foldingRange",t.messageDirection=ug.MessageDirection.clientToServer,t.type=new ug.ProtocolRequestType(t.method)})(Qk=Ea.FoldingRangeRequest||(Ea.FoldingRangeRequest={}))});var dg=H($a=>{"use strict";Object.defineProperty($a,"__esModule",{value:!0});$a.DeclarationRequest=void 0;var fg=nt(),Zk;(function(t){t.method="textDocument/declaration",t.messageDirection=fg.MessageDirection.clientToServer,t.type=new fg.ProtocolRequestType(t.method)})(Zk=$a.DeclarationRequest||($a.DeclarationRequest={}))});var mg=H(_a=>{"use strict";Object.defineProperty(_a,"__esModule",{value:!0});_a.SelectionRangeRequest=void 0;var pg=nt(),eC;(function(t){t.method="textDocument/selectionRange",t.messageDirection=pg.MessageDirection.clientToServer,t.type=new pg.ProtocolRequestType(t.method)})(eC=_a.SelectionRangeRequest||(_a.SelectionRangeRequest={}))});var hg=H(nn=>{"use strict";Object.defineProperty(nn,"__esModule",{value:!0});nn.WorkDoneProgressCancelNotification=nn.WorkDoneProgressCreateRequest=nn.WorkDoneProgress=void 0;var tC=Vn(),uu=nt(),rC;(function(t){t.type=new tC.ProgressType;function e(r){return r===t.type}t.is=e})(rC=nn.WorkDoneProgress||(nn.WorkDoneProgress={}));var nC;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=uu.MessageDirection.serverToClient,t.type=new uu.ProtocolRequestType(t.method)})(nC=nn.WorkDoneProgressCreateRequest||(nn.WorkDoneProgressCreateRequest={}));var iC;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=uu.MessageDirection.clientToServer,t.type=new uu.ProtocolNotificationType(t.method)})(iC=nn.WorkDoneProgressCancelNotification||(nn.WorkDoneProgressCancelNotification={}))});var yg=H(on=>{"use strict";Object.defineProperty(on,"__esModule",{value:!0});on.CallHierarchyOutgoingCallsRequest=on.CallHierarchyIncomingCallsRequest=on.CallHierarchyPrepareRequest=void 0;var Ko=nt(),oC;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(oC=on.CallHierarchyPrepareRequest||(on.CallHierarchyPrepareRequest={}));var sC;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(sC=on.CallHierarchyIncomingCallsRequest||(on.CallHierarchyIncomingCallsRequest={}));var aC;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(aC=on.CallHierarchyOutgoingCallsRequest||(on.CallHierarchyOutgoingCallsRequest={}))});var gg=H(bt=>{"use strict";Object.defineProperty(bt,"__esModule",{value:!0});bt.SemanticTokensRefreshRequest=bt.SemanticTokensRangeRequest=bt.SemanticTokensDeltaRequest=bt.SemanticTokensRequest=bt.SemanticTokensRegistrationType=bt.TokenFormat=void 0;var Xn=nt(),lC;(function(t){t.Relative="relative"})(lC=bt.TokenFormat||(bt.TokenFormat={}));var cu;(function(t){t.method="textDocument/semanticTokens",t.type=new Xn.RegistrationType(t.method)})(cu=bt.SemanticTokensRegistrationType||(bt.SemanticTokensRegistrationType={}));var uC;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType(t.method),t.registrationMethod=cu.method})(uC=bt.SemanticTokensRequest||(bt.SemanticTokensRequest={}));var cC;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType(t.method),t.registrationMethod=cu.method})(cC=bt.SemanticTokensDeltaRequest||(bt.SemanticTokensDeltaRequest={}));var fC;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType(t.method),t.registrationMethod=cu.method})(fC=bt.SemanticTokensRangeRequest||(bt.SemanticTokensRangeRequest={}));var dC;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType0(t.method)})(dC=bt.SemanticTokensRefreshRequest||(bt.SemanticTokensRefreshRequest={}))});var vg=H(Na=>{"use strict";Object.defineProperty(Na,"__esModule",{value:!0});Na.ShowDocumentRequest=void 0;var Tg=nt(),pC;(function(t){t.method="window/showDocument",t.messageDirection=Tg.MessageDirection.serverToClient,t.type=new Tg.ProtocolRequestType(t.method)})(pC=Na.ShowDocumentRequest||(Na.ShowDocumentRequest={}))});var xg=H(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.LinkedEditingRangeRequest=void 0;var Rg=nt(),mC;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=Rg.MessageDirection.clientToServer,t.type=new Rg.ProtocolRequestType(t.method)})(mC=Pa.LinkedEditingRangeRequest||(Pa.LinkedEditingRangeRequest={}))});var Sg=H(it=>{"use strict";Object.defineProperty(it,"__esModule",{value:!0});it.WillDeleteFilesRequest=it.DidDeleteFilesNotification=it.DidRenameFilesNotification=it.WillRenameFilesRequest=it.DidCreateFilesNotification=it.WillCreateFilesRequest=it.FileOperationPatternKind=void 0;var jr=nt(),hC;(function(t){t.file="file",t.folder="folder"})(hC=it.FileOperationPatternKind||(it.FileOperationPatternKind={}));var yC;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(yC=it.WillCreateFilesRequest||(it.WillCreateFilesRequest={}));var gC;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(gC=it.DidCreateFilesNotification||(it.DidCreateFilesNotification={}));var TC;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(TC=it.WillRenameFilesRequest||(it.WillRenameFilesRequest={}));var vC;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(vC=it.DidRenameFilesNotification||(it.DidRenameFilesNotification={}));var RC;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolNotificationType(t.method)})(RC=it.DidDeleteFilesNotification||(it.DidDeleteFilesNotification={}));var xC;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=jr.MessageDirection.clientToServer,t.type=new jr.ProtocolRequestType(t.method)})(xC=it.WillDeleteFilesRequest||(it.WillDeleteFilesRequest={}))});var bg=H(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.MonikerRequest=sn.MonikerKind=sn.UniquenessLevel=void 0;var wg=nt(),SC;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(SC=sn.UniquenessLevel||(sn.UniquenessLevel={}));var wC;(function(t){t.$import="import",t.$export="export",t.local="local"})(wC=sn.MonikerKind||(sn.MonikerKind={}));var bC;(function(t){t.method="textDocument/moniker",t.messageDirection=wg.MessageDirection.clientToServer,t.type=new wg.ProtocolRequestType(t.method)})(bC=sn.MonikerRequest||(sn.MonikerRequest={}))});var Ag=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.TypeHierarchySubtypesRequest=an.TypeHierarchySupertypesRequest=an.TypeHierarchyPrepareRequest=void 0;var Wo=nt(),AC;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(AC=an.TypeHierarchyPrepareRequest||(an.TypeHierarchyPrepareRequest={}));var kC;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(kC=an.TypeHierarchySupertypesRequest||(an.TypeHierarchySupertypesRequest={}));var CC;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method)})(CC=an.TypeHierarchySubtypesRequest||(an.TypeHierarchySubtypesRequest={}))});var kg=H(bi=>{"use strict";Object.defineProperty(bi,"__esModule",{value:!0});bi.InlineValueRefreshRequest=bi.InlineValueRequest=void 0;var fu=nt(),EC;(function(t){t.method="textDocument/inlineValue",t.messageDirection=fu.MessageDirection.clientToServer,t.type=new fu.ProtocolRequestType(t.method)})(EC=bi.InlineValueRequest||(bi.InlineValueRequest={}));var $C;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=fu.MessageDirection.clientToServer,t.type=new fu.ProtocolRequestType0(t.method)})($C=bi.InlineValueRefreshRequest||(bi.InlineValueRefreshRequest={}))});var Cg=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.InlayHintRefreshRequest=ln.InlayHintResolveRequest=ln.InlayHintRequest=void 0;var Bo=nt(),_C;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(_C=ln.InlayHintRequest||(ln.InlayHintRequest={}));var NC;(function(t){t.method="inlayHint/resolve",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType(t.method)})(NC=ln.InlayHintResolveRequest||(ln.InlayHintResolveRequest={}));var PC;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Bo.MessageDirection.clientToServer,t.type=new Bo.ProtocolRequestType0(t.method)})(PC=ln.InlayHintRefreshRequest||(ln.InlayHintRefreshRequest={}))});var $g=H(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var Eg=Vn(),IC=su(),zo=nt(),DC;(function(t){function e(r){let n=r;return n&&IC.boolean(n.retriggerRequest)}t.is=e})(DC=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var OC;(function(t){t.Full="full",t.Unchanged="unchanged"})(OC=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var LC;(function(t){t.method="textDocument/diagnostic",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method),t.partialResult=new Eg.ProgressType})(LC=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var MC;(function(t){t.method="workspace/diagnostic",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType(t.method),t.partialResult=new Eg.ProgressType})(MC=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var FC;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=zo.MessageDirection.clientToServer,t.type=new zo.ProtocolRequestType0(t.method)})(FC=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var Pg=H(Re=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.DidCloseNotebookDocumentNotification=Re.DidSaveNotebookDocumentNotification=Re.DidChangeNotebookDocumentNotification=Re.NotebookCellArrayChange=Re.DidOpenNotebookDocumentNotification=Re.NotebookDocumentSyncRegistrationType=Re.NotebookDocument=Re.NotebookCell=Re.ExecutionSummary=Re.NotebookCellKind=void 0;var Ia=oo(),un=su(),xn=nt(),_g;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(_g=Re.NotebookCellKind||(Re.NotebookCellKind={}));var Ng;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return un.objectLiteral(o)&&Ia.uinteger.is(o.executionOrder)&&(o.success===void 0||un.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Ng=Re.ExecutionSummary||(Re.ExecutionSummary={}));var im;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return un.objectLiteral(s)&&_g.is(s.kind)&&Ia.DocumentUri.is(s.document)&&(s.metadata===void 0||un.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Ng.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),l=Array.isArray(s);if(a!==l)return!1;if(a&&l){if(o.length!==s.length)return!1;for(let u=0;u<o.length;u++)if(!i(o[u],s[u]))return!1}if(un.objectLiteral(o)&&un.objectLiteral(s)){let u=Object.keys(o),c=Object.keys(s);if(u.length!==c.length||(u.sort(),c.sort(),!i(u,c)))return!1;for(let f=0;f<u.length;f++){let m=u[f];if(!i(o[m],s[m]))return!1}}return!0}})(im=Re.NotebookCell||(Re.NotebookCell={}));var UC;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return un.objectLiteral(i)&&un.string(i.uri)&&Ia.integer.is(i.version)&&un.typedArray(i.cells,im.is)}t.is=r})(UC=Re.NotebookDocument||(Re.NotebookDocument={}));var Da;(function(t){t.method="notebookDocument/sync",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.RegistrationType(t.method)})(Da=Re.NotebookDocumentSyncRegistrationType||(Re.NotebookDocumentSyncRegistrationType={}));var qC;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.ProtocolNotificationType(t.method),t.registrationMethod=Da.method})(qC=Re.DidOpenNotebookDocumentNotification||(Re.DidOpenNotebookDocumentNotification={}));var jC;(function(t){function e(n){let i=n;return un.objectLiteral(i)&&Ia.uinteger.is(i.start)&&Ia.uinteger.is(i.deleteCount)&&(i.cells===void 0||un.typedArray(i.cells,im.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(jC=Re.NotebookCellArrayChange||(Re.NotebookCellArrayChange={}));var GC;(function(t){t.method="notebookDocument/didChange",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.ProtocolNotificationType(t.method),t.registrationMethod=Da.method})(GC=Re.DidChangeNotebookDocumentNotification||(Re.DidChangeNotebookDocumentNotification={}));var HC;(function(t){t.method="notebookDocument/didSave",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.ProtocolNotificationType(t.method),t.registrationMethod=Da.method})(HC=Re.DidSaveNotebookDocumentNotification||(Re.DidSaveNotebookDocumentNotification={}));var KC;(function(t){t.method="notebookDocument/didClose",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.ProtocolNotificationType(t.method),t.registrationMethod=Da.method})(KC=Re.DidCloseNotebookDocumentNotification||(Re.DidCloseNotebookDocumentNotification={}))});var jg=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=nt(),Ig=oo(),Bt=su(),WC=rg();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return WC.ImplementationRequest}});var BC=ig();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return BC.TypeDefinitionRequest}});var Dg=og();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return Dg.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return Dg.DidChangeWorkspaceFoldersNotification}});var zC=ag();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return zC.ConfigurationRequest}});var Og=lg();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Og.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Og.ColorPresentationRequest}});var VC=cg();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return VC.FoldingRangeRequest}});var XC=dg();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return XC.DeclarationRequest}});var YC=mg();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return YC.SelectionRangeRequest}});var om=hg();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return om.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return om.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return om.WorkDoneProgressCancelNotification}});var sm=yg();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return sm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return sm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return sm.CallHierarchyPrepareRequest}});var Vo=gg();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Vo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Vo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Vo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Vo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Vo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Vo.SemanticTokensRegistrationType}});var JC=vg();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return JC.ShowDocumentRequest}});var QC=xg();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return QC.LinkedEditingRangeRequest}});var so=Sg();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return so.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return so.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return so.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return so.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return so.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return so.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return so.WillDeleteFilesRequest}});var am=bg();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return am.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return am.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return am.MonikerRequest}});var lm=Ag();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return lm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return lm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return lm.TypeHierarchySupertypesRequest}});var Lg=kg();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return Lg.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return Lg.InlineValueRefreshRequest}});var um=Cg();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return um.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return um.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return um.InlayHintRefreshRequest}});var Oa=$g();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Oa.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Oa.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Oa.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Oa.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Oa.DiagnosticRefreshRequest}});var Sn=Pg();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return Sn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return Sn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return Sn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return Sn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Sn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Sn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidCloseNotebookDocumentNotification}});var Mg;(function(t){function e(r){let n=r;return Bt.string(n.language)||Bt.string(n.scheme)||Bt.string(n.pattern)}t.is=e})(Mg=h.TextDocumentFilter||(h.TextDocumentFilter={}));var Fg;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebookType)||Bt.string(n.scheme)||Bt.string(n.pattern))}t.is=e})(Fg=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var Ug;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebook)||Fg.is(n.notebook))&&(n.language===void 0||Bt.string(n.language))}t.is=e})(Ug=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var qg;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Bt.string(n)&&!Mg.is(n)&&!Ug.is(n))return!1;return!0}t.is=e})(qg=h.DocumentSelector||(h.DocumentSelector={}));var ZC;(function(t){t.method="client/registerCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(ZC=h.RegistrationRequest||(h.RegistrationRequest={}));var eE;(function(t){t.method="client/unregisterCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(eE=h.UnregistrationRequest||(h.UnregistrationRequest={}));var tE;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(tE=h.ResourceOperationKind||(h.ResourceOperationKind={}));var rE;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(rE=h.FailureHandlingKind||(h.FailureHandlingKind={}));var nE;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(nE=h.PositionEncodingKind||(h.PositionEncodingKind={}));var iE;(function(t){function e(r){let n=r;return n&&Bt.string(n.id)&&n.id.length>0}t.hasId=e})(iE=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var oE;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||qg.is(n.documentSelector))}t.is=e})(oE=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var sE;(function(t){function e(n){let i=n;return Bt.objectLiteral(i)&&(i.workDoneProgress===void 0||Bt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Bt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(sE=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var aE;(function(t){t.method="initialize",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(aE=h.InitializeRequest||(h.InitializeRequest={}));var lE;(function(t){t.unknownProtocolVersion=1})(lE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var uE;(function(t){t.method="initialized",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(uE=h.InitializedNotification||(h.InitializedNotification={}));var cE;(function(t){t.method="shutdown",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType0(t.method)})(cE=h.ShutdownRequest||(h.ShutdownRequest={}));var fE;(function(t){t.method="exit",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType0(t.method)})(fE=h.ExitNotification||(h.ExitNotification={}));var dE;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(dE=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var pE;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(pE=h.MessageType||(h.MessageType={}));var mE;(function(t){t.method="window/showMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(mE=h.ShowMessageNotification||(h.ShowMessageNotification={}));var hE;(function(t){t.method="window/showMessageRequest",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(hE=h.ShowMessageRequest||(h.ShowMessageRequest={}));var yE;(function(t){t.method="window/logMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(yE=h.LogMessageNotification||(h.LogMessageNotification={}));var gE;(function(t){t.method="telemetry/event",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(gE=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var TE;(function(t){t.None=0,t.Full=1,t.Incremental=2})(TE=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var vE;(function(t){t.method="textDocument/didOpen",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(vE=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var RE;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(RE=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var xE;(function(t){t.method="textDocument/didChange",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(xE=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var SE;(function(t){t.method="textDocument/didClose",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(SE=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var wE;(function(t){t.method="textDocument/didSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(wE=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var bE;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(bE=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var AE;(function(t){t.method="textDocument/willSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(AE=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var kE;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(kE=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var CE;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(CE=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var EE;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(EE=h.FileChangeType||(h.FileChangeType={}));var $E;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Ig.URI.is(n.baseUri)||Ig.WorkspaceFolder.is(n.baseUri))&&Bt.string(n.pattern)}t.is=e})($E=h.RelativePattern||(h.RelativePattern={}));var _E;(function(t){t.Create=1,t.Change=2,t.Delete=4})(_E=h.WatchKind||(h.WatchKind={}));var NE;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(NE=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var PE;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(PE=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var IE;(function(t){t.method="textDocument/completion",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(IE=h.CompletionRequest||(h.CompletionRequest={}));var DE;(function(t){t.method="completionItem/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(DE=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var OE;(function(t){t.method="textDocument/hover",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(OE=h.HoverRequest||(h.HoverRequest={}));var LE;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(LE=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var ME;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(ME=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var FE;(function(t){t.method="textDocument/definition",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(FE=h.DefinitionRequest||(h.DefinitionRequest={}));var UE;(function(t){t.method="textDocument/references",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(UE=h.ReferencesRequest||(h.ReferencesRequest={}));var qE;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(qE=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var jE;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(jE=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var GE;(function(t){t.method="textDocument/codeAction",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(GE=h.CodeActionRequest||(h.CodeActionRequest={}));var HE;(function(t){t.method="codeAction/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(HE=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var KE;(function(t){t.method="workspace/symbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(KE=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var WE;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(WE=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var BE;(function(t){t.method="textDocument/codeLens",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(BE=h.CodeLensRequest||(h.CodeLensRequest={}));var zE;(function(t){t.method="codeLens/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(zE=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var VE;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType0(t.method)})(VE=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var XE;(function(t){t.method="textDocument/documentLink",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(XE=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var YE;(function(t){t.method="documentLink/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(YE=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var JE;(function(t){t.method="textDocument/formatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(JE=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var QE;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(QE=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var ZE;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(ZE=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var e$;(function(t){t.Identifier=1})(e$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var t$;(function(t){t.method="textDocument/rename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(t$=h.RenameRequest||(h.RenameRequest={}));var r$;(function(t){t.method="textDocument/prepareRename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(r$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var n$;(function(t){t.method="workspace/executeCommand",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(n$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var i$;(function(t){t.method="workspace/applyEdit",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType("workspace/applyEdit")})(i$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var Hg=H(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.createProtocolConnection=void 0;var Gg=Vn();function o$(t,e,r,n){return Gg.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Gg.createMessageConnection)(t,e,r,n)}du.createProtocolConnection=o$});var Kg=H(dr=>{"use strict";var s$=dr&&dr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),pu=dr&&dr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&s$(e,t,r)};Object.defineProperty(dr,"__esModule",{value:!0});dr.LSPErrorCodes=dr.createProtocolConnection=void 0;pu(Vn(),dr);pu(oo(),dr);pu(nt(),dr);pu(jg(),dr);var a$=Hg();Object.defineProperty(dr,"createProtocolConnection",{enumerable:!0,get:function(){return a$.createProtocolConnection}});var l$;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(l$=dr.LSPErrorCodes||(dr.LSPErrorCodes={}))});var At=H(wn=>{"use strict";var u$=wn&&wn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Wg=wn&&wn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&u$(e,t,r)};Object.defineProperty(wn,"__esModule",{value:!0});wn.createProtocolConnection=void 0;var c$=Qp();Wg(Qp(),wn);Wg(Kg(),wn);function f$(t,e,r,n){return(0,c$.createMessageConnection)(t,e,r,n)}wn.createProtocolConnection=f$});var fm=H(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.SemanticTokensBuilder=Ai.SemanticTokensDiff=Ai.SemanticTokensFeature=void 0;var mu=At(),d$=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(mu.SemanticTokensRefreshRequest.type),on:e=>{let r=mu.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=mu.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=mu.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ai.SemanticTokensFeature=d$;var hu=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ai.SemanticTokensDiff=hu;var cm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new hu(this._prevData,this._data).computeDiff()}:this.build()}};Ai.SemanticTokensBuilder=cm});var pm=H(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.TextDocuments=void 0;var ao=At(),dm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new ao.Emitter,this._onDidOpen=new ao.Emitter,this._onDidClose=new ao.Emitter,this._onDidSave=new ao.Emitter,this._onWillSave=new ao.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=ao.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),ao.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};yu.TextDocuments=dm});var hm=H(Xo=>{"use strict";Object.defineProperty(Xo,"__esModule",{value:!0});Xo.NotebookDocuments=Xo.NotebookSyncFeature=void 0;var Gr=At(),Bg=pm(),p$=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Gr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Gr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Gr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Gr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Xo.NotebookSyncFeature=p$;var gu=class t{onDidOpenTextDocument(e){return this.openHandler=e,Gr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Gr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Gr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};gu.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var mm=class{constructor(e){e instanceof Bg.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new Bg.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Gr.Emitter,this._onDidChange=new Gr.Emitter,this._onDidSave=new Gr.Emitter,this._onDidClose=new Gr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new gu,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,l=i.change;l.metadata!==void 0&&(a=!0,o.metadata=l.metadata);let u=[],c=[],f=[],m=[];if(l.cells!==void 0){let k=l.cells;if(k.structure!==void 0){let v=k.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),k.structure.didOpen!==void 0)for(let g of k.structure.didOpen)r.openTextDocument({textDocument:g}),u.push(g.uri);if(k.structure.didClose)for(let g of k.structure.didClose)r.closeTextDocument({textDocument:g}),c.push(g.uri)}if(k.data!==void 0){let v=new Map(k.data.map(g=>[g.document,g]));for(let g=0;g<=o.cells.length;g++){let $=v.get(o.cells[g].document);if($!==void 0){let D=o.cells.splice(g,1,$);if(f.push({old:D[0],new:$}),v.delete($.document),v.size===0)break}}}if(k.textContent!==void 0)for(let v of k.textContent)r.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let w=[];for(let k of u)w.push(this.getNotebookCell(k));let A=[];for(let k of c)A.push(this.getNotebookCell(k));let _=[];for(let k of m)_.push(this.getNotebookCell(k));(w.length>0||A.length>0||f.length>0||_.length>0)&&(T.cells={added:w,removed:A,changed:{data:f,textContent:_}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Gr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Xo.NotebookDocuments=mm});var ym=H(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.thenable=kt.typedArray=kt.stringArray=kt.array=kt.func=kt.error=kt.number=kt.string=kt.boolean=void 0;function m$(t){return t===!0||t===!1}kt.boolean=m$;function zg(t){return typeof t=="string"||t instanceof String}kt.string=zg;function h$(t){return typeof t=="number"||t instanceof Number}kt.number=h$;function y$(t){return t instanceof Error}kt.error=y$;function Vg(t){return typeof t=="function"}kt.func=Vg;function Xg(t){return Array.isArray(t)}kt.array=Xg;function g$(t){return Xg(t)&&t.every(e=>zg(e))}kt.stringArray=g$;function T$(t,e){return Array.isArray(t)&&t.every(e)}kt.typedArray=T$;function v$(t){return t&&Vg(t.then)}kt.thenable=v$});var gm=H(Hr=>{"use strict";Object.defineProperty(Hr,"__esModule",{value:!0});Hr.generateUuid=Hr.parse=Hr.isUUID=Hr.v4=Hr.empty=void 0;var La=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Ma=class t extends La{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};Ma._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Ma._timeHighBits=["8","9","a","b"];Hr.empty=new La("00000000-0000-0000-0000-000000000000");function Yg(){return new Ma}Hr.v4=Yg;var R$=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function Jg(t){return R$.test(t)}Hr.isUUID=Jg;function x$(t){if(!Jg(t))throw new Error("invalid uuid");return new La(t)}Hr.parse=x$;function S$(){return Yg().asHex()}Hr.generateUuid=S$});var Qg=H(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.attachPartialResult=Ci.ProgressFeature=Ci.attachWorkDone=void 0;var ki=At(),w$=gm(),lo=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(ki.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(ki.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress(ki.WorkDoneProgress.type,this._token,{kind:"end"})}};lo.Instances=new Map;var Tu=class extends lo{constructor(e,r){super(e,r),this._source=new ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Fa=class{constructor(){}begin(){}report(){}done(){}},vu=class extends Fa{constructor(){super(),this._source=new ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function b$(t,e){if(e===void 0||e.workDoneToken===void 0)return new Fa;let r=e.workDoneToken;return delete e.workDoneToken,new lo(t,r)}Ci.attachWorkDone=b$;var A$=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(ki.WorkDoneProgressCancelNotification.type,r=>{let n=lo.Instances.get(r.token);(n instanceof Tu||n instanceof vu)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Fa:new lo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,w$.generateUuid)();return this.connection.sendRequest(ki.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new Tu(this.connection,e))}else return Promise.resolve(new vu)}};Ci.ProgressFeature=A$;var Tm;(function(t){t.type=new ki.ProgressType})(Tm||(Tm={}));var vm=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Tm.type,this._token,e)}};function k$(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new vm(t,r)}Ci.attachPartialResult=k$});var Zg=H(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.ConfigurationFeature=void 0;var C$=At(),E$=ym(),$$=t=>class extends t{getConfiguration(e){return e?E$.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(C$.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Ru.ConfigurationFeature=$$});var eT=H(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.WorkspaceFoldersFeature=void 0;var xu=At(),_$=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new xu.Emitter,this.connection.onNotification(xu.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(xu.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(xu.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Su.WorkspaceFoldersFeature=_$});var tT=H(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.CallHierarchyFeature=void 0;var Rm=At(),N$=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Rm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Rm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Rm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};wu.CallHierarchyFeature=N$});var rT=H(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.ShowDocumentFeature=void 0;var P$=At(),I$=t=>class extends t{showDocument(e){return this.connection.sendRequest(P$.ShowDocumentRequest.type,e)}};bu.ShowDocumentFeature=I$});var nT=H(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.FileOperationsFeature=void 0;var Yo=At(),D$=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Yo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Yo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Yo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Yo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Yo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Yo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Au.FileOperationsFeature=D$});var iT=H(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.LinkedEditingRangeFeature=void 0;var O$=At(),L$=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(O$.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};ku.LinkedEditingRangeFeature=L$});var oT=H(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.TypeHierarchyFeature=void 0;var xm=At(),M$=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(xm.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=xm.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=xm.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Cu.TypeHierarchyFeature=M$});var aT=H(Eu=>{"use strict";Object.defineProperty(Eu,"__esModule",{value:!0});Eu.InlineValueFeature=void 0;var sT=At(),F$=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(sT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(sT.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Eu.InlineValueFeature=F$});var lT=H($u=>{"use strict";Object.defineProperty($u,"__esModule",{value:!0});$u.InlayHintFeature=void 0;var Sm=At(),U$=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Sm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Sm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Sm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};$u.InlayHintFeature=U$});var uT=H(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.DiagnosticFeature=void 0;var Ua=At(),q$=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Ua.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Ua.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Ua.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Ua.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Ua.WorkspaceDiagnosticRequest.partialResult,r)))}}};_u.DiagnosticFeature=q$});var cT=H(Nu=>{"use strict";Object.defineProperty(Nu,"__esModule",{value:!0});Nu.MonikerFeature=void 0;var j$=At(),G$=t=>class extends t{get moniker(){return{on:e=>{let r=j$.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Nu.MonikerFeature=G$});var wT=H(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var U=At(),Kr=ym(),bm=gm(),te=Qg(),H$=Zg(),K$=eT(),W$=tT(),B$=fm(),z$=rT(),V$=nT(),X$=iT(),Y$=oT(),J$=aT(),Q$=lT(),Z$=uT(),e_=hm(),t_=cT();function wm(t){if(t!==null)return t}var Am=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};he.ErrorMessageTracker=Am;var Pu=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},km=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(wm)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(wm)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(wm)}},fT=(0,z$.ShowDocumentFeature)((0,te.ProgressFeature)(km)),r_;(function(t){function e(){return new Iu}t.create=e})(r_=he.BulkRegistration||(he.BulkRegistration={}));var Iu=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Kr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=bm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},n_;(function(t){function e(){return new qa(void 0,[])}t.create=e})(n_=he.BulkUnregistration||(he.BulkUnregistration={}));var qa=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Kr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Du=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Iu?this.registerMany(e):e instanceof qa?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Kr.string(r)?r:r.method,o=bm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Kr.string(e)?e:e.method,i=bm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new qa(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Cm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},dT=(0,V$.FileOperationsFeature)((0,K$.WorkspaceFoldersFeature)((0,H$.ConfigurationFeature)(Cm))),Ou=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},Lu=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Mu=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._LanguagesImpl=Mu;var pT=(0,t_.MonikerFeature)((0,Z$.DiagnosticFeature)((0,Q$.InlayHintFeature)((0,J$.InlineValueFeature)((0,Y$.TypeHierarchyFeature)((0,X$.LinkedEditingRangeFeature)((0,B$.SemanticTokensFeature)((0,W$.CallHierarchyFeature)(Mu)))))))),Fu=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._NotebooksImpl=Fu;var mT=(0,e_.NotebookSyncFeature)(Fu);function hT(t,e){return function(r){return e(t(r))}}he.combineConsoleFeatures=hT;function yT(t,e){return function(r){return e(t(r))}}he.combineTelemetryFeatures=yT;function gT(t,e){return function(r){return e(t(r))}}he.combineTracerFeatures=gT;function TT(t,e){return function(r){return e(t(r))}}he.combineClientFeatures=TT;function vT(t,e){return function(r){return e(t(r))}}he.combineWindowFeatures=vT;function RT(t,e){return function(r){return e(t(r))}}he.combineWorkspaceFeatures=RT;function xT(t,e){return function(r){return e(t(r))}}he.combineLanguagesFeatures=xT;function ST(t,e){return function(r){return e(t(r))}}he.combineNotebooksFeatures=ST;function i_(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,hT),tracer:r(t.tracer,e.tracer,gT),telemetry:r(t.telemetry,e.telemetry,yT),client:r(t.client,e.client,TT),window:r(t.window,e.window,vT),workspace:r(t.workspace,e.workspace,RT),languages:r(t.languages,e.languages,xT),notebooks:r(t.notebooks,e.notebooks,ST)}}he.combineFeatures=i_;function o_(t,e,r){let n=r&&r.console?new(r.console(Pu)):new Pu,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Ou)):new Ou,s=r&&r.telemetry?new(r.telemetry(Lu)):new Lu,a=r&&r.client?new(r.client(Du)):new Du,l=r&&r.window?new(r.window(fT)):new fT,u=r&&r.workspace?new(r.workspace(dT)):new dT,c=r&&r.languages?new(r.languages(pT)):new pT,f=r&&r.notebooks?new(r.notebooks(mT)):new mT,m=[n,o,s,a,l,u,c,f];function T(v){return v instanceof Promise?v:Kr.thenable(v)?new Promise((g,$)=>{v.then(D=>g(D),D=>$(D))}):Promise.resolve(v)}let w,A,_,k={listen:()=>i.listen(),sendRequest:(v,...g)=>i.sendRequest(Kr.string(v)?v:v.method,...g),onRequest:(v,g)=>i.onRequest(v,g),sendNotification:(v,g)=>{let $=Kr.string(v)?v:v.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,g)},onNotification:(v,g)=>i.onNotification(v,g),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(A=v,{dispose:()=>{A=void 0}}),onInitialized:v=>i.onNotification(U.InitializedNotification.type,v),onShutdown:v=>(w=v,{dispose:()=>{w=void 0}}),onExit:v=>(_=v,{dispose:()=>{_=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return l},get workspace(){return u},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(U.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(U.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(U.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(U.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(U.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(U.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(U.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(U.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(U.HoverRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onCompletion:v=>i.onRequest(U.CompletionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCompletionResolve:v=>i.onRequest(U.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(U.SignatureHelpRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onDeclaration:v=>i.onRequest(U.DeclarationRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDefinition:v=>i.onRequest(U.DefinitionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onTypeDefinition:v=>i.onRequest(U.TypeDefinitionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onImplementation:v=>i.onRequest(U.ImplementationRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onReferences:v=>i.onRequest(U.ReferencesRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentHighlight:v=>i.onRequest(U.DocumentHighlightRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentSymbol:v=>i.onRequest(U.DocumentSymbolRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onWorkspaceSymbol:v=>i.onRequest(U.WorkspaceSymbolRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onWorkspaceSymbolResolve:v=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(U.CodeActionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCodeActionResolve:v=>i.onRequest(U.CodeActionResolveRequest.type,(g,$)=>v(g,$)),onCodeLens:v=>i.onRequest(U.CodeLensRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCodeLensResolve:v=>i.onRequest(U.CodeLensResolveRequest.type,(g,$)=>v(g,$)),onDocumentFormatting:v=>i.onRequest(U.DocumentFormattingRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onDocumentRangeFormatting:v=>i.onRequest(U.DocumentRangeFormattingRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(g,$)=>v(g,$)),onRenameRequest:v=>i.onRequest(U.RenameRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onPrepareRename:v=>i.onRequest(U.PrepareRenameRequest.type,(g,$)=>v(g,$)),onDocumentLinks:v=>i.onRequest(U.DocumentLinkRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentLinkResolve:v=>i.onRequest(U.DocumentLinkResolveRequest.type,(g,$)=>v(g,$)),onDocumentColor:v=>i.onRequest(U.DocumentColorRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onColorPresentation:v=>i.onRequest(U.ColorPresentationRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onFoldingRanges:v=>i.onRequest(U.FoldingRangeRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onSelectionRanges:v=>i.onRequest(U.SelectionRangeRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onExecuteCommand:v=>i.onRequest(U.ExecuteCommandRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(k);return i.onRequest(U.InitializeRequest.type,v=>{e.initialize(v),Kr.string(v.trace)&&(o.trace=U.Trace.fromString(v.trace));for(let g of m)g.initialize(v.capabilities);if(A){let g=A(v,new U.CancellationTokenSource().token,(0,te.attachWorkDone)(i,v),void 0);return T(g).then($=>{if($ instanceof U.ResponseError)return $;let D=$;D||(D={capabilities:{}});let X=D.capabilities;X||(X={},D.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=Kr.number(k.__textDocumentSync)?k.__textDocumentSync:U.TextDocumentSyncKind.None:!Kr.number(X.textDocumentSync)&&!Kr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=Kr.number(k.__textDocumentSync)?k.__textDocumentSync:U.TextDocumentSyncKind.None);for(let ge of m)ge.fillServerCapabilities(X);return D})}else{let g={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(g.capabilities);return g}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,w)return w(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{_&&_()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,v=>{o.trace=U.Trace.fromString(v.value)}),k}he.createConnection=o_});var Em=H(zt=>{"use strict";var s_=zt&&zt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),bT=zt&&zt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&s_(e,t,r)};Object.defineProperty(zt,"__esModule",{value:!0});zt.ProposedFeatures=zt.NotebookDocuments=zt.TextDocuments=zt.SemanticTokensBuilder=void 0;var a_=fm();Object.defineProperty(zt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return a_.SemanticTokensBuilder}});bT(At(),zt);var l_=pm();Object.defineProperty(zt,"TextDocuments",{enumerable:!0,get:function(){return l_.TextDocuments}});var u_=hm();Object.defineProperty(zt,"NotebookDocuments",{enumerable:!0,get:function(){return u_.NotebookDocuments}});bT(wT(),zt);var c_;(function(t){t.all={__brand:"features"}})(c_=zt.ProposedFeatures||(zt.ProposedFeatures={}))});var kT=H((uG,AT)=>{"use strict";AT.exports=At()});var we=H(bn=>{"use strict";var f_=bn&&bn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),ET=bn&&bn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&f_(e,t,r)};Object.defineProperty(bn,"__esModule",{value:!0});bn.createConnection=void 0;var Uu=Em();ET(kT(),bn);ET(Em(),bn);var CT=!1,d_={initialize:t=>{},get shutdownReceived(){return CT},set shutdownReceived(t){CT=t},exit:t=>{}};function p_(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Uu.ConnectionStrategy.is(t)||Uu.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let l=u=>(0,Uu.createProtocolConnection)(o,s,u,a);return(0,Uu.createConnection)(l,d_,i)}bn.createConnection=p_});var GA=H((Pae,jA)=>{"use strict";jA.exports=we()});var qA=de(we(),1);var qu=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=_T(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),l=Math.max(i.end.line,0),u=this._lineOffsets,c=$T(n.text,!1,o);if(l-a===c.length)for(let m=0,T=c.length;m<T;m++)u[m+a+1]=c[m];else c.length<1e4?u.splice(a+1,l-a,...c):this._lineOffsets=u=u.slice(0,a+1).concat(c,u.slice(l+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+c.length,T=u.length;m<T;m++)u[m]=u[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=$T(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},Jo;(function(t){function e(i,o,s,a){return new qu(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof qu)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=$m(o.map(m_),(c,f)=>{let m=c.range.start.line-f.range.start.line;return m===0?c.range.start.character-f.range.start.character:m}),l=0,u=[];for(let c of a){let f=i.offsetAt(c.range.start);if(f<l)throw new Error("Overlapping edit");f>l&&u.push(s.substring(l,f)),c.newText.length&&u.push(c.newText),l=i.offsetAt(c.range.end)}return u.push(s.substr(l)),u.join("")}t.applyEdits=n})(Jo||(Jo={}));function $m(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);$m(n,e),$m(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function $T(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);(o===13||o===10)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function _T(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function m_(t){let e=_T(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function Ct(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function Yn(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function NT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function Qo(t){return typeof t=="object"&&t!==null&&Ct(t.container)&&Yn(t.reference)&&typeof t.message=="string"}var uo=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return Ct(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function An(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function co(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function PT(t){return An(t)&&typeof t.fullText=="string"}var Nr=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return pr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=h_(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?pr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return pr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(ju(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return pr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(ju(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return pr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?pr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function h_(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function ju(t){return!!t&&typeof t[Symbol.iterator]=="function"}var Zo=new Nr(()=>{},()=>pr),pr=Object.freeze({done:!0,value:void 0});function ie(...t){if(t.length===1){let e=t[0];if(e instanceof Nr)return e;if(ju(e))return new Nr(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Nr(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:pr)}return t.length>1?new Nr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];ju(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return pr}):Zo}var Wr=class extends Nr{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return pr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},ja;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(ja=ja||(ja={}));function _m(t){return new Wr(t,e=>An(e)?e.content:[],{includeRoot:!0})}function OT(t){return _m(t).filter(co)}function LT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function Ga(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function nr(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var Jn;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(Jn=Jn||(Jn={}));function y_(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return Jn.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return Jn.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Jn.Inside:r?Jn.OverlapBack:Jn.OverlapFront}function Gu(t,e){return y_(t,e)>Jn.After}var Nm=/^[\w\p{L}]$/u;function Pt(t,e,r=Nm){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return xr(t,e)}}function MT(t,e){if(t){let r=g_(t,!0);if(r&&IT(r,e))return r;if(PT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(IT(o,e))return o}}}}function IT(t,e){return co(t)&&e.includes(t.tokenType.name)}function xr(t,e){if(co(t))return t;if(An(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return xr(o,e)}if(r===n)return xr(t.content[r],e)}}function g_(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function FT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function UT(t,e){let r=T_(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function T_(t,e){let r=DT(t),n=DT(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function DT(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function fo(t,e,r,n){let i=[t,e,r,n].reduce(HT,{});return GT(i)}var Pm=Symbol("isProxy");function Hu(t){if(t&&t[Pm])for(let e of Object.values(t))Hu(e);return t}function GT(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>jT(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(jT(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Pm]});return r[Pm]=!0,r}var qT=Symbol();function jT(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===qT)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=qT;try{t[e]=typeof i=="function"?i(n):GT(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function HT(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=HT(i,n):t[r]=n}}return t}var Le=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return ja.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Im="AbstractRule";var po="AbstractType";var v_="Condition";var R_="TypeDefinition";var Dm="AbstractElement";function es(t){return ue.isInstance(t,Dm)}var KT="ArrayType";function mo(t){return ue.isInstance(t,KT)}var WT="Conjunction";function BT(t){return ue.isInstance(t,WT)}var zT="Disjunction";function VT(t){return ue.isInstance(t,zT)}var XT="Grammar";function ts(t){return ue.isInstance(t,XT)}var x_="GrammarImport";function Ku(t){return ue.isInstance(t,x_)}var S_="InferredType";function rs(t){return ue.isInstance(t,S_)}var Ka="Interface";function Sr(t){return ue.isInstance(t,Ka)}var YT="LiteralCondition";function JT(t){return ue.isInstance(t,YT)}var QT="Negation";function ZT(t){return ue.isInstance(t,QT)}var ev="Parameter";function tv(t){return ue.isInstance(t,ev)}var rv="ParameterReference";function ns(t){return ue.isInstance(t,rv)}var nv="ParserRule";function K(t){return ue.isInstance(t,nv)}var iv="ReferenceType";function ho(t){return ue.isInstance(t,iv)}var w_="ReturnType";function is(t){return ue.isInstance(t,w_)}var ov="SimpleType";function ir(t){return ue.isInstance(t,ov)}var Om="TerminalRule";function be(t){return ue.isInstance(t,Om)}var Wa="Type";function Mt(t){return ue.isInstance(t,Wa)}var b_="TypeAttribute";function Wu(t){return ue.isInstance(t,b_)}var sv="UnionType";function Br(t){return ue.isInstance(t,sv)}var av="Action";function _e(t){return ue.isInstance(t,av)}var lv="Alternatives";function Pr(t){return ue.isInstance(t,lv)}var uv="Assignment";function xe(t){return ue.isInstance(t,uv)}var cv="CharacterRange";function Bu(t){return ue.isInstance(t,cv)}var fv="CrossReference";function Vt(t){return ue.isInstance(t,fv)}var dv="Group";function Ft(t){return ue.isInstance(t,dv)}var pv="Keyword";function dt(t){return ue.isInstance(t,pv)}var mv="NegatedToken";function hv(t){return ue.isInstance(t,mv)}var yv="RegexToken";function gv(t){return ue.isInstance(t,yv)}var Tv="RuleCall";function Ne(t){return ue.isInstance(t,Tv)}var vv="TerminalAlternatives";function Rv(t){return ue.isInstance(t,vv)}var xv="TerminalGroup";function Sv(t){return ue.isInstance(t,xv)}var wv="TerminalRuleCall";function zu(t){return ue.isInstance(t,wv)}var bv="UnorderedGroup";function Ir(t){return ue.isInstance(t,bv)}var Av="UntilToken";function kv(t){return ue.isInstance(t,Av)}var Cv="Wildcard";function Ev(t){return ue.isInstance(t,Cv)}var Ha=class extends uo{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case av:return this.isSubtype(Dm,r)||this.isSubtype(po,r);case lv:case uv:case cv:case fv:case dv:case pv:case mv:case yv:case Tv:case vv:case xv:case wv:case bv:case Av:case Cv:return this.isSubtype(Dm,r);case KT:case iv:case ov:case sv:return this.isSubtype(R_,r);case WT:case zT:case YT:case QT:case rv:return this.isSubtype(v_,r);case Ka:case Wa:return this.isSubtype(po,r);case nv:return this.isSubtype(Im,r)||this.isSubtype(po,r);case Om:return this.isSubtype(Im,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return po;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Im;case"Grammar:usedGrammars":return XT;case"NamedArgument:parameter":case"ParameterReference:parameter":return ev;case"TerminalRuleCall:rule":return Om;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},ue=new Ha;function $v(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{Ct(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):Ct(r)&&(r.$container=t,r.$containerProperty=e))}function Pe(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ne(t){let r=Vu(t).$document;if(!r)throw new Error("AST node has no document.");return r}function Vu(t){for(;t.$container;)t=t.$container;return t}function Ei(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Nr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if(Ct(o)){if(n.keyIndex++,Lm(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(Ct(a)&&Lm(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return pr})}function Qe(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Wr(t,r=>Ei(r,e))}function Zn(t,e){if(t){if(e?.range&&!Lm(t,e.range))return new Wr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Wr(t,r=>Ei(r,e),{includeRoot:!0})}function Lm(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Gu(n,e):!1}function Xu(t){return new Nr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(Yn(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(Yn(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return pr})}function _v(t){var e,r;if(t){if("astNode"in t)return C_(t);if(Array.isArray(t))return t.reduce(Nv,void 0);{let n=t,i=A_(n)?k_((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return os(n,i)}}else return}function A_(t){return typeof t<"u"&&"element"in t&&"text"in t}function k_(t){try{return ne(t).uri.toString()}catch{return}}function C_(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return os(s,Mm(n));{let a=l=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<l.length?l[o]:void 0:l.reduce(Nv,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let l=a(s.assignments[i]);return l&&os(l,Mm(n))}else if(n.$cstNode){let l=a($i(n.$cstNode,i));return l&&os(l,Mm(n))}else return}}}function Mm(t){var e,r,n,i;return t.$cstNode?(r=(e=ne(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new Wr(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function os(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Nv(t,e){var r,n;if(t){if(!e)return t&&os(t)}else return e&&os(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),l=a-s,u={offset:s,end:a,length:l};if(t.range&&e.range&&(u.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let c=t.fileURI,f=e.fileURI,m=c&&f&&c!==f?`<unmergable text regions of ${c}, ${f}>`:c??f;u.fileURI=m}return u}var Fm=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=E_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function E_(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function Pv(t,e){let r=new Fm(e),n=r.pushTraceRegion(void 0);Iv(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function Iv(t,e){typeof t=="string"?$_(t,e):t instanceof ss?__(t,e):t instanceof Xt?Lv(t,e):t instanceof _i&&N_(t,e)}function Dv(t,e){return typeof t=="string"?t.length!==0:t instanceof Xt?t.contents.some(r=>Dv(r,e)):t instanceof _i?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function $_(t,e){t&&(e.pendingIndent&&Ov(e,!1),e.append(t))}function Ov(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function Lv(t,e){let r,n=_v(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Iv(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function __(t,e){var r;if(Dv(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),Lv(t,e)}finally{e.decreaseIndent()}}}function N_(t,e){t.ifNotEmpty&&!P_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Ov(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function P_(t){return t.trimStart()!==""}var IG=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),Ba=/\r?\n/g,I_=/\S|$/;function Mv(t){let e=t.filter(n=>n.length>0).map(n=>n.search(I_)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function qm(t,...e){let r=D_(t),n=O_(t,e,r);return M_(n)}function qv(t,e,r){return(n,...i)=>jm(t,e,r)(qm(n,...i))}function D_(t){let e=t.join("_").split(Ba),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=Mv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function O_(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((u,c)=>{s.push(...u.split(Ba).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(Yu,m):(f,m,T)=>T===0?[m]:f.concat(Yu,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(za(e[c])?e[c]:e[c]!==void 0?{content:String(e[c])}:c<e.length?jv:[]))});let a=s.length,l=a!==0?s[a-1]:void 0;return(i||o)&&typeof l=="string"&&l.trim().length===0?n&&a!==1&&s[a-2]===Yu?s.slice(0,a-2):s.slice(0,a-1):s}var Yu={isNewLine:!0},jv={isUndefinedSegment:!0},Uv=t=>t===Yu,Um=t=>t===jv,L_=t=>t.content!==void 0;function M_(t){return t.reduce((r,n,i)=>Um(n)?r:Uv(n)?{node:i!==0&&(Um(t[i-1])||za(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Um(t[i-2])||za(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||Uv(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=L_(n)?n.content:n,l;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:u=>l=u.append(a)}):r.node.append(a),indented:l??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Xt}).node}var Fv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function za(t){return t instanceof Xt||t instanceof ss||t instanceof _i}function as(t,e){return za(t)?Pv(t,e).text:String(t)}var Xt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if(Ct(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(ot)}appendNewLineIf(e){return e?this.append(ot):this}appendNewLineIfNotEmpty(){return this.append(F_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(qm(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new ss(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(qv(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function jm(t,e,r){return n=>n instanceof Xt&&n.tracedSource===void 0?n.trace(t,e,r):new Xt().trace(t,e,r).append(n)}var ss=class extends Xt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},_i=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Fv,this.ifNotEmpty=r}},ot=new _i,F_=new _i(void 0,!0);function ei(t){return"referenceType"in t}function ti(t){return"elementType"in t}function It(t){return"types"in t}function Km(t){if(It(t)){let e=[];for(let r of t.types)e.push(...Km(r));return e}else return[t]}function Dr(t){return"value"in t}function Or(t){return"primitive"in t}function kn(t){return"string"in t}function cn(t){return t&&"type"in t}function dn(t){return t&&"properties"in t}var Qu=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Xt;return r.append(`export type ${this.name} = ${fn(this.type,"AstType")};`,ot),e&&(r.append(ot),Kv(r,this.name)),this.dataType&&U_(r,this),as(r)}toDeclaredTypesString(e){let r=new Xt;return r.append(`type ${Wm(this.name,e)} = ${fn(this.type,"DeclaredType")};`,ot),as(r)}},ls=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=dn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Xt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?yo([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,ot),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${yo([...this.containerTypes].map(s=>s.name)).join(" | ")};`,ot),this.typeNames.size>0&&o.append(`readonly $type: ${yo([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,ot),Gv(o,this.properties,"AstType")}),r.append("}",ot),e&&(r.append(ot),Kv(r,this.name)),as(r)}toDeclaredTypesString(e){let r=new Xt,n=Wm(this.name,e),i=yo(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,ot),r.indent(o=>Gv(o,this.properties,"DeclaredType",e)),r.append("}",ot),as(r)}},Zu=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function Xa(t,e){return Ni(t,e,new Map)}function Ni(t,e,r){let n=`${Va(t)}\xBB${Va(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,It(t)?i=t.types.every(o=>Ni(o,e,r)):It(e)?i=e.types.some(o=>Ni(t,o,r)):Dr(e)&&cn(e.value)?Dr(t)&&cn(t.value)&&e.value.name===t.value.name?i=!0:i=Ni(t,e.value.type,r):ei(t)?i=ei(e)&&Ni(t.referenceType,e.referenceType,r):ti(t)?i=ti(e)&&Ni(t.elementType,e.elementType,r):Dr(t)?cn(t.value)?i=Ni(t.value.type,e,r):Dr(e)?cn(e.value)?i=Ni(t,e.value.type,r):i=Hv(t.value,e.value,new Set):i=!1:Or(t)?i=Or(e)&&t.primitive===e.primitive:kn(t)&&(i=Or(e)&&e.primitive==="string"||kn(e)&&e.string===t.string),i&&r.set(n,i)),i}function Hv(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(dn(i)&&Hv(i,e,r))return!0;return!1}function Va(t){if(ei(t))return`@(${Va(t.referenceType)})}`;if(ti(t))return`(${Va(t.elementType)})[]`;if(It(t)){let e=t.types.map(r=>Va(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Dr(t))return`Value<${t.value.name}>`;if(Or(t))return t.primitive;if(kn(t))return`'${t.string}'`}throw new Error("Invalid type")}function fn(t,e="AstType"){if(ei(t)){let r=fn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${Gm(t.referenceType,r)}`}else if(ti(t)){let r=fn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${Gm(t.elementType,r)}[]`}else if(It(t)){let r=t.types.map(n=>Gm(n,fn(n,e)));return yo(r).join(" | ")}else{if(Dr(t))return t.value.name;if(Or(t))return t.primitive;if(kn(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function Gm(t,e){return It(t)&&(e=`(${e})`),e}function Gv(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:Wm(o.name,n),a=o.optional&&!ec(o.type),l=fn(o.type,r);return`${s}${a?"?":""}: ${l}`}yo(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),ot))}function ec(t){return ti(t)?!0:ei(t)?!1:It(t)?t.types.every(e=>ec(e)):Or(t)?t.primitive==="boolean":!1}function Kv(t,e){t.append(`export const ${e} = '${e}';`,ot),t.append(ot),t.append(`export function is${e}(item: unknown): item is ${e} {`,ot),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,ot)),t.append("}",ot)}function U_(t,e){switch(e.dataType){case"string":if(Hm(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=Wv(e.type),i=Bv(e.type);if(r.length===0&&n.length===0&&i.length===0)Ju(t,e.name,`typeof item === '${e.dataType}'`);else{let o=q_(r,n,i);Ju(t,e.name,o)}}break;case"number":case"boolean":case"bigint":Ju(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":Ju(t,e.name,"item instanceof Date");break;default:return}}function Hm(t){let e=!0;if(Or(t))return t.primitive==="string";if(kn(t))return!0;if(It(t)){for(let r of t.types)if(Dr(r))if(cn(r.value)){if(!Hm(r.value.type))return!1}else return!1;else if(Or(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(It(r))e=Hm(r);else if(!kn(r))return!1}else return!1;return e}function q_(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function Wm(t,e){return e.has(t)?`^${t}`:t}function Wv(t){let e=[];if(kn(t))return[t.string];if(It(t))for(let r of t.types)kn(r)?e.push(r.string):It(r)&&e.push(...Wv(r));return e}function Bv(t){let e=[];if(Or(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),It(t))for(let r of t.types)Or(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):It(r)&&e.push(...Bv(r));return e}function Ju(t,e,r){t.append(ot,`export function is${e}(item: unknown): item is ${e} {`,ot),t.indent(n=>n.append(`return ${r};`,ot)),t.append("}",ot)}function yo(t,e){return Array.from(new Set(t)).sort(e)}function Bm(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),l=n.getAstNode(a.parseResult.value,s.sourcePath);Sr(l)?(i.add(l),Bm(l,e,r,n).forEach(c=>i.add(c))):l&&Mt(l.$container)&&i.add(l.$container)}),i}function Ya(t){let e=new Set;if(Sr(t))e.add(t),t.superTypes.forEach(r=>{if(Sr(r.ref)){e.add(r.ref);let n=Ya(r.ref);for(let i of n)e.add(i)}});else if(Mt(t)){let r=zv(t.type);for(let n of r){let i=Ya(n);for(let o of i)e.add(o)}}return e}function zv(t){var e;if(Br(t))return t.types.flatMap(r=>zv(r));if(ir(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Mt(r)||Sr(r))return[r]}return[]}function zm(t,e){return t.interfaces.concat(e.interfaces)}function rc(t){return t.interfaces.concat(t.unions)}function Vv(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function Xv(t){return tc(t,new Set)}function tc(t,e){if(e.has(t))return[];if(e.add(t),It(t))return t.types.flatMap(r=>tc(r,e));if(Dr(t)){let r=t.value;return"type"in r?tc(r.type,e):[r.name]}else if(ti(t))return tc(t.elementType,e);return[]}function Ja(t){return typeof t.name=="string"}var us=class{getName(e){if(Ja(e))return e.name}getNameNode(e){return Yt(e.$cstNode,"name")}};function J(t){return t.charCodeAt(0)}function nc(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function cs(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function go(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function Qa(){throw Error("Internal Error - Should never get here!")}function Vm(t){return t.type==="Character"}var Za=[];for(let t=J("0");t<=J("9");t++)Za.push(t);var el=[J("_")].concat(Za);for(let t=J("a");t<=J("z");t++)el.push(t);for(let t=J("A");t<=J("Z");t++)el.push(t);var Xm=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var j_=/[0-9a-fA-F]/,ic=/[0-9]/,G_=/[1-9]/,To=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":cs(n,"global");break;case"i":cs(n,"ignoreCase");break;case"m":cs(n,"multiLine");break;case"u":cs(n,"unicode");break;case"y":cs(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}go(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return Qa()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;go(r);break}if(!(e===!0&&r===void 0)&&go(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),go(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):Qa()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=Za;break;case"D":e=Za,r=!0;break;case"s":e=Xm;break;case"S":e=Xm,r=!0;break;case"w":e=el;break;case"W":e=el,r=!0;break}return go(e)?{type:"Set",value:e,complement:r}:Qa()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return go(e)?{type:"Character",value:e}:Qa()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(Vm(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(Vm(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else nc(n.value,e),e.push(J("-")),nc(o.value,e)}else nc(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(G_.test(e)===!1)throw Error("Expecting a positive integer");for(;ic.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(ic.test(e)===!1)throw Error("Expecting an integer");for(;ic.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return ic.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(j_.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var Cn=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var H_=new To,Jm=class extends Cn{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=ri(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},Ym=new Jm;function Yv(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),Ym.reset(t),Ym.visit(H_.pattern(t)),Ym.multiline}catch{return!1}}function Qm(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function ri(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Jv(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:ri(e)).join("")}function Qv(t,e){let r=K_(t),n=e.match(r);return!!n&&n[0].length>0}function K_(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(u){o+=r.substr(n,u),n+=u}function l(u){o+="(?:"+r.substr(n,u)+"|$)",n+=u}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":l(3);break;case"x":l(4);break;case"u":e.unicode?r[n+2]==="{"?l(r.indexOf("}",n)-n+1):l(6):l(2);break;case"p":case"P":e.unicode?l(r.indexOf("}",n)-n+1):l(2);break;case"k":l(r.indexOf(">",n)-n+1);break;default:l(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],l(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):l(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:l(1);break}return o}return new RegExp(i(),t.flags)}var Zm={};nk(Zm,{URI:()=>W_,Utils:()=>B_});var Zv;(()=>{"use strict";var t={470:i=>{function o(l){if(typeof l!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(l))}function s(l,u){for(var c,f="",m=0,T=-1,w=0,A=0;A<=l.length;++A){if(A<l.length)c=l.charCodeAt(A);else{if(c===47)break;c=47}if(c===47){if(!(T===A-1||w===1))if(T!==A-1&&w===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var _=f.lastIndexOf("/");if(_!==f.length-1){_===-1?(f="",m=0):m=(f=f.slice(0,_)).length-1-f.lastIndexOf("/"),T=A,w=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=A,w=0;continue}}u&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+l.slice(T+1,A):f=l.slice(T+1,A),m=A-T-1;T=A,w=0}else c===46&&w!==-1?++w:w=-1}return f}var a={resolve:function(){for(var l,u="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var m;f>=0?m=arguments[f]:(l===void 0&&(l=process.cwd()),m=l),o(m),m.length!==0&&(u=m+"/"+u,c=m.charCodeAt(0)===47)}return u=s(u,!c),c?u.length>0?"/"+u:"/":u.length>0?u:"."},normalize:function(l){if(o(l),l.length===0)return".";var u=l.charCodeAt(0)===47,c=l.charCodeAt(l.length-1)===47;return(l=s(l,!u)).length!==0||u||(l="."),l.length>0&&c&&(l+="/"),u?"/"+l:l},isAbsolute:function(l){return o(l),l.length>0&&l.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var l,u=0;u<arguments.length;++u){var c=arguments[u];o(c),c.length>0&&(l===void 0?l=c:l+="/"+c)}return l===void 0?".":a.normalize(l)},relative:function(l,u){if(o(l),o(u),l===u||(l=a.resolve(l))===(u=a.resolve(u)))return"";for(var c=1;c<l.length&&l.charCodeAt(c)===47;++c);for(var f=l.length,m=f-c,T=1;T<u.length&&u.charCodeAt(T)===47;++T);for(var w=u.length-T,A=m<w?m:w,_=-1,k=0;k<=A;++k){if(k===A){if(w>A){if(u.charCodeAt(T+k)===47)return u.slice(T+k+1);if(k===0)return u.slice(T+k)}else m>A&&(l.charCodeAt(c+k)===47?_=k:k===0&&(_=0));break}var v=l.charCodeAt(c+k);if(v!==u.charCodeAt(T+k))break;v===47&&(_=k)}var g="";for(k=c+_+1;k<=f;++k)k!==f&&l.charCodeAt(k)!==47||(g.length===0?g+="..":g+="/..");return g.length>0?g+u.slice(T+_):(T+=_,u.charCodeAt(T)===47&&++T,u.slice(T))},_makeLong:function(l){return l},dirname:function(l){if(o(l),l.length===0)return".";for(var u=l.charCodeAt(0),c=u===47,f=-1,m=!0,T=l.length-1;T>=1;--T)if((u=l.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?c?"/":".":c&&f===1?"//":l.slice(0,f)},basename:function(l,u){if(u!==void 0&&typeof u!="string")throw new TypeError('"ext" argument must be a string');o(l);var c,f=0,m=-1,T=!0;if(u!==void 0&&u.length>0&&u.length<=l.length){if(u.length===l.length&&u===l)return"";var w=u.length-1,A=-1;for(c=l.length-1;c>=0;--c){var _=l.charCodeAt(c);if(_===47){if(!T){f=c+1;break}}else A===-1&&(T=!1,A=c+1),w>=0&&(_===u.charCodeAt(w)?--w==-1&&(m=c):(w=-1,m=A))}return f===m?m=A:m===-1&&(m=l.length),l.slice(f,m)}for(c=l.length-1;c>=0;--c)if(l.charCodeAt(c)===47){if(!T){f=c+1;break}}else m===-1&&(T=!1,m=c+1);return m===-1?"":l.slice(f,m)},extname:function(l){o(l);for(var u=-1,c=0,f=-1,m=!0,T=0,w=l.length-1;w>=0;--w){var A=l.charCodeAt(w);if(A!==47)f===-1&&(m=!1,f=w+1),A===46?u===-1?u=w:T!==1&&(T=1):u!==-1&&(T=-1);else if(!m){c=w+1;break}}return u===-1||f===-1||T===0||T===1&&u===f-1&&u===c+1?"":l.slice(u,f)},format:function(l){if(l===null||typeof l!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof l);return function(u,c){var f=c.dir||c.root,m=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+m:f+"/"+m:m}(0,l)},parse:function(l){o(l);var u={root:"",dir:"",base:"",ext:"",name:""};if(l.length===0)return u;var c,f=l.charCodeAt(0),m=f===47;m?(u.root="/",c=1):c=0;for(var T=-1,w=0,A=-1,_=!0,k=l.length-1,v=0;k>=c;--k)if((f=l.charCodeAt(k))!==47)A===-1&&(_=!1,A=k+1),f===46?T===-1?T=k:v!==1&&(v=1):T!==-1&&(v=-1);else if(!_){w=k+1;break}return T===-1||A===-1||v===0||v===1&&T===A-1&&T===w+1?A!==-1&&(u.base=u.name=w===0&&m?l.slice(1,A):l.slice(w,A)):(w===0&&m?(u.name=l.slice(1,T),u.base=l.slice(1,A)):(u.name=l.slice(w,T),u.base=l.slice(w,A)),u.ext=l.slice(T,A)),w>0?u.dir=l.slice(0,w-1):m&&(u.dir="/"),u},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>vt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function l(M,b){if(!M.scheme&&b)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let u="",c="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(b){return b instanceof m||!!b&&typeof b.authority=="string"&&typeof b.fragment=="string"&&typeof b.path=="string"&&typeof b.query=="string"&&typeof b.scheme=="string"&&typeof b.fsPath=="string"&&typeof b.with=="function"&&typeof b.toString=="function"}scheme;authority;path;query;fragment;constructor(b,q,G,le,ee,Q=!1){typeof b=="object"?(this.scheme=b.scheme||u,this.authority=b.authority||u,this.path=b.path||u,this.query=b.query||u,this.fragment=b.fragment||u):(this.scheme=function(Rt,ut){return Rt||ut?Rt:"file"}(b,Q),this.authority=q||u,this.path=function(Rt,ut){switch(Rt){case"https":case"http":case"file":ut?ut[0]!==c&&(ut=c+ut):ut=c}return ut}(this.scheme,G||u),this.query=le||u,this.fragment=ee||u,l(this,Q))}get fsPath(){return v(this,!1)}with(b){if(!b)return this;let{scheme:q,authority:G,path:le,query:ee,fragment:Q}=b;return q===void 0?q=this.scheme:q===null&&(q=u),G===void 0?G=this.authority:G===null&&(G=u),le===void 0?le=this.path:le===null&&(le=u),ee===void 0?ee=this.query:ee===null&&(ee=u),Q===void 0?Q=this.fragment:Q===null&&(Q=u),q===this.scheme&&G===this.authority&&le===this.path&&ee===this.query&&Q===this.fragment?this:new w(q,G,le,ee,Q)}static parse(b,q=!1){let G=f.exec(b);return G?new w(G[2]||u,X(G[4]||u),X(G[5]||u),X(G[7]||u),X(G[9]||u),q):new w(u,u,u,u,u)}static file(b){let q=u;if(i&&(b=b.replace(/\\/g,c)),b[0]===c&&b[1]===c){let G=b.indexOf(c,2);G===-1?(q=b.substring(2),b=c):(q=b.substring(2,G),b=b.substring(G)||c)}return new w("file",q,b,u,u)}static from(b){let q=new w(b.scheme,b.authority,b.path,b.query,b.fragment);return l(q,!0),q}toString(b=!1){return g(this,b)}toJSON(){return this}static revive(b){if(b){if(b instanceof m)return b;{let q=new w(b);return q._formatted=b.external,q._fsPath=b._sep===T?b.fsPath:null,q}}return b}}let T=i?1:void 0;class w extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(b=!1){return b?g(this,!0):(this._formatted||(this._formatted=g(this,!1)),this._formatted)}toJSON(){let b={$mid:1};return this._fsPath&&(b.fsPath=this._fsPath,b._sep=T),this._formatted&&(b.external=this._formatted),this.path&&(b.path=this.path),this.scheme&&(b.scheme=this.scheme),this.authority&&(b.authority=this.authority),this.query&&(b.query=this.query),this.fragment&&(b.fragment=this.fragment),b}}let A={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function _(M,b,q){let G,le=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||b&&Q===47||q&&Q===91||q&&Q===93||q&&Q===58)le!==-1&&(G+=encodeURIComponent(M.substring(le,ee)),le=-1),G!==void 0&&(G+=M.charAt(ee));else{G===void 0&&(G=M.substr(0,ee));let Rt=A[Q];Rt!==void 0?(le!==-1&&(G+=encodeURIComponent(M.substring(le,ee)),le=-1),G+=Rt):le===-1&&(le=ee)}}return le!==-1&&(G+=encodeURIComponent(M.substring(le))),G!==void 0?G:M}function k(M){let b;for(let q=0;q<M.length;q++){let G=M.charCodeAt(q);G===35||G===63?(b===void 0&&(b=M.substr(0,q)),b+=A[G]):b!==void 0&&(b+=M[q])}return b!==void 0?b:M}function v(M,b){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?b?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function g(M,b){let q=b?k:_,G="",{scheme:le,authority:ee,path:Q,query:Rt,fragment:ut}=M;if(le&&(G+=le,G+=":"),(ee||le==="file")&&(G+=c,G+=c),ee){let me=ee.indexOf("@");if(me!==-1){let Er=ee.substr(0,me);ee=ee.substr(me+1),me=Er.lastIndexOf(":"),me===-1?G+=q(Er,!1,!1):(G+=q(Er.substr(0,me),!1,!1),G+=":",G+=q(Er.substr(me+1),!1,!0)),G+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?G+=q(ee,!1,!0):(G+=q(ee.substr(0,me),!1,!0),G+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}G+=q(Q,!0,!1)}return Rt&&(G+="?",G+=q(Rt,!1,!1)),ut&&(G+="#",G+=b?ut:_(ut,!1,!1)),G}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(D)?M.replace(D,b=>$(b)):M}var ge=r(470);let Ee=ge.posix||ge,Ht="/";var vt;(function(M){M.joinPath=function(b,...q){return b.with({path:Ee.join(b.path,...q)})},M.resolvePath=function(b,...q){let G=b.path,le=!1;G[0]!==Ht&&(G=Ht+G,le=!0);let ee=Ee.resolve(G,...q);return le&&ee[0]===Ht&&!b.authority&&(ee=ee.substring(1)),b.with({path:ee})},M.dirname=function(b){if(b.path.length===0||b.path===Ht)return b;let q=Ee.dirname(b.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),b.with({path:q})},M.basename=function(b){return Ee.basename(b.path)},M.extname=function(b){return Ee.extname(b.path)}})(vt||(vt={}))})(),Zv=n})();var{URI:W_,Utils:B_}=Zv;var ni=Zm;"default"in ni&&(ni=ni.default);var Dt=ni.URI;var ve;(function(t){t.basename=ni.Utils.basename,t.dirname=ni.Utils.dirname,t.extname=ni.Utils.extname,t.joinPath=ni.Utils.joinPath,t.resolvePath=ni.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),l=s.split("/").filter(m=>m.length>0),u=0;for(;u<a.length&&a[u]===l[u];u++);let c="../".repeat(a.length-u),f=l.slice(u).join("/");return c+f}t.relative=r})(ve=ve||(ve={}));var uH=ve.equals,cH=ve.relative;var oc,eR=()=>oc??(oc=sc(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var uc=de(oo(),1);var tl=de(Vn(),1);function z_(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var tR=0,V_=10;var rR=Symbol("OperationCancelled");function vo(t){return t===rR}async function Ze(t){if(t===tl.CancellationToken.None)return;let e=Date.now();if(e-tR>=V_&&(tR=e,await z_()),t.isCancellationRequested)throw rR}var ac=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new tl.CancellationTokenSource}lock(e){this.cancel();let r=new tl.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{vo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Lr(t){return{code:t}}var fs;(function(t){t.all=["fast","slow","built-in"]})(fs=fs||(fs={}));var lc=class{constructor(e){this.entries=new Le,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let l={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,l)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(vo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function nR(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:Ro(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(pn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:Ro(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function Ro(t){if(mo(t))return{elementType:Ro(t.elementType)};if(ho(t))return{referenceType:Ro(t.referenceType)};if(Br(t))return{types:t.types.map(Ro)};if(ir(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=En(r);if(n)return ds(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function ps(t){return"referenceType"in t}function eh(t){return"elementType"in t}function iR(t){return"types"in t}function th(t){return"value"in t}function X_(t){return"primitive"in t}function Y_(t){return"string"in t}function oR(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ls(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new Qu(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=J_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=rl(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function J_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:rl(t.type,void 0,e,r)}}function rl(t,e,r,n){if(eh(t))return{elementType:rl(t.elementType,e,r,n)};if(ps(t))return{referenceType:rl(t.referenceType,void 0,r,n)};if(iR(t))return{types:t.types.map(i=>rl(i,e,r,n))};if(Y_(t))return{string:t.string};if(X_(t))return{primitive:t.primitive,regex:t.regex};if(th(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function nh(t,e){let r=nl(t),n=nl(e);for(let i of n)Q_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function Q_(t,e){return t.some(r=>rh(r,e))}function rh(t,e){return eh(t)&&eh(e)?rh(t.elementType,e.elementType):ps(t)&&ps(e)?rh(t.referenceType,e.referenceType):th(t)&&th(e)?t.value===e.value:!1}function nl(t){return iR(t)?t.types.flatMap(e=>nl(e)):[t]}function sR(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var Ae;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(Ae=Ae||(Ae={}));var cc=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Lr(Ae.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>K(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>K(o)&&!Mr(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Lr(Ae.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Mr(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>ie(i.rules).filter(o=>!il(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Le;n(e).forEach(l=>o.add(l.name,l));for(let[,l]of o.entriesGroupedByKey())l.length>1&&l.forEach(u=>{r("error",`A ${i}'s name has to be unique.`,{node:u,property:"name"})});let s=new Set,a=ol(this.documents,e);for(let l of a)n(l).forEach(u=>s.add(u.name));for(let l of o.keys())s.has(l)&&o.get(l).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Le;for(let i of e.imports){let o=ii(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[uc.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=ol(this.documents,o);n.set(o,s)}let i=new Le;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let l=n.get(a),u=this.getDuplicateExportedRules(s,l);for(let c of u)i.add(o,c)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let l=a.name;for(let u of o){let c=u.name;l===c&&s.add(u.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let l of e.types)s.add(l.name);for(let l of e.interfaces)s.add(l.name);for(let l of ol(this.documents,e))l.types.forEach(u=>s.add(u.name)),l.interfaces.forEach(u=>s.add(u.name));for(let l of e.rules.filter(K)){if(il(l))continue;let u=Mr(l),c=!l.returnType&&!l.dataType,f=En(l);if(!u&&f&&s.has(f)===c){if((c||((n=l.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&l.inferredType===void 0)r("error",a(f,c),{node:l,property:"name",data:Lr(Ae.MissingReturns)});else if(c||((i=l.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=zr(l.inferredType.$cstNode,"infers");r("error",a(f,c),{node:l.inferredType,property:"name",data:{code:Ae.InvalidInfers,actionSegment:nr(m)}})}}else if(u&&c){let m=zr(l.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:l,property:"inferredType",data:{code:Ae.InvalidInfers,actionSegment:nr(m)}})}}for(let l of Qe(e).filter(_e)){let u=this.getActionType(l);if(u){let c=!!l.inferredType,f=En(l);if(l.type&&f&&s.has(f)===c){let m=c?zr(l.$cstNode,"infer"):zr(l.$cstNode,"{");r("error",a(f,c),{node:l,property:"type",data:{code:c?Ae.SuperfluousInfer:Ae.MissingInfer,actionSegment:nr(m)}})}else if(u&&f&&s.has(f)&&c&&l.$cstNode){let m=Yt((o=l.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=zr(l.$cstNode,"{");m&&T&&r("error",`${f} is a declared type and cannot be redefined.`,{node:l,property:"type",data:{code:Ae.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(l,u){return u?`The type '${l}' is already explicitly declared and cannot be inferred.`:`The type '${l}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Lr(Ae.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Xr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",l=s+"isu",u=new Set,c=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);l.includes(T)?s.includes(T)&&c.add(T):u.add(T)}let f=this.getFlagRange(e);f&&(u.size>0?r("error",`'${Array.from(u).join("")}' ${u.size>1?"are":"is"} not valid regular expression flag${u.size>1?"s":""}.`,{node:e,range:f}):c.size>0&&r("warning",`'${Array.from(c).join("")}' regular expression flag${c.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!be(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Yt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Pe(e,i=>be(i)||K(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;be(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;be(n)&&n.fragment&&Pe(e,K)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Lr(Ae.CrossRefTokenSyntax)})}checkPackageImport(e,r){ii(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Lr(Ae.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Lr(Ae.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=ms(e,!0);for(let i of e.rules)be(i)&&i.hidden||il(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[uc.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Le,i=new Set;for(let u of e.rules)be(u)&&u.name&&n.add(u.name,u),K(u)&&Qe(u).filter(dt).forEach(f=>i.add(f.value));let o=new Le,s=new Le;for(let u of e.imports){let c=ol(this.documents,u);for(let f of c)for(let m of f.rules)be(m)&&m.name?o.add(m.name,u):K(m)&&m.name&&Qe(m).filter(dt).forEach(w=>s.add(w.value,u))}for(let u of n.values())if(i.has(u.name))r("error","Terminal name clashes with existing keyword.",{node:u,property:"name"});else if(s.has(u.name)){let c=s.get(u.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:u,property:"name"})}let a=new Le;for(let u of i)for(let c of o.get(u))a.add(c,u);for(let[u,c]of a.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:u,property:"path"});let l=new Le;for(let[u,c]of o.entriesGroupedByKey()){let f=s.get(u);f.length>0&&c.filter(m=>!f.includes(m)).forEach(m=>l.add(m,u))}for(let[u,c]of l.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:u,property:"path"})}checkRuleName(e,r){if(e.name&&!il(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Lr(Ae.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&Z_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Pe(e,K)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Vr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Lr(Ae.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Qe(e).filter(ns);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[uc.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(il(e))return;let n=lR(e),i=Mr(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&Ne(e.terminal)&&K(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Qe(e.terminal).map(o=>Vt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=Ro(n.type),o=nl(i),s=!1,a=!1;for(let l of o)ps(l)?s=!0:ps(l)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!ds(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(K(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else be(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!sl(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(Ne(i)){let o=i.rule.ref;K(o)&&!Mr(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):K(o)&&!uR(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):be(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Mt(e.type.ref)&&Br(e.type.ref.type)){let n=aR(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;K((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){ir(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&K(e.ref)&&!Mr(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=En(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Vt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function il(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var Z_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function aR(t){let e=[];return t.types.forEach(r=>{var n;ir(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Mt(r.typeRef.ref)&&(Br(r.typeRef.ref.type)?e.push(...aR(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Vr(t,e){return t==="?"||t==="*"||Ft(e)&&!!e.guardCondition}function cR(t){return t==="*"||t==="+"}function Mr(t){return fR(t,new Set)}function fR(t,e){if(e.has(t))return!0;e.add(t);for(let r of Qe(t))if(Ne(r)){if(!r.rule.ref||K(r.rule.ref)&&!fR(r.rule.ref,e))return!1}else{if(xe(r))return!1;if(_e(r))return!1}return!!t.definition}function lR(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Mt(r)&&eN(r)}function eN(t){return oh(t.type,new Set)}function oh(t,e){if(e.has(t))return!0;if(e.add(t),mo(t))return!1;if(ho(t))return!1;if(Br(t))return t.types.every(r=>oh(r,e));if(ir(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Mt(r)?oh(r.type,e):!1}else return!1}else return!1}function uR(t){return al(t,new Set)}function al(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),K(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return al(t.returnType.ref,e)}else{if(Mt(t))return al(t.type,e);if(mo(t))return!1;if(ho(t))return!1;if(Br(t))return t.types.every(i=>al(i,e));if(ir(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return al(t.typeRef.ref,e)}}return!1}function ah(t){let e=t.$container;if(Ft(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(_e(o))return o;{let s=Qe(r[i]).find(_e);if(s)return s}}}if(es(e))return ah(e)}function pn(t){var e;if(K(t))return Mr(t)?t.name:(e=ys(t))!==null&&e!==void 0?e:t.name;if(Sr(t)||Mt(t)||is(t))return t.name;if(_e(t)){let r=gs(t);if(r)return r}else if(rs(t))return t.name;throw new Zu("Cannot get name of Unknown Type",t.$cstNode)}function En(t){if(t)try{return pn(t)}catch{return}}function ys(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(K(e))return e.name;if(Sr(e)||Mt(e))return e.name}}}function gs(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return pn(t.type.ref)}function xo(t){var e,r,n;return be(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Mr(t)?t.name:(n=ys(t))!==null&&n!==void 0?n:t.name}function Xr(t){let e={s:!1,i:!1,u:!1},r=Ts(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var lh=/[\s\S]/.source;function Ts(t,e){if(Rv(t))return tN(t);if(Sv(t))return rN(t);if(Bu(t))return oN(t);if(zu(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return oi(Ts(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(hv(t))return iN(t);if(kv(t))return nN(t);if(gv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),oi(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(Ev(t))return oi(lh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function tN(t){return oi(t.elements.map(e=>Ts(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function rN(t){return oi(t.elements.map(e=>Ts(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function nN(t){return oi(`${lh}*?${Ts(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function iN(t){return oi(`(?!${Ts(t.terminal)})${lh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function oN(t){return t.right?oi(`[${ih(t.left)}-${ih(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):oi(ih(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function ih(t){return ri(t.value)}function oi(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function uh(t){if(t.path===void 0||t.path.length===0)return;let e=ve.dirname(ne(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),ve.resolvePath(e,r)}function ii(t,e){let r=uh(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(ts(i))return i}}catch{}}function ol(t,e){if(Ku(e)){let r=ii(t,e);if(r){let n=sh(t,r);return n.push(r),n}return[]}else return sh(t,e)}function sh(t,e,r=e,n=new Set,i=new Set){let o=ne(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=ii(t,s);a&&sh(t,a,r,n,i)}}return Array.from(i)}function hs(t){return xe(t)?[t]:Pr(t)||Ft(t)||Ir(t)?t.elements.flatMap(e=>hs(e)):Ne(t)&&t.rule.ref?hs(t.rule.ref.definition):[]}var sN=["string","number","boolean","Date","bigint"];function ds(t){return sN.includes(t)}var ch=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:dR(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let l={alt:s,next:a.children};l.next.length===0?(l.alt.super=l.alt.super.filter(u=>u!==l.alt.name),i.push(l)):i.push(...this.applyNext(e,l))}return gR(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(dR(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=So();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function aN(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(pR)}}function dR(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>pR(e))}}function pR(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function mR(t,e,r){let n=[],i={fragments:new Map};for(let l of t)n.push(...hR(i,l));let o=pN(n),s=mN(o),a=hN(o,s,r);for(let l of e){let u=lN(l);a.unions.push({name:l.name,declared:!1,type:u,subTypes:new Set,superTypes:new Set,dataType:l.dataType})}return a}function lN(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=fh(t.definition,r);return e?{primitive:"string"}:n}function fh(t,e){var r,n,i;if(t.cardinality)return e();if(Pr(t))return{types:t.elements.map(o=>fh(o,e))};if(Ft(t)||Ir(t))return t.elements.length!==1?e():fh(t.elements[0],e);if(Ne(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?be(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Xr(o).toString()}:{value:o.name}:e()}else if(dt(t))return{string:t.value};return e()}function hR(t,e){let r=So(e),n=new ch(t,r);return e.definition&&dh(n,n.root,e.definition),n.getTypes()}function So(t){return{name:K(t)||_e(t)?En(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function dh(t,e,r){let n=Vr(r.cardinality,r);if(Pr(r)){let i=[];n&&i.push(t.connect(e,So()));for(let o of r.elements){let s=t.connect(e,So());i.push(dh(t,s,o))}return t.merge(...i)}else if(Ft(r)||Ir(r)){let i=t.connect(e,So()),o;n&&(o=t.connect(e,So()));for(let s of r.elements)i=dh(t,i,s);return o?t.merge(o,i):i}else{if(_e(r))return uN(t,e,r);xe(r)?cN(e,r):Ne(r)&&fN(t,e,r)}return e}function uN(t,e,r){var n;if(!t.hasLeafNode(e)){let o=aN(e);t.connect(e,o)}let i=t.connect(e,So(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&Ja(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:wo(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function cN(t,e){let r={types:new Set,reference:!1};yR(e.terminal,r);let n=wo(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Vr(e.cardinality),type:n,astNodes:new Set([e])})}function yR(t,e){if(Pr(t)||Ir(t)||Ft(t))for(let r of t.elements)yR(r,e);else if(dt(t))e.types.add(`'${t.value}'`);else if(Ne(t)&&t.rule.ref)e.types.add(xo(t.rule.ref));else if(Vt(t)&&t.type.ref){let r=En(t.type.ref);r&&e.types.add(r),e.reference=!0}}function fN(t,e,r){let n=r.rule.ref;if(K(n)&&n.fragment){let i=dN(n,t.context);Vr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else K(n)&&e.ruleCalls.push(xo(n))}function dN(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=En(t),o=hR(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function pN(t){let e=new Map,r=[],n=gR(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function gR(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Le),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let l of i){let u=l.alt;a.alt.super.push(...u.super),a.next.push(...l.next);let c=u.properties;for(let f of c){let m=o.find(T=>T.name===f.name);m?(m.type=nh(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}u.ruleCalls.forEach(f=>s.add(f))}for(let l of i){let u=l.alt;if(u.ruleCalls.length===0)for(let c of o)u.properties.find(f=>f.name===c.name)||(c.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function mN(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Le;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:wo(!1,!1,o)};r.push(s)}return r}function hN(t,e,r){let n=new Le;for(let a of t)for(let l of a.superTypes)n.add(l,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let l=new Set(n.get(a.name));if(a.properties.length===0&&l.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let u=wo(!1,!1,Array.from(l)),c=s.get(a.name);if(c)c.type=nh(c.type,u);else{let f={name:a.name,declared:!1,subTypes:l,superTypes:a.superTypes,type:u};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(l=>!s.has(l)));return o}function wo(t,e,r){if(t)return{elementType:wo(!1,e,r)};if(e)return{referenceType:wo(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:ds(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>wo(!1,!1,[n]))}}function TR(t,e){let r=vR(t,e),n=nR(r.interfaces,r.types),i=mR(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function vR(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ne(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)K(s)&&!s.fragment&&(Mr(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>ii(e,a)).filter(a=>a!==void 0);vR(s,e,r,n)}}}return n}function SR(t,e){let{inferred:r,declared:n,astResources:i}=TR(t,e);return{astResources:i,inferred:RR(n,r),declared:RR(r,n)}}function RR(t,e){var r,n;let i={interfaces:Vv(xR(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:xR(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=oR(i);return yN(o),o}function xR(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function yN(t){let e=TN(t),r=Array.from(e.values());vN(r),RN(t.interfaces),gN(r)}function gN(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function TN({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,ph(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function ph(t,e){if(e.has(t))return!0;if(e.add(t),It(t))return t.types.every(r=>ph(r,e));if(Dr(t)){let r=t.value;return cn(r)?ph(r.type,e):!1}else return Or(t)||kn(t)}function vN(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function RN(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(l=>Xv(l.type));for(let l of a)(e=r.get(l))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)dn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(l=>a.containerTypes.add(l)),o.has(a)||(o.add(a),i.push(a)))}}var xN={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},SN={maxLookahead:3},wR={AstReflection:()=>new Ha},bR={Grammar:()=>eR(),LanguageMetaData:()=>xN,parser:{ParserConfig:()=>SN}};var ll=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},vs=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},AR={getElement(){},getAllElements(){return Zo}};var fc=de(Vn(),1);var Rs=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=fc.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=Ei,i=fc.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await Ze(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=fc.CancellationToken.None){let n=e.parseResult.value,i=new Le;for(let o of Qe(n))await Ze(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var dc=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},mh=class extends dc{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},pc=class extends dc{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var mc=class extends mh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var xs=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new mc(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ie(a).filter(l=>this.reflection.isSubtype(l.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new ll(ie(e),r,n)}createScopeForNodes(e,r,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new ll(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new vs(this.indexManager.allElements(e)))}};var hc=class extends xs{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===po?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ne(r.container).precomputedScopes,o=Vu(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(l=>l.type===Ka||l.type===Wa))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Pe(r.container,ts);if(!n)return AR;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===po&&(o=o.filter(s=>s.type===Ka||s.type===Wa)),new vs(o)}gatherImports(e,r){for(let n of e.imports){let i=uh(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;ts(s)&&this.gatherImports(s,r)}}}},yc=class extends Rs{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),K(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Qe(e).forEach(o=>{if(_e(o)&&o.inferredType){let s=gs(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){is(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&K(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=Vu(e);if(i&&_e(e)&&e.inferredType){let o=gs(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ne(e)){let i,o=()=>{var s;return i??(i=nr((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:nr(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var Fr=de(we(),1);var or=de(we(),1);var gc=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=or.CancellationToken.None){let i=e.parseResult,o=[];if(await Ze(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===mn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===mn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===mn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(vo(s))throw s;console.error("An error occurred during validation:",s)}return await Ze(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:or.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Lr(mn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=or.Range.create(0,0,0,0);else{let a=or.Position.create(s.endLine-1,s.endColumn);o=or.Range.create(a,a)}}}else o=Ga(i.token);if(o){let s={severity:or.DiagnosticSeverity.Error,range:o,message:i.message,data:Lr(mn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:mn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=or.CancellationToken.None){let i=[],o=(s,a,l)=>{i.push(this.toDiagnostic(s,a,l))};return await Promise.all(Zn(e).map(async s=>{await Ze(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let l of a)await l(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:wN(n),severity:bN(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function wN(t){if(or.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Yt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=zr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function bN(t){switch(t){case"error":return or.DiagnosticSeverity.Error;case"warning":return or.DiagnosticSeverity.Warning;case"info":return or.DiagnosticSeverity.Information;case"hint":return or.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var mn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(mn=mn||(mn={}));var Tc=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Ae.GrammarNameUppercase:case Ae.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Ae.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Ae.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Ae.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Ae.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Ae.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Ae.MissingReturns:n(this.fixMissingReturns(e,r));break;case Ae.InvalidInfers:case Ae.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Ae.MissingInfer:n(this.fixMissingInfer(e,r));break;case Ae.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case mn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=xr(i,n),s=Pe(o?.astNode,Bu);if(s&&s.right&&s.$cstNode){let a=s.left.value,l=s.right.value;return{title:"Refactor into regular expression",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${ri(a)}-${ri(l)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Yt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,l=s.offset,u=n.$cstNode.text.indexOf(")",l)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(u)}})}for(let a of i){let l=a.ref;if(l&&be(l)&&!l.hidden&&l.$cstNode){let u=l.$cstNode.range.start;o.push({newText:"hidden ",range:{start:u,end:u}})}}return{title:"Fix hidden terminals",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=xr(o,i),a=Pe(s?.astNode,K);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),l=this.indexManager.allElements(a).filter(m=>m.name===r.refText),u=[],c=-1,f=-1;for(let m of l){if(ve.equals(m.documentUri,n.uri))continue;let T=AN(n.uri,m.documentUri),w,A="",_=n.parseResult.value,k=_.imports.find(v=>v.path&&T<v.path);if(k)w=(i=k.$cstNode)===null||i===void 0?void 0:i.range.start;else if(_.imports.length>0){let v=_.imports[_.imports.length-1].$cstNode.range.end;v&&(w={line:v.line+1,character:0})}else _.rules.length>0&&(w=(o=_.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,A=`
`);w&&((c<0||T.length<f)&&(c=u.length,f=T.length),u.push({title:`Add import to '${T}'`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:w,end:w},newText:`import '${T}'
${A}`}]}}}))}return c>=0&&(u[c].isPreferred=!0),u}};function AN(t,e){let r=ve.dirname(t),n=ve.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var $R=de(oo(),1);var bs=de(we(),1);function hh(t,e){let r={stacks:t,tokens:e};return kN(r),r.stacks.flat().forEach(i=>{i.property=void 0}),CR(r.stacks).map(i=>i[i.length-1])}function yh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,l=s;for(;l.$container;)if(Ft(l.$container)){a=l.$container;break}else if(es(l.$container))l=l.$container;else break;if(cR(l.cardinality)){let u=Ss({next:{feature:l,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of u)i.add(c.feature);o.push(...u)}if(a){let u=a.elements.indexOf(l);u!==void 0&&u<a.elements.length-1&&o.push(...kR({feature:a,type:e.type,new:!1},u+1,r,n,i)),o.every(c=>Vr(c.feature.cardinality,c.feature)||Vr(r.get(c.feature))||i.has(c.feature))&&o.push(...yh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function ul(t){return Ct(t)&&(t={feature:t}),Ss({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function Ss(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:l,type:u}=i;if(Ft(l)){if(s.has(l))return[];s.add(l)}if(Ft(l))return kR(i,0,o,s,a).map(c=>vc(c,l.cardinality,o));if(Pr(l)||Ir(l))return l.elements.flatMap(c=>Ss({next:{feature:c,new:!1,type:u},cardinalities:o,visited:s,plus:a})).map(c=>vc(c,l.cardinality,o));if(xe(l)){let c={feature:l.terminal,new:!1,type:u,property:(e=i.property)!==null&&e!==void 0?e:l.feature};return Ss({next:c,cardinalities:o,visited:s,plus:a}).map(f=>vc(f,l.cardinality,o))}else{if(_e(l))return yh({next:{feature:l,new:!0,type:pn(l),property:(r=i.property)!==null&&r!==void 0?r:l.feature},cardinalities:o,visited:s,plus:a});if(Ne(l)&&K(l.rule.ref)){let c=l.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=ys(c))!==null&&n!==void 0?n:c.name,property:i.property};return Ss({next:f,cardinalities:o,visited:s,plus:a}).map(m=>vc(m,l.cardinality,o))}else return[i]}}function vc(t,e,r){return r.set(t.feature,e),t}function kR(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...Ss({next:a,cardinalities:r,visited:n,plus:i})),!!Vr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function kN(t){for(let e of t.tokens){let r=CR(t.stacks,e);t.stacks=r}}function CR(t,e){let r=[];for(let n of t)r.push(...CN(n,e));return r}function CN(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(EN)),i=[];for(;t.length>0;){let o=t.pop(),s=yh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?gh(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Vr(a.feature.cardinality,a.feature)||Vr(r.get(a.feature))))break}return i}function EN(t){if(t.cardinality==="+")return!0;let e=Pe(t,xe);return!!(e&&e.cardinality==="+")}function gh(t,e){if(dt(t))return t.value===e.image;if(Ne(t))return $N(t.rule.ref,e);if(Vt(t)){let r=Rc(t);if(r)return gh(r,e)}return!1}function $N(t,e){return K(t)?ul(t.definition).some(n=>gh(n.feature,e)):be(t)?Xr(t).test(e.image):!1}function ER(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var ws=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(l,u)=>{let c=this.fillCompletionItem(l,u);c&&n.push(c)},s=l=>dt(l.feature)?l.feature.value:l.feature,a=[];for(let l of i)if(await Promise.all(ie(l.features).distinct(s).exclude(a).map(u=>this.completionFor(l,u,o))),a.push(...l.features),!this.continueCompletion(n))break;return bs.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:bs.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let l=xc(this.grammar),u=ul({feature:l.definition,new:!0,type:ys(l)});return o.length>0?(o.shift(),hh(u.map(c=>[c]),o)):u}let s=[...o].splice(i.tokenIndex);return hh([i.elementStack.map(l=>({feature:l}))],s)}*buildContexts(e,r){var n,i,o,s,a;let l=e.parseResult.value.$cstNode;if(!l)return;let u=e.textDocument,c=u.getText(),f=u.offsetAt(r),m={document:e,textDocument:u,offset:f,position:r},T=this.findDataTypeRuleStart(l,f);if(T){let[g,$]=T,D=(n=xr(l,g))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(u,g);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:g,tokenEndOffset:$,features:X})}let{nextTokenStart:w,nextTokenEnd:A,previousTokenStart:_,previousTokenEnd:k}=this.backtrackToAnyToken(c,f),v;if(_!==void 0&&k!==void 0&&k===f){v=(i=xr(l,_))===null||i===void 0?void 0:i.astNode;let g=this.findFeaturesAt(u,_);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:_,tokenEndOffset:k,features:g})}if(v=(s=(o=xr(l,w))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:_===void 0||(a=xr(l,_))===null||a===void 0?void 0:a.astNode,v){let g=this.findFeaturesAt(u,w);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:w,tokenEndOffset:A,features:g})}else{let g=xc(this.grammar),$=ul(g.definition);yield Object.assign(Object.assign({},m),{tokenOffset:w,tokenEndOffset:A,features:$})}}findDataTypeRuleStart(e,r){var n,i;let o=Pt(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Pe(o?.grammarSource,K))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Pe(o?.grammarSource,K))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(K(r)){let i=ul(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(dt(r.feature))return this.completionForKeyword(e,r.feature,n);if(Vt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Pe(r.feature,xe),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),l=new Set;a.getAllElements().forEach(u=>{!l.has(u.name)&&this.filterCrossReference(u)&&(n(e,this.createReferenceCompletionItem(u)),l.add(u.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:bs.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let u=this.nameProvider.getName(r.node);if(!u)return;o=u}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Sc=class extends ws{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Pe(r.feature,xe);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(c=>c.startsWith(a));let l=e.textDocument.positionAt(e.tokenOffset+1),u=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:l,end:u}}for(let a of o){let l=i.length>0?"":'"',u=`${l}${a}${l}`;r(e,{label:a,textEdit:{newText:u,range:s},kind:$R.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of r)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),l=a.substring(0,a.length-ve.extname(s.uri).length),u=ve.relative(i,l);u.startsWith(".")||(u=`./${u}`),o.push(u)}return o}};var cl=de(we(),1);var As=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Qe(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of OT(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,cl.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),cl.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===cl.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var wc=class extends As{shouldProcessContent(e){return!K(e)}};var bc=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Th(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,l,u)=>{var c,f;let m=this.nodeModeToKey(a,l),T=i.get(m),w=(c=u.options.priority)!==null&&c!==void 0?c:0,A=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||A<=w)&&i.set(m,u)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Qe(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],l=this.iterateCstTree(e,o).iterator(),u,c;do if(c=l.next(),!c.done){let f=c.value,m=co(f),T=this.nodeModeToKey(f,"prepend"),w=r.get(T);if(r.delete(T),w){let k=this.createTextEdit(u,f,w,o);for(let v of k)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let A=this.nodeModeToKey(f,"append"),_=r.get(A);if(r.delete(A),_){let k=FT(f);if(k){let v=this.createTextEdit(f,k,_,o);for(let g of v)g&&this.insideRange(g.range,i)&&this.isNecessary(g,e.textDocument)&&s.push(g)}}if(!w&&f.hidden){let k=this.createHiddenTextEdits(u,f,void 0,o);for(let v of k)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(u=f)}while(!c.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],l={start:{character:0,line:s},end:r.range.start},u=i.document.getText(l),c=this.findFittingMove(l,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(u,i),T=this.getIndentationCharacterCount(i,c)-f;if(T===0)return[];let w="";T>0&&(w=(i.options.insertSpaces?" ":"	").repeat(T));let A=r.text.split(`
`);A[0]=u+A[0];for(let _=0;_<A.length;_++){let k=s+_,v={character:0,line:k};if(T>0)a.push({newText:w,range:{start:v,end:v}});else{let g=A[_],$=0;for(;$<g.length;$++){let D=g.charAt($);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:v,end:{line:k,character:Math.min($,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let l=a.characters,u=a.lines,c=a.tabs,f=i.indentation;i.indentation+=c??0;let m=[];return l!==void 0?m.push(this.createSpaceTextEdit(s,l,n.options)):u!==void 0?m.push(this.createLineTextEdit(s,u,i,n.options)):c!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),co(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Wr(i,o=>this.iterateCst(o,r)):Zo}iterateCst(e,r){if(!An(e))return Zo;let n=r.indentation;return new Nr(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,pr))}},Th=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new hn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new hn(r,this.collector)}property(e,r){let n=Yt(this.astNode.$cstNode,e,r);return new hn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=$i(this.astNode.$cstNode,n);r.push(...i)}return new hn(r,this.collector)}keyword(e,r){let n=zr(this.astNode.$cstNode,e,r);return new hn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=Ac(this.astNode.$cstNode,n);r.push(...i)}return new hn(r,this.collector)}cst(e){return new hn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new hn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new hn(UT(o,s),this.collector)}},hn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ye;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(u)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function o(c){return s(1,c)}t.newLine=o;function s(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=s;function a(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function l(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=l;function u(c,f){var m,T,w,A,_,k;let v=(m=c.lines)!==null&&m!==void 0?m:0,g=(T=f.lines)!==null&&T!==void 0?T:0,$=(w=c.tabs)!==null&&w!==void 0?w:0,D=(A=f.tabs)!==null&&A!==void 0?A:0,X=(_=c.characters)!==null&&_!==void 0?_:0,ge=(k=f.characters)!==null&&k!==void 0?k:0;return v<g?-1:v>g?1:$<D?-1:$>D?1:X<ge?-1:X>ge?1:0}})(ye=ye||(ye={}));var kc=class extends bc{format(e){if(Vt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ye.noSpace());else if(K(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ye.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ye.oneSpace()):r.property("name").append(ye.noSpace()),r.properties("parameters").append(ye.noSpace()),r.keywords(",").append(ye.oneSpace()),r.keywords("<").append(ye.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ye.noSpace()),r.interior(i,n).prepend(ye.indent()),n.prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(be(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ye.oneSpace()),r.keyword("returns").append(ye.oneSpace())),r.keywords("hidden","terminal","fragment").append(ye.oneSpace()),r.keyword(":").prepend(ye.noSpace()),r.keyword(";").prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ye.noSpace()),r.keywords(".","+=","=").surround(ye.noSpace()),r.keyword("}").prepend(ye.noSpace())}else if(rs(e))this.getNodeFormatter(e).keywords("infer","infers").append(ye.oneSpace());else if(xe(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ye.noSpace());else if(Ne(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ye.noSpace()),r.keyword(",").append(ye.oneSpace()),r.properties("arguments").append(ye.noSpace())}es(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ye.noSpace())}};var si=de(we(),1);var oe=de(we(),1);var xh={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},_R={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},NR={legend:{tokenTypes:Object.keys(xh),tokenModifiers:Object.keys(_R)},full:{delta:!0},range:!0},Rh=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},Cc=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=oe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Rh;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=Zn(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await Ze(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Gu(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=xh[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let c of o){let f=_R[c];a|=f}}let l=n.start.line,u=n.end.line;if(l===u){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(l,c,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(l,c,m-f,s,a)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:l+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,s,a);for(let m=l+1;m<u;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(u,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Yt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...$i(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let l=zr(r.$cstNode,n,o);l&&a.push(l)}else a.push(...Ac(r.$cstNode,n));for(let l of a)this.highlightNode({node:l,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},vh;(function(t){function e(n,i){let o=new Map;Object.entries(xh).forEach(([l,u])=>o.set(u,l));let s=0,a=0;return r(n.data,5).map(l=>{s+=l[0],l[0]!==0&&(a=0),a+=l[1];let u=l[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(l[3]),tokenModifiers:l[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+u}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(vh=vh||(vh={}));var Ec=class extends Cc{highlightElement(e,r){var n;xe(e)?r({node:e,property:"feature",type:si.SemanticTokenTypes.property}):_e(e)?e.feature&&r({node:e,property:"feature",type:si.SemanticTokenTypes.property}):is(e)?r({node:e,property:"name",type:si.SemanticTokenTypes.type}):ir(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:si.SemanticTokenTypes.type}):tv(e)?r({node:e,property:"name",type:si.SemanticTokenTypes.parameter}):ns(e)?r({node:e,property:"parameter",type:si.SemanticTokenTypes.parameter}):Ne(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:si.SemanticTokenTypes.type}):Wu(e)&&r({node:e,property:"name",type:si.SemanticTokenTypes.property})}};var $c=class extends us{getName(e){return xe(e)?e.feature:super.getName(e)}getNameNode(e){return xe(e)?Yt(e.$cstNode,"feature"):super.getNameNode(e)}};var ks=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Cs(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(Yn(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(Yn(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||LT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,r.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:nr(r),local:!0}}}};var _c=class extends ks{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=Cs(e);if(n&&n.feature==="feature"){if(xe(r))return this.findAssignmentDeclaration(r);if(_e(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return Wu(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Pe(e,Sr);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=Bm(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let l=this.findRulesWithReturnType(a);s.push(...l)}),s.forEach(a=>{let l=this.createReferencesToAttribute(a,e);n.push(...l)})}return ie(n)}createReferencesToAttribute(e,r){let n=[];if(K(e)){let i=hs(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:nr(o),local:ve.equals(ne(i).uri,ne(r).uri)})}}else{if(e.feature===r.name){let o=Yt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:nr(o),local:ve.equals(ne(e).uri,ne(r).uri)})}let i=Pe(e,K);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Pe(e,K),i=ah(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(Sr(n.returnType.ref)||Mt(n.returnType.ref))){let o=Ya(n.returnType.ref);for(let s of o){let a=s.attributes.find(l=>l.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=Ya(e.type.ref);for(let s of o){let a=s.attributes.find(l=>l.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(K(s)||_e(s))&&r.push(s)}),r}};var fl=de(we(),1);var PR=de(we(),1);var Nc=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=Pt(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:PR.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Dt.parse(e.item.uri)),n=r.parseResult.value,i=Pt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Dt.parse(e.item.uri)),n=r.parseResult.value,i=Pt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var IR=de(we(),1);var Es=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=Pt(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[IR.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ne(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var DR=de(we(),1);var Pc=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=Pt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(u=>this.createDocumentHighlight(u)).toArray()}}createDocumentHighlight(e){return DR.DocumentHighlight.create(e.segment.range)}};var Ic=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of Ei(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var _N=de(we(),1);var Dc=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let l=r.charCodeAt(a),u=e.charCodeAt(o);if((l===u||this.toUpperCharCode(l)===this.toUpperCharCode(u))&&(n||(n=i===void 0||this.isWordTransition(i,l)),n&&o++,o===e.length))return!0;i=l}return!1}isWordTransition(e,r){return OR<=e&&e<=LR&&NN<=r&&r<=PN||e===MR&&r!==MR}toUpperCharCode(e){return OR<=e&&e<=LR?e-32:e}},OR="a".charCodeAt(0),LR="z".charCodeAt(0),NN="A".charCodeAt(0),PN="Z".charCodeAt(0),MR="_".charCodeAt(0);var Sh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=Pt(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let l=this.references.findDeclaration(a);if(l)return this.getAstNodeHoverContent(l)}}}},Oc=class extends Sh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var IN=de(we(),1);var DN=de(we(),1);var Yr=de(we(),1);var Ge;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(Ge=Ge||(Ge={}));var Lc=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Dt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:Ge.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:Ge.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=Jo.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Mc=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Ge.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Ge.Changed,this.documentMap.delete(r)),n}};var ON=de(we(),1);function FR(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var Fc=class{constructor(e){this.onInitializeEmitter=new Yr.Emitter,this.onInitializedEmitter=new Yr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Hu(this.services),this.services.ServiceRegistry.all.forEach(e=>Hu(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(b=>b.lsp.Formatter),o=n.map(b=>{var q;return(q=b.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(b=>!!b),s=this.hasService(b=>b.lsp.CodeActionProvider),a=this.hasService(b=>b.lsp.SemanticTokenProvider),l=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,u=this.hasService(b=>b.lsp.DocumentLinkProvider),c=FR(n.map(b=>{var q;return(q=b.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(b=>b.lsp.TypeProvider),m=this.hasService(b=>b.lsp.ImplementationProvider),T=this.hasService(b=>b.lsp.CompletionProvider),w=ER(n.map(b=>{var q;return(q=b.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),A=this.hasService(b=>b.lsp.ReferencesProvider),_=this.hasService(b=>b.lsp.DocumentSymbolProvider),k=this.hasService(b=>b.lsp.DefinitionProvider),v=this.hasService(b=>b.lsp.DocumentHighlightProvider),g=this.hasService(b=>b.lsp.FoldingRangeProvider),$=this.hasService(b=>b.lsp.HoverProvider),D=this.hasService(b=>b.lsp.RenameProvider),X=this.hasService(b=>b.lsp.CallHierarchyProvider),ge=this.hasService(b=>b.lsp.CodeLensProvider),Ee=this.hasService(b=>b.lsp.DeclarationProvider),Ht=this.hasService(b=>b.lsp.InlayHintProvider),vt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:l&&{commands:l},textDocumentSync:Yr.TextDocumentSyncKind.Incremental,completionProvider:T?w:void 0,referencesProvider:A,documentSymbolProvider:_,definitionProvider:k,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:g,hoverProvider:$,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?NR:void 0,signatureHelpProvider:c,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:u?{resolveProvider:!1}:void 0,codeLensProvider:ge?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:Ht?{resolveProvider:!1}:void 0,workspaceSymbolProvider:vt?{resolveProvider:!!vt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function qR(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");LN(e,t),MN(e,t),FN(e,t),UN(e,t),jN(e,t),GN(e,t),HN(e,t),KN(e,t),BN(e,t),VN(e,t),XN(e,t),qN(e,t),YN(e,t),zN(e,t),JN(e,t),QN(e,t),eP(e,t),rP(e,t),oP(e,t),nP(e,t),tP(e,t),ZN(e,t),WN(e,t),iP(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function LN(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(l=>r.update(s,a,l))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Dt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],l=[];for(let u of s.changes){let c=Dt.parse(u.uri);u.type===Yr.FileChangeType.Deleted?l.push(c):a.push(c)}i(a,l)})}function MN(t,e){e.workspace.DocumentBuilder.onBuildPhase(Ge.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function FN(t,e){t.onCompletion(sr((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function UN(t,e){t.onReferences(sr((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function qN(t,e){t.onCodeAction(sr((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function jN(t,e){t.onDocumentSymbol(sr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function GN(t,e){t.onDefinition(sr((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function HN(t,e){t.onTypeDefinition(sr((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function KN(t,e){t.onImplementation(sr((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function WN(t,e){t.onDeclaration(sr((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function BN(t,e){t.onDocumentHighlight(sr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function zN(t,e){t.onHover(sr((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function VN(t,e){t.onFoldingRanges(sr((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function XN(t,e){t.onDocumentFormatting(sr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(sr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(sr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function YN(t,e){t.onRenameRequest(sr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(sr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function JN(t,e){t.languages.inlayHint.on(Pi((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function QN(t,e){let r={data:[]};t.languages.semanticTokens.on(Pi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Pi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Pi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function ZN(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function eP(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return $s(s)}})}function tP(t,e){t.onDocumentLinks(Pi((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function rP(t,e){t.onSignatureHelp(Pi((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function nP(t,e){t.onCodeLens(Pi((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function iP(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return $s(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return $s(a)}})}}function oP(t,e){t.languages.callHierarchy.onPrepare(Pi((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(UR((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(UR((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function UR(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Dt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return $s(a)}}}function Pi(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Dt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let l=r.getOrCreateDocument(s);if(!l)throw new Error;try{return await t(a,l,i,o)}catch(u){return $s(u)}}}function sr(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Dt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let l=r.getOrCreateDocument(s);if(!l)return null;try{return await t(a,l,i,o)}catch(u){return $s(u)}}}function $s(t){if(vo(t))return new Yr.ResponseError(Yr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Yr.ResponseError)return t;throw t}var qc=de(we(),1),Uc=class{getSymbolKind(){return qc.SymbolKind.Field}getCompletionItemKind(){return qc.CompletionItemKind.Reference}};var jR=de(we(),1);var jc=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=Pt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(jR.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var GR=de(we(),1);var Gc=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=Pt(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let l={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,l).forEach(c=>{let f=GR.TextEdit.replace(c.segment.range,r.newName),m=c.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=Pt(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&Ja(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var sP=de(we(),1);var HR=de(we(),1);var Hc=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=HR.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ze(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var Kc=class extends Es{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,l;let u="path";if(Ku(e.astNode)&&((n=Cs(e))===null||n===void 0?void 0:n.feature)===u){let c=ii(this.documents,e.astNode);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:fl.Range.create(0,0,0,0),T=(l=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&l!==void 0?l:fl.Range.create(0,0,0,0);return[fl.LocationLink.create(c.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:Ei(e).head()}};var wh=de(we(),1);var Wc=class extends Nc{getIncomingCalls(e,r){if(!K(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=xr(s.$cstNode,i.segment.offset);if(!a)return;let l=Pe(a.astNode,K);if(!l||!l.$cstNode)return;let u=this.nameProvider.getNameNode(l);if(!u)return;let c=i.sourceUri.toString(),f=c+"@"+u.text;n.has(f)?n.set(f,{parserRule:l.$cstNode,nameNode:u,targetNodes:[...n.get(f).targetNodes,a],docUri:c}):n.set(f,{parserRule:l.$cstNode,nameNode:u,targetNodes:[a],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:wh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!K(e))return;let r=Qe(e).filter(Ne).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let l=this.nameProvider.getNameNode(a.astNode);if(!l)return;let u=ne(a.astNode).uri.toString(),c=u+"@"+l.text;n.has(c)?n.set(c,{refCstNode:a,to:l,from:[...n.get(c).from,s.range],docUri:u}):n.set(c,{refCstNode:a,to:l,from:[s.range],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:wh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var Bc=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=SR(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=aP(e);for(let a of rc(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,l)=>a.set(l.name,l),new Map);for(let a of rc(n)){let l=s.get(a.name);if(l){let u=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},u??{}),{declared:a,declaredNode:l}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=zm(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of zm(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function aP({parserRules:t,datatypeRules:e}){let r=new Le;ie(t).concat(e).forEach(i=>r.add(xo(i),i));function n(i){if(_e(i)){let o=gs(i);o&&r.add(o,i)}(Pr(i)||Ft(i)||Ir(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function KR(t){return t&&"declared"in t}function WR(t){return t&&"inferred"in t}function BR(t){return t&&"inferred"in t&&"declared"in t}function VR(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var zc=class{checkCyclicType(e,r){Ii(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Ii(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(KR(o)&&dn(o.declared)&&Sr(o.declaredNode)){let s=o;uP(s,r),cP(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())WR(o)&&o.inferred instanceof ls&&lP(o.inferred,r),BR(o)&&pP(o,i,r)}checkActionIsNotUnionType(e,r){Mt(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Ii(t,e){var r;if(e.has(t))return!0;if(e.add(t),Mt(t))return Ii(t.type,e);if(Sr(t))return t.superTypes.some(n=>n.ref&&Ii(n.ref,new Set(e)));if(ir(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Ii(t.typeRef.ref,e)}else{if(ho(t))return Ii(t.referenceType,e);if(mo(t))return Ii(t.elementType,e);if(Br(t))return t.types.some(n=>Ii(n,new Set(e)))}return!1}function lP(t,e){t.properties.forEach(r=>{var n;let i=Km(r.type);if(i.length>1){let o=a=>ei(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function uP({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(cn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function cP({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Le);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let l of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(l.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let l=i[s],u=i[a],c=dn(l)?l.superProperties:[],f=dn(u)?u.superProperties:[],m=fP(c,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${l}' and '${u}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=dn(s)?s.superProperties:[];for(let l of a)o.add(l.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(l=>l.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function fP(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!dP(n,i)&&r.push(n.name)}return r}function dP(t,e){return Xa(t.type,e.type)&&Xa(e.type,t.type)}function pP(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,l=f=>m=>s.forEach(T=>r("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:_e(T)?"type":"name"})),u=(f,m)=>f.forEach(T=>r("error",m,{node:T,property:xe(T)||_e(T)?"feature":"name"})),c=f=>{s.forEach(m=>{K(m)&&hs(m.definition).find(w=>w.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(cn(n)&&cn(i))mP(n.type,i.type,l(`in a rule that returns type '${a}'`));else if(dn(n)&&dn(i))hP(n,i,e,l(`in a rule that returns type '${a}'`),u,c);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;l()(f),r("error",f,{node:o,property:"name"})}}function mP(t,e,r){Xa(t,e)||r(`Cannot assign type '${fn(t,"DeclaredType")}' to '${fn(e,"DeclaredType")}'`)}function zR(t){return t.optional||ec(t.type)}function hP(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),l=new Map(e.superProperties.map(f=>[f.name,f])),u=f=>{if(It(f))return{types:f.types.map(m=>u(m))};if(ei(f))return{referenceType:u(f.referenceType)};if(ti(f))return{elementType:u(f.elementType)};if(Dr(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=l.get(f);if(T){let w=fn(m.type,"DeclaredType"),A=fn(T.type,"DeclaredType");if(!Xa(u(m.type),T.type)&&A!=="unknown"){let k=`The assigned type '${w}' is not compatible with the declared property '${f}' of type '${A}'.`;i(m.astNodes,k)}m.optional&&!zR(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let c=new Set;for(let[f,m]of l.entries())!a.get(f)&&!zR(m)&&c.add(f);if(c.size>0){let f=c.size>1?"Properties":"A property",m=c.size>1?"are expected":"is expected",T=Array.from(c).map(w=>`'${w}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var yP={validation:{LangiumGrammarValidator:t=>new cc(t),ValidationResourcesCollector:t=>new Bc(t),LangiumGrammarTypesValidator:()=>new zc},lsp:{FoldingRangeProvider:t=>new wc(t),CodeActionProvider:t=>new Tc(t),SemanticTokenProvider:t=>new Ec(t),Formatter:()=>new kc,DefinitionProvider:t=>new Kc(t),CallHierarchyProvider:t=>new Wc(t),CompletionProvider:t=>new Sc(t)},references:{ScopeComputation:t=>new yc(t),ScopeProvider:t=>new hc(t),References:t=>new _c(t),NameProvider:()=>new $c}};function XR(t,e){let r=fo(pl(t),wR,e),n=fo(dl({shared:r}),bR,yP);return gP(r,n),r.ServiceRegistry.register(n),sR(n),VR(n),{shared:r,grammar:n}}function gP(t,e){t.workspace.DocumentBuilder.onBuildPhase(Ge.IndexedReferences,async(n,i)=>{for(let o of n){await Ze(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var bh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},Vc={fileSystemProvider:()=>new bh};function xc(t){return t.rules.find(e=>K(e)&&e.entry)}function TP(t){return t.rules.filter(e=>be(e)&&e.hidden)}function ms(t,e){let r=new Set,n=xc(t);if(!n)return new Set(t.rules);let i=[n].concat(TP(t));for(let s of i)YR(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||be(s)&&s.hidden)&&o.add(s);return o}function YR(t,e,r){e.add(t.name),Qe(t).forEach(n=>{if(Ne(n)||r&&zu(n)){let i=n.rule.ref;i&&!e.has(i.name)&&YR(i,e,r)}})}function Rc(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=sl(t.type.ref);return e?.terminal}}function JR(t){return t.hidden&&!Xr(t).test(" ")}function $i(t,e){return!t||!e?[]:Ah(t,e,t.astNode,!0)}function Yt(t,e,r){if(!t||!e)return;let n=Ah(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Ah(t,e,r,n){if(!n){let i=Pe(t.grammarSource,xe);if(i&&i.feature===e)return[t]}return An(t)&&t.astNode===r?t.content.flatMap(i=>Ah(i,e,r,!1)):[]}function Ac(t,e){return t?QR(t,e,t?.astNode):[]}function zr(t,e,r){if(!t)return;let n=QR(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function QR(t,e,r){if(t.astNode!==r)return[];if(dt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=_m(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?dt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Cs(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Pe(t.grammarSource,xe);if(n)return n;t=t.container}}function sl(t){return rs(t)&&(t=t.$container),ZR(t,new Map)}function ZR(t,e){var r;function n(i,o){let s;return Pe(i,xe)||(s=ZR(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Qe(t)){if(xe(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(Ne(i)&&K(i.rule.ref))return n(i,i.rule.ref);if(ir(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function sc(t){var e;let r=XR(Vc).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Dt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function ex(t){let e=[],r=t.Grammar;for(let n of r.rules)be(n)&&JR(n)&&Yv(Xr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Nm}}var vP=typeof global=="object"&&global&&global.Object===Object&&global,Xc=vP;var RP=typeof self=="object"&&self&&self.Object===Object&&self,xP=Xc||RP||Function("return this")(),Et=xP;var SP=Et.Symbol,Ut=SP;var tx=Object.prototype,wP=tx.hasOwnProperty,bP=tx.toString,ml=Ut?Ut.toStringTag:void 0;function AP(t){var e=wP.call(t,ml),r=t[ml];try{t[ml]=void 0;var n=!0}catch{}var i=bP.call(t);return n&&(e?t[ml]=r:delete t[ml]),i}var rx=AP;var kP=Object.prototype,CP=kP.toString;function EP(t){return CP.call(t)}var nx=EP;var $P="[object Null]",_P="[object Undefined]",ix=Ut?Ut.toStringTag:void 0;function NP(t){return t==null?t===void 0?_P:$P:ix&&ix in Object(t)?rx(t):nx(t)}var mr=NP;function PP(t){return t!=null&&typeof t=="object"}var yt=PP;var IP="[object Symbol]";function DP(t){return typeof t=="symbol"||yt(t)&&mr(t)==IP}var $n=DP;function OP(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var _n=OP;var LP=Array.isArray,z=LP;var MP=1/0,ox=Ut?Ut.prototype:void 0,sx=ox?ox.toString:void 0;function ax(t){if(typeof t=="string")return t;if(z(t))return _n(t,ax)+"";if($n(t))return sx?sx.call(t):"";var e=t+"";return e=="0"&&1/t==-MP?"-0":e}var lx=ax;var FP=/\s/;function UP(t){for(var e=t.length;e--&&FP.test(t.charAt(e)););return e}var ux=UP;var qP=/^\s+/;function jP(t){return t&&t.slice(0,ux(t)+1).replace(qP,"")}var cx=jP;function GP(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var st=GP;var fx=0/0,HP=/^[-+]0x[0-9a-f]+$/i,KP=/^0b[01]+$/i,WP=/^0o[0-7]+$/i,BP=parseInt;function zP(t){if(typeof t=="number")return t;if($n(t))return fx;if(st(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=st(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=cx(t);var r=KP.test(t);return r||WP.test(t)?BP(t.slice(2),r?2:8):HP.test(t)?fx:+t}var dx=zP;var px=1/0,VP=17976931348623157e292;function XP(t){if(!t)return t===0?t:0;if(t=dx(t),t===px||t===-px){var e=t<0?-1:1;return e*VP}return t===t?t:0}var mx=XP;function YP(t){var e=mx(t),r=e%1;return e===e?r?e-r:e:0}var Nn=YP;function JP(t){return t}var wr=JP;var QP="[object AsyncFunction]",ZP="[object Function]",eI="[object GeneratorFunction]",tI="[object Proxy]";function rI(t){if(!st(t))return!1;var e=mr(t);return e==ZP||e==eI||e==QP||e==tI}var hr=rI;var nI=Et["__core-js_shared__"],Yc=nI;var hx=function(){var t=/[^.]+$/.exec(Yc&&Yc.keys&&Yc.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function iI(t){return!!hx&&hx in t}var yx=iI;var oI=Function.prototype,sI=oI.toString;function aI(t){if(t!=null){try{return sI.call(t)}catch{}try{return t+""}catch{}}return""}var ai=aI;var lI=/[\\^$.*+?()[\]{}|]/g,uI=/^\[object .+?Constructor\]$/,cI=Function.prototype,fI=Object.prototype,dI=cI.toString,pI=fI.hasOwnProperty,mI=RegExp("^"+dI.call(pI).replace(lI,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function hI(t){if(!st(t)||yx(t))return!1;var e=hr(t)?mI:uI;return e.test(ai(t))}var gx=hI;function yI(t,e){return t?.[e]}var Tx=yI;function gI(t,e){var r=Tx(t,e);return gx(r)?r:void 0}var br=gI;var TI=br(Et,"WeakMap"),Jc=TI;var vx=Object.create,vI=function(){function t(){}return function(e){if(!st(e))return{};if(vx)return vx(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),Rx=vI;function RI(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var xx=RI;function xI(){}var at=xI;function SI(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var Sx=SI;var wI=800,bI=16,AI=Date.now;function kI(t){var e=0,r=0;return function(){var n=AI(),i=bI-(n-r);if(r=n,i>0){if(++e>=wI)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var wx=kI;function CI(t){return function(){return t}}var bx=CI;var EI=function(){try{var t=br(Object,"defineProperty");return t({},"",{}),t}catch{}}(),_s=EI;var $I=_s?function(t,e){return _s(t,"toString",{configurable:!0,enumerable:!1,value:bx(e),writable:!0})}:wr,Ax=$I;var _I=wx(Ax),kx=_I;function NI(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var Qc=NI;function PI(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var Zc=PI;function II(t){return t!==t}var Cx=II;function DI(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var Ex=DI;function OI(t,e,r){return e===e?Ex(t,e,r):Zc(t,Cx,r)}var Ns=OI;function LI(t,e){var r=t==null?0:t.length;return!!r&&Ns(t,e,0)>-1}var ef=LI;var MI=9007199254740991,FI=/^(?:0|[1-9]\d*)$/;function UI(t,e){var r=typeof t;return e=e??MI,!!e&&(r=="number"||r!="symbol"&&FI.test(t))&&t>-1&&t%1==0&&t<e}var Di=UI;function qI(t,e,r){e=="__proto__"&&_s?_s(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var Ps=qI;function jI(t,e){return t===e||t!==t&&e!==e}var Pn=jI;var GI=Object.prototype,HI=GI.hasOwnProperty;function KI(t,e,r){var n=t[e];(!(HI.call(t,e)&&Pn(n,r))||r===void 0&&!(e in t))&&Ps(t,e,r)}var Oi=KI;function WI(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],l=n?n(r[a],t[a],a,r,t):void 0;l===void 0&&(l=t[a]),i?Ps(r,a,l):Oi(r,a,l)}return r}var In=WI;var $x=Math.max;function BI(t,e,r){return e=$x(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=$x(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),xx(t,this,a)}}var _x=BI;function zI(t,e){return kx(_x(t,e,wr),t+"")}var Is=zI;var VI=9007199254740991;function XI(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=VI}var Ds=XI;function YI(t){return t!=null&&Ds(t.length)&&!hr(t)}var $t=YI;function JI(t,e,r){if(!st(r))return!1;var n=typeof e;return(n=="number"?$t(r)&&Di(e,r.length):n=="string"&&e in r)?Pn(r[e],t):!1}var Li=JI;function QI(t){return Is(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Li(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var Nx=QI;var ZI=Object.prototype;function eD(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||ZI;return t===r}var Dn=eD;function tD(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var Px=tD;var rD="[object Arguments]";function nD(t){return yt(t)&&mr(t)==rD}var kh=nD;var Ix=Object.prototype,iD=Ix.hasOwnProperty,oD=Ix.propertyIsEnumerable,sD=kh(function(){return arguments}())?kh:function(t){return yt(t)&&iD.call(t,"callee")&&!oD.call(t,"callee")},Mi=sD;function aD(){return!1}var Dx=aD;var Mx=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ox=Mx&&typeof module=="object"&&module&&!module.nodeType&&module,lD=Ox&&Ox.exports===Mx,Lx=lD?Et.Buffer:void 0,uD=Lx?Lx.isBuffer:void 0,cD=uD||Dx,li=cD;var fD="[object Arguments]",dD="[object Array]",pD="[object Boolean]",mD="[object Date]",hD="[object Error]",yD="[object Function]",gD="[object Map]",TD="[object Number]",vD="[object Object]",RD="[object RegExp]",xD="[object Set]",SD="[object String]",wD="[object WeakMap]",bD="[object ArrayBuffer]",AD="[object DataView]",kD="[object Float32Array]",CD="[object Float64Array]",ED="[object Int8Array]",$D="[object Int16Array]",_D="[object Int32Array]",ND="[object Uint8Array]",PD="[object Uint8ClampedArray]",ID="[object Uint16Array]",DD="[object Uint32Array]",Ye={};Ye[kD]=Ye[CD]=Ye[ED]=Ye[$D]=Ye[_D]=Ye[ND]=Ye[PD]=Ye[ID]=Ye[DD]=!0;Ye[fD]=Ye[dD]=Ye[bD]=Ye[pD]=Ye[AD]=Ye[mD]=Ye[hD]=Ye[yD]=Ye[gD]=Ye[TD]=Ye[vD]=Ye[RD]=Ye[xD]=Ye[SD]=Ye[wD]=!1;function OD(t){return yt(t)&&Ds(t.length)&&!!Ye[mr(t)]}var Fx=OD;function LD(t){return function(e){return t(e)}}var On=LD;var Ux=typeof exports=="object"&&exports&&!exports.nodeType&&exports,hl=Ux&&typeof module=="object"&&module&&!module.nodeType&&module,MD=hl&&hl.exports===Ux,Ch=MD&&Xc.process,FD=function(){try{var t=hl&&hl.require&&hl.require("util").types;return t||Ch&&Ch.binding&&Ch.binding("util")}catch{}}(),Jr=FD;var qx=Jr&&Jr.isTypedArray,UD=qx?On(qx):Fx,Os=UD;var qD=Object.prototype,jD=qD.hasOwnProperty;function GD(t,e){var r=z(t),n=!r&&Mi(t),i=!r&&!n&&li(t),o=!r&&!n&&!i&&Os(t),s=r||n||i||o,a=s?Px(t.length,String):[],l=a.length;for(var u in t)(e||jD.call(t,u))&&!(s&&(u=="length"||i&&(u=="offset"||u=="parent")||o&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||Di(u,l)))&&a.push(u);return a}var tf=GD;function HD(t,e){return function(r){return t(e(r))}}var rf=HD;var KD=rf(Object.keys,Object),jx=KD;var WD=Object.prototype,BD=WD.hasOwnProperty;function zD(t){if(!Dn(t))return jx(t);var e=[];for(var r in Object(t))BD.call(t,r)&&r!="constructor"&&e.push(r);return e}var nf=zD;function VD(t){return $t(t)?tf(t):nf(t)}var He=VD;var XD=Object.prototype,YD=XD.hasOwnProperty,JD=Nx(function(t,e){if(Dn(e)||$t(e)){In(e,He(e),t);return}for(var r in e)YD.call(e,r)&&Oi(t,r,e[r])}),Jt=JD;function QD(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var Gx=QD;var ZD=Object.prototype,e0=ZD.hasOwnProperty;function t0(t){if(!st(t))return Gx(t);var e=Dn(t),r=[];for(var n in t)n=="constructor"&&(e||!e0.call(t,n))||r.push(n);return r}var Hx=t0;function r0(t){return $t(t)?tf(t,!0):Hx(t)}var Fi=r0;var n0=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,i0=/^\w*$/;function o0(t,e){if(z(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||$n(t)?!0:i0.test(t)||!n0.test(t)||e!=null&&t in Object(e)}var Ls=o0;var s0=br(Object,"create"),ui=s0;function a0(){this.__data__=ui?ui(null):{},this.size=0}var Kx=a0;function l0(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var Wx=l0;var u0="__lodash_hash_undefined__",c0=Object.prototype,f0=c0.hasOwnProperty;function d0(t){var e=this.__data__;if(ui){var r=e[t];return r===u0?void 0:r}return f0.call(e,t)?e[t]:void 0}var Bx=d0;var p0=Object.prototype,m0=p0.hasOwnProperty;function h0(t){var e=this.__data__;return ui?e[t]!==void 0:m0.call(e,t)}var zx=h0;var y0="__lodash_hash_undefined__";function g0(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=ui&&e===void 0?y0:e,this}var Vx=g0;function Ms(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ms.prototype.clear=Kx;Ms.prototype.delete=Wx;Ms.prototype.get=Bx;Ms.prototype.has=zx;Ms.prototype.set=Vx;var Eh=Ms;function T0(){this.__data__=[],this.size=0}var Xx=T0;function v0(t,e){for(var r=t.length;r--;)if(Pn(t[r][0],e))return r;return-1}var Ui=v0;var R0=Array.prototype,x0=R0.splice;function S0(t){var e=this.__data__,r=Ui(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():x0.call(e,r,1),--this.size,!0}var Yx=S0;function w0(t){var e=this.__data__,r=Ui(e,t);return r<0?void 0:e[r][1]}var Jx=w0;function b0(t){return Ui(this.__data__,t)>-1}var Qx=b0;function A0(t,e){var r=this.__data__,n=Ui(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var Zx=A0;function Fs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Fs.prototype.clear=Xx;Fs.prototype.delete=Yx;Fs.prototype.get=Jx;Fs.prototype.has=Qx;Fs.prototype.set=Zx;var qi=Fs;var k0=br(Et,"Map"),ji=k0;function C0(){this.size=0,this.__data__={hash:new Eh,map:new(ji||qi),string:new Eh}}var eS=C0;function E0(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var tS=E0;function $0(t,e){var r=t.__data__;return tS(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Gi=$0;function _0(t){var e=Gi(this,t).delete(t);return this.size-=e?1:0,e}var rS=_0;function N0(t){return Gi(this,t).get(t)}var nS=N0;function P0(t){return Gi(this,t).has(t)}var iS=P0;function I0(t,e){var r=Gi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var oS=I0;function Us(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Us.prototype.clear=eS;Us.prototype.delete=rS;Us.prototype.get=nS;Us.prototype.has=iS;Us.prototype.set=oS;var bo=Us;var D0="Expected a function";function $h(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(D0);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new($h.Cache||bo),r}$h.Cache=bo;var sS=$h;var O0=500;function L0(t){var e=sS(t,function(n){return r.size===O0&&r.clear(),n}),r=e.cache;return e}var aS=L0;var M0=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,F0=/\\(\\)?/g,U0=aS(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(M0,function(r,n,i,o){e.push(i?o.replace(F0,"$1"):n||r)}),e}),lS=U0;function q0(t){return t==null?"":lx(t)}var uS=q0;function j0(t,e){return z(t)?t:Ls(t,e)?[t]:lS(uS(t))}var Hi=j0;var G0=1/0;function H0(t){if(typeof t=="string"||$n(t))return t;var e=t+"";return e=="0"&&1/t==-G0?"-0":e}var Ln=H0;function K0(t,e){e=Hi(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[Ln(e[r++])];return r&&r==n?t:void 0}var qs=K0;function W0(t,e,r){var n=t==null?void 0:qs(t,e);return n===void 0?r:n}var cS=W0;function B0(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var js=B0;var fS=Ut?Ut.isConcatSpreadable:void 0;function z0(t){return z(t)||Mi(t)||!!(fS&&t&&t[fS])}var dS=z0;function pS(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=dS),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?pS(a,e-1,r,n,i):js(i,a):n||(i[i.length]=a)}return i}var Gs=pS;function V0(t){var e=t==null?0:t.length;return e?Gs(t,1):[]}var gt=V0;var X0=rf(Object.getPrototypeOf,Object),of=X0;function Y0(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var sf=Y0;function J0(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var mS=J0;function Q0(){this.__data__=new qi,this.size=0}var hS=Q0;function Z0(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var yS=Z0;function eO(t){return this.__data__.get(t)}var gS=eO;function tO(t){return this.__data__.has(t)}var TS=tO;var rO=200;function nO(t,e){var r=this.__data__;if(r instanceof qi){var n=r.__data__;if(!ji||n.length<rO-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new bo(n)}return r.set(t,e),this.size=r.size,this}var vS=nO;function Hs(t){var e=this.__data__=new qi(t);this.size=e.size}Hs.prototype.clear=hS;Hs.prototype.delete=yS;Hs.prototype.get=gS;Hs.prototype.has=TS;Hs.prototype.set=vS;var Ki=Hs;function iO(t,e){return t&&In(e,He(e),t)}var RS=iO;function oO(t,e){return t&&In(e,Fi(e),t)}var xS=oO;var AS=typeof exports=="object"&&exports&&!exports.nodeType&&exports,SS=AS&&typeof module=="object"&&module&&!module.nodeType&&module,sO=SS&&SS.exports===AS,wS=sO?Et.Buffer:void 0,bS=wS?wS.allocUnsafe:void 0;function aO(t,e){if(e)return t.slice();var r=t.length,n=bS?bS(r):new t.constructor(r);return t.copy(n),n}var kS=aO;function lO(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var Ks=lO;function uO(){return[]}var af=uO;var cO=Object.prototype,fO=cO.propertyIsEnumerable,CS=Object.getOwnPropertySymbols,dO=CS?function(t){return t==null?[]:(t=Object(t),Ks(CS(t),function(e){return fO.call(t,e)}))}:af,Ws=dO;function pO(t,e){return In(t,Ws(t),e)}var ES=pO;var mO=Object.getOwnPropertySymbols,hO=mO?function(t){for(var e=[];t;)js(e,Ws(t)),t=of(t);return e}:af,lf=hO;function yO(t,e){return In(t,lf(t),e)}var $S=yO;function gO(t,e,r){var n=e(t);return z(t)?n:js(n,r(t))}var uf=gO;function TO(t){return uf(t,He,Ws)}var yl=TO;function vO(t){return uf(t,Fi,lf)}var cf=vO;var RO=br(Et,"DataView"),ff=RO;var xO=br(Et,"Promise"),df=xO;var SO=br(Et,"Set"),Wi=SO;var _S="[object Map]",wO="[object Object]",NS="[object Promise]",PS="[object Set]",IS="[object WeakMap]",DS="[object DataView]",bO=ai(ff),AO=ai(ji),kO=ai(df),CO=ai(Wi),EO=ai(Jc),Ao=mr;(ff&&Ao(new ff(new ArrayBuffer(1)))!=DS||ji&&Ao(new ji)!=_S||df&&Ao(df.resolve())!=NS||Wi&&Ao(new Wi)!=PS||Jc&&Ao(new Jc)!=IS)&&(Ao=function(t){var e=mr(t),r=e==wO?t.constructor:void 0,n=r?ai(r):"";if(n)switch(n){case bO:return DS;case AO:return _S;case kO:return NS;case CO:return PS;case EO:return IS}return e});var yn=Ao;var $O=Object.prototype,_O=$O.hasOwnProperty;function NO(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&_O.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var OS=NO;var PO=Et.Uint8Array,Bs=PO;function IO(t){var e=new t.constructor(t.byteLength);return new Bs(e).set(new Bs(t)),e}var zs=IO;function DO(t,e){var r=e?zs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var LS=DO;var OO=/\w*$/;function LO(t){var e=new t.constructor(t.source,OO.exec(t));return e.lastIndex=t.lastIndex,e}var MS=LO;var FS=Ut?Ut.prototype:void 0,US=FS?FS.valueOf:void 0;function MO(t){return US?Object(US.call(t)):{}}var qS=MO;function FO(t,e){var r=e?zs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var jS=FO;var UO="[object Boolean]",qO="[object Date]",jO="[object Map]",GO="[object Number]",HO="[object RegExp]",KO="[object Set]",WO="[object String]",BO="[object Symbol]",zO="[object ArrayBuffer]",VO="[object DataView]",XO="[object Float32Array]",YO="[object Float64Array]",JO="[object Int8Array]",QO="[object Int16Array]",ZO="[object Int32Array]",eL="[object Uint8Array]",tL="[object Uint8ClampedArray]",rL="[object Uint16Array]",nL="[object Uint32Array]";function iL(t,e,r){var n=t.constructor;switch(e){case zO:return zs(t);case UO:case qO:return new n(+t);case VO:return LS(t,r);case XO:case YO:case JO:case QO:case ZO:case eL:case tL:case rL:case nL:return jS(t,r);case jO:return new n;case GO:case WO:return new n(t);case HO:return MS(t);case KO:return new n;case BO:return qS(t)}}var GS=iL;function oL(t){return typeof t.constructor=="function"&&!Dn(t)?Rx(of(t)):{}}var HS=oL;var sL="[object Map]";function aL(t){return yt(t)&&yn(t)==sL}var KS=aL;var WS=Jr&&Jr.isMap,lL=WS?On(WS):KS,BS=lL;var uL="[object Set]";function cL(t){return yt(t)&&yn(t)==uL}var zS=cL;var VS=Jr&&Jr.isSet,fL=VS?On(VS):zS,XS=fL;var dL=1,pL=2,mL=4,YS="[object Arguments]",hL="[object Array]",yL="[object Boolean]",gL="[object Date]",TL="[object Error]",JS="[object Function]",vL="[object GeneratorFunction]",RL="[object Map]",xL="[object Number]",QS="[object Object]",SL="[object RegExp]",wL="[object Set]",bL="[object String]",AL="[object Symbol]",kL="[object WeakMap]",CL="[object ArrayBuffer]",EL="[object DataView]",$L="[object Float32Array]",_L="[object Float64Array]",NL="[object Int8Array]",PL="[object Int16Array]",IL="[object Int32Array]",DL="[object Uint8Array]",OL="[object Uint8ClampedArray]",LL="[object Uint16Array]",ML="[object Uint32Array]",Ke={};Ke[YS]=Ke[hL]=Ke[CL]=Ke[EL]=Ke[yL]=Ke[gL]=Ke[$L]=Ke[_L]=Ke[NL]=Ke[PL]=Ke[IL]=Ke[RL]=Ke[xL]=Ke[QS]=Ke[SL]=Ke[wL]=Ke[bL]=Ke[AL]=Ke[DL]=Ke[OL]=Ke[LL]=Ke[ML]=!0;Ke[TL]=Ke[JS]=Ke[kL]=!1;function pf(t,e,r,n,i,o){var s,a=e&dL,l=e&pL,u=e&mL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!st(t))return t;var c=z(t);if(c){if(s=OS(t),!a)return Sx(t,s)}else{var f=yn(t),m=f==JS||f==vL;if(li(t))return kS(t,a);if(f==QS||f==YS||m&&!i){if(s=l||m?{}:HS(t),!a)return l?$S(t,xS(s,t)):ES(t,RS(s,t))}else{if(!Ke[f])return i?t:{};s=GS(t,f,a)}}o||(o=new Ki);var T=o.get(t);if(T)return T;o.set(t,s),XS(t)?t.forEach(function(_){s.add(pf(_,e,r,_,t,o))}):BS(t)&&t.forEach(function(_,k){s.set(k,pf(_,e,r,k,t,o))});var w=u?l?cf:yl:l?Fi:He,A=c?void 0:w(t);return Qc(A||t,function(_,k){A&&(k=_,_=t[k]),Oi(s,k,pf(_,e,r,k,t,o))}),s}var ZS=pf;var FL=4;function UL(t){return ZS(t,FL)}var We=UL;function qL(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Mn=qL;var jL="__lodash_hash_undefined__";function GL(t){return this.__data__.set(t,jL),this}var ew=GL;function HL(t){return this.__data__.has(t)}var tw=HL;function mf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new bo;++e<r;)this.add(t[e])}mf.prototype.add=mf.prototype.push=ew;mf.prototype.has=tw;var Vs=mf;function KL(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var hf=KL;function WL(t,e){return t.has(e)}var Xs=WL;var BL=1,zL=2;function VL(t,e,r,n,i,o){var s=r&BL,a=t.length,l=e.length;if(a!=l&&!(s&&l>a))return!1;var u=o.get(t),c=o.get(e);if(u&&c)return u==e&&c==t;var f=-1,m=!0,T=r&zL?new Vs:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var w=t[f],A=e[f];if(n)var _=s?n(A,w,f,e,t,o):n(w,A,f,t,e,o);if(_!==void 0){if(_)continue;m=!1;break}if(T){if(!hf(e,function(k,v){if(!Xs(T,v)&&(w===k||i(w,k,r,n,o)))return T.push(v)})){m=!1;break}}else if(!(w===A||i(w,A,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var yf=VL;function XL(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var rw=XL;function YL(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var Ys=YL;var JL=1,QL=2,ZL="[object Boolean]",eM="[object Date]",tM="[object Error]",rM="[object Map]",nM="[object Number]",iM="[object RegExp]",oM="[object Set]",sM="[object String]",aM="[object Symbol]",lM="[object ArrayBuffer]",uM="[object DataView]",nw=Ut?Ut.prototype:void 0,_h=nw?nw.valueOf:void 0;function cM(t,e,r,n,i,o,s){switch(r){case uM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case lM:return!(t.byteLength!=e.byteLength||!o(new Bs(t),new Bs(e)));case ZL:case eM:case nM:return Pn(+t,+e);case tM:return t.name==e.name&&t.message==e.message;case iM:case sM:return t==e+"";case rM:var a=rw;case oM:var l=n&JL;if(a||(a=Ys),t.size!=e.size&&!l)return!1;var u=s.get(t);if(u)return u==e;n|=QL,s.set(t,e);var c=yf(a(t),a(e),n,i,o,s);return s.delete(t),c;case aM:if(_h)return _h.call(t)==_h.call(e)}return!1}var iw=cM;var fM=1,dM=Object.prototype,pM=dM.hasOwnProperty;function mM(t,e,r,n,i,o){var s=r&fM,a=yl(t),l=a.length,u=yl(e),c=u.length;if(l!=c&&!s)return!1;for(var f=l;f--;){var m=a[f];if(!(s?m in e:pM.call(e,m)))return!1}var T=o.get(t),w=o.get(e);if(T&&w)return T==e&&w==t;var A=!0;o.set(t,e),o.set(e,t);for(var _=s;++f<l;){m=a[f];var k=t[m],v=e[m];if(n)var g=s?n(v,k,m,e,t,o):n(k,v,m,t,e,o);if(!(g===void 0?k===v||i(k,v,r,n,o):g)){A=!1;break}_||(_=m=="constructor")}if(A&&!_){var $=t.constructor,D=e.constructor;$!=D&&"constructor"in t&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof D=="function"&&D instanceof D)&&(A=!1)}return o.delete(t),o.delete(e),A}var ow=mM;var hM=1,sw="[object Arguments]",aw="[object Array]",gf="[object Object]",yM=Object.prototype,lw=yM.hasOwnProperty;function gM(t,e,r,n,i,o){var s=z(t),a=z(e),l=s?aw:yn(t),u=a?aw:yn(e);l=l==sw?gf:l,u=u==sw?gf:u;var c=l==gf,f=u==gf,m=l==u;if(m&&li(t)){if(!li(e))return!1;s=!0,c=!1}if(m&&!c)return o||(o=new Ki),s||Os(t)?yf(t,e,r,n,i,o):iw(t,e,l,r,n,i,o);if(!(r&hM)){var T=c&&lw.call(t,"__wrapped__"),w=f&&lw.call(e,"__wrapped__");if(T||w){var A=T?t.value():t,_=w?e.value():e;return o||(o=new Ki),i(A,_,r,n,o)}}return m?(o||(o=new Ki),ow(t,e,r,n,i,o)):!1}var uw=gM;function cw(t,e,r,n,i){return t===e?!0:t==null||e==null||!yt(t)&&!yt(e)?t!==t&&e!==e:uw(t,e,r,n,cw,i)}var Tf=cw;var TM=1,vM=2;function RM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var l=a[0],u=t[l],c=a[1];if(s&&a[2]){if(u===void 0&&!(l in t))return!1}else{var f=new Ki;if(n)var m=n(u,c,l,t,e,f);if(!(m===void 0?Tf(c,u,TM|vM,n,f):m))return!1}}return!0}var fw=RM;function xM(t){return t===t&&!st(t)}var vf=xM;function SM(t){for(var e=He(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,vf(i)]}return e}var dw=SM;function wM(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var Rf=wM;function bM(t){var e=dw(t);return e.length==1&&e[0][2]?Rf(e[0][0],e[0][1]):function(r){return r===t||fw(r,t,e)}}var pw=bM;function AM(t,e){return t!=null&&e in Object(t)}var mw=AM;function kM(t,e,r){e=Hi(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=Ln(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Ds(i)&&Di(s,i)&&(z(t)||Mi(t)))}var xf=kM;function CM(t,e){return t!=null&&xf(t,e,mw)}var hw=CM;var EM=1,$M=2;function _M(t,e){return Ls(t)&&vf(e)?Rf(Ln(t),e):function(r){var n=cS(r,t);return n===void 0&&n===e?hw(r,t):Tf(e,n,EM|$M)}}var yw=_M;function NM(t){return function(e){return e?.[t]}}var gw=NM;function PM(t){return function(e){return qs(e,t)}}var Tw=PM;function IM(t){return Ls(t)?gw(Ln(t)):Tw(t)}var vw=IM;function DM(t){return typeof t=="function"?t:t==null?wr:typeof t=="object"?z(t)?yw(t[0],t[1]):pw(t):vw(t)}var pt=DM;function OM(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var Rw=OM;function LM(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var l=s[t?a:++i];if(r(o[l],l,o)===!1)break}return e}}var xw=LM;var MM=xw(),Sw=MM;function FM(t,e){return t&&Sw(t,e,He)}var ww=FM;function UM(t,e){return function(r,n){if(r==null)return r;if(!$t(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var bw=UM;var qM=bw(ww),Ar=qM;function jM(t,e,r,n){return Ar(t,function(i,o,s){e(n,i,r(i),s)}),n}var Aw=jM;function GM(t,e){return function(r,n){var i=z(r)?Rw:Aw,o=e?e():{};return i(r,t,pt(n,2),o)}}var kw=GM;var Cw=Object.prototype,HM=Cw.hasOwnProperty,KM=Is(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Li(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Fi(o),a=-1,l=s.length;++a<l;){var u=s[a],c=t[u];(c===void 0||Pn(c,Cw[u])&&!HM.call(t,u))&&(t[u]=o[u])}return t}),Js=KM;function WM(t){return yt(t)&&$t(t)}var Nh=WM;function BM(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Sf=BM;var zM=200;function VM(t,e,r,n){var i=-1,o=ef,s=!0,a=t.length,l=[],u=e.length;if(!a)return l;r&&(e=_n(e,On(r))),n?(o=Sf,s=!1):e.length>=zM&&(o=Xs,s=!1,e=new Vs(e));e:for(;++i<a;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,s&&f===f){for(var m=u;m--;)if(e[m]===f)continue e;l.push(c)}else o(e,f,n)||l.push(c)}return l}var Ew=VM;var XM=Is(function(t,e){return Nh(t)?Ew(t,Gs(e,1,Nh,!0)):[]}),Bi=XM;function YM(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var Fn=YM;function JM(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Nn(e),sf(t,e<0?0:e,n)):[]}var Tt=JM;function QM(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Nn(e),e=n-e,sf(t,0,e<0?0:e)):[]}var ci=QM;function ZM(t){return typeof t=="function"?t:wr}var $w=ZM;function eF(t,e){var r=z(t)?Qc:Ar;return r(t,$w(e))}var j=eF;function tF(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var _w=tF;function rF(t,e){var r=!0;return Ar(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var Nw=rF;function nF(t,e,r){var n=z(t)?_w:Nw;return r&&Li(t,e,r)&&(e=void 0),n(t,pt(e,3))}var ar=nF;function iF(t,e){var r=[];return Ar(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var wf=iF;function oF(t,e){var r=z(t)?Ks:wf;return r(t,pt(e,3))}var qt=oF;function sF(t){return function(e,r,n){var i=Object(e);if(!$t(e)){var o=pt(r,3);e=He(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var Pw=sF;var aF=Math.max;function lF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Nn(r);return i<0&&(i=aF(n+i,0)),Zc(t,pt(e,3),i)}var Iw=lF;var uF=Pw(Iw),Un=uF;function cF(t){return t&&t.length?t[0]:void 0}var jt=cF;function fF(t,e){var r=-1,n=$t(t)?Array(t.length):[];return Ar(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var Dw=fF;function dF(t,e){var r=z(t)?_n:Dw;return r(t,pt(e,3))}var L=dF;function pF(t,e){return Gs(L(t,e),1)}var Qt=pF;var mF=Object.prototype,hF=mF.hasOwnProperty,yF=kw(function(t,e,r){hF.call(t,r)?t[r].push(e):Ps(t,r,[e])}),Ph=yF;var gF=Object.prototype,TF=gF.hasOwnProperty;function vF(t,e){return t!=null&&TF.call(t,e)}var Ow=vF;function RF(t,e){return t!=null&&xf(t,e,Ow)}var W=RF;var xF="[object String]";function SF(t){return typeof t=="string"||!z(t)&&yt(t)&&mr(t)==xF}var Ot=SF;function wF(t,e){return _n(e,function(r){return t[r]})}var Lw=wF;function bF(t){return t==null?[]:Lw(t,He(t))}var Ie=bF;var AF=Math.max;function kF(t,e,r,n){t=$t(t)?t:Ie(t),r=r&&!n?Nn(r):0;var i=t.length;return r<0&&(r=AF(i+r,0)),Ot(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Ns(t,e,r)>-1}var et=kF;var CF=Math.max;function EF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Nn(r);return i<0&&(i=CF(n+i,0)),Ns(t,e,i)}var bf=EF;var $F="[object Map]",_F="[object Set]",NF=Object.prototype,PF=NF.hasOwnProperty;function IF(t){if(t==null)return!0;if($t(t)&&(z(t)||typeof t=="string"||typeof t.splice=="function"||li(t)||Os(t)||Mi(t)))return!t.length;var e=yn(t);if(e==$F||e==_F)return!t.size;if(Dn(t))return!nf(t).length;for(var r in t)if(PF.call(t,r))return!1;return!0}var se=IF;var DF="[object RegExp]";function OF(t){return yt(t)&&mr(t)==DF}var Mw=OF;var Fw=Jr&&Jr.isRegExp,LF=Fw?On(Fw):Mw,Qr=LF;function MF(t){return t===void 0}var lr=MF;function FF(t,e){return t<e}var Uw=FF;function UF(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!$n(s):r(s,a)))var a=s,l=o}return l}var qw=UF;function qF(t){return t&&t.length?qw(t,wr,Uw):void 0}var jw=qF;var jF="Expected a function";function GF(t){if(typeof t!="function")throw new TypeError(jF);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var Gw=GF;function HF(t,e,r,n){if(!st(t))return t;e=Hi(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var l=Ln(e[i]),u=r;if(l==="__proto__"||l==="constructor"||l==="prototype")return t;if(i!=s){var c=a[l];u=n?n(c,l,a):void 0,u===void 0&&(u=st(c)?c:Di(e[i+1])?[]:{})}Oi(a,l,u),a=a[l]}return t}var Hw=HF;function KF(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=qs(t,s);r(a,s)&&Hw(o,Hi(s,t),a)}return o}var Kw=KF;function WF(t,e){if(t==null)return{};var r=_n(cf(t),function(n){return[n]});return e=pt(e),Kw(t,r,function(n,i){return e(n,i[0])})}var kr=WF;function BF(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var Ww=BF;function zF(t,e,r){var n=z(t)?mS:Ww,i=arguments.length<3;return n(t,pt(e,4),r,i,Ar)}var lt=zF;function VF(t,e){var r=z(t)?Ks:wf;return r(t,Gw(pt(e,3)))}var zi=VF;function XF(t,e){var r;return Ar(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var Bw=XF;function YF(t,e,r){var n=z(t)?hf:Bw;return r&&Li(t,e,r)&&(e=void 0),n(t,pt(e,3))}var gl=YF;var JF=1/0,QF=Wi&&1/Ys(new Wi([,-0]))[1]==JF?function(t){return new Wi(t)}:at,zw=QF;var ZF=200;function e1(t,e,r){var n=-1,i=ef,o=t.length,s=!0,a=[],l=a;if(r)s=!1,i=Sf;else if(o>=ZF){var u=e?null:zw(t);if(u)return Ys(u);s=!1,i=Xs,l=new Vs}else l=e?[]:a;e:for(;++n<o;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,s&&f===f){for(var m=l.length;m--;)if(l[m]===f)continue e;e&&l.push(f),a.push(c)}else i(l,f,r)||(l!==a&&l.push(f),a.push(c))}return a}var Af=e1;function t1(t){return t&&t.length?Af(t):[]}var Qs=t1;function r1(t,e){return t&&t.length?Af(t,pt(e,2)):[]}var Vw=r1;function Zs(t){console&&console.error&&console.error(`Error: ${t}`)}function Tl(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function vl(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function Rl(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function n1(t){return i1(t)?t.LABEL:t.name}function i1(t){return Ot(t.LABEL)&&t.LABEL!==""}var Ur=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),j(this.definition,r=>{r.accept(e)})}},ke=class extends Ur{constructor(e){super([]),this.idx=1,Jt(this,kr(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},yr=class extends Ur{constructor(e){super(e.definition),this.orgText="",Jt(this,kr(e,r=>r!==void 0))}},Be=class extends Ur{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Jt(this,kr(e,r=>r!==void 0))}},Ce=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,kr(e,r=>r!==void 0))}},ze=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,kr(e,r=>r!==void 0))}},Ve=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,kr(e,r=>r!==void 0))}},pe=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,kr(e,r=>r!==void 0))}},Me=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,kr(e,r=>r!==void 0))}},Fe=class extends Ur{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Jt(this,kr(e,r=>r!==void 0))}},ae=class{constructor(e){this.idx=1,Jt(this,kr(e,r=>r!==void 0))}accept(e){e.visit(this)}};function kf(t){return L(t,ea)}function ea(t){function e(r){return L(r,ea)}if(t instanceof ke){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Ot(t.label)&&(r.label=t.label),r}else{if(t instanceof Be)return{type:"Alternative",definition:e(t.definition)};if(t instanceof Ce)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof ze)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:ea(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Me)return{type:"RepetitionWithSeparator",idx:t.idx,separator:ea(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof pe)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Fe)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ae){let r={type:"Terminal",name:t.terminalType.name,label:n1(t.terminalType),idx:t.idx};Ot(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=Qr(n)?n.source:n),r}else{if(t instanceof yr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var gr=class{visit(e){let r=e;switch(r.constructor){case ke:return this.visitNonTerminal(r);case Be:return this.visitAlternative(r);case Ce:return this.visitOption(r);case ze:return this.visitRepetitionMandatory(r);case Ve:return this.visitRepetitionMandatoryWithSeparator(r);case Me:return this.visitRepetitionWithSeparator(r);case pe:return this.visitRepetition(r);case Fe:return this.visitAlternation(r);case ae:return this.visitTerminal(r);case yr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Ih(t){return t instanceof Be||t instanceof Ce||t instanceof pe||t instanceof ze||t instanceof Ve||t instanceof Me||t instanceof ae||t instanceof yr}function ko(t,e=[]){return t instanceof Ce||t instanceof pe||t instanceof Me?!0:t instanceof Fe?gl(t.definition,n=>ko(n,e)):t instanceof ke&&et(e,t)?!1:t instanceof Ur?(t instanceof ke&&e.push(t),ar(t.definition,n=>ko(n,e))):!1}function Dh(t){return t instanceof Fe}function Cr(t){if(t instanceof ke)return"SUBRULE";if(t instanceof Ce)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var fi=class{walk(e,r=[]){j(e.definition,(n,i)=>{let o=Tt(e.definition,i+1);if(n instanceof ke)this.walkProdRef(n,o,r);else if(n instanceof ae)this.walkTerminal(n,o,r);else if(n instanceof Be)this.walkFlat(n,o,r);else if(n instanceof Ce)this.walkOption(n,o,r);else if(n instanceof ze)this.walkAtLeastOne(n,o,r);else if(n instanceof Ve)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Me)this.walkManySep(n,o,r);else if(n instanceof pe)this.walkMany(n,o,r);else if(n instanceof Fe)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new Ce({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=Xw(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new Ce({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=Xw(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);j(e.definition,o=>{let s=new Be({definition:[o]});this.walk(s,i)})}};function Xw(t,e,r){return[new Ce({definition:[new ae({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function Co(t){if(t instanceof ke)return Co(t.referencedRule);if(t instanceof ae)return a1(t);if(Ih(t))return o1(t);if(Dh(t))return s1(t);throw Error("non exhaustive match")}function o1(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=ko(o),e=e.concat(Co(o)),n=n+1,i=r.length>n;return Qs(e)}function s1(t){let e=L(t.definition,r=>Co(r));return Qs(gt(e))}function a1(t){return[t.terminalType]}var Cf="_~IN~_";var Oh=class extends fi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=l1(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new Be({definition:o}),a=Co(s);this.follows[i]=a}};function Yw(t){let e={};return j(t,r=>{let n=new Oh(r).startWalking();Jt(e,n)}),e}function l1(t,e){return t.name+e+Cf}var Ef={},u1=new To;function ta(t){let e=t.toString();if(Ef.hasOwnProperty(e))return Ef[e];{let r=u1.pattern(e);return Ef[e]=r,r}}function Jw(){Ef={}}var Zw="Complement Sets are not supported for first char optimization",xl=`Unable to use "first char" lexer optimizations:
`;function eb(t,e=!1){try{let r=ta(t);return Lh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===Zw)e&&Tl(`${xl}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),Zs(`${xl}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Lh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Lh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":$f(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(Zw);j(s.value,l=>{if(typeof l=="number")$f(l,e,r);else{let u=l;if(r===!0)for(let c=u.from;c<=u.to;c++)$f(c,e,r);else{for(let c=u.from;c<=u.to&&c<ra;c++)$f(c,e,r);if(u.to>=ra){let c=u.from>=ra?u.from:ra,f=u.to,m=qn(c),T=qn(f);for(let w=m;w<=T;w++)e[w]=w}}}});break;case"Group":Lh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&Mh(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Ie(e)}function $f(t,e,r){let n=qn(t);e[n]=n,r===!0&&c1(t,e)}function c1(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=qn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=qn(i.charCodeAt(0));e[o]=o}}}function Qw(t,e){return Un(t.value,r=>{if(typeof r=="number")return et(e,r);{let n=r;return Un(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function Mh(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?z(t.value)?ar(t.value,Mh):Mh(t.value):!1}var Fh=class extends Cn{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){et(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?Qw(e,this.targetCharCodes)===void 0&&(this.found=!0):Qw(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function _f(t,e){if(e instanceof RegExp){let r=ta(e),n=new Fh(t);return n.visit(r),n.found}else return Un(e,r=>et(t,r.charCodeAt(0)))!==void 0}var Eo="PATTERN",na="defaultMode",Nf="modes",qh=typeof new RegExp("(?:)").sticky=="boolean";function nb(t,e){e=Js(e,{useSticky:qh,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,g)=>g()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{E1()});let n;r("Reject Lexer.NA",()=>{n=zi(t,v=>v[Eo]===mt.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,v=>{let g=v[Eo];if(Qr(g)){let $=g.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!g.ignoreCase?$:$.length===2&&$[0]==="\\"&&!et(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?rb(g):tb(g)}else{if(hr(g))return i=!0,{exec:g};if(typeof g=="object")return i=!0,g;if(typeof g=="string"){if(g.length===1)return g;{let $=g.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp($);return e.useSticky?rb(D):tb(D)}}else throw Error("non exhaustive match")}})});let s,a,l,u,c;r("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let g=v.GROUP;if(g!==mt.SKIPPED){if(Ot(g))return g;if(lr(g))return!1;throw Error("non exhaustive match")}}),l=L(n,v=>{let g=v.LONGER_ALT;if(g)return z(g)?L(g,D=>bf(n,D)):[bf(n,g)]}),u=L(n,v=>v.PUSH_MODE),c=L(n,v=>W(v,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let v=fb(e.lineTerminatorCharacters);f=L(n,g=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,g=>W(g,"LINE_BREAKS")?!!g.LINE_BREAKS:cb(g,v)===!1&&_f(v,g.PATTERN)))});let m,T,w,A;r("Misc Mapping #2",()=>{m=L(n,lb),T=L(o,k1),w=lt(n,(v,g)=>{let $=g.GROUP;return Ot($)&&$!==mt.SKIPPED&&(v[$]=[]),v},{}),A=L(o,(v,g)=>({pattern:o[g],longerAlt:l[g],canLineTerminator:f[g],isCustom:m[g],short:T[g],group:a[g],push:u[g],pop:c[g],tokenTypeIdx:s[g],tokenType:n[g]}))});let _=!0,k=[];return e.safeMode||r("First Char Optimization",()=>{k=lt(n,(v,g,$)=>{if(typeof g.PATTERN=="string"){let D=g.PATTERN.charCodeAt(0),X=qn(D);Uh(v,X,A[$])}else if(z(g.START_CHARS_HINT)){let D;j(g.START_CHARS_HINT,X=>{let ge=typeof X=="string"?X.charCodeAt(0):X,Ee=qn(ge);D!==Ee&&(D=Ee,Uh(v,Ee,A[$]))})}else if(Qr(g.PATTERN))if(g.PATTERN.unicode)_=!1,e.ensureOptimizations&&Zs(`${xl}	Unable to analyze < ${g.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=eb(g.PATTERN,e.ensureOptimizations);se(D)&&(_=!1),j(D,X=>{Uh(v,X,A[$])})}else e.ensureOptimizations&&Zs(`${xl}	TokenType: <${g.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),_=!1;return v},[])}),{emptyGroups:w,patternIdxToConfig:A,charCodeToPatternIdxToConfig:k,hasCustom:i,canBeOptimized:_}}function ib(t,e){let r=[],n=d1(t);r=r.concat(n.errors);let i=p1(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(f1(o)),r=r.concat(x1(o)),r=r.concat(S1(o,e)),r=r.concat(w1(o)),r}function f1(t){let e=[],r=qt(t,n=>Qr(n[Eo]));return e=e.concat(h1(r)),e=e.concat(T1(r)),e=e.concat(v1(r)),e=e.concat(R1(r)),e=e.concat(y1(r)),e}function d1(t){let e=qt(t,i=>!W(i,Eo)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:tt.MISSING_PATTERN,tokenTypes:[i]})),n=Bi(t,e);return{errors:r,valid:n}}function p1(t){let e=qt(t,i=>{let o=i[Eo];return!Qr(o)&&!hr(o)&&!W(o,"exec")&&!Ot(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:tt.INVALID_PATTERN,tokenTypes:[i]})),n=Bi(t,e);return{errors:r,valid:n}}var m1=/[^\\][$]/;function h1(t){class e extends Cn{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=ta(o),a=new e;return a.visit(s),a.found}catch{return m1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function y1(t){let e=qt(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:tt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var g1=/[^\\[][\^]|^\^/;function T1(t){class e extends Cn{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=ta(o),a=new e;return a.visit(s),a.found}catch{return g1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function v1(t){let e=qt(t,n=>{let i=n[Eo];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:tt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function R1(t){let e=[],r=L(t,o=>lt(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!et(e,a)&&a.PATTERN!==mt.NA&&(e.push(a),s.push(a)),s),[]));r=Mn(r);let n=qt(r,o=>o.length>1);return L(n,o=>{let s=L(o,l=>l.name);return{message:`The same RegExp pattern ->${jt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:tt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function x1(t){let e=qt(t,n=>{if(!W(n,"GROUP"))return!1;let i=n.GROUP;return i!==mt.SKIPPED&&i!==mt.NA&&!Ot(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:tt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function S1(t,e){let r=qt(t,i=>i.PUSH_MODE!==void 0&&!et(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:tt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function w1(t){let e=[],r=lt(t,(n,i,o)=>{let s=i.PATTERN;return s===mt.NA||(Ot(s)?n.push({str:s,idx:o,tokenType:i}):Qr(s)&&A1(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return j(t,(n,i)=>{j(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&b1(o,n.PATTERN)){let l=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:tt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function b1(t,e){if(Qr(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(hr(e))return e(t,0,[],{});if(W(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function A1(t){return Un([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function tb(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function rb(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function ob(t,e,r){let n=[];return W(t,na)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+na+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),W(t,Nf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Nf+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),W(t,Nf)&&W(t,na)&&!W(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${na}: <${t.defaultMode}>which does not exist
`,type:tt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),W(t,Nf)&&j(t.modes,(i,o)=>{j(i,(s,a)=>{if(lr(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:tt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(W(s,"LONGER_ALT")){let l=z(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];j(l,u=>{!lr(u)&&!et(i,u)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${s.name}> outside of mode <${o}>
`,type:tt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function sb(t,e,r){let n=[],i=!1,o=Mn(gt(Ie(t.modes))),s=zi(o,l=>l[Eo]===mt.NA),a=fb(r);return e&&j(s,l=>{let u=cb(l,a);if(u!==!1){let f={message:C1(l,u),type:u.issue,tokenType:l};n.push(f)}else W(l,"LINE_BREAKS")?l.LINE_BREAKS===!0&&(i=!0):_f(a,l.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:tt.NO_LINE_BREAKS_FLAGS}),n}function ab(t){let e={},r=He(t);return j(r,n=>{let i=t[n];if(z(i))e[n]=[];else throw Error("non exhaustive match")}),e}function lb(t){let e=t.PATTERN;if(Qr(e))return!1;if(hr(e))return!0;if(W(e,"exec"))return!0;if(Ot(e))return!1;throw Error("non exhaustive match")}function k1(t){return Ot(t)&&t.length===1?t.charCodeAt(0):!1}var ub={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function cb(t,e){if(W(t,"LINE_BREAKS"))return!1;if(Qr(t.PATTERN)){try{_f(e,t.PATTERN)}catch(r){return{issue:tt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Ot(t.PATTERN))return!1;if(lb(t))return{issue:tt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function C1(t,e){if(e.issue===tt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===tt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function fb(t){return L(t,r=>Ot(r)?r.charCodeAt(0):r)}function Uh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var ra=256,Pf=[];function qn(t){return t<ra?t:Pf[t]}function E1(){if(se(Pf)){Pf=new Array(65536);for(let t=0;t<65536;t++)Pf[t]=t>255?255+~~(t/255):t}}function di(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function ia(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var db=1,mb={};function pi(t){let e=$1(t);_1(e),P1(e),N1(e),j(e,r=>{r.isParent=r.categoryMatches.length>0})}function $1(t){let e=We(t),r=t,n=!0;for(;n;){r=Mn(gt(L(r,o=>o.CATEGORIES)));let i=Bi(r,e);e=e.concat(i),se(i)?n=!1:r=i}return e}function _1(t){j(t,e=>{jh(e)||(mb[db]=e,e.tokenTypeIdx=db++),pb(e)&&!z(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),pb(e)||(e.CATEGORIES=[]),I1(e)||(e.categoryMatches=[]),D1(e)||(e.categoryMatchesMap={})})}function N1(t){j(t,e=>{e.categoryMatches=[],j(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(mb[n].tokenTypeIdx)})})}function P1(t){j(t,e=>{hb([],e)})}function hb(t,e){j(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),j(e.CATEGORIES,r=>{let n=t.concat(e);et(n,r)||hb(n,r)})}function jh(t){return W(t,"tokenTypeIdx")}function pb(t){return W(t,"CATEGORIES")}function I1(t){return W(t,"categoryMatches")}function D1(t){return W(t,"categoryMatchesMap")}function yb(t){return W(t,"tokenTypeIdx")}var Gh={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var tt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(tt||(tt={}));var Sl={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Gh,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Sl);var mt=class{constructor(e,r=Sl){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:l}=vl(o),u=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&u(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,l}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Jt({},Sl,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===Sl.lineTerminatorsPattern)this.config.lineTerminatorsPattern=ub;else if(this.config.lineTerminatorCharacters===Sl.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),z(e)?i={modes:{defaultMode:We(e)},defaultMode:na}:(o=!1,i=We(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(ob(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(sb(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},j(i.modes,(a,l)=>{i.modes[l]=zi(a,u=>lr(u))});let s=He(i.modes);if(j(i.modes,(a,l)=>{this.TRACE_INIT(`Mode: <${l}> processing`,()=>{if(this.modes.push(l),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(ib(a,s))}),se(this.lexerDefinitionErrors)){pi(a);let u;this.TRACE_INIT("analyzeTokenTypes",()=>{u=nb(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[l]=u.patternIdxToConfig,this.charCodeToPatternIdxToConfig[l]=u.charCodeToPatternIdxToConfig,this.emptyGroups=Jt({},this.emptyGroups,u.emptyGroups),this.hasCustom=u.hasCustom||this.hasCustom,this.canModeBeOptimized[l]=u.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let l=L(this.lexerDefinitionErrors,u=>u.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}j(this.lexerDefinitionWarning,a=>{Tl(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(qh?(this.chopInput=wr,this.match=this.matchWithTest):(this.updateLastIndex=at,this.match=this.matchWithExec),o&&(this.handleModes=at),this.trackStartLines===!1&&(this.computeNewColumn=wr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=at),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=lt(this.canModeBeOptimized,(l,u,c)=>(u===!1&&l.push(c),l),[]);if(r.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{Jw()}),this.TRACE_INIT("toFastProperties",()=>{Rl(this)})})}tokenize(e,r=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,l,u,c,f,m,T,w,A,_,k,v,g=e,$=g.length,D=0,X=0,ge=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ge),Ht=[],vt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,b=ab(this.emptyGroups),q=this.trackStartLines,G=this.config.lineTerminatorsPattern,le=0,ee=[],Q=[],Rt=[],ut=[];Object.freeze(ut);let me;function Er(){return ee}function jn(xt){let Zt=qn(xt),vn=Q[Zt];return vn===void 0?ut:vn}let Ta=xt=>{if(Rt.length===1&&xt.tokenType.PUSH_MODE===void 0){let Zt=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(xt);Ht.push({offset:xt.startOffset,line:xt.startLine,column:xt.startColumn,length:xt.image.length,message:Zt})}else{Rt.pop();let Zt=Fn(Rt);ee=this.patternIdxToConfig[Zt],Q=this.charCodeToPatternIdxToConfig[Zt],le=ee.length;let vn=this.canModeBeOptimized[Zt]&&this.config.safeMode===!1;Q&&vn?me=jn:me=Er}};function Ji(xt){Rt.push(xt),Q=this.charCodeToPatternIdxToConfig[xt],ee=this.patternIdxToConfig[xt],le=ee.length,le=ee.length;let Zt=this.canModeBeOptimized[xt]&&this.config.safeMode===!1;Q&&Zt?me=jn:me=Er}Ji.call(this,r);let ur,Oo=this.config.recoveryEnabled;for(;D<$;){l=null;let xt=g.charCodeAt(D),Zt=me(xt),vn=Zt.length;for(n=0;n<vn;n++){ur=Zt[n];let Kt=ur.pattern;u=null;let ct=ur.short;if(ct!==!1?xt===ct&&(l=Kt):ur.isCustom===!0?(v=Kt.exec(g,D,Ee,b),v!==null?(l=v[0],v.payload!==void 0&&(u=v.payload)):l=null):(this.updateLastIndex(Kt,D),l=this.match(Kt,e,D)),l!==null){if(a=ur.longerAlt,a!==void 0){let qr=a.length;for(o=0;o<qr;o++){let $r=ee[a[o]],vr=$r.pattern;if(c=null,$r.isCustom===!0?(v=vr.exec(g,D,Ee,b),v!==null?(s=v[0],v.payload!==void 0&&(c=v.payload)):s=null):(this.updateLastIndex(vr,D),s=this.match(vr,e,D)),s&&s.length>l.length){l=s,u=c,ur=$r;break}}}break}}if(l!==null){if(f=l.length,m=ur.group,m!==void 0&&(T=ur.tokenTypeIdx,w=this.createTokenInstance(l,D,T,ur.tokenType,vt,M,f),this.handlePayload(w,u),m===!1?X=this.addToken(Ee,X,w):b[m].push(w)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),q===!0&&ur.canLineTerminator===!0){let Kt=0,ct,qr;G.lastIndex=0;do ct=G.test(l),ct===!0&&(qr=G.lastIndex-1,Kt++);while(ct===!0);Kt!==0&&(vt=vt+Kt,M=f-qr,this.updateTokenEndLineColumnLocation(w,m,qr,Kt,vt,M,f))}this.handleModes(ur,Ta,Ji,w)}else{let Kt=D,ct=vt,qr=M,$r=Oo===!1;for(;$r===!1&&D<$;)for(e=this.chopInput(e,1),D++,i=0;i<le;i++){let vr=ee[i],Qi=vr.pattern,vi=vr.short;if(vi!==!1?g.charCodeAt(D)===vi&&($r=!0):vr.isCustom===!0?$r=Qi.exec(g,D,Ee,b)!==null:(this.updateLastIndex(Qi,D),$r=Qi.exec(e)!==null),$r===!0)break}if(A=D-Kt,M=this.computeNewColumn(M,A),k=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(g,Kt,A,ct,qr),Ht.push({offset:Kt,line:ct,column:qr,length:A,message:k}),Oo===!1)break}}return this.hasCustom||(Ee.length=X),{tokens:Ee,groups:b,errors:Ht}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let l,u;r!==void 0&&(l=n===a-1,u=l?-1:0,i===1&&l===!0||(e.endLine=o+u,e.endColumn=s-1+-u))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};mt.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";mt.NA=/NOT_APPLICABLE/;function mi(t){return Hh(t)?t.LABEL:t.name}function Hh(t){return Ot(t.LABEL)&&t.LABEL!==""}var O1="parent",gb="categories",Tb="label",vb="group",Rb="push_mode",xb="pop_mode",Sb="longer_alt",wb="line_breaks",bb="start_chars_hint";function If(t){return L1(t)}function L1(t){let e=t.pattern,r={};if(r.name=t.name,lr(e)||(r.PATTERN=e),W(t,O1))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return W(t,gb)&&(r.CATEGORIES=t[gb]),pi([r]),W(t,Tb)&&(r.LABEL=t[Tb]),W(t,vb)&&(r.GROUP=t[vb]),W(t,xb)&&(r.POP_MODE=t[xb]),W(t,Rb)&&(r.PUSH_MODE=t[Rb]),W(t,Sb)&&(r.LONGER_ALT=t[Sb]),W(t,wb)&&(r.LINE_BREAKS=t[wb]),W(t,bb)&&(r.START_CHARS_HINT=t[bb]),r}var gn=If({name:"EOF",pattern:mt.NA});pi([gn]);function $o(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function wl(t,e){return di(t,e)}var hi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${Hh(t)?`--> ${mi(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+jt(e).image+"'";if(n)return o+n+a;{let l=lt(t,(m,T)=>m.concat(T),[]),u=L(l,m=>`[${L(m,T=>mi(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(u,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+jt(e).image+"'";if(r)return i+r+s;{let l=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,u=>`[${L(u,c=>mi(c)).join(",")}]`).join(" ,")}>`;return i+l+s}}};Object.freeze(hi);var Ab={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},Tn={buildDuplicateFoundError(t,e){function r(c){return c instanceof ae?c.terminalType.name:c instanceof ke?c.nonTerminalName:""}let n=t.name,i=jt(e),o=i.idx,s=Cr(i),a=r(i),l=o>0,u=`->${s}${l?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return u=u.replace(/[ \t]+/g," "),u=u.replace(/\s\s+/g,`
`),u},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){let e=L(t.prefixPath,i=>mi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){let e=L(t.prefixPath,i=>mi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(t){let e=Cr(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=L(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof yr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function kb(t,e){let r=new Kh(t,e);return r.resolveRefs(),r.errors}var Kh=class extends gr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){j(Ie(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Lt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var Wh=class extends fi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=We(this.path.ruleStack).reverse(),this.occurrenceStack=We(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Df=class extends Wh{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new Be({definition:i});this.possibleTokTypes=Co(o),this.found=!0}}},oa=class extends fi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Of=class extends oa{walkMany(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},bl=class extends oa{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},Lf=class extends oa{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},Al=class extends oa{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function Mf(t,e,r=[]){r=We(r);let n=[],i=0;function o(a){return a.concat(Tt(t,i+1))}function s(a){let l=Mf(o(a),e,r);return n.concat(l)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof Be)return s(a.definition);if(a instanceof ke)return s(a.definition);if(a instanceof Ce)n=s(a.definition);else if(a instanceof ze){let l=a.definition.concat([new pe({definition:a.definition})]);return s(l)}else if(a instanceof Ve){let l=[new Be({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(l)}else if(a instanceof Me){let l=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(l)}else if(a instanceof pe){let l=a.definition.concat([new pe({definition:a.definition})]);n=s(l)}else{if(a instanceof Fe)return j(a.definition,l=>{se(l.definition)===!1&&(n=s(l.definition))}),n;if(a instanceof ae)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:Tt(t,i)}),n}function Ff(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,l=e.length,u=l-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&Fn(f).idx<=u&&f.pop();continue}let T=m.def,w=m.idx,A=m.ruleStack,_=m.occurrenceStack;if(se(T))continue;let k=T[0];if(k===i){let v={idx:w,def:Tt(T),ruleStack:ci(A),occurrenceStack:ci(_)};f.push(v)}else if(k instanceof ae)if(w<l-1){let v=w+1,g=e[v];if(r(g,k.terminalType)){let $={idx:v,def:Tt(T),ruleStack:A,occurrenceStack:_};f.push($)}}else if(w===l-1)c.push({nextTokenType:k.terminalType,nextTokenOccurrence:k.idx,ruleStack:A,occurrenceStack:_}),a=!0;else throw Error("non exhaustive match");else if(k instanceof ke){let v=We(A);v.push(k.nonTerminalName);let g=We(_);g.push(k.idx);let $={idx:w,def:k.definition.concat(o,Tt(T)),ruleStack:v,occurrenceStack:g};f.push($)}else if(k instanceof Ce){let v={idx:w,def:Tt(T),ruleStack:A,occurrenceStack:_};f.push(v),f.push(s);let g={idx:w,def:k.definition.concat(Tt(T)),ruleStack:A,occurrenceStack:_};f.push(g)}else if(k instanceof ze){let v=new pe({definition:k.definition,idx:k.idx}),g=k.definition.concat([v],Tt(T)),$={idx:w,def:g,ruleStack:A,occurrenceStack:_};f.push($)}else if(k instanceof Ve){let v=new ae({terminalType:k.separator}),g=new pe({definition:[v].concat(k.definition),idx:k.idx}),$=k.definition.concat([g],Tt(T)),D={idx:w,def:$,ruleStack:A,occurrenceStack:_};f.push(D)}else if(k instanceof Me){let v={idx:w,def:Tt(T),ruleStack:A,occurrenceStack:_};f.push(v),f.push(s);let g=new ae({terminalType:k.separator}),$=new pe({definition:[g].concat(k.definition),idx:k.idx}),D=k.definition.concat([$],Tt(T)),X={idx:w,def:D,ruleStack:A,occurrenceStack:_};f.push(X)}else if(k instanceof pe){let v={idx:w,def:Tt(T),ruleStack:A,occurrenceStack:_};f.push(v),f.push(s);let g=new pe({definition:k.definition,idx:k.idx}),$=k.definition.concat([g],Tt(T)),D={idx:w,def:$,ruleStack:A,occurrenceStack:_};f.push(D)}else if(k instanceof Fe)for(let v=k.definition.length-1;v>=0;v--){let g=k.definition[v],$={idx:w,def:g.definition.concat(Tt(T)),ruleStack:A,occurrenceStack:_};f.push($),f.push(s)}else if(k instanceof Be)f.push({idx:w,def:k.definition.concat(Tt(T)),ruleStack:A,occurrenceStack:_});else if(k instanceof yr)f.push(M1(k,w,A,_));else throw Error("non exhaustive match")}return c}function M1(t,e,r,n){let i=We(r);i.push(t.name);let o=We(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var rt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(rt||(rt={}));function kl(t){if(t instanceof Ce||t==="Option")return rt.OPTION;if(t instanceof pe||t==="Repetition")return rt.REPETITION;if(t instanceof ze||t==="RepetitionMandatory")return rt.REPETITION_MANDATORY;if(t instanceof Ve||t==="RepetitionMandatoryWithSeparator")return rt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Me||t==="RepetitionWithSeparator")return rt.REPETITION_WITH_SEPARATOR;if(t instanceof Fe||t==="Alternation")return rt.ALTERNATION;throw Error("non exhaustive match")}function qf(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=kl(n);return o===rt.ALTERNATION?sa(e,r,i):aa(e,r,o,i)}function Eb(t,e,r,n,i,o){let s=sa(t,e,r),a=Db(s)?ia:di;return o(s,n,a,i)}function $b(t,e,r,n,i,o){let s=aa(t,e,i,r),a=Db(s)?ia:di;return o(s[0],a,n)}function _b(t,e,r,n){let i=t.length,o=ar(t,s=>ar(s,a=>a.length===1));if(e)return function(s){let a=L(s,l=>l.GATE);for(let l=0;l<i;l++){let u=t[l],c=u.length,f=a[l];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<c;m++){let T=u[m],w=T.length;for(let A=0;A<w;A++){let _=this.LA(A+1);if(r(_,T[A])===!1)continue e}return l}}};if(o&&!n){let s=L(t,l=>gt(l)),a=lt(s,(l,u,c)=>(j(u,f=>{W(l,f.tokenTypeIdx)||(l[f.tokenTypeIdx]=c),j(f.categoryMatches,m=>{W(l,m)||(l[m]=c)})}),l),{});return function(){let l=this.LA(1);return a[l.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],l=a.length;e:for(let u=0;u<l;u++){let c=a[u],f=c.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(r(T,c[m])===!1)continue e}return s}}}}function Nb(t,e,r){let n=ar(t,o=>o.length===1),i=t.length;if(n&&!r){let o=gt(t);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=lt(o,(a,l,u)=>(a[l.tokenTypeIdx]=!0,j(l.categoryMatches,c=>{a[c]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let l=0;l<a;l++){let u=this.LA(l+1);if(e(u,s[l])===!1)continue e}return!0}return!1}}var zh=class extends fi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,rt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,rt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},Uf=class extends gr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,rt.OPTION)}visitRepetition(e){this.checkIsTarget(e,rt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,rt.ALTERNATION)}};function Cb(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function Bh(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let l="_"+n.categoryMatches[a];i.push(s+l)}}e=i}return e}function F1(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function Pb(t,e){let r=L(t,s=>Mf([s],1)),n=Cb(r.length),i=L(r,s=>{let a={};return j(s,l=>{let u=Bh(l.partialPath);j(u,c=>{a[c]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=Cb(a.length);for(let l=0;l<a.length;l++){let u=a[l];for(let c=0;c<u.length;c++){let f=u[c].partialPath,m=u[c].suffixDef,T=Bh(f);if(F1(i,T,l)||se(m)||f.length===e){let A=n[l];if(jf(A,f)===!1){A.push(f);for(let _=0;_<T.length;_++){let k=T[_];i[l][k]=!0}}}else{let A=Mf(m,s+1,f);o[l]=o[l].concat(A),j(A,_=>{let k=Bh(_.partialPath);j(k,v=>{i[l][v]=!0})})}}}}return n}function sa(t,e,r,n){let i=new Uf(t,rt.ALTERNATION,n);return e.accept(i),Pb(i.result,r)}function aa(t,e,r,n){let i=new Uf(t,r);e.accept(i);let o=i.result,a=new zh(e,t,r).startWalking(),l=new Be({definition:o}),u=new Be({definition:a});return Pb([l,u],n)}function jf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function Ib(t,e){return t.length<e.length&&ar(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function Db(t){return ar(t,e=>ar(e,r=>ar(r,n=>se(n.categoryMatches))))}function Ob(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Lt.CUSTOM_LOOKAHEAD_VALIDATION},r))}function Lb(t,e,r,n){let i=Qt(t,l=>U1(l,r)),o=W1(t,e,r),s=Qt(t,l=>G1(l,r)),a=Qt(t,l=>j1(l,t,n,r));return i.concat(o,s,a)}function U1(t,e){let r=new Vh;t.accept(r);let n=r.allProductions,i=Ph(n,q1),o=kr(i,a=>a.length>1);return L(Ie(o),a=>{let l=jt(a),u=e.buildDuplicateFoundError(t,a),c=Cr(l),f={message:u,type:Lt.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:l.idx},m=Mb(l);return m&&(f.parameter=m),f})}function q1(t){return`${Cr(t)}_#_${t.idx}_#_${Mb(t)}`}function Mb(t){return t instanceof ae?t.terminalType.name:t instanceof ke?t.nonTerminalName:""}var Vh=class extends gr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function j1(t,e,r,n){let i=[];if(lt(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Lt.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function Fb(t,e,r){let n=[],i;return et(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Lt.INVALID_RULE_OVERRIDE,ruleName:t})),n}function Yh(t,e,r,n=[]){let i=[],o=Gf(e.definition);if(se(o))return[];{let s=t.name;et(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Lt.LEFT_RECURSION,ruleName:s});let l=Bi(o,n.concat([t])),u=Qt(l,c=>{let f=We(n);return f.push(c),Yh(t,c,r,f)});return i.concat(u)}}function Gf(t){let e=[];if(se(t))return e;let r=jt(t);if(r instanceof ke)e.push(r.referencedRule);else if(r instanceof Be||r instanceof Ce||r instanceof ze||r instanceof Ve||r instanceof Me||r instanceof pe)e=e.concat(Gf(r.definition));else if(r instanceof Fe)e=gt(L(r.definition,o=>Gf(o.definition)));else if(!(r instanceof ae))throw Error("non exhaustive match");let n=ko(r),i=t.length>1;if(n&&i){let o=Tt(t);return e.concat(Gf(o))}else return e}var Cl=class extends gr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function Ub(t,e){let r=new Cl;t.accept(r);let n=r.alternations;return Qt(n,o=>{let s=ci(o.definition);return Qt(s,(a,l)=>{let u=Ff([a],[],di,1);return se(u)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:l}),type:Lt.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:l+1}]:[]})})}function qb(t,e,r){let n=new Cl;t.accept(n);let i=n.alternations;return i=zi(i,s=>s.ignoreAmbiguities===!0),Qt(i,s=>{let a=s.idx,l=s.maxLookahead||e,u=sa(a,t,l,s),c=H1(u,s,t,r),f=K1(u,s,t,r);return c.concat(f)})}var Xh=class extends gr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function G1(t,e){let r=new Cl;t.accept(r);let n=r.alternations;return Qt(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Lt.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function jb(t,e,r){let n=[];return j(t,i=>{let o=new Xh;i.accept(o);let s=o.allProductions;j(s,a=>{let l=kl(a),u=a.maxLookahead||e,c=a.idx,m=aa(c,i,l,u)[0];if(se(gt(m))){let T=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Lt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function H1(t,e,r,n){let i=[],o=lt(t,(a,l,u)=>(e.definition[u].ignoreAmbiguities===!0||j(l,c=>{let f=[u];j(t,(m,T)=>{u!==T&&jf(m,c)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!jf(i,c)&&(i.push(c),a.push({alts:f,path:c}))}),a),[]);return L(o,a=>{let l=L(a.alts,c=>c+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:l,prefixPath:a.path}),type:Lt.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function K1(t,e,r,n){let i=lt(t,(s,a,l)=>{let u=L(a,c=>({idx:l,path:c}));return s.concat(u)},[]);return Mn(Qt(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let l=s.idx,u=s.path,c=qt(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<l&&Ib(m.path,u));return L(c,m=>{let T=[m.idx+1,l+1],w=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Lt.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:w,alternatives:T}})}))}function W1(t,e,r){let n=[],i=L(e,o=>o.name);return j(t,o=>{let s=o.name;if(et(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Lt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function Gb(t){let e=Js(t,{errMsgProvider:Ab}),r={};return j(t.rules,n=>{r[n.name]=n}),kb(r,e.errMsgProvider)}function Hb(t){return t=Js(t,{errMsgProvider:Tn}),Lb(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var Kb="MismatchedTokenException",Wb="NoViableAltException",Bb="EarlyExitException",zb="NotAllInputParsedException",Vb=[Kb,Wb,Bb,zb];Object.freeze(Vb);function Vi(t){return et(Vb,t.name)}var la=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},_o=class extends la{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=Kb}},El=class extends la{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=Wb}},$l=class extends la{constructor(e,r){super(e,r),this.name=zb}},_l=class extends la{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=Bb}};var Jh={},Zh="InRuleRecoveryException",Qh=class extends Error{constructor(e){super(e),this.name=Zh}},Hf=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=W(e,"recoveryEnabled")?e.recoveryEnabled:Tr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=B1)}getTokenToInsert(e){let r=$o(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],l=!1,u=this.LA(1),c=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:u,previous:m,ruleName:this.getCurrRuleFullName()}),w=new _o(T,u,this.LA(0));w.resyncedTokens=ci(a),this.SAVE_ERROR(w)};for(;!l;)if(this.tokenMatcher(c,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(c,o)?l=!0:(c=this.SKIP_TOKEN(),this.addToResyncTokens(c,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new Qh("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(r))return!1;let n=this.LA(1);return Un(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return et(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Un(e,o=>wl(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return Jh;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?Jh:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return gt(e)}getFollowSetFromFollowKey(e){if(e===Jh)return[gn];let r=e.ruleName+e.idxInCallingRule+Cf+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,gn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return ci(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=We(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function B1(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),l=this.firstAfterRepMap[a];if(l===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];l=new o(T,i).startWalking(),this.firstAfterRepMap[a]=l}let u=l.token,c=l.occurrence,f=l.isEndOfRule;this.RULE_STACK.length===1&&f&&u===void 0&&(u=gn,c=1),!(u===void 0||c===void 0)&&this.shouldInRepetitionRecoveryBeTried(u,c,s)&&this.tryInRepetitionRecovery(t,e,r,u)}function Kf(t,e,r){return r|e|t}var Ete=32-8;var yi=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Tr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(se(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return Qt(e,r=>Yh(r,r,Tn))}validateEmptyOrAlternatives(e){return Qt(e,r=>Ub(r,Tn))}validateAmbiguousAlternationAlternatives(e,r){return Qt(e,n=>qb(n,r,Tn))}validateSomeNonEmptyLookaheadPath(e,r){return jb(e,r,Tn)}buildLookaheadForAlternation(e){return Eb(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,_b)}buildLookaheadForOptional(e){return $b(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,kl(e.prodType),Nb)}};var Bf=class{initLooksAhead(e){this.dynamicTokensEnabled=W(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:Tr.dynamicTokensEnabled,this.maxLookahead=W(e,"maxLookahead")?e.maxLookahead:Tr.maxLookahead,this.lookaheadStrategy=W(e,"lookaheadStrategy")?e.lookaheadStrategy:new yi({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){j(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:l}=z1(r);j(n,u=>{let c=u.idx===0?"":u.idx;this.TRACE_INIT(`${Cr(u)}${c}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:u.idx,rule:r,maxLookahead:u.maxLookahead||this.maxLookahead,hasPredicates:u.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=Kf(this.fullRuleNameToShort[r.name],256,u.idx);this.setLaFuncCache(m,f)})}),j(i,u=>{this.computeLookaheadFunc(r,u.idx,768,"Repetition",u.maxLookahead,Cr(u))}),j(o,u=>{this.computeLookaheadFunc(r,u.idx,512,"Option",u.maxLookahead,Cr(u))}),j(s,u=>{this.computeLookaheadFunc(r,u.idx,1024,"RepetitionMandatory",u.maxLookahead,Cr(u))}),j(a,u=>{this.computeLookaheadFunc(r,u.idx,1536,"RepetitionMandatoryWithSeparator",u.maxLookahead,Cr(u))}),j(l,u=>{this.computeLookaheadFunc(r,u.idx,1280,"RepetitionWithSeparator",u.maxLookahead,Cr(u))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),l=Kf(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(l,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return Kf(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},ey=class extends gr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},Wf=new ey;function z1(t){Wf.reset(),t.accept(Wf);let e=Wf.dslMethods;return Wf.reset(),e}function ny(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function iy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function Xb(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function Yb(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var V1="name";function oy(t,e){Object.defineProperty(t,V1,{enumerable:!1,configurable:!0,writable:!1,value:e})}function X1(t,e){let r=He(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let l=0;l<a;l++){let u=s[l];u.tokenTypeIdx===void 0&&this[u.name](u.children,e)}}}function Jb(t,e){let r=function(){};oy(r,t+"BaseSemantics");let n={visit:function(i,o){if(z(i)&&(i=i[0]),!lr(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=Y1(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function Qb(t,e,r){let n=function(){};oy(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return j(e,o=>{i[o]=X1}),n.prototype=i,n.prototype.constructor=n,n}var sy;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(sy||(sy={}));function Y1(t,e){return J1(t,e)}function J1(t,e){let r=qt(e,i=>hr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:sy.MISSING_METHOD,methodName:i}));return Mn(n)}var Yf=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=W(e,"nodeLocationTracking")?e.nodeLocationTracking:Tr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=at,this.cstFinallyStateUpdate=at,this.cstPostTerminal=at,this.cstPostNonTerminal=at,this.cstPostRule=at;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=iy,this.setNodeLocationFromNode=iy,this.cstPostRule=at,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=ny,this.setNodeLocationFromNode=ny,this.cstPostRule=at,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=at,this.setInitialNodeLocation=at;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];Xb(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];Yb(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(lr(this.baseCstVisitorConstructor)){let e=Jb(this.className,He(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(lr(this.baseCstVisitorWithDefaultsConstructor)){let e=Qb(this.className,He(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var Jf=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):ua}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?ua:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var Qf=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=ca){if(et(this.definedRulesNames,e)){let s={message:Tn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Lt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=ca){let i=Fb(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(Vi(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return kf(Ie(this.gastProductionsCache))}};var Zf=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=ia,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},W(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(z(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(z(e))this.tokensMap=lt(e,(o,s)=>(o[s.name]=s,o),{});else if(W(e,"modes")&&ar(gt(Ie(e.modes)),yb)){let o=gt(Ie(e.modes)),s=Qs(o);this.tokensMap=lt(s,(a,l)=>(a[l.name]=l,a),{})}else if(st(e))this.tokensMap=We(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=gn;let n=W(e,"modes")?gt(Ie(e.modes)):Ie(e),i=ar(n,o=>se(o.categoryMatches));this.tokenMatcher=i?ia:di,pi(Ie(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=W(n,"resyncEnabled")?n.resyncEnabled:ca.resyncEnabled,o=W(n,"recoveryValueFunc")?n.recoveryValueFunc:ca.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...c){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,c);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...c){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,c)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(Vi(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let l=this.CST_STACK[this.CST_STACK.length-1];return l.recoveredNode=!0,l}else return n(e);else{if(this.outputCst){let l=this.CST_STACK[this.CST_STACK.length-1];l.recoveredNode=!0,s.partialCstResult=l}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,Lf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Al],a,1536,e,Al)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let l=i;i=()=>a.call(this)&&l.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,Of,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,bl],a,1280,e,bl)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=z(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new $l(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw Vi(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new _o(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===Zh?n:o}}else throw n}saveRecogState(){let e=this.errors,r=We(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),gn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var ed=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=W(e,"errorMessageProvider")?e.errorMessageProvider:Tr.errorMessageProvider}SAVE_ERROR(e){if(Vi(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:We(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return We(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=aa(e,o,r,this.maxLookahead)[0],l=[];for(let c=1;c<=this.maxLookahead;c++)l.push(this.LA(c));let u=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:l,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new _l(u,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=sa(e,i,this.maxLookahead),s=[];for(let u=1;u<=this.maxLookahead;u++)s.push(this.LA(u));let a=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new El(l,this.LA(1),a))}};var td=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(lr(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Ff([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=jt(e.ruleStack),i=this.getGAstProductions()[r];return new Df(i,e).startWalking()}};var id={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(id);var Zb=!0,eA=Math.pow(2,8)-1,rA=If({name:"RECORDING_PHASE_TOKEN",pattern:mt.NA});pi([rA]);var nA=$o(rA,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(nA);var Z1={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},rd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return ua}topLevelRuleRecord(e,r){try{let n=new yr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return Pl.call(this,Ce,e,r)}atLeastOneInternalRecord(e,r){Pl.call(this,ze,r,e)}atLeastOneSepFirstInternalRecord(e,r){Pl.call(this,Ve,r,e,Zb)}manyInternalRecord(e,r){Pl.call(this,pe,r,e)}manySepFirstInternalRecord(e,r){Pl.call(this,Me,r,e,Zb)}orInternalRecord(e,r){return eU.call(this,e,r)}subruleInternalRecord(e,r,n){if(nd(r),!e||W(e,"ruleName")===!1){let a=new Error(`<SUBRULE${tA(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=Fn(this.recordingProdStack),o=e.ruleName,s=new ke({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?Z1:id}consumeInternalRecord(e,r,n){if(nd(r),!jh(e)){let s=new Error(`<CONSUME${tA(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=Fn(this.recordingProdStack),o=new ae({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),nA}};function Pl(t,e,r,n=!1){nd(r);let i=Fn(this.recordingProdStack),o=hr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),W(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),id}function eU(t,e){nd(e);let r=Fn(this.recordingProdStack),n=z(t)===!1,i=n===!1?t:t.DEF,o=new Fe({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});W(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=gl(i,a=>hr(a.GATE));return o.hasPredicates=s,r.definition.push(o),j(i,a=>{let l=new Be({definition:[]});o.definition.push(l),W(a,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:W(a,"GATE")&&(l.ignoreAmbiguities=!0),this.recordingProdStack.push(l),a.ALT.call(this),this.recordingProdStack.pop()}),id}function tA(t){return t===0?"":`${t}`}function nd(t){if(t<0||t>eA){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${eA+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var od=class{initPerformanceTracer(e){if(W(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Tr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=vl(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function iA(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var ua=$o(gn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(ua);var Tr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:hi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),ca=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Lt;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Lt||(Lt={}));function sd(t=void 0){return function(){return t}}var Il=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{Rl(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),j(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=Gb({rules:Ie(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=Hb({rules:Ie(this.gastProductionsCache),tokenTypes:Ie(this.tokensMap),errMsgProvider:Tn,grammarName:r}),o=Ob({lookaheadStrategy:this.lookaheadStrategy,rules:Ie(this.gastProductionsCache),tokenTypes:Ie(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=Yw(Ie(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Ie(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Ie(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),W(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=W(r,"skipValidations")?r.skipValidations:Tr.skipValidations}};Il.DEFER_DEFINITION_ERRORS_HANDLING=!1;iA(Il,[Hf,Bf,Yf,Jf,Zf,Qf,ed,td,rd,od]);var Dl=class extends Il{constructor(e,r=Tr){let n=We(r);n.outputCst=!1,super(e,n)}};function No(t,e,r){return`${t.name}_${e}_${r}`}var Xi=1,rU=2,oA=4,sA=5;var pa=7,nU=8,iU=9,oU=10,sU=11,aA=12,Ol=class{constructor(e){this.target=e}isEpsilon(){return!1}},fa=class extends Ol{constructor(e,r){super(e),this.tokenType=r}},Ll=class extends Ol{constructor(e){super(e)}isEpsilon(){return!0}},da=class extends Ol{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function lA(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};aU(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Po(e,i,i);o!==void 0&&TU(e,i,o)}return e}function aU(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=Gt(t,i,void 0,{type:rU}),s=Gt(t,i,void 0,{type:pa});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function uA(t,e,r){return r instanceof ae?ly(t,e,r.terminalType,r):r instanceof ke?gU(t,e,r):r instanceof Fe?dU(t,e,r):r instanceof Ce?pU(t,e,r):r instanceof pe?lU(t,e,r):r instanceof Me?uU(t,e,r):r instanceof ze?cU(t,e,r):r instanceof Ve?fU(t,e,r):Po(t,e,r)}function lU(t,e,r){let n=Gt(t,e,r,{type:sA});Yi(t,n);let i=ma(t,e,n,r,Po(t,e,r));return fA(t,e,r,i)}function uU(t,e,r){let n=Gt(t,e,r,{type:sA});Yi(t,n);let i=ma(t,e,n,r,Po(t,e,r)),o=ly(t,e,r.separator,r);return fA(t,e,r,i,o)}function cU(t,e,r){let n=Gt(t,e,r,{type:oA});Yi(t,n);let i=ma(t,e,n,r,Po(t,e,r));return cA(t,e,r,i)}function fU(t,e,r){let n=Gt(t,e,r,{type:oA});Yi(t,n);let i=ma(t,e,n,r,Po(t,e,r)),o=ly(t,e,r.separator,r);return cA(t,e,r,i,o)}function dU(t,e,r){let n=Gt(t,e,r,{type:Xi});Yi(t,n);let i=L(r.definition,s=>uA(t,e,s));return ma(t,e,n,r,...i)}function pU(t,e,r){let n=Gt(t,e,r,{type:Xi});Yi(t,n);let i=ma(t,e,n,r,Po(t,e,r));return mU(t,e,r,i)}function Po(t,e,r){let n=qt(L(r.definition,i=>uA(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:yU(t,n)}function cA(t,e,r,n,i){let o=n.left,s=n.right,a=Gt(t,e,r,{type:sU});Yi(t,a);let l=Gt(t,e,r,{type:aA});return o.loopback=a,l.loopback=a,t.decisionMap[No(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,_t(s,a),i===void 0?(_t(a,o),_t(a,l)):(_t(a,l),_t(a,i.left),_t(i.right,o)),{left:o,right:l}}function fA(t,e,r,n,i){let o=n.left,s=n.right,a=Gt(t,e,r,{type:oU});Yi(t,a);let l=Gt(t,e,r,{type:aA}),u=Gt(t,e,r,{type:iU});return a.loopback=u,l.loopback=u,_t(a,o),_t(a,l),_t(s,u),i!==void 0?(_t(u,l),_t(u,i.left),_t(i.right,o)):_t(u,a),t.decisionMap[No(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:l}}function mU(t,e,r,n){let i=n.left,o=n.right;return _t(i,o),t.decisionMap[No(e,"Option",r.idx)]=i,n}function Yi(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function ma(t,e,r,n,...i){let o=Gt(t,e,n,{type:nU,start:r});r.end=o;for(let a of i)a!==void 0?(_t(r,a.left),_t(a.right,o)):_t(r,o);let s={left:r,right:o};return t.decisionMap[No(e,hU(n),n.idx)]=r,s}function hU(t){if(t instanceof Fe)return"Alternation";if(t instanceof Ce)return"Option";if(t instanceof pe)return"Repetition";if(t instanceof Me)return"RepetitionWithSeparator";if(t instanceof ze)return"RepetitionMandatory";if(t instanceof Ve)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function yU(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let l=a instanceof da,u=a,c=e[o+1].left;s.left.type===Xi&&s.right.type===Xi&&a!==void 0&&(l&&u.followState===s.right||a.target===s.right)?(l?u.followState=c:a.target=c,vU(t,s.right)):_t(s.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function ly(t,e,r,n){let i=Gt(t,e,n,{type:Xi}),o=Gt(t,e,n,{type:Xi});return uy(i,new fa(o,r)),{left:i,right:o}}function gU(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=Gt(t,e,r,{type:Xi}),s=Gt(t,e,r,{type:Xi}),a=new da(i,n,s);return uy(o,a),{left:o,right:s}}function TU(t,e,r){let n=t.ruleToStartState.get(e);_t(n,r.left);let i=t.ruleToStopState.get(e);return _t(r.right,i),{left:n,right:i}}function _t(t,e){let r=new Ll(e);uy(t,r)}function Gt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function uy(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function vU(t,e){t.states.splice(t.states.indexOf(e),1)}var Ml={},ha=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=cy(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function cy(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function RU(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var ad=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},dA=new ad,Fl=class extends yi{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=lA(e.rules),this.dfas=xU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,l=No(n,"Alternation",r),c=this.atn.decisionMap[l].decision,f=L(qf({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if(pA(f,!1)&&!o){let m=lt(f,(T,w,A)=>(j(w,_=>{_&&(T[_.tokenTypeIdx]=A,j(_.categoryMatches,k=>{T[k]=A}))}),T),{});return i?function(T){var w;let A=this.LA(1),_=m[A.tokenTypeIdx];if(T!==void 0&&_!==void 0){let k=(w=T[_])===null||w===void 0?void 0:w.GATE;if(k!==void 0&&k.call(this)===!1)return}return _}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new ad,w=m===void 0?0:m.length;for(let _=0;_<w;_++){let k=m?.[_].GATE;T.set(_,k===void 0||k.call(this))}let A=fy.call(this,s,c,T,a);return typeof A=="number"?A:void 0}:function(){let m=fy.call(this,s,c,dA,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,l=No(n,i,r),c=this.atn.decisionMap[l].decision,f=L(qf({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,T=>T[0]));if(pA(f)&&f[0][0]&&!o){let m=f[0],T=gt(m);if(T.length===1&&se(T[0].categoryMatches)){let A=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===A}}else{let w=lt(T,(A,_)=>(_!==void 0&&(A[_.tokenTypeIdx]=!0,j(_.categoryMatches,k=>{A[k]=!0})),A),{});return function(){let A=this.LA(1);return w[A.tokenTypeIdx]===!0}}}return function(){let m=fy.call(this,s,c,dA,a);return typeof m=="object"?!1:m===0}}};function pA(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function xU(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=RU(t.decisionStates[n],n);return r}function fy(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=PU(i.atnStartState);o=yA(i,hA(a)),i.start=o}return SU.apply(this,[i,o,r,n])}function SU(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let l=EU(i,a);if(l===void 0&&(l=wU.apply(this,[t,i,a,o,r,n])),l===Ml)return CU(s,i,a);if(l.isAcceptState===!0)return l.prediction;i=l,s.push(a),a=this.LA(o++)}}function wU(t,e,r,n,i,o){let s=$U(e.configs,r,i);if(s.size===0)return mA(t,e,r,Ml),Ml;let a=hA(s),l=NU(s,i);if(l!==void 0)a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l;else if(LU(s)){let u=jw(s.alts);a.isAcceptState=!0,a.prediction=u,a.configs.uniqueAlt=u,bU.apply(this,[t,n,s.alts,o])}return a=mA(t,e,r,a),a}function bU(t,e,r,n){let i=[];for(let u=1;u<=e;u++)i.push(this.LA(u).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,l=AU({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(l)}function AU(t){let e=L(t.prefixPath,i=>mi(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${kU(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function kU(t){if(t instanceof ke)return"SUBRULE";if(t instanceof Ce)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function CU(t,e,r){let n=Qt(e.configs.elements,o=>o.state.transitions),i=Vw(n.filter(o=>o instanceof fa).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function EU(t,e){return t.edges[e.tokenTypeIdx]}function $U(t,e,r){let n=new ha,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===pa){i.push(s);continue}let a=s.state.transitions.length;for(let l=0;l<a;l++){let u=s.state.transitions[l],c=_U(u,e);c!==void 0&&n.add({state:c,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new ha;for(let s of n.elements)ld(s,o)}if(i.length>0&&!DU(o))for(let s of i)o.add(s);return o}function _U(t,e){if(t instanceof fa&&wl(e,t.tokenType))return t.target}function NU(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function hA(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function mA(t,e,r,n){return n=yA(t,n),e.edges[r.tokenTypeIdx]=n,n}function yA(t,e){if(e===Ml)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function PU(t){let e=new ha,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};ld(o,e)}return e}function ld(t,e){let r=t.state;if(r.type===pa){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};ld(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=IU(t,o);s!==void 0&&ld(s,e)}}function IU(t,e){if(e instanceof Ll)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof da){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function DU(t){for(let e of t.elements)if(e.state.type===pa)return!0;return!1}function OU(t){for(let e of t.elements)if(e.state.type!==pa)return!1;return!0}function LU(t){if(OU(t))return!0;let e=MU(t.elements);return FU(e)&&!UU(e)}function MU(t){let e=new Map;for(let r of t){let n=cy(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function FU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function UU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var dy=de(oo(),1);var ud=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new my(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new dd;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new fd(e.startOffset,e.image.length,Ga(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new fd(r.startOffset,r.image.length,Ga(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:l}=s;if(An(s)&&n>a&&i<l){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},cd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},fd=class extends cd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},dd=class extends cd{constructor(){super(...arguments),this.content=new py(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:dy.Position.create(0,0),end:dy.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},py=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},my=class extends dd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var yy=Symbol("Datatype");function hy(t){return t.$type===yy}var gA="\u200B",TA=t=>t.endsWith(gA)?t:t+gA,pd=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new Ty(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},md=class extends pd{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new ud,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Mr(e)?yy:pn(e),i=this.wrapper.DEFINE_RULE(TA(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===yy&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),l=this.current;if(s){let u=dt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,u,o,a)}else if(hy(l)){let u=i.image;dt(n)||(u=this.converter.convert(u,o).toString()),l.value+=u}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(hy(s))s.value+=e.toString();else{let a=e.$type,l=this.assignWithoutOverride(e,s);a&&(l.$type=a);let u=l;this.stack.pop(),this.stack.push(u)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return $v(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),hy(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Pe(e,xe);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?Vt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},gy=class{buildMismatchTokenMessage(e){return hi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return hi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return hi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return hi.buildEarlyExitMessage(e)}},Ul=class extends gy{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},hd=class extends pd{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(TA(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},qU={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Ul},Ty=class extends Dl{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},qU),{lookaheadStrategy:n?new yi({maxLookahead:r.maxLookahead}):new Fl}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var ql=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function yd(t){throw new Error("Error! The input value was not handled.")}function Td(t,e,r){return jU({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function jU(t,e){let r=ms(e,!1),n=ie(e.rules).filter(K).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Io(o,i.definition)))}}function Io(t,e,r=!1){let n;if(dt(e))n=VU(t,e);else if(_e(e))n=GU(t,e);else if(xe(e))n=Io(t,e.terminal);else if(Vt(e))n=vA(t,e);else if(Ne(e))n=HU(t,e);else if(Pr(e))n=WU(t,e);else if(Ir(e))n=BU(t,e);else if(Ft(e))n=zU(t,e);else throw new ql(e.$cstNode,`Unexpected element type: ${e.$type}`);return RA(t,r?void 0:gd(e),n,e.cardinality)}function GU(t,e){let r=pn(e);return()=>t.parser.action(r,e)}function HU(t,e){let r=e.rule.ref;if(K(r)){let n=t.subrule++,i=e.arguments.length>0?KU(r,e.arguments):()=>({});return o=>t.parser.subrule(n,xA(t,r),e,i(o))}else if(be(r)){let n=t.consume++,i=vy(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)yd(r);else throw new ql(e.$cstNode,`Undefined rule type: ${e.$type}`)}function KU(t,e){let r=e.map(n=>gi(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function gi(t){if(VT(t)){let e=gi(t.left),r=gi(t.right);return n=>e(n)||r(n)}else if(BT(t)){let e=gi(t.left),r=gi(t.right);return n=>e(n)&&r(n)}else if(ZT(t)){let e=gi(t.value);return r=>!e(r)}else if(ns(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(JT(t)){let e=!!t.true;return()=>e}yd(t)}function WU(t,e){if(e.elements.length===1)return Io(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Io(t,i,!0)},s=gd(i);s&&(o.GATE=gi(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function BU(t,e){if(e.elements.length===1)return Io(t,e.elements[0]);let r=[];for(let a of e.elements){let l={ALT:Io(t,a,!0)},u=gd(a);u&&(l.GATE=gi(u)),r.push(l)}let n=t.or++,i=(a,l)=>{let u=l.getRuleStack().join("-");return`uGroup_${a}_${u}`},o=a=>t.parser.alternatives(n,r.map((l,u)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(l.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let w=f.unorderedGroups.get(T);typeof w?.[u]>"u"&&(w[u]=!0)}};let m=l.GATE;return m?c.GATE=()=>m(a):c.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[u]},c})),s=RA(t,gd(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function zU(t,e){let r=e.elements.map(n=>Io(t,n));return n=>r.forEach(i=>i(n))}function gd(t){if(Ft(t))return t.guardCondition}function vA(t,e,r=e.terminal){if(r)if(Ne(r)&&K(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,xA(t,r.rule.ref),e,i)}else if(Ne(r)&&be(r.rule.ref)){let n=t.consume++,i=vy(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(dt(r)){let n=t.consume++,i=vy(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=sl(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+pn(e.type.ref));return vA(t,e,i)}}function VU(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function RA(t,e,r,n){let i=e&&gi(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:sd(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:sd(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else yd(n)}function xA(t,e){let r=XU(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function XU(t,e){if(K(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!K(n);)(Ft(n)||Pr(n)||Ir(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function vy(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function SA(t){let e=t.Grammar,r=t.parser.Lexer,n=new hd(t);return Td(e,n,r.definition),n.finalize(),n}function wA(t){let e=YU(t);return e.finalize(),e}function YU(t){let e=t.Grammar,r=t.parser.Lexer,n=new md(t);return Td(e,n,r.definition)}var vd=class{buildTokens(e,r){let n=ie(ms(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&Qm(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(be).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Xr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=Qm(r)?mt.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(K).flatMap(i=>Qe(i).filter(dt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(Jv(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&Qv("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Rd=class{convert(e,r){let n=r.grammarSource;if(Vt(n)&&(n=Rc(n)),Ne(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return eq(r);case"STRING":return JU(r);case"ID":return ZU(r)}switch((i=xo(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return nq(r);case"boolean":return iq(r);case"bigint":return tq(r);case"date":return rq(r);default:return r}}};function JU(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=QU(i)}else e+=n}return e}function QU(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function ZU(t){return t.charAt(0)==="^"?t.substring(1):t}function eq(t){return parseInt(t)}function tq(t){return BigInt(t)}function rq(t){return new Date(t)}function nq(t){return Number(t)}function iq(t){return t.toLowerCase()==="true"}var bA=de(we(),1);var xd=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=bA.CancellationToken.None){for(let n of Zn(e.parseResult.value))await Ze(r),Xu(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(Qo(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(Ct(this._ref))return this._ref;if(NT(this._nodeDescription)){let l=o.loadAstNode(this._nodeDescription);this._ref=l??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let l=o.getLinkedNode({reference:s,container:e,property:r});if(l.error&&ne(e).state<Ge.ComputedScopes)return;this._ref=(a=l.node)!==null&&a!==void 0?a:l.error,this._nodeDescription=l.descr}return Ct(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return Qo(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(Qo(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ne(e.container);n.state<Ge.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function kA(t){return typeof t.$comment=="string"}function AA(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Sd=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,l,u;if(!this.ignoreProperties.has(e))if(Yn(r)){let c=r.ref,f=n?r.$refText:void 0;return c?{$refText:f,$ref:"#"+(c&&this.astNodeLocator.getAstNodePath(c))}:{$refText:f,$error:(l=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&l!==void 0?l:"Could not resolve reference"}}else{let c;if(o&&Ct(r)&&(c=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&c?.$textRegion))try{c.$textRegion.documentURI=ne(r).uri.toString()}catch{}return i&&!e&&Ct(r)&&(c??(c=Object.assign({},r)),c.$sourceText=(u=r.$cstNode)===null||u===void 0?void 0:u.text),s&&Ct(r)&&(c??(c=Object.assign({},r)),c.$comment=this.commentProvider.getComment(r)),c??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=$i(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,l]of Object.entries(e))if(Array.isArray(l))for(let u=0;u<l.length;u++){let c=l[u];AA(c)?l[u]=this.reviveReference(e,a,r,c):Ct(c)&&this.linkNode(c,r,e,a,u)}else AA(l)?e[a]=this.reviveReference(e,a,r,l):Ct(l)&&this.linkNode(l,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var wd=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=ve.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var CA=de(we(),1);var bd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ne(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=nr((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:nr(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Ad=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=CA.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of Zn(i))await Ze(r),Xu(o).filter(s=>!Qo(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:nr(n),local:ve.equals(r.documentUri,i)}}};var kd=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),l=parseInt(o.substring(s+1)),u=i[a];return u?.[l]}return i[o]},e)}};var EA=de(At(),1),Cd=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(EA.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var ya=de(we(),1);var Ed=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Le,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=ya.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===Ge.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=Ge.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let l=this.buildState.get(a),u=(i=l?.result)===null||i===void 0?void 0:i.validationChecks;if(u){let f=((o=r.validation.categories)!==null&&o!==void 0?o:fs.all).filter(m=>!u.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:l.result}),s.state=Ge.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=ya.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,Ge.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await Ze(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<Ge.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),ya.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,Ge.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,Ge.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,Ge.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,Ge.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,Ge.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,Ge.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await Ze(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),ya.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await Ze(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,l=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...l):e.diagnostics=l;let u=this.buildState.get(e.uri.toString());if(u){(n=u.result)!==null&&n!==void 0||(u.result={});let c=(i=a?.categories)!==null&&i!==void 0?i:fs.all;u.result.validationChecks?u.result.validationChecks.push(...c):u.result.validationChecks=[...c]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var Ry=de(we(),1);var $d=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new pc,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ie(i)}allElements(e,r){let n=ie(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=Ry.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=Ry.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var $A=de(we(),1);var _d=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=$A.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await Ze(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Dt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=ve.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=ve.extname(r.uri);return n.includes(o)}return!1}};var Nd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=_A(r)?Object.values(r):r;this.chevrotainLexer=new mt(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(_A(e))return e;let r=NA(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function oq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function NA(t){return t&&"modes"in t&&"defaultMode"in t}function _A(t){return!oq(t)&&!NA(t)}var Se=de(we(),1);function DA(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=Se.Position.create(0,0));let o=LA(t),s=wy(n),a=aq({lines:o,position:i,options:s});return dq({index:0,tokens:a,position:i})}function OA(t,e){let r=wy(e),n=LA(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function LA(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Ba)}var PA=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,sq=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function aq(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let l=a===0,u=a===t.lines.length-1,c=t.lines[a],f=0;if(l&&t.options.start){let T=(e=t.options.start)===null||e===void 0?void 0:e.exec(c);T&&(f=T.index+T[0].length)}else{let T=(r=t.options.line)===null||r===void 0?void 0:r.exec(c);T&&(f=T.index+T[0].length)}if(u){let T=(n=t.options.end)===null||n===void 0?void 0:n.exec(c);T&&(c=c.substring(0,T.index))}if(c=c.substring(0,fq(c)),Sy(c,0)>=c.length){if(i.length>0){let T=Se.Position.create(o,s);i.push({type:"break",content:"",range:Se.Range.create(T,T)})}}else{PA.lastIndex=f;let T=PA.exec(c);if(T){let w=T[0],A=T[1],_=Se.Position.create(o,s+f),k=Se.Position.create(o,s+f+w.length);i.push({type:"tag",content:A,range:Se.Range.create(_,k)}),f+=w.length,f=Sy(c,f)}if(f<c.length){let w=c.substring(f),A=Array.from(w.matchAll(sq));i.push(...lq(A,w,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function lq(t,e,r,n){let i=[];if(t.length===0){let o=Se.Position.create(r,n),s=Se.Position.create(r,n+e.length);i.push({type:"text",content:e,range:Se.Range.create(o,s)})}else{let o=0;for(let a of t){let l=a.index,u=e.substring(o,l);u.length>0&&i.push({type:"text",content:e.substring(o,l),range:Se.Range.create(Se.Position.create(r,o+n),Se.Position.create(r,l+n))});let c=u.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:Se.Range.create(Se.Position.create(r,o+c+n),Se.Position.create(r,o+c+f.length+n))}),c+=f.length,a.length===4){c+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:Se.Range.create(Se.Position.create(r,o+c+n),Se.Position.create(r,o+c+m.length+n))})}else i.push({type:"text",content:"",range:Se.Range.create(Se.Position.create(r,o+c+n),Se.Position.create(r,o+c+n))});o=l+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:Se.Range.create(Se.Position.create(r,o+n),Se.Position.create(r,o+n+s.length))})}return i}var uq=/\S/,cq=/\s*$/;function Sy(t,e){let r=t.substring(e).match(uq);return r?e+r.index:t.length}function fq(t){let e=t.match(cq);if(e&&typeof e.index=="number")return e.index}function dq(t){var e,r,n,i;let o=Se.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Pd([],Se.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let u=pq(t,s[s.length-1]);u&&s.push(u)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,l=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new Pd(s,Se.Range.create(a,l))}function pq(t,e){let r=t.tokens[t.index];if(r.type==="tag")return FA(t,!1);if(r.type==="text"||r.type==="inline-tag")return MA(t);mq(r,e),t.index++}function mq(t,e){if(e){let r=new Id("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function MA(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(hq(t)),n=e,e=t.tokens[t.index];return new Gl(i,Se.Range.create(r.range.start,n.range.end))}function hq(t){return t.tokens[t.index].type==="inline-tag"?FA(t,!0):UA(t)}function FA(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=UA(t);return new jl(n,new Gl([o],o.range),e,Se.Range.create(r.range.start,o.range.end))}else{let o=MA(t);return new jl(n,o,e,Se.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new jl(n,new Gl([],o),e,o)}}function UA(t){let e=t.tokens[t.index++];return new Id(e.content,e.range)}function wy(t){if(!t)return wy({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:xy(e,!0),end:xy(r,!1),line:xy(n,!0)}}function xy(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?ri(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var Pd=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=IA(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=IA(r)+i}return r.trim()}},jl=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=yq(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function yq(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let l=Sy(e,o);s=e.substring(l),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:gq(e,s)}}function gq(t,e){try{return Dt.parse(t,!0),`[${e}](${t})`}catch{return t}}var Gl=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Id=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function IA(t){return t.endsWith(`
`)?`
`:`

`}var Dd=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&OA(r))return DA(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,l=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${l.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(l=>l.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Od=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return kA(e)?e.$comment:(r=MT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function dl(t){return{documentation:{CommentProvider:e=>new Od(e),DocumentationProvider:e=>new Dd(e)},parser:{GrammarConfig:e=>ex(e),LangiumParser:e=>wA(e),CompletionParser:e=>SA(e),ValueConverter:()=>new Rd,TokenBuilder:()=>new vd,Lexer:e=>new Nd(e),ParserErrorMessageProvider:()=>new Ul},lsp:{CompletionProvider:e=>new ws(e),DocumentSymbolProvider:e=>new Ic(e),HoverProvider:e=>new Oc(e),FoldingRangeProvider:e=>new As(e),ReferencesProvider:e=>new jc(e),DefinitionProvider:e=>new Es(e),DocumentHighlightProvider:e=>new Pc(e),RenameProvider:e=>new Gc(e)},workspace:{AstNodeLocator:()=>new kd,AstNodeDescriptionProvider:e=>new bd(e),ReferenceDescriptionProvider:e=>new Ad(e)},references:{Linker:e=>new xd(e),NameProvider:()=>new us,ScopeProvider:e=>new xs(e),ScopeComputation:e=>new Rs(e),References:e=>new ks(e)},serializer:{JsonSerializer:e=>new Sd(e)},validation:{DocumentValidator:e=>new gc(e),ValidationRegistry:e=>new lc(e)},shared:()=>t.shared}}function pl(t){return{ServiceRegistry:()=>new wd,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Fc(e),WorkspaceSymbolProvider:e=>new Hc(e),NodeKindProvider:()=>new Uc,FuzzyMatcher:()=>new Dc},workspace:{LangiumDocuments:e=>new Mc(e),LangiumDocumentFactory:e=>new Lc(e),DocumentBuilder:e=>new Ed(e),TextDocuments:()=>new qA.TextDocuments(Jo),IndexManager:e=>new $d(e),WorkspaceManager:e=>new _d(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new ac,ConfigurationProvider:e=>new Cd(e)}}}var ga=de(GA(),1);var Tq="Exp1";var HA="Exp2";var KA="Exp3";var WA="Exp4";var BA="Exp5";var by="Primaire";var Ay="Expression";var vq="Statement";var Rq="ArithmeticExpression";var xq="BooleanExpression";var Sq="Value";var wq="Assignment";var bq="Condition";var Aq="FunctionCall";var kq="Loop";var Cq="Movement";var Eq="ReturnInstruction";var $q="Rotation";var _q="Sensors";var Nq="Variable";var Hl=class extends uo{getAllTypes(){return["ArithmeticExpression","ArithmeticValue","Assignment","BooleanExpression","BooleanValue","Condition","Exp1","Exp2","Exp3","Exp4","Exp5","Expression","Fonction","FunctionCall","Loop","Movement","Param","Primaire","ReturnInstruction","RoboML","Rotation","Sensors","Speed","Statement","Value","Variable","VariableRef"]}computeIsSubtype(e,r){switch(e){case Rq:case xq:return this.isSubtype(Ay,r);case wq:case bq:case Aq:case kq:case Cq:case Eq:case $q:case _q:case Nq:return this.isSubtype(vq,r);case HA:return this.isSubtype(Tq,r);case KA:return this.isSubtype(HA,r);case WA:return this.isSubtype(KA,r);case BA:return this.isSubtype(WA,r);case Ay:return this.isSubtype(by,r);case by:return this.isSubtype(BA,r);case Sq:return this.isSubtype(Ay,r)||this.isSubtype(by,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Fonction":return{name:"Fonction",mandatory:[{name:"param",type:"array"},{name:"statement",type:"array"}]};case"Param":return{name:"Param",mandatory:[{name:"expression",type:"array"}]};case"RoboML":return{name:"RoboML",mandatory:[{name:"function",type:"array"},{name:"variable",type:"array"}]};case"Speed":return{name:"Speed",mandatory:[{name:"arithmeticexpression",type:"array"}]};case"Condition":return{name:"Condition",mandatory:[{name:"statement",type:"array"}]};case"FunctionCall":return{name:"FunctionCall",mandatory:[{name:"arguments",type:"array"}]};case"Loop":return{name:"Loop",mandatory:[{name:"statement",type:"array"}]};case"ReturnInstruction":return{name:"ReturnInstruction",mandatory:[{name:"expression",type:"array"}]};default:return{name:e,mandatory:[]}}}},Dae=new Hl;var Ld,zA=()=>Ld??(Ld=sc(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "MyDsl",
  "imports": [],
  "rules": [
    {
      "$type": "ParserRule",
      "name": "RoboML",
      "entry": true,
      "returnType": {
        "$ref": "#/interfaces@0"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@0"
            }
          },
          {
            "$type": "Assignment",
            "feature": "variable",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@10"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Assignment",
            "feature": "function",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@9"
              },
              "arguments": []
            },
            "cardinality": "+"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Statement",
      "returnType": {
        "$ref": "#/interfaces@2"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@10"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@10"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expression",
      "returnType": {
        "$ref": "#/interfaces@4"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@4"
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@3"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "||"
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@3"
                },
                "arguments": []
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Exp1",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@4"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "&&"
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@4"
                },
                "arguments": []
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Exp2",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "!"
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@4"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@5"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Exp3",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "="
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@6"
                    },
                    "arguments": []
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "<>"
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@6"
                    },
                    "arguments": []
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ">"
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@6"
                    },
                    "arguments": []
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ">="
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@6"
                    },
                    "arguments": []
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "<"
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@6"
                    },
                    "arguments": []
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "<="
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@6"
                    },
                    "arguments": []
                  }
                ]
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Exp4",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "+"
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@7"
                    },
                    "arguments": []
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "-"
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@7"
                    },
                    "arguments": []
                  }
                ]
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Exp5",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "*"
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@8"
                    },
                    "arguments": []
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "/"
                  },
                  {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@8"
                    },
                    "arguments": []
                  }
                ]
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Primaire",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@56"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@60"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@2"
                },
                "arguments": []
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Fonction",
      "returnType": {
        "$ref": "#/interfaces@1"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "let"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "void"
              },
              {
                "$type": "Assignment",
                "feature": "type",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@11"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "functionName",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "param",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@18"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "param",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@18"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "+"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Variable",
      "returnType": {
        "$ref": "#/interfaces@5"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "var"
          },
          {
            "$type": "Assignment",
            "feature": "varName",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "returnType": {
        "$ref": "#/types@0"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@12"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type_Int",
      "returnType": {
        "$ref": "#/types@1"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Int"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type_String",
      "returnType": {
        "$ref": "#/types@2"
      },
      "definition": {
        "$type": "Keyword",
        "value": "String"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type_Boolean",
      "returnType": {
        "$ref": "#/types@3"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Boolean"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type_Char",
      "returnType": {
        "$ref": "#/types@4"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Char"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type_Float",
      "returnType": {
        "$ref": "#/types@5"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Float"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type_Double",
      "returnType": {
        "$ref": "#/types@6"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Double"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Param",
      "returnType": {
        "$ref": "#/interfaces@3"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@3"
            }
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@11"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Movement",
      "returnType": {
        "$ref": "#/interfaces@7"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@7"
            }
          },
          {
            "$type": "Keyword",
            "value": "Movement"
          },
          {
            "$type": "Assignment",
            "feature": "direction",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@27"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@61"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@32"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Rotation",
      "returnType": {
        "$ref": "#/interfaces@10"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@10"
            }
          },
          {
            "$type": "Keyword",
            "value": "Rotation"
          },
          {
            "$type": "Assignment",
            "feature": "angle",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@61"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Sensors",
      "returnType": {
        "$ref": "#/interfaces@11"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@11"
            }
          },
          {
            "$type": "Keyword",
            "value": "Sensors"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "time"
              },
              {
                "$type": "Assignment",
                "feature": "time",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@44"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "distance"
              },
              {
                "$type": "Assignment",
                "feature": "distance",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@44"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Loop",
      "returnType": {
        "$ref": "#/interfaces@12"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "loop"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "+"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Condition",
      "returnType": {
        "$ref": "#/interfaces@13"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@13"
            }
          },
          {
            "$type": "Keyword",
            "value": "if"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "+"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Assignment",
      "returnType": {
        "$ref": "#/interfaces@14"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "variable",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FunctionCall",
      "returnType": {
        "$ref": "#/interfaces@15"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@15"
            }
          },
          {
            "$type": "Assignment",
            "feature": "functionRefName",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@56"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@56"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnInstruction",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "return"
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Direction",
      "returnType": {
        "$ref": "#/types@30"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Direction_Forward",
      "returnType": {
        "$ref": "#/types@31"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Forward"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Direction_Backward",
      "returnType": {
        "$ref": "#/types@32"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Backward"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Direction_Left",
      "returnType": {
        "$ref": "#/types@33"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Left"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Direction_Right",
      "returnType": {
        "$ref": "#/types@34"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Right"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Units",
      "returnType": {
        "$ref": "#/types@18"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Units_mm",
      "returnType": {
        "$ref": "#/types@19"
      },
      "definition": {
        "$type": "Keyword",
        "value": "mm"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Units_cm",
      "returnType": {
        "$ref": "#/types@20"
      },
      "definition": {
        "$type": "Keyword",
        "value": "cm"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Units_dm",
      "returnType": {
        "$ref": "#/types@21"
      },
      "definition": {
        "$type": "Keyword",
        "value": "dm"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Units_m",
      "returnType": {
        "$ref": "#/types@22"
      },
      "definition": {
        "$type": "Keyword",
        "value": "m"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticOperator",
      "returnType": {
        "$ref": "#/types@23"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticOperator_Plus",
      "returnType": {
        "$ref": "#/types@24"
      },
      "definition": {
        "$type": "Keyword",
        "value": "+"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticOperator_Minus",
      "returnType": {
        "$ref": "#/types@25"
      },
      "definition": {
        "$type": "Keyword",
        "value": "-"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticOperator_Multiplication",
      "returnType": {
        "$ref": "#/types@26"
      },
      "definition": {
        "$type": "Keyword",
        "value": "*"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticOperator_Division",
      "returnType": {
        "$ref": "#/types@27"
      },
      "definition": {
        "$type": "Keyword",
        "value": "/"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticOperator_Modulo",
      "returnType": {
        "$ref": "#/types@28"
      },
      "definition": {
        "$type": "Keyword",
        "value": "%"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticOperator_Power",
      "returnType": {
        "$ref": "#/types@29"
      },
      "definition": {
        "$type": "Keyword",
        "value": "**"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Float",
      "returnType": {
        "$ref": "#/types@35"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Float"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator",
      "returnType": {
        "$ref": "#/types@7"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@52"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_Not",
      "returnType": {
        "$ref": "#/types@8"
      },
      "definition": {
        "$type": "Keyword",
        "value": "!"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_NotEq",
      "returnType": {
        "$ref": "#/types@8"
      },
      "definition": {
        "$type": "Keyword",
        "value": "!="
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_Inf",
      "returnType": {
        "$ref": "#/types@9"
      },
      "definition": {
        "$type": "Keyword",
        "value": "<"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_Eq",
      "returnType": {
        "$ref": "#/types@13"
      },
      "definition": {
        "$type": "Keyword",
        "value": "=="
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_And",
      "returnType": {
        "$ref": "#/types@15"
      },
      "definition": {
        "$type": "Keyword",
        "value": "&&"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_SupEq",
      "returnType": {
        "$ref": "#/types@11"
      },
      "definition": {
        "$type": "Keyword",
        "value": ">="
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_Sup",
      "returnType": {
        "$ref": "#/types@10"
      },
      "definition": {
        "$type": "Keyword",
        "value": ">"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_InfEq",
      "returnType": {
        "$ref": "#/types@12"
      },
      "definition": {
        "$type": "Keyword",
        "value": "<="
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_Or",
      "returnType": {
        "$ref": "#/types@16"
      },
      "definition": {
        "$type": "Keyword",
        "value": "||"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator_Xor",
      "returnType": {
        "$ref": "#/types@17"
      },
      "definition": {
        "$type": "Keyword",
        "value": "Xor"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Value",
      "returnType": {
        "$ref": "#/interfaces@17"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@58"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@61"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EString",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@62"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@60"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EBoolean",
      "dataType": "boolean",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "true"
          },
          {
            "$type": "Keyword",
            "value": "false"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableRef",
      "returnType": {
        "$ref": "#/interfaces@18"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "variableName",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@60"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "^"
            },
            "cardinality": "?"
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "a"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "z"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "A"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "Z"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "_"
                }
              }
            ]
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "a"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "z"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "A"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "Z"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "_"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "9"
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "0"
        },
        "right": {
          "$type": "Keyword",
          "value": "9"
        },
        "cardinality": "+"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\""
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              }
            ]
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "'"
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              }
            ]
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "/*"
            }
          },
          {
            "$type": "UntilToken",
            "terminal": {
              "$type": "CharacterRange",
              "left": {
                "$type": "Keyword",
                "value": "*/"
              }
            }
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "//"
            }
          },
          {
            "$type": "NegatedToken",
            "terminal": {
              "$type": "TerminalAlternatives",
              "elements": [
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\n"
                  }
                },
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\r"
                  }
                }
              ]
            }
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                },
                "cardinality": "?"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\n"
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": " "
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "\\t"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\n"
            }
          }
        ],
        "cardinality": "+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ANY_OTHER",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "Wildcard"
      },
      "fragment": false,
      "hidden": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "interfaces": [
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "function",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@1"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "variable",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@5"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "RoboML",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "functionName",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "statement",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "type",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "param",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@3"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Fonction",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Statement",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "name",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "expression",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@4"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Param",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Expression",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "varName",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "expression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Variable",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "booleanOperator",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@7"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@19"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@19"
            }
          },
          "isOptional": false
        }
      ],
      "name": "BooleanExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "distance",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "direction",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@30"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@18"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Movement",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@18"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "arithmeticexpression",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@9"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Speed",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "arithmeticOperator",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@23"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@20"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@20"
            }
          },
          "isOptional": false
        }
      ],
      "name": "ArithmeticExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "angle",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          },
          "isOptional": false
        }
      ],
      "name": "Rotation",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "time",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@35"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "distance",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@35"
            }
          }
        }
      ],
      "name": "Sensors",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "statement",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "condition",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Loop",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "condition",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "statement",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Condition",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "variable",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@18"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "value",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Assignment",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "functionRefName",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "arguments",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@17"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "FunctionCall",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "expression",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@4"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "ReturnInstruction",
      "superTypes": [
        {
          "$ref": "#/interfaces@2"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          }
        }
      ],
      "name": "Value",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "variableName",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "VariableRef",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "BooleanValue",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "ArithmeticValue",
      "attributes": [],
      "superTypes": []
    }
  ],
  "types": [
    {
      "$type": "Type",
      "name": "Type",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@1"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@2"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@3"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@4"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@5"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@6"
            }
          }
        ]
      }
    },
    {
      "$type": "Type",
      "name": "Type_Int",
      "type": {
        "$type": "SimpleType",
        "stringType": "Int"
      }
    },
    {
      "$type": "Type",
      "name": "Type_String",
      "type": {
        "$type": "SimpleType",
        "stringType": "String"
      }
    },
    {
      "$type": "Type",
      "name": "Type_Boolean",
      "type": {
        "$type": "SimpleType",
        "stringType": "Boolean"
      }
    },
    {
      "$type": "Type",
      "name": "Type_Char",
      "type": {
        "$type": "SimpleType",
        "stringType": "Char"
      }
    },
    {
      "$type": "Type",
      "name": "Type_Float",
      "type": {
        "$type": "SimpleType",
        "stringType": "Float"
      }
    },
    {
      "$type": "Type",
      "name": "Type_Double",
      "type": {
        "$type": "SimpleType",
        "stringType": "Double"
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@14"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@8"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@9"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@17"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@13"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@15"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@11"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@10"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@12"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@16"
            }
          }
        ]
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_Not",
      "type": {
        "$type": "SimpleType",
        "stringType": "!"
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_Inf",
      "type": {
        "$type": "SimpleType",
        "stringType": "<"
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_Sup",
      "type": {
        "$type": "SimpleType",
        "stringType": ">"
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_SupEq",
      "type": {
        "$type": "SimpleType",
        "stringType": ">="
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_InfEq",
      "type": {
        "$type": "SimpleType",
        "stringType": "<="
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_Eq",
      "type": {
        "$type": "SimpleType",
        "stringType": "=="
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_NotEq",
      "type": {
        "$type": "SimpleType",
        "stringType": "!="
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_And",
      "type": {
        "$type": "SimpleType",
        "stringType": "&&"
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_Or",
      "type": {
        "$type": "SimpleType",
        "stringType": "||"
      }
    },
    {
      "$type": "Type",
      "name": "BooleanOperator_Xor",
      "type": {
        "$type": "SimpleType",
        "stringType": "Xor"
      }
    },
    {
      "$type": "Type",
      "name": "Units",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@19"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@20"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@21"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@22"
            }
          }
        ]
      }
    },
    {
      "$type": "Type",
      "name": "Units_mm",
      "type": {
        "$type": "SimpleType",
        "stringType": "mm"
      }
    },
    {
      "$type": "Type",
      "name": "Units_cm",
      "type": {
        "$type": "SimpleType",
        "stringType": "cm"
      }
    },
    {
      "$type": "Type",
      "name": "Units_dm",
      "type": {
        "$type": "SimpleType",
        "stringType": "dm"
      }
    },
    {
      "$type": "Type",
      "name": "Units_m",
      "type": {
        "$type": "SimpleType",
        "stringType": "m"
      }
    },
    {
      "$type": "Type",
      "name": "ArithmeticOperator",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@24"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@25"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@26"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@27"
            }
          }
        ]
      }
    },
    {
      "$type": "Type",
      "name": "ArithmeticOperator_Plus",
      "type": {
        "$type": "SimpleType",
        "stringType": "+"
      }
    },
    {
      "$type": "Type",
      "name": "ArithmeticOperator_Minus",
      "type": {
        "$type": "SimpleType",
        "stringType": "-"
      }
    },
    {
      "$type": "Type",
      "name": "ArithmeticOperator_Multiplication",
      "type": {
        "$type": "SimpleType",
        "stringType": "*"
      }
    },
    {
      "$type": "Type",
      "name": "ArithmeticOperator_Division",
      "type": {
        "$type": "SimpleType",
        "stringType": "/"
      }
    },
    {
      "$type": "Type",
      "name": "ArithmeticOperator_Modulo",
      "type": {
        "$type": "SimpleType",
        "stringType": "%"
      }
    },
    {
      "$type": "Type",
      "name": "ArithmeticOperator_Power",
      "type": {
        "$type": "SimpleType",
        "stringType": "**"
      }
    },
    {
      "$type": "Type",
      "name": "Direction",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@31"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@32"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@33"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@34"
            }
          }
        ]
      }
    },
    {
      "$type": "Type",
      "name": "Direction_Forward",
      "type": {
        "$type": "SimpleType",
        "stringType": "Forward"
      }
    },
    {
      "$type": "Type",
      "name": "Direction_Backward",
      "type": {
        "$type": "SimpleType",
        "stringType": "Backward"
      }
    },
    {
      "$type": "Type",
      "name": "Direction_Left",
      "type": {
        "$type": "SimpleType",
        "stringType": "Left"
      }
    },
    {
      "$type": "Type",
      "name": "Direction_Right",
      "type": {
        "$type": "SimpleType",
        "stringType": "Right"
      }
    },
    {
      "$type": "Type",
      "name": "Float",
      "type": {
        "$type": "SimpleType",
        "primitiveType": "string"
      }
    }
  ],
  "usedGrammars": []
}`));var Pq={languageId:"robo-ml",fileExtensions:[".robo"],caseInsensitive:!1},VA={AstReflection:()=>new Hl},XA={Grammar:()=>zA(),LanguageMetaData:()=>Pq,parser:{}};function YA(t){let e=t.validation.ValidationRegistry,r=t.validation.RoboMlValidator,n={RoboML:r.checkPersonStartsWithCapital};e.register(n,r)}var Md=class{checkPersonStartsWithCapital(e,r){}};var Iq={validation:{RoboMlValidator:()=>new Md}};function JA(t){let e=fo(pl(t),VA),r=fo(dl({shared:e}),XA,Iq);return e.ServiceRegistry.register(r),YA(r),{shared:e,RoboMl:r}}var Fd=class{constructor(e,r,n,i){this.$type=r}accept(e){return e.visitVariable(this)}};var Ti=class t{static fromAngle(e,r){return new t(Math.cos(e)*r,Math.sin(e)*r)}static null(){return new t(0,0)}constructor(e,r){this.x=e,this.y=r}plus(e){return new t(this.x+e.x,this.y+e.y)}minus(e){return new t(this.x-e.x,this.y-e.y)}scale(e){return new t(this.x*e,this.y*e)}projX(){return new t(this.x,0)}projY(){return new t(0,this.y)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}},Ud=class{constructor(e,r){this.origin=e,this.vector=r}intersect(e){let r=[];for(var n=0;n<e.length;n++){let o=e[n].intersect(this);console.log(o),r=r.concat(o)}return this.findClosestIntersection(r)}findClosestIntersection(e){let r=0,n=1/0;if(e.length>0){for(var i=0;i<e.length;i++){let o=this.origin.minus(e[i]).norm();o<n&&(n=o,r=i)}return e[r]}else return}getPoiFinder(){return(e,r)=>{let n=e.minus(r),i=this.vector,o=n.x*i.y-i.x*n.y;if(o!=0){let s=e.minus(this.origin),a=s.x*i.y-i.x*s.y,l=n.x*s.y-s.x*n.y,u=a/o,c=-l/o;if(u>0&&u<1&&c>0)return e.plus(n.scale(-u))}}}};var Kl=class{constructor(e,r,n,i,o){this.type="Robot",this.pos=e,this.size=r,this.rad=n*Math.PI/180,this.speed=i,this.scene=o}intersect(e){return[]}turn(e){}move(e){}side(e){}getRay(){return new Ud(this.pos,Ti.fromAngle(this.rad,1e4).scale(-1))}},qd=class extends Kl{constructor(e,r){super(r.pos.scale(1),r.size.scale(1),r.rad,r.speed,r.scene),this.rad=r.rad,this.time=e}};var Do=class{constructor(e,r){this.type="Wall",this.pos=e,this.size=r}intersect(e){let r=e.getPoiFinder()(this.pos,this.size);return r?[r]:[]}};var jd=class{constructor(e=new Ti(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new Kl(this.size.scale(.5),new Ti(250,250),0,30,this),this.entities.push(new Do(Ti.null(),this.size.projX())),this.entities.push(new Do(Ti.null(),this.size.projY())),this.entities.push(new Do(this.size,this.size.projY())),this.entities.push(new Do(this.size,this.size.projX())),this.timestamps.push(new qd(0,this.robot))}};var Wl=class{constructor(){this.robotinstruction=[]}visit(e){return this.scene=new jd,this.visitRoboML(e),this.robotinstruction}visitRoboML(e){console.log("visitRoboML()"),console.log(e.variable[0]instanceof Fd),console.log(Object.getPrototypeOf(e.variable[0])),console.log(e.variable[0]),console.log(e.variable.length),console.log(typeof e.variable[0]),e.variable[0].accept(this)}visitStatement(e){throw new Error("Method not implemented.")}visitExpression(e){throw new Error("Method not implemented.")}visitExp1(e){throw new Error("Method not implemented.")}visitExp2(e){throw new Error("Method not implemented.")}visitExp3(e){throw new Error("Method not implemented.")}visitExp4(e){throw new Error("Method not implemented.")}visitExp5(e){throw new Error("Method not implemented.")}visitPrimaire(e){throw new Error("Method not implemented.")}visitValue(e){throw new Error("Method not implemented.")}visitFonction(e){throw console.log("coucou"),new Error("Method not implemented.")}visitVariable(e){var r=e.varName,n=e.expression;return console.log(r+"="+n),e.accept(this)}visitType(e){throw new Error("Method not implemented.")}visitType_Int(e){throw new Error("Method not implemented.")}visitType_String(e){throw new Error("Method not implemented.")}visitType_Boolean(e){throw new Error("Method not implemented.")}visitType_Char(e){throw new Error("Method not implemented.")}visitType_Float(e){throw new Error("Method not implemented.")}visitType_Double(e){throw new Error("Method not implemented.")}visitParam(e){throw new Error("Method not implemented.")}visitMovement(e){throw new Error("Method not implemented.")}visitRotation(e){throw new Error("Method not implemented.")}visitSensors(e){throw new Error("Method not implemented.")}visitLoop(e){throw new Error("Method not implemented.")}visitCondition(e){throw new Error("Method not implemented.")}visitAssignment(e){throw new Error("Method not implemented.")}visitFunctionCall(e){throw new Error("Method not implemented.")}visitReturnInstruction(e){throw new Error("Method not implemented.")}visitDirection(e){throw new Error("Method not implemented.")}visitDirection_Forward(e){throw new Error("Method not implemented.")}visitDirection_Backward(e){throw new Error("Method not implemented.")}visitDirection_Left(e){throw new Error("Method not implemented.")}visitDirection_Right(e){throw new Error("Method not implemented.")}visitUnits(e){throw new Error("Method not implemented.")}visitUnits_mm(e){throw new Error("Method not implemented.")}visitUnits_dm(e){throw new Error("Method not implemented.")}visitUnits_cm(e){throw new Error("Method not implemented.")}visitUnits_m(e){throw new Error("Method not implemented.")}visitFloat(e){throw new Error("Method not implemented.")}visitEString(e){throw new Error("Method not implemented.")}visitEBoolean(e){throw new Error("Method not implemented.")}visitVariableRef(e){throw new Error("Method not implemented.")}};var Bl=class{static interpret(e){this.typeErors=[];let r=new Wl,n=Date.now(),i=r.visit(e),o=Date.now();return console.log(`Interpretation took ${o-n}ms`),i}};Bl.typeErors=[];var Oq=new ga.BrowserMessageReader(self),Lq=new ga.BrowserMessageWriter(self),ky=(0,ga.createConnection)(Oq,Lq),{shared:Mq,RoboMl:Fq}=JA(Object.assign({connection:ky},Vc));async function Uq(t,e){let r=e.shared.workspace.LangiumDocumentFactory.fromString(t,Dt.parse("memory://roboMl.document"));return await e.shared.workspace.DocumentBuilder.build([r],{validation:!0}),r}ky.onNotification("browser/execute",async t=>{var e;console.log("yazidou t trop bo");var n=(e=(await Uq(t.content,Fq)).parseResult)===null||e===void 0?void 0:e.value,i=[];i=Bl.interpret(n),ky.sendNotification("browser/sendStatements",i)});qR(Mq);})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
