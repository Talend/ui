"use strict";(self.webpackChunk_talend_react_containers=self.webpackChunk_talend_react_containers||[]).push([[654],{"./src/AppLoader/AppLoader.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Renderer:()=>Renderer,__namedExportsOrder:()=>__namedExportsOrder,default:()=>AppLoader_stories});var lib_esm=__webpack_require__("../cmf/lib-esm/index.js"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),redux_saga_effects_npm_proxy_esm=__webpack_require__("../../node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js"),browser=__webpack_require__("../../node_modules/invariant/browser.js"),browser_default=__webpack_require__.n(browser);function*waitFor(collectionName,interval=10){for(;;){if(void 0!==(yield(0,redux_saga_effects_npm_proxy_esm.Lt)(lib_esm.Ay.selectors.collections.get,collectionName)))break;yield(0,redux_saga_effects_npm_proxy_esm.cb)(interval)}}function*handleStep(step){return step.sagas?yield(0,redux_saga_effects_npm_proxy_esm.Q7)(step.sagas.map((saga=>(0,redux_saga_effects_npm_proxy_esm.T1)(lib_esm.Ay.sagas.get(saga))))):step.actionCreators?yield(0,redux_saga_effects_npm_proxy_esm.Q7)(step.actionCreators.map((actionCreator=>lib_esm.Ay.sagas.putActionCreator(actionCreator)))):step.waitFor?yield(0,redux_saga_effects_npm_proxy_esm.Q7)(step.waitFor.map((collectionName=>(0,redux_saga_effects_npm_proxy_esm.T1)(waitFor,collectionName)))):step.takeAction?yield(0,redux_saga_effects_npm_proxy_esm.Q7)(step.takeAction.map((actionName=>(0,redux_saga_effects_npm_proxy_esm.s)(actionName,actionName)))):browser_default()(!1,"Step object must have actionCreators or waitFor attribute")}var components_lib_esm=__webpack_require__("../components/lib-esm/index.js"),lodash=__webpack_require__("../../node_modules/lodash/lodash.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const CustomInject=(0,lib_esm.TJ)({omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(components_lib_esm.Inject),appLoaderRenderer=appLoaderElement=>appLoaderElement;function AppLoaderContainer({loading,renderer=appLoaderRenderer,children,...rest}){if(loading)return renderer((0,jsx_runtime.jsx)(components_lib_esm.AppLoader,{...rest}));const injected=components_lib_esm.Inject.all(rest.getComponent,rest.components,CustomInject);return(0,jsx_runtime.jsxs)("div",{children:[injected("before-children"),children||null,injected("after-children")]})}AppLoaderContainer.displayName="AppLoaderContainer",AppLoaderContainer.displayName="AppLoader",AppLoaderContainer.propTypes={children:prop_types_default().oneOfType([prop_types_default().element,prop_types_default().array]),loading:prop_types_default().bool,renderer:prop_types_default().func};const connected=(0,lib_esm.TJ)({mapStateToProps:function mapStateToProps(state,ownProps){return{loading:!(0,lodash.get)(ownProps,"hasCollections",[]).every((collectionName=>state.cmf.collections.has(collectionName)))}},omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(AppLoaderContainer);connected.sagas={appLoaderSaga:function*appLoaderSaga({steps}){for(const step of steps)yield(0,redux_saga_effects_npm_proxy_esm.T1)(handleStep,step)}};const AppLoader=connected;const ICON="url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+Cgk8ZyBmaWxsPSJub25lIj4KCQk8cGF0aCBkPSJNMTYgOEE4IDggMCAxIDEgMCA4YTggOCAwIDAgMSAxNiAwIiBjbGFzcz0idGktZGF0YXN0cmVhbXMtcG9zaXRpdmUtYmciIGZpbGw9IiM1ZDg4YWEiLz4KCQk8ZyBjbGFzcz0idGktZGF0YXN0cmVhbXMtcG9zaXRpdmUtbG9nbyIgZmlsbD0iI0ZGRiI+CgkJCTxwYXRoIGQ9Ik05LjI4OCAxMS40NTdjLS41NDMgMC0xLjA3OC0uMjYtMS41ODktLjc3MS0uNDAyLS40MDEtLjc5LS41ODUtMS4xNTYtLjU0NS0uNTY5LjA1OS0uOTU2LjYzNi0uOTYuNjQyYS4zNzMuMzczIDAgMCAxLS41MTYuMTEyLjM3NS4zNzUgMCAwIDEtLjExMi0uNTE3Yy4wMjQtLjAzNi41OC0uODgyIDEuNTEtLjk4MS42LS4wNjMgMS4xOTMuMTkyIDEuNzYyLjc2LjQuNDAyLjc5LjU4NCAxLjE2LjU0OC41ODItLjA2Ljk4NC0uNjQyLjk4Ny0uNjQ3YS4zNzUuMzc1IDAgMCAxIC41MTgtLjEwNi4zNzUuMzc1IDAgMCAxIC4xMDUuNTE5Yy0uMDI0LjAzNS0uNTk2Ljg4Mi0xLjUzNi45NzdhMS42NyAxLjY3IDAgMCAxLS4xNzMuMDA5bTAtMi41MjJjLS41NDMgMC0xLjA3OC0uMjU4LTEuNTg5LS43Ny0uNC0uNC0uNzg2LS41ODQtMS4xNTItLjU0Ni0uNTcyLjA1Ny0uOTYuNjM4LS45NjUuNjQ0YS4zNzQuMzc0IDAgMCAxLS42MjctLjQwNmMuMDI0LS4wMzYuNTgtLjg4MiAxLjUxLS45ODIuNi0uMDYzIDEuMTkzLjE5MyAxLjc2Mi43NjEuNC40MDEuNzkuNTg0IDEuMTYuNTQ3LjU4Mi0uMDU5Ljk4NC0uNjQyLjk4Ny0uNjQ3YS4zNzQuMzc0IDAgMCAxIC42MjMuNDEzYy0uMDI0LjAzNi0uNTk2Ljg4My0xLjUzNi45NzdhMS42NyAxLjY3IDAgMCAxLS4xNzMuMDFtMC0yLjUxMmMtLjU0MyAwLTEuMDc4LS4yNi0xLjU4OS0uNzcxLS40MDItLjQwMS0uNzktLjU4NS0xLjE1Ni0uNTQ2LS41NjkuMDYtLjk1Ni42MzctLjk2LjY0M2EuMzc0LjM3NCAwIDAgMS0uNjI4LS40MDVjLjAyNC0uMDM2LjU4LS44ODIgMS41MS0uOTgxLjYtLjA2NCAxLjE5My4xOTIgMS43NjIuNzYuNC40Ljc5LjU4NSAxLjE2LjU0OC41ODItLjA2Ljk4NC0uNjQyLjk4Ny0uNjQ3YS4zNzQuMzc0IDAgMCAxIC42MjMuNDEyYy0uMDI0LjAzNi0uNTk2Ljg4My0xLjUzNi45NzhhMS42NyAxLjY3IDAgMCAxLS4xNzMuMDA5Ii8+CgkJCTxwYXRoIGQ9Ik0yLjEwMyA4LjcwM0EuNzA1LjcwNSAwIDAgMCAyLjE5NiA3LjRhNS44MjQgNS44MjQgMCAwIDEgNC4wMTEtNC45OTljMi44NzYtLjkzNCA2LjAyNi41MTUgNy4xOTIgMy4zMDJsLS43MzQuMjM4IDEuMzc3Ljg2Ni42MDctMS41MS0uNzQuMjRDMTIuNjUgMi40NjYgOS4yMDEuODY1IDYuMDQzIDEuODkyQTYuMzU4IDYuMzU4IDAgMCAwIDEuNjYgNy4zNjVhLjcwNS43MDUgMCAwIDAgLjQ0MiAxLjMzOG0xMi42NzctLjk3YS43MDYuNzA2IDAgMCAwLTEuMzQyLjQzNi43MDIuNzAyIDAgMCAwIC4zNzIuNDE4IDUuODQgNS44NCAwIDAgMS00LjAwMyA0LjkyNGMtMi44MS45MTItNS45MzQtLjQ4Mi03LjEzNy0zLjE3N2wuNzE0LS4yMzMtMS4zNzctLjg2NC0uNjA4IDEuNTEuNzU5LS4yNDdjMS4yOTggMi45OCA0LjcyMiA0LjUyNSA3LjgxNCAzLjUyYTYuMzc2IDYuMzc2IDAgMCAwIDQuMzczLTUuNDA2LjcwNi43MDYgMCAwIDAgLjQzNS0uODgiLz4KCQk8L2c+Cgk8L2c+Cjwvc3ZnPgo=')",header={component:"HeaderBar",brand:{label:"Example app"}},hasCollections=["photos1","photos2","photos3"],steps=[{actionCreators:["http:get:photos1"]},{sagas:["saga:get:photos3"]},{waitFor:["photos1","photos3"]},{actionCreators:["http:get:photos2"]}],AppLoader_stories={parameters:{storySource:{source:"import { AppLoader as AppLoaderComponent } from '@talend/react-components';\nimport { Inject } from '@talend/react-cmf';\nimport AppLoader from '.';\n\nconst ICON =\n\t\"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+Cgk8ZyBmaWxsPSJub25lIj4KCQk8cGF0aCBkPSJNMTYgOEE4IDggMCAxIDEgMCA4YTggOCAwIDAgMSAxNiAwIiBjbGFzcz0idGktZGF0YXN0cmVhbXMtcG9zaXRpdmUtYmciIGZpbGw9IiM1ZDg4YWEiLz4KCQk8ZyBjbGFzcz0idGktZGF0YXN0cmVhbXMtcG9zaXRpdmUtbG9nbyIgZmlsbD0iI0ZGRiI+CgkJCTxwYXRoIGQ9Ik05LjI4OCAxMS40NTdjLS41NDMgMC0xLjA3OC0uMjYtMS41ODktLjc3MS0uNDAyLS40MDEtLjc5LS41ODUtMS4xNTYtLjU0NS0uNTY5LjA1OS0uOTU2LjYzNi0uOTYuNjQyYS4zNzMuMzczIDAgMCAxLS41MTYuMTEyLjM3NS4zNzUgMCAwIDEtLjExMi0uNTE3Yy4wMjQtLjAzNi41OC0uODgyIDEuNTEtLjk4MS42LS4wNjMgMS4xOTMuMTkyIDEuNzYyLjc2LjQuNDAyLjc5LjU4NCAxLjE2LjU0OC41ODItLjA2Ljk4NC0uNjQyLjk4Ny0uNjQ3YS4zNzUuMzc1IDAgMCAxIC41MTgtLjEwNi4zNzUuMzc1IDAgMCAxIC4xMDUuNTE5Yy0uMDI0LjAzNS0uNTk2Ljg4Mi0xLjUzNi45NzdhMS42NyAxLjY3IDAgMCAxLS4xNzMuMDA5bTAtMi41MjJjLS41NDMgMC0xLjA3OC0uMjU4LTEuNTg5LS43Ny0uNC0uNC0uNzg2LS41ODQtMS4xNTItLjU0Ni0uNTcyLjA1Ny0uOTYuNjM4LS45NjUuNjQ0YS4zNzQuMzc0IDAgMCAxLS42MjctLjQwNmMuMDI0LS4wMzYuNTgtLjg4MiAxLjUxLS45ODIuNi0uMDYzIDEuMTkzLjE5MyAxLjc2Mi43NjEuNC40MDEuNzkuNTg0IDEuMTYuNTQ3LjU4Mi0uMDU5Ljk4NC0uNjQyLjk4Ny0uNjQ3YS4zNzQuMzc0IDAgMCAxIC42MjMuNDEzYy0uMDI0LjAzNi0uNTk2Ljg4My0xLjUzNi45NzdhMS42NyAxLjY3IDAgMCAxLS4xNzMuMDFtMC0yLjUxMmMtLjU0MyAwLTEuMDc4LS4yNi0xLjU4OS0uNzcxLS40MDItLjQwMS0uNzktLjU4NS0xLjE1Ni0uNTQ2LS41NjkuMDYtLjk1Ni42MzctLjk2LjY0M2EuMzc0LjM3NCAwIDAgMS0uNjI4LS40MDVjLjAyNC0uMDM2LjU4LS44ODIgMS41MS0uOTgxLjYtLjA2NCAxLjE5My4xOTIgMS43NjIuNzYuNC40Ljc5LjU4NSAxLjE2LjU0OC41ODItLjA2Ljk4NC0uNjQyLjk4Ny0uNjQ3YS4zNzQuMzc0IDAgMCAxIC42MjMuNDEyYy0uMDI0LjAzNi0uNTk2Ljg4My0xLjUzNi45NzhhMS42NyAxLjY3IDAgMCAxLS4xNzMuMDA5Ii8+CgkJCTxwYXRoIGQ9Ik0yLjEwMyA4LjcwM0EuNzA1LjcwNSAwIDAgMCAyLjE5NiA3LjRhNS44MjQgNS44MjQgMCAwIDEgNC4wMTEtNC45OTljMi44NzYtLjkzNCA2LjAyNi41MTUgNy4xOTIgMy4zMDJsLS43MzQuMjM4IDEuMzc3Ljg2Ni42MDctMS41MS0uNzQuMjRDMTIuNjUgMi40NjYgOS4yMDEuODY1IDYuMDQzIDEuODkyQTYuMzU4IDYuMzU4IDAgMCAwIDEuNjYgNy4zNjVhLjcwNS43MDUgMCAwIDAgLjQ0MiAxLjMzOG0xMi42NzctLjk3YS43MDYuNzA2IDAgMCAwLTEuMzQyLjQzNi43MDIuNzAyIDAgMCAwIC4zNzIuNDE4IDUuODQgNS44NCAwIDAgMS00LjAwMyA0LjkyNGMtMi44MS45MTItNS45MzQtLjQ4Mi03LjEzNy0zLjE3N2wuNzE0LS4yMzMtMS4zNzctLjg2NC0uNjA4IDEuNTEuNzU5LS4yNDdjMS4yOTggMi45OCA0LjcyMiA0LjUyNSA3LjgxNCAzLjUyYTYuMzc2IDYuMzc2IDAgMCAwIDQuMzczLTUuNDA2LjcwNi43MDYgMCAwIDAgLjQzNS0uODgiLz4KCQk8L2c+Cgk8L2c+Cjwvc3ZnPgo=')\";\n\nconst header = {\n\tcomponent: 'HeaderBar',\n\tbrand: { label: 'Example app' },\n};\n\nconst hasCollections = ['photos1', 'photos2', 'photos3'];\n\nconst steps = [\n\t{ actionCreators: ['http:get:photos1'] },\n\t{ sagas: ['saga:get:photos3'] },\n\t{ waitFor: ['photos1', 'photos3'] },\n\t{ actionCreators: ['http:get:photos2'] },\n];\n\nexport default {\n\ttitle: 'AppLoader',\n};\n\nexport const Default = () => (\n\t<div>\n\t\t<style>{AppLoaderComponent.getLoaderStyle(ICON)}</style>\n\t\t<AppLoader hasCollections={hasCollections} steps={steps} saga=\"appLoaderSaga\">\n\t\t\tLoaded content\n\t\t</AppLoader>\n\t</div>\n);\nexport const Renderer = () => {\n\tconst renderer = loaderElement => (\n\t\t<Inject component=\"Layout\" mode=\"OneColumn\" header={header} content={loaderElement} />\n\t);\n\treturn (\n\t\t<div>\n\t\t\t<style>{AppLoaderComponent.getLoaderStyle(ICON)}</style>\n\t\t\t<AppLoader\n\t\t\t\thasCollections={hasCollections}\n\t\t\t\tsteps={steps}\n\t\t\t\tsaga=\"appLoaderSaga\"\n\t\t\t\trenderer={renderer}\n\t\t\t>\n\t\t\t\tLoaded content\n\t\t\t</AppLoader>\n\t\t</div>\n\t);\n};\n",locationsMap:{default:{startLoc:{col:23,line:26},endLoc:{col:1,line:33},startBody:{col:23,line:26},endBody:{col:1,line:33}},renderer:{startLoc:{col:24,line:34},endLoc:{col:1,line:51},startBody:{col:24,line:34},endBody:{col:1,line:51}}}}},title:"AppLoader"},Default=()=>(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("style",{children:components_lib_esm.AppLoader.getLoaderStyle(ICON)}),(0,jsx_runtime.jsx)(AppLoader,{hasCollections,steps,saga:"appLoaderSaga",children:"Loaded content"})]});Default.displayName="Default";const Renderer=()=>(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("style",{children:components_lib_esm.AppLoader.getLoaderStyle(ICON)}),(0,jsx_runtime.jsx)(AppLoader,{hasCollections,steps,saga:"appLoaderSaga",renderer:loaderElement=>(0,jsx_runtime.jsx)(lib_esm.y_,{component:"Layout",mode:"OneColumn",header,content:loaderElement}),children:"Loaded content"})]});Renderer.displayName="Renderer",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => <div>\n        <style>{AppLoaderComponent.getLoaderStyle(ICON)}</style>\n        <AppLoader hasCollections={hasCollections} steps={steps} saga="appLoaderSaga">\n            Loaded content\n        </AppLoader>\n    </div>',...Default.parameters?.docs?.source}}},Renderer.parameters={...Renderer.parameters,docs:{...Renderer.parameters?.docs,source:{originalSource:'() => {\n  const renderer = loaderElement => <Inject component="Layout" mode="OneColumn" header={header} content={loaderElement} />;\n  return <div>\n            <style>{AppLoaderComponent.getLoaderStyle(ICON)}</style>\n            <AppLoader hasCollections={hasCollections} steps={steps} saga="appLoaderSaga" renderer={renderer}>\n                Loaded content\n            </AppLoader>\n        </div>;\n}',...Renderer.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Renderer"]}}]);