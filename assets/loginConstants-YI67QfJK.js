import{ce as l,cf as e}from"./index-tupzdFi5.js";import{c as E,b as O}from"./modalsConstants--FrkIcP1.js";const _="data:image/svg+xml,%3c?xml%20version='1.0'?%3e%3csvg%20width='512'%20height='512'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3c!--!%20Font%20Awesome%20Pro%206.4.0%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license%20(Commercial%20License)%20Copyright%202023%20Fonticons,%20Inc.%20--%3e%3cg%20class='layer'%3e%3ctitle%3eLayer%201%3c/title%3e%3cpath%20d='m256,48a208,208%200%201%201%200,416a208,208%200%201%201%200,-416zm0,464a256,256%200%201%200%200,-512a256,256%200%201%200%200,512zm-81,-337c-9.4,9.4%20-9.4,24.6%200,33.9l47,47l-47,47c-9.4,9.4%20-9.4,24.6%200,33.9s24.6,9.4%2033.9,0l47,-47l47,47c9.4,9.4%2024.6,9.4%2033.9,0s9.4,-24.6%200,-33.9l-47,-47l47,-47c9.4,-9.4%209.4,-24.6%200,-33.9s-24.6,-9.4%20-33.9,0l-47,47l-47,-47c-9.4,-9.4%20-24.6,-9.4%20-33.9,0z'%20fill='%23925252'%20id='svg_1'/%3e%3c/g%3e%3c/svg%3e",R=Object.freeze({USER_NOT_FOUND:"user-not-found",EMAIL_IN_USE:"email-already-in-use",WRONG_PASSWORD:"wrong-password"}),L=Object.freeze({EMAIL_NOT_MATCH:"Los correos deben coincidir",PASS_NOT_MATCH:"Las constraseñas deben coincidir"});function N({type:s=""}){const{resetModalProps:o,setViewModal:c}=l(),{EMAIL_IN_USE:r,USER_NOT_FOUND:t}=R,{IN_USE_MSG:a,NOT_FOUND_MSG:n}=E,{ACCEPT:i}=O;return e.jsx("section",{className:"modal-body",id:"modal-error",style:{display:"flex"},children:e.jsxs("div",{className:"modal-content",children:[s===t?e.jsx("h3",{children:n}):e.jsx(e.Fragment,{}),s===r?e.jsx("h3",{children:a}):e.jsx(e.Fragment,{}),e.jsx("img",{src:_,style:{width:"50px"}}),e.jsx("button",{onClick:()=>c(o),id:"acceptError",autoFocus:!0,children:i})]})})}const S=Object.freeze({OPTION_TEXT:" ó puedes ",GOOGLE_LOGIN:"Iniciar sesión con "}),A=Object.freeze({EMAIL_PLACEHOLDER:"Correo electrónico",EMAIL_CONFIRM_PLACEHOLDER:"Confirma el correo electrónico",PASS_PLACEHOLDER:"Contraseña",PASS_CONFIRM_PLACEHOLDER:"Confirma la contraseña",ENTRY:"Ingresar",REGISTER:"Registrarse",RESET:"Reestablecer",WRONG:"Contraseña incorrecta",LOST_PASS:"¿Olvidaste tu contraseña? ",RECOVER_HERE:" Recupérala aquí"});export{R as E,A as L,N as M,L as a,S as b};
