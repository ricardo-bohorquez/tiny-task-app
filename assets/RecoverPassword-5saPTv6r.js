import{ce as d,cf as e,cp as T,ci as h,ch as j}from"./index-AUmvy9ZB.js";import{a as P,b as _,u as f,M}from"./modalsConstants-3m47ZPcC.js";import{M as y,E as O,L as g}from"./loginConstants-4L_T25aD.js";const N=Object.freeze({emailToResetPass:{required:{value:!0,message:"Correo electrónico requerido"},pattern:{value:/^[a-z0-9._-]+@[a-z0-9._]+\.[a-z]{2,4}$/g,message:"Correo inválido"}}});function v(){const{resetModalProps:o,setViewModal:t}=d(),{RESET_MSG:s}=P,{ACCEPT:r}=_;return e.jsx("section",{className:"modal-body",style:{display:"flex"},children:e.jsxs("div",{className:"modal-content modal-login-error",children:[e.jsx("h3",{children:s}),e.jsx("button",{onClick:()=>{t(o),T("/login")},children:r})]})})}function b(){const{recoverPassword:o,setViewModal:t,viewModal:s,user:r}=d(),{register:m,handleSubmit:u,formState:{errors:c}}=f(),{emailToResetPass:R}=N,{TYPE_SUCCESS_RESET:i,TYPE_LOADER:l}=M,{USER_NOT_FOUND:a}=O,{EMAIL_PLACEHOLDER:E,RESET:p}=g,x=async n=>{t({...s,state:!0,type:l});try{await o(n),t({...s,state:!0,type:i})}catch({code:S}){S===`auth/${a}`&&t({...s,state:!0,type:a})}};return r?e.jsx(h,{to:"/dashboard"}):e.jsx("main",{children:e.jsxs("form",{className:"recover-pass-form",onSubmit:u(({emailToResetPass:n})=>{x(n)}),children:[e.jsx("input",{type:"email",placeholder:E,autoComplete:"off",...m("emailToResetPass",R)}),c.emailToResetPass&&e.jsx("span",{className:"text-white span-error-taskform",children:c.emailToResetPass.message}),e.jsx("button",{children:p}),s.state&&s.type===l?e.jsx(j,{}):e.jsx(e.Fragment,{}),s.state&&s.type===a?e.jsx(y,{type:a}):e.jsx(e.Fragment,{}),s.state&&s.type===i?e.jsx(v,{}):e.jsx(e.Fragment,{})]})})}export{b as default};