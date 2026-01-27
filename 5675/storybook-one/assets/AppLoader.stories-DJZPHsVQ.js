import{j as r,P as o}from"./iframe-jBdAviOK.js";import{I as i}from"./constants-CZYEPhht.js";import{a as n}from"./translate-921hfUGs.js";import{w as s}from"./withTranslation-CzsoIku5.js";import"./preload-helper-PPVm8Dsz.js";function t({t:a}){return r.jsx("div",{className:"tc-app-loader-container","aria-label":a("APP_LOADER_LOADING",{defaultValue:"Loading application"}),role:"status",children:r.jsx("div",{className:"tc-app-loader-icon",children:r.jsx("div",{className:"tc-app-loader",children:r.jsxs("div",{className:"spinner-wrapper",children:[r.jsx("div",{className:"spinner-left",children:r.jsx("div",{className:"circle"})}),r.jsx("div",{className:"spinner-right",children:r.jsx("div",{className:"circle"})})]})})})})}t.propTypes={t:o.func};t.defaultProps={t:n()};const p=s(i)(t),d=`* {
	box-sizing: border-box;
}

body {
	margin: 0;
	padding: 0;
}

.tc-app-loader-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f6f6f6;
  background: var(--coral-color-neutral-background-medium, #f6f6f6);
}

.tc-app-loader-icon {
  animation: app-loader-fadeIn 1.5s linear infinite;
  background-image: ICON_BASE_64;
  display: inline-block;
  position: relative;
  width: 151px;
  height: 151px;
  border-radius: 50%;
  margin: auto;
}

.tc-app-loader {
  animation: container-rotate 1568ms linear infinite;
  display: inline-block;
  position: relative;
  width: 165px;
  height: 165px;
  margin: -7px 0px 0px -7px;
}

.tc-app-loader .spinner-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-color: #ababab;
  border-color: var(--coral-color-neutral-border, #ababab);
  opacity: 1;
  animation: app-loader-spin 5332ms cubic-bezier(.4, 0, .2, 1) infinite both;
}

.tc-app-loader .spinner-left,
.tc-app-loader .spinner-right {
  display: inline-block;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-color: inherit;
}

.tc-app-loader .spinner-left {
  float: left !important;
}

.tc-app-loader .spinner-right {
  float: right !important;
}

.tc-app-loader .spinner-left .circle,
.tc-app-loader .spinner-right .circle {
  width: 165px;
  height: 165px;
  content: '';
  border-width: 4.5px;
  border-style: solid;
  border-color: inherit;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  animation: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}

.tc-app-loader .spinner-left .circle {
  animation: left-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both;
  left: 0;
  border-right-color: transparent !important;
  transform: rotate(129deg);
}

.tc-app-loader .spinner-right .circle {
  animation: right-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both;
  left: -100%;
  border-left-color: transparent !important;
  transform: rotate(-129deg);
}

@keyframes container-rotate {
  100% {
      transform: rotate(360deg);
  }
}

@keyframes app-loader-spin {
  12.5% {
      transform: rotate(135deg);
  }
  25% {
      transform: rotate(270deg);
  }
  37.5% {
      transform: rotate(405deg);
  }
  50% {
      transform: rotate(540deg);
  }
  62.5% {
      transform: rotate(675deg);
  }
  75% {
      transform: rotate(810deg);
  }
  87.5% {
      transform: rotate(945deg);
  }
  100% {
      transform: rotate(1080deg);
  }
}

@keyframes left-spin {
  0% {
      transform: rotate(130deg);
  }
  50% {
      transform: rotate(-5deg);
  }
  100% {
      transform: rotate(130deg);
  }
}

@keyframes right-spin {
  0% {
      transform: rotate(-130deg);
  }

  50% {
      transform: rotate(5deg);
  }
  100% {
      transform: rotate(-130deg);
  }
}

@keyframes app-loader-fadeIn {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}`,l=`<div class="tc-app-loader-container" aria-label="Loading application" role="status">
	<div class="tc-app-loader-icon">
		<div class="tc-app-loader" >
			<div class="spinner-wrapper">
				<div class="spinner-left" >
					<div class="circle"></div>
				</div>
				<div class="spinner-right">
					<div class="circle"></div>
				</div>
			</div>
		</div>
	</div>
</div>
`;function c(a=""){return d.replace("ICON_BASE_64",a)}const m={APP_LOADER:l,getLoaderStyle:c},f=({iconUrl:a})=>r.jsxs("div",{children:[r.jsx("style",{children:m.getLoaderStyle(`url(${a})`)}),r.jsx(p,{})]}),x={title:"Components/Design Principles/Loading Feedback/AppLoader",component:f,tags:["autodocs"]},e={args:{iconUrl:"https://statics.cloud.talend.com/@talend/icons/6.51.1/src/svg/products/logo-square.svg"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    iconUrl: 'https://statics.cloud.talend.com/@talend/icons/6.51.1/src/svg/products/logo-square.svg'
  }
}`,...e.parameters?.docs?.source}}};const y=["Default"];export{e as Default,y as __namedExportsOrder,x as default};
