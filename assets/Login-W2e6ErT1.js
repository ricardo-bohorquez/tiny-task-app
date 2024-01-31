import{ce as z,ck as d,cf as e,ci as Y,cg as k,ch as V,cm as W,bp as q,cn as $}from"./index-AUmvy9ZB.js";import{u as U,M as B}from"./modalsConstants-3m47ZPcC.js";import{M as X,E as J,b as K,L as Q}from"./loginConstants-4L_T25aD.js";import{H as Z}from"./headerConstants-7m8t-61l.js";import{d as m,c as ee}from"./customParseFormat-4E9ifUIE.js";const se=Object.freeze({mail:{required:{value:!0,message:"Correo electrónico requerido"},pattern:{value:/^[a-z0-9._-]+@[a-z0-9._]+\.[a-z]{2,4}$/g,message:"Correo inválido"}},password:{required:!0}}),te="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%20width='48px'%20height='48px'%3e%3cpath%20fill='%23FFC107'%20d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'/%3e%3cpath%20fill='%23FF3D00'%20d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'/%3e%3cpath%20fill='%234CAF50'%20d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'/%3e%3cpath%20fill='%231976D2'%20d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'/%3e%3c/svg%3e";m.extend(ee);m.locale("es");function de(){const{signIn:f,viewModal:s,setViewModal:t,resetModalProps:c,user:E,googleLogin:_}=z(),{register:p,handleSubmit:R,formState:{errors:u}}=U(),{mail:j,password:L}=se,{USER_NOT_FOUND:r,WRONG_PASSWORD:O}=J,{TYPE_LOADER:g}=B,{GOOGLE_LOGIN:w,OPTION_TEXT:N}=K,{EMAIL_PLACEHOLDER:S,PASS_PLACEHOLDER:b,ENTRY:C,WRONG:y,LOST_PASS:D,RECOVER_HERE:M}=Q,{SING_IN:v}=Z,[F,i]=d.useState({}),[G,l]=d.useState({}),[P,h]=d.useState(!1),T=async(a,o)=>{t({...s,state:!0,type:g});try{await f(a,o),t(c)}catch({code:n}){n===`auth/${r}`&&(t(c),h(!1),l({border:"none"}),t({...s,state:!0,type:r}),i({border:"1px solid red"})),n===`auth/${O}`&&(t(c),i({border:"none"}),h(!0),l({border:"1px solid red"}))}},I=async()=>{const{user:{uid:a,displayName:o}}=await _(),{getDoc:n,setDoc:A}=await W(()=>import("./index.esm-mfH3f8Gz.js"),__vite__mapDeps([0,1,2])),H={loginWithGoogle:!0,displayName:"",accountCreationDate:m().format("DD/MM/YYYY"),listOfTask:{pending:[],performed:[]}},x=q($,"users",a);if((await n(x)).exists())return{};await A(x,{...H,displayName:o})};return E?e.jsx(Y,{to:"/dashboard"}):e.jsxs("main",{children:[e.jsx("section",{className:"title-login-register",children:e.jsx("h2",{style:{height:"fit-content",margin:"auto"},children:v})}),e.jsxs("form",{onSubmit:R(({mail:a,password:o})=>{T(a,o)}),className:"login-form",children:[e.jsx("input",{type:"email",style:F,onFocus:()=>i({border:"none"}),placeholder:S,...p("mail",j)}),u.mail&&e.jsx("span",{className:"text-white span-error-taskform",children:u.mail.message}),e.jsx("input",{type:"password",style:G,onFocus:()=>l({border:"none"}),placeholder:b,...p("password",L)}),P?e.jsx("label",{className:"text-white span-error-taskform",children:y}):e.jsx(e.Fragment,{}),e.jsxs("label",{children:[D,e.jsx(k,{href:"/password-recovery",children:M})]}),e.jsx("button",{children:C}),s.state&&s.type===g?e.jsx(V,{}):e.jsx(e.Fragment,{}),s.state&&s.type===r?e.jsx(X,{type:r}):e.jsx(e.Fragment,{})]}),e.jsx("label",{children:N}),e.jsxs("button",{className:"login-google-button",onClick:I,children:[w,e.jsx("img",{src:te})]})]})}export{de as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index.esm-mfH3f8Gz.js","assets/index-AUmvy9ZB.js","assets/index-RTFP5FMh.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}