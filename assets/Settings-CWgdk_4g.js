const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/InfoAccount-DedG6Ev9.js","assets/index-DraJqHaJ.js","assets/index-DMMcr_Sx.css","assets/ConfigEmail-DQij7Gvi.js","assets/ConfigPassword-CXHT_cyN.js"])))=>i.map(i=>d[i]);
import{r as s,j as e,C as u,_ as a}from"./index-DraJqHaJ.js";const l=s.createContext(),x=()=>s.useContext(l);function E({children:t}){const[o,n]=s.useState({cfgInfo:!1,cfgEmail:!1,cfgPass:!1}),i=()=>{n({cfgEmail:!1,cfgPass:!1,cfgInfo:!0})},c=()=>{n({cfgInfo:!1,cfgPass:!1,cfgEmail:!0})},r=()=>{n({cfgInfo:!1,cfgEmail:!1,cfgPass:!0})};return e.jsx(l.Provider,{value:{viewInfoAccount:i,viewEmailInfo:c,viewPasswordInfo:r,viewConfig:o},children:t})}const I={TITLE:"Configuración",INFO_ACCOUNT:"Información de la cuenta",INFO_EMAIL:"Correo",INFO_PASS:"Contraseña",REG_DATE:"Fecha de registro",REG_METHOD:"Método de registro",TYPE_GOOGLE:"Cuenta de Google",TYPE_EMAIL:"Correo Electrónico"},j=s.lazy(()=>a(()=>import("./InfoAccount-DedG6Ev9.js"),__vite__mapDeps([0,1,2]))),m=s.lazy(()=>a(()=>import("./ConfigEmail-DQij7Gvi.js"),__vite__mapDeps([3,1,2]))),C=s.lazy(()=>a(()=>import("./ConfigPassword-CXHT_cyN.js"),__vite__mapDeps([4,1,2])));function P(){const{viewInfoAccount:t,viewEmailInfo:o,viewPasswordInfo:n,viewConfig:{cfgEmail:i,cfgInfo:c,cfgPass:r}}=x(),{INFO_ACCOUNT:f,INFO_EMAIL:g,INFO_PASS:_,TITLE:d}=I;return e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:d}),e.jsxs("section",{className:"settings-block",children:[e.jsx("aside",{className:"aside-settings",children:e.jsxs("ul",{children:[e.jsx("li",{onClick:t,children:f}),e.jsx("li",{onClick:o,children:g}),e.jsx("li",{onClick:n,children:_})]})}),e.jsx("section",{className:"frame-settings",children:e.jsxs(s.Suspense,{fallback:e.jsx(u,{}),children:[c?e.jsx(j,{}):e.jsx(e.Fragment,{}),i?e.jsx(m,{}):e.jsx(e.Fragment,{}),r?e.jsx(C,{}):e.jsx(e.Fragment,{})]})})]})]})}function S(){return e.jsx(E,{children:e.jsx("main",{children:e.jsx(P,{})})})}const v=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"}));export{I as S,v as a};
