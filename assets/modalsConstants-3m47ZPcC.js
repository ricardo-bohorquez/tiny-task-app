import{co as B}from"./index-AUmvy9ZB.js";var ue=e=>e.type==="checkbox",re=e=>e instanceof Date,m=e=>e==null;const Ze=e=>typeof e=="object";var O=e=>!m(e)&&!Array.isArray(e)&&Ze(e)&&!re(e),gt=e=>O(e)&&e.target?ue(e.target)?e.target.checked:e.target.value:e,ht=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,vt=(e,n)=>e.has(ht(n)),_t=e=>{const n=e.constructor&&e.constructor.prototype;return O(n)&&n.hasOwnProperty("isPrototypeOf")},me=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function H(e){let n;const i=Array.isArray(e);if(e instanceof Date)n=new Date(e);else if(e instanceof Set)n=new Set(e);else if(!(me&&(e instanceof Blob||e instanceof FileList))&&(i||O(e)))if(n=i?[]:{},!i&&!_t(e))n=e;else for(const r in e)e.hasOwnProperty(r)&&(n[r]=H(e[r]));else return e;return n}var ae=e=>Array.isArray(e)?e.filter(Boolean):[],x=e=>e===void 0,y=(e,n,i)=>{if(!n||!O(e))return i;const r=ae(n.split(/[,[\].]+?/)).reduce((l,a)=>m(l)?l:l[a],e);return x(r)||r===e?x(e[n])?i:e[n]:r},K=e=>typeof e=="boolean";const ze={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},U={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},z={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};B.createContext(null);var At=(e,n,i,r=!0)=>{const l={defaultValues:n._defaultValues};for(const a in e)Object.defineProperty(l,a,{get:()=>{const f=a;return n._proxyFormState[f]!==U.all&&(n._proxyFormState[f]=!r||U.all),i&&(i[f]=!0),e[f]}});return l},R=e=>O(e)&&!Object.keys(e).length,bt=(e,n,i,r)=>{i(e);const{name:l,...a}=e;return R(a)||Object.keys(a).length>=Object.keys(n).length||Object.keys(a).find(f=>n[f]===(!r||U.all))},Fe=e=>Array.isArray(e)?e:[e];function Vt(e){const n=B.useRef(e);n.current=e,B.useEffect(()=>{const i=!e.disabled&&n.current.subject&&n.current.subject.subscribe({next:n.current.next});return()=>{i&&i.unsubscribe()}},[e.disabled])}var q=e=>typeof e=="string",Et=(e,n,i,r,l)=>q(e)?(r&&n.watch.add(e),y(i,e,l)):Array.isArray(e)?e.map(a=>(r&&n.watch.add(a),y(i,a))):(r&&(n.watchAll=!0),i),Le=e=>/^\w*$/.test(e),et=e=>ae(e.replace(/["|']|\]/g,"").split(/\.|\[/));function S(e,n,i){let r=-1;const l=Le(n)?[n]:et(n),a=l.length,f=a-1;for(;++r<a;){const b=l[r];let V=i;if(r!==f){const p=e[b];V=O(p)||Array.isArray(p)?p:isNaN(+l[r+1])?{}:[]}e[b]=V,e=e[b]}return e}var St=(e,n,i,r,l)=>n?{...i[e],types:{...i[e]&&i[e].types?i[e].types:{},[r]:l||!0}}:{},He=e=>({isOnSubmit:!e||e===U.onSubmit,isOnBlur:e===U.onBlur,isOnChange:e===U.onChange,isOnAll:e===U.all,isOnTouch:e===U.onTouched}),We=(e,n,i)=>!i&&(n.watchAll||n.watch.has(e)||[...n.watch].some(r=>e.startsWith(r)&&/^\.\w+/.test(e.slice(r.length))));const fe=(e,n,i,r)=>{for(const l of i||Object.keys(e)){const a=y(e,l);if(a){const{_f:f,...b}=a;if(f){if(f.refs&&f.refs[0]&&n(f.refs[0],l)&&!r)break;if(f.ref&&n(f.ref,f.name)&&!r)break}else O(b)&&fe(b,n)}}};var Dt=(e,n,i)=>{const r=ae(y(e,i));return S(r,"root",n[i]),S(e,i,r),e},pe=e=>e.type==="file",Y=e=>typeof e=="function",ye=e=>{if(!me)return!1;const n=e?e.ownerDocument:0;return e instanceof(n&&n.defaultView?n.defaultView.HTMLElement:HTMLElement)},de=e=>q(e),Ce=e=>e.type==="radio",ge=e=>e instanceof RegExp;const Ke={value:!1,isValid:!1},Ye={value:!0,isValid:!0};var tt=e=>{if(Array.isArray(e)){if(e.length>1){const n=e.filter(i=>i&&i.checked&&!i.disabled).map(i=>i.value);return{value:n,isValid:!!n.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!x(e[0].attributes.value)?x(e[0].value)||e[0].value===""?Ye:{value:e[0].value,isValid:!0}:Ye:Ke}return Ke};const $e={isValid:!1,value:null};var rt=e=>Array.isArray(e)?e.reduce((n,i)=>i&&i.checked&&!i.disabled?{isValid:!0,value:i.value}:n,$e):$e;function Je(e,n,i="validate"){if(de(e)||Array.isArray(e)&&e.every(de)||K(e)&&!e)return{type:i,message:de(e)?e:"",ref:n}}var te=e=>O(e)&&!ge(e)?e:{value:e,message:""},Qe=async(e,n,i,r,l)=>{const{ref:a,refs:f,required:b,maxLength:V,minLength:p,min:X,max:w,pattern:_,validate:W,name:C,valueAsNumber:_e,mount:le,disabled:Ae}=e._f,h=y(n,C);if(!le||Ae)return{};const N=f?f[0]:a,G=A=>{r&&N.reportValidity&&(N.setCustomValidity(K(A)?"":A||""),N.reportValidity())},k={},se=Ce(a),Z=ue(a),be=se||Z,P=(_e||pe(a))&&x(a.value)&&x(h)||ye(a)&&a.value===""||h===""||Array.isArray(h)&&!h.length,$=St.bind(null,C,i,k),j=(A,v,D,L=z.maxLength,M=z.minLength)=>{const I=A?v:D;k[C]={type:A?L:M,message:I,ref:a,...$(A?L:M,I)}};if(l?!Array.isArray(h)||!h.length:b&&(!be&&(P||m(h))||K(h)&&!h||Z&&!tt(f).isValid||se&&!rt(f).isValid)){const{value:A,message:v}=de(b)?{value:!!b,message:b}:te(b);if(A&&(k[C]={type:z.required,message:v,ref:N,...$(z.required,v)},!i))return G(v),k}if(!P&&(!m(X)||!m(w))){let A,v;const D=te(w),L=te(X);if(!m(h)&&!isNaN(h)){const M=a.valueAsNumber||h&&+h;m(D.value)||(A=M>D.value),m(L.value)||(v=M<L.value)}else{const M=a.valueAsDate||new Date(h),I=oe=>new Date(new Date().toDateString()+" "+oe),J=a.type=="time",ie=a.type=="week";q(D.value)&&h&&(A=J?I(h)>I(D.value):ie?h>D.value:M>new Date(D.value)),q(L.value)&&h&&(v=J?I(h)<I(L.value):ie?h<L.value:M<new Date(L.value))}if((A||v)&&(j(!!A,D.message,L.message,z.max,z.min),!i))return G(k[C].message),k}if((V||p)&&!P&&(q(h)||l&&Array.isArray(h))){const A=te(V),v=te(p),D=!m(A.value)&&h.length>+A.value,L=!m(v.value)&&h.length<+v.value;if((D||L)&&(j(D,A.message,v.message),!i))return G(k[C].message),k}if(_&&!P&&q(h)){const{value:A,message:v}=te(_);if(ge(A)&&!h.match(A)&&(k[C]={type:z.pattern,message:v,ref:a,...$(z.pattern,v)},!i))return G(v),k}if(W){if(Y(W)){const A=await W(h,n),v=Je(A,N);if(v&&(k[C]={...v,...$(z.validate,v.message)},!i))return G(v.message),k}else if(O(W)){let A={};for(const v in W){if(!R(A)&&!i)break;const D=Je(await W[v](h,n),N,v);D&&(A={...D,...$(v,D.message)},G(D.message),i&&(k[C]=A))}if(!R(A)&&(k[C]={ref:N,...A},!i))return k}}return G(!0),k};function xt(e,n){const i=n.slice(0,-1).length;let r=0;for(;r<i;)e=x(e)?r++:e[n[r++]];return e}function Ft(e){for(const n in e)if(e.hasOwnProperty(n)&&!x(e[n]))return!1;return!0}function T(e,n){const i=Array.isArray(n)?n:Le(n)?[n]:et(n),r=i.length===1?e:xt(e,i),l=i.length-1,a=i[l];return r&&delete r[a],l!==0&&(O(r)&&R(r)||Array.isArray(r)&&Ft(r))&&T(e,i.slice(0,-1)),e}function we(){let e=[];return{get observers(){return e},next:l=>{for(const a of e)a.next&&a.next(l)},subscribe:l=>(e.push(l),{unsubscribe:()=>{e=e.filter(a=>a!==l)}}),unsubscribe:()=>{e=[]}}}var he=e=>m(e)||!Ze(e);function Q(e,n){if(he(e)||he(n))return e===n;if(re(e)&&re(n))return e.getTime()===n.getTime();const i=Object.keys(e),r=Object.keys(n);if(i.length!==r.length)return!1;for(const l of i){const a=e[l];if(!r.includes(l))return!1;if(l!=="ref"){const f=n[l];if(re(a)&&re(f)||O(a)&&O(f)||Array.isArray(a)&&Array.isArray(f)?!Q(a,f):a!==f)return!1}}return!0}var st=e=>e.type==="select-multiple",wt=e=>Ce(e)||ue(e),Oe=e=>ye(e)&&e.isConnected,it=e=>{for(const n in e)if(Y(e[n]))return!0;return!1};function ve(e,n={}){const i=Array.isArray(e);if(O(e)||i)for(const r in e)Array.isArray(e[r])||O(e[r])&&!it(e[r])?(n[r]=Array.isArray(e[r])?[]:{},ve(e[r],n[r])):m(e[r])||(n[r]=!0);return n}function nt(e,n,i){const r=Array.isArray(e);if(O(e)||r)for(const l in e)Array.isArray(e[l])||O(e[l])&&!it(e[l])?x(n)||he(i[l])?i[l]=Array.isArray(e[l])?ve(e[l],[]):{...ve(e[l])}:nt(e[l],m(n)?{}:n[l],i[l]):i[l]=!Q(e[l],n[l]);return i}var ke=(e,n)=>nt(e,n,ve(n)),ut=(e,{valueAsNumber:n,valueAsDate:i,setValueAs:r})=>x(e)?e:n?e===""?NaN:e&&+e:i&&q(e)?new Date(e):r?r(e):e;function Te(e){const n=e.ref;if(!(e.refs?e.refs.every(i=>i.disabled):n.disabled))return pe(n)?n.files:Ce(n)?rt(e.refs).value:st(n)?[...n.selectedOptions].map(({value:i})=>i):ue(n)?tt(e.refs).value:ut(x(n.value)?e.ref.value:n.value,e)}var Ot=(e,n,i,r)=>{const l={};for(const a of e){const f=y(n,a);f&&S(l,a,f._f)}return{criteriaMode:i,names:[...e],fields:l,shouldUseNativeValidation:r}},ne=e=>x(e)?e:ge(e)?e.source:O(e)?ge(e.value)?e.value.source:e.value:e,kt=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function Xe(e,n,i){const r=y(e,i);if(r||Le(i))return{error:r,name:i};const l=i.split(".");for(;l.length;){const a=l.join("."),f=y(n,a),b=y(e,a);if(f&&!Array.isArray(f)&&i!==a)return{name:i};if(b&&b.type)return{name:a,error:b};l.pop()}return{name:i}}var Tt=(e,n,i,r,l)=>l.isOnAll?!1:!i&&l.isOnTouch?!(n||e):(i?r.isOnBlur:l.isOnBlur)?!e:(i?r.isOnChange:l.isOnChange)?e:!0,mt=(e,n)=>!ae(y(e,n)).length&&T(e,n);const Lt={mode:U.onSubmit,reValidateMode:U.onChange,shouldFocusError:!0};function pt(e={},n){let i={...Lt,...e},r={submitCount:0,isDirty:!1,isLoading:Y(i.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{},disabled:!1},l={},a=O(i.defaultValues)||O(i.values)?H(i.defaultValues||i.values)||{}:{},f=i.shouldUnregister?{}:H(a),b={action:!1,mount:!1,watch:!1},V={mount:new Set,unMount:new Set,array:new Set,watch:new Set},p,X=0;const w={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},_={values:we(),array:we(),state:we()},W=e.resetOptions&&e.resetOptions.keepDirtyValues,C=He(i.mode),_e=He(i.reValidateMode),le=i.criteriaMode===U.all,Ae=t=>s=>{clearTimeout(X),X=setTimeout(t,s)},h=async t=>{if(w.isValid||t){const s=i.resolver?R((await P()).errors):await j(l,!0);s!==r.isValid&&_.state.next({isValid:s})}},N=t=>w.isValidating&&_.state.next({isValidating:t}),G=(t,s=[],u,d,c=!0,o=!0)=>{if(d&&u){if(b.action=!0,o&&Array.isArray(y(l,t))){const g=u(y(l,t),d.argA,d.argB);c&&S(l,t,g)}if(o&&Array.isArray(y(r.errors,t))){const g=u(y(r.errors,t),d.argA,d.argB);c&&S(r.errors,t,g),mt(r.errors,t)}if(w.touchedFields&&o&&Array.isArray(y(r.touchedFields,t))){const g=u(y(r.touchedFields,t),d.argA,d.argB);c&&S(r.touchedFields,t,g)}w.dirtyFields&&(r.dirtyFields=ke(a,f)),_.state.next({name:t,isDirty:v(t,s),dirtyFields:r.dirtyFields,errors:r.errors,isValid:r.isValid})}else S(f,t,s)},k=(t,s)=>{S(r.errors,t,s),_.state.next({errors:r.errors})},se=(t,s,u,d)=>{const c=y(l,t);if(c){const o=y(f,t,x(u)?y(a,t):u);x(o)||d&&d.defaultChecked||s?S(f,t,s?o:Te(c._f)):M(t,o),b.mount&&h()}},Z=(t,s,u,d,c)=>{let o=!1,g=!1;const E={name:t};if(!u||d){w.isDirty&&(g=r.isDirty,r.isDirty=E.isDirty=v(),o=g!==E.isDirty);const F=Q(y(a,t),s);g=y(r.dirtyFields,t),F?T(r.dirtyFields,t):S(r.dirtyFields,t,!0),E.dirtyFields=r.dirtyFields,o=o||w.dirtyFields&&g!==!F}if(u){const F=y(r.touchedFields,t);F||(S(r.touchedFields,t,u),E.touchedFields=r.touchedFields,o=o||w.touchedFields&&F!==u)}return o&&c&&_.state.next(E),o?E:{}},be=(t,s,u,d)=>{const c=y(r.errors,t),o=w.isValid&&K(s)&&r.isValid!==s;if(e.delayError&&u?(p=Ae(()=>k(t,u)),p(e.delayError)):(clearTimeout(X),p=null,u?S(r.errors,t,u):T(r.errors,t)),(u?!Q(c,u):c)||!R(d)||o){const g={...d,...o&&K(s)?{isValid:s}:{},errors:r.errors,name:t};r={...r,...g},_.state.next(g)}N(!1)},P=async t=>i.resolver(f,i.context,Ot(t||V.mount,l,i.criteriaMode,i.shouldUseNativeValidation)),$=async t=>{const{errors:s}=await P(t);if(t)for(const u of t){const d=y(s,u);d?S(r.errors,u,d):T(r.errors,u)}else r.errors=s;return s},j=async(t,s,u={valid:!0})=>{for(const d in t){const c=t[d];if(c){const{_f:o,...g}=c;if(o){const E=V.array.has(o.name),F=await Qe(c,f,le,i.shouldUseNativeValidation&&!s,E);if(F[o.name]&&(u.valid=!1,s))break;!s&&(y(F,o.name)?E?Dt(r.errors,F,o.name):S(r.errors,o.name,F[o.name]):T(r.errors,o.name))}g&&await j(g,s,u)}}return u.valid},A=()=>{for(const t of V.unMount){const s=y(l,t);s&&(s._f.refs?s._f.refs.every(u=>!Oe(u)):!Oe(s._f.ref))&&Ee(t)}V.unMount=new Set},v=(t,s)=>(t&&s&&S(f,t,s),!Q(Me(),a)),D=(t,s,u)=>Et(t,V,{...b.mount?f:x(s)?a:q(t)?{[t]:s}:s},u,s),L=t=>ae(y(b.mount?f:a,t,e.shouldUnregister?y(a,t,[]):[])),M=(t,s,u={})=>{const d=y(l,t);let c=s;if(d){const o=d._f;o&&(!o.disabled&&S(f,t,ut(s,o)),c=ye(o.ref)&&m(s)?"":s,st(o.ref)?[...o.ref.options].forEach(g=>g.selected=c.includes(g.value)):o.refs?ue(o.ref)?o.refs.length>1?o.refs.forEach(g=>(!g.defaultChecked||!g.disabled)&&(g.checked=Array.isArray(c)?!!c.find(E=>E===g.value):c===g.value)):o.refs[0]&&(o.refs[0].checked=!!c):o.refs.forEach(g=>g.checked=g.value===c):pe(o.ref)?o.ref.value="":(o.ref.value=c,o.ref.type||_.values.next({name:t,values:{...f}})))}(u.shouldDirty||u.shouldTouch)&&Z(t,c,u.shouldTouch,u.shouldDirty,!0),u.shouldValidate&&Ve(t)},I=(t,s,u)=>{for(const d in s){const c=s[d],o=`${t}.${d}`,g=y(l,o);(V.array.has(t)||!he(c)||g&&!g._f)&&!re(c)?I(o,c,u):M(o,c,u)}},J=(t,s,u={})=>{const d=y(l,t),c=V.array.has(t),o=H(s);S(f,t,o),c?(_.array.next({name:t,values:{...f}}),(w.isDirty||w.dirtyFields)&&u.shouldDirty&&_.state.next({name:t,dirtyFields:ke(a,f),isDirty:v(t,o)})):d&&!d._f&&!m(o)?I(t,o,u):M(t,o,u),We(t,V)&&_.state.next({...r}),_.values.next({name:t,values:{...f}}),!b.mount&&n()},ie=async t=>{const s=t.target;let u=s.name,d=!0;const c=y(l,u),o=()=>s.type?Te(c._f):gt(t),g=E=>{d=Number.isNaN(E)||E===y(f,u,E)};if(c){let E,F;const ce=o(),ee=t.type===ze.BLUR||t.type===ze.FOCUS_OUT,ft=!kt(c._f)&&!i.resolver&&!y(r.errors,u)&&!c._f.deps||Tt(ee,y(r.touchedFields,u),r.isSubmitted,_e,C),De=We(u,V,ee);S(f,u,ce),ee?(c._f.onBlur&&c._f.onBlur(t),p&&p(0)):c._f.onChange&&c._f.onChange(t);const xe=Z(u,ce,ee,!1),dt=!R(xe)||De;if(!ee&&_.values.next({name:u,type:t.type,values:{...f}}),ft)return w.isValid&&h(),dt&&_.state.next({name:u,...De?{}:xe});if(!ee&&De&&_.state.next({...r}),N(!0),i.resolver){const{errors:Ge}=await P([u]);if(g(ce),d){const yt=Xe(r.errors,l,u),je=Xe(Ge,l,yt.name||u);E=je.error,u=je.name,F=R(Ge)}}else E=(await Qe(c,f,le,i.shouldUseNativeValidation))[u],g(ce),d&&(E?F=!1:w.isValid&&(F=await j(l,!0)));d&&(c._f.deps&&Ve(c._f.deps),be(u,F,E,xe))}},oe=(t,s)=>{if(y(r.errors,s)&&t.focus)return t.focus(),1},Ve=async(t,s={})=>{let u,d;const c=Fe(t);if(N(!0),i.resolver){const o=await $(x(t)?t:c);u=R(o),d=t?!c.some(g=>y(o,g)):u}else t?(d=(await Promise.all(c.map(async o=>{const g=y(l,o);return await j(g&&g._f?{[o]:g}:g)}))).every(Boolean),!(!d&&!r.isValid)&&h()):d=u=await j(l);return _.state.next({...!q(t)||w.isValid&&u!==r.isValid?{}:{name:t},...i.resolver||!t?{isValid:u}:{},errors:r.errors,isValidating:!1}),s.shouldFocus&&!d&&fe(l,oe,t?c:V.mount),d},Me=t=>{const s={...a,...b.mount?f:{}};return x(t)?s:q(t)?y(s,t):t.map(u=>y(s,u))},Re=(t,s)=>({invalid:!!y((s||r).errors,t),isDirty:!!y((s||r).dirtyFields,t),isTouched:!!y((s||r).touchedFields,t),error:y((s||r).errors,t)}),at=t=>{t&&Fe(t).forEach(s=>T(r.errors,s)),_.state.next({errors:t?r.errors:{}})},Ne=(t,s,u)=>{const d=(y(l,t,{_f:{}})._f||{}).ref;S(r.errors,t,{...s,ref:d}),_.state.next({name:t,errors:r.errors,isValid:!1}),u&&u.shouldFocus&&d&&d.focus&&d.focus()},lt=(t,s)=>Y(t)?_.values.subscribe({next:u=>t(D(void 0,s),u)}):D(t,s,!0),Ee=(t,s={})=>{for(const u of t?Fe(t):V.mount)V.mount.delete(u),V.array.delete(u),s.keepValue||(T(l,u),T(f,u)),!s.keepError&&T(r.errors,u),!s.keepDirty&&T(r.dirtyFields,u),!s.keepTouched&&T(r.touchedFields,u),!i.shouldUnregister&&!s.keepDefaultValue&&T(a,u);_.values.next({values:{...f}}),_.state.next({...r,...s.keepDirty?{isDirty:v()}:{}}),!s.keepIsValid&&h()},Ue=({disabled:t,name:s,field:u,fields:d,value:c})=>{if(K(t)){const o=t?void 0:x(c)?Te(u?u._f:y(d,s)._f):c;S(f,s,o),Z(s,o,!1,!1,!0)}},Se=(t,s={})=>{let u=y(l,t);const d=K(s.disabled);return S(l,t,{...u||{},_f:{...u&&u._f?u._f:{ref:{name:t}},name:t,mount:!0,...s}}),V.mount.add(t),u?Ue({field:u,disabled:s.disabled,name:t}):se(t,!0,s.value),{...d?{disabled:s.disabled}:{},...i.progressive?{required:!!s.required,min:ne(s.min),max:ne(s.max),minLength:ne(s.minLength),maxLength:ne(s.maxLength),pattern:ne(s.pattern)}:{},name:t,onChange:ie,onBlur:ie,ref:c=>{if(c){Se(t,s),u=y(l,t);const o=x(c.value)&&c.querySelectorAll&&c.querySelectorAll("input,select,textarea")[0]||c,g=wt(o),E=u._f.refs||[];if(g?E.find(F=>F===o):o===u._f.ref)return;S(l,t,{_f:{...u._f,...g?{refs:[...E.filter(Oe),o,...Array.isArray(y(a,t))?[{}]:[]],ref:{type:o.type,name:t}}:{ref:o}}}),se(t,!1,void 0,o)}else u=y(l,t,{}),u._f&&(u._f.mount=!1),(i.shouldUnregister||s.shouldUnregister)&&!(vt(V.array,t)&&b.action)&&V.unMount.add(t)}}},Pe=()=>i.shouldFocusError&&fe(l,oe,V.mount),ot=t=>{K(t)&&(_.state.next({disabled:t}),fe(l,s=>{s.disabled=t},0,!1))},Ie=(t,s)=>async u=>{u&&(u.preventDefault&&u.preventDefault(),u.persist&&u.persist());let d=H(f);if(_.state.next({isSubmitting:!0}),i.resolver){const{errors:c,values:o}=await P();r.errors=c,d=o}else await j(l);T(r.errors,"root"),R(r.errors)?(_.state.next({errors:{}}),await t(d,u)):(s&&await s({...r.errors},u),Pe(),setTimeout(Pe)),_.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:R(r.errors),submitCount:r.submitCount+1,errors:r.errors})},ct=(t,s={})=>{y(l,t)&&(x(s.defaultValue)?J(t,y(a,t)):(J(t,s.defaultValue),S(a,t,s.defaultValue)),s.keepTouched||T(r.touchedFields,t),s.keepDirty||(T(r.dirtyFields,t),r.isDirty=s.defaultValue?v(t,y(a,t)):v()),s.keepError||(T(r.errors,t),w.isValid&&h()),_.state.next({...r}))},Be=(t,s={})=>{const u=t?H(t):a,d=H(u),c=t&&!R(t)?d:a;if(s.keepDefaultValues||(a=u),!s.keepValues){if(s.keepDirtyValues||W)for(const o of V.mount)y(r.dirtyFields,o)?S(c,o,y(f,o)):J(o,y(c,o));else{if(me&&x(t))for(const o of V.mount){const g=y(l,o);if(g&&g._f){const E=Array.isArray(g._f.refs)?g._f.refs[0]:g._f.ref;if(ye(E)){const F=E.closest("form");if(F){F.reset();break}}}}l={}}f=e.shouldUnregister?s.keepDefaultValues?H(a):{}:H(c),_.array.next({values:{...c}}),_.values.next({values:{...c}})}V={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},!b.mount&&n(),b.mount=!w.isValid||!!s.keepIsValid,b.watch=!!e.shouldUnregister,_.state.next({submitCount:s.keepSubmitCount?r.submitCount:0,isDirty:s.keepDirty?r.isDirty:!!(s.keepDefaultValues&&!Q(t,a)),isSubmitted:s.keepIsSubmitted?r.isSubmitted:!1,dirtyFields:s.keepDirtyValues?r.dirtyFields:s.keepDefaultValues&&t?ke(a,t):{},touchedFields:s.keepTouched?r.touchedFields:{},errors:s.keepErrors?r.errors:{},isSubmitSuccessful:s.keepIsSubmitSuccessful?r.isSubmitSuccessful:!1,isSubmitting:!1})},qe=(t,s)=>Be(Y(t)?t(f):t,s);return{control:{register:Se,unregister:Ee,getFieldState:Re,handleSubmit:Ie,setError:Ne,_executeSchema:P,_getWatch:D,_getDirty:v,_updateValid:h,_removeUnmounted:A,_updateFieldArray:G,_updateDisabledField:Ue,_getFieldArray:L,_reset:Be,_resetDefaultValues:()=>Y(i.defaultValues)&&i.defaultValues().then(t=>{qe(t,i.resetOptions),_.state.next({isLoading:!1})}),_updateFormState:t=>{r={...r,...t}},_disableForm:ot,_subjects:_,_proxyFormState:w,get _fields(){return l},get _formValues(){return f},get _state(){return b},set _state(t){b=t},get _defaultValues(){return a},get _names(){return V},set _names(t){V=t},get _formState(){return r},set _formState(t){r=t},get _options(){return i},set _options(t){i={...i,...t}}},trigger:Ve,register:Se,handleSubmit:Ie,watch:lt,setValue:J,getValues:Me,reset:qe,resetField:ct,clearErrors:at,unregister:Ee,setError:Ne,setFocus:(t,s={})=>{const u=y(l,t),d=u&&u._f;if(d){const c=d.refs?d.refs[0]:d.ref;c.focus&&(c.focus(),s.shouldSelect&&c.select())}},getFieldState:Re}}function Ut(e={}){const n=B.useRef(),i=B.useRef(),[r,l]=B.useState({isDirty:!1,isValidating:!1,isLoading:Y(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},disabled:!1,defaultValues:Y(e.defaultValues)?void 0:e.defaultValues});n.current||(n.current={...pt(e,()=>l(f=>({...f}))),formState:r});const a=n.current.control;return a._options=e,Vt({subject:a._subjects.state,next:f=>{bt(f,a._proxyFormState,a._updateFormState,!0)&&l({...a._formState})}}),B.useEffect(()=>a._disableForm(e.disabled),[a,e.disabled]),B.useEffect(()=>{if(a._proxyFormState.isDirty){const f=a._getDirty();f!==r.isDirty&&a._subjects.state.next({isDirty:f})}},[a,r.isDirty]),B.useEffect(()=>{e.values&&!Q(e.values,i.current)?(a._reset(e.values,a._options.resetOptions),i.current=e.values):a._resetDefaultValues()},[e.values,a]),B.useEffect(()=>{a._state.mount||(a._updateValid(),a._state.mount=!0),a._state.watch&&(a._state.watch=!1,a._subjects.state.next({...a._formState})),a._removeUnmounted()}),n.current.formState=At(r,a),n.current}const Pt=Object.freeze({ACCEPT:"Aceptar",CANCEL:"Cancelar",CLOSE:"Cerrar"}),It=Object.freeze({TYPE_DELETE:"delete",TYPE_DESCRIPTION:"description",TYPE_LOADER:"loader",TYPE_SUCCESS_RESET:"success-reset"}),Bt=Object.freeze({DESCRIPTION:"Descripción"}),qt=Object.freeze({DEL_TASK_MSG:"¿Está seguro que desea eliminar la siguiente tarea?"}),Gt=Object.freeze({NOT_FOUND_MSG:"El correo ingresado no se encuentra asociado a ninguna cuenta",IN_USE_MSG:"El correo ingresado ya se encuentra asociado a otra cuenta"}),jt=Object.freeze({RESET_MSG:"Correo enviado exitosamente, revisa tu bandeja de entrada"});export{It as M,jt as a,Pt as b,Gt as c,qt as d,Bt as e,Ut as u};