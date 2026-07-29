import{j as e,r as m}from"./iframe-DlMK_tMs.js";import{I as o}from"./InputDateTimePicker.component-D8idzs9z.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-Cgut5MYo.js";import"./omit-DiQ6RqWN.js";import"./toString-z5yAz4Kc.js";import"./isSymbol-DxHDIK51.js";import"./_setToString-DHWUAJp0.js";import"./_baseGet-BU2gbPiL.js";import"./eq-BA7cxji8.js";import"./_getTag-IzvHci0T.js";import"./isArrayLike-C0maW25Q.js";import"./index-dLES2ofs.js";import"./FocusManager.component-Dm1EWqSG.js";import"./setSeconds-CyuEwBG0.js";import"./locale-Cnd7DO-B.js";import"./setYear-BhCMuBrH.js";import"./index-CFWFA5zl.js";import"./index-DxjytvOx.js";import"./Action.component-Ouasy6Al.js";import"./ActionButton.component-Ba05ipJv.js";import"./TooltipTrigger.component-DbCWo6Zj.js";import"./index-WK3eFADS.js";import"./CircularProgress.component-D7-fLMeg.js";import"./constants-CZYEPhht.js";import"./translate-CY-1uK8d.js";import"./withTranslation-BekHgTlQ.js";import"./Skeleton.component-DYENtng-.js";import"./index-BGuVaVyo.js";import"./theme-x0vFkEBD.js";import"./OverlayTrigger.component-dMRK9Eza.js";import"./RootCloseWrapper-VUYpQ_iy.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BOMoGmND.js";import"./Transition-BAAHxMmu.js";import"./Transition-Bwg4AJ7-.js";import"./ActionSplitDropdown.component-Ey5FgJmX.js";import"./SplitButton-M7GPhNq-.js";import"./inheritsLoose-CEEHa28p.js";import"./get-knGTTJ1Y.js";import"./DropdownButton-wWeHP7JV.js";import"./ActionIconToggle.component-CEt791Te.js";import"./memoize-D8oaM7mh.js";import"./chunk-DfLhmFp2.js";import"./_isIterateeCall-D--YS89C.js";import"./toInteger-BC5FlfGF.js";import"./toFinite-CELyw5BG.js";import"./toNumber-BrQ6GFsc.js";import"./locale-CP3CNBVn.js";import"./Actions.component-0q7KjchE.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  return <Fragment>
            <div style={{
      width: 150
    }}>
                <div> in form mode with validation and submit </div>
                <InputDateTimePicker id="my-date-picker" name="Datetime" onBlur={action('onBlur')} onChange={action('onChange')} useTime formMode required={false} useSeconds />
            </div>
        </Fragment>;
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  return <Fragment>
            <h3>Hybrid DateTime picker</h3>
            <p>For use when the independent input of date or time within one component is required</p>
            <div style={{
      width: 200
    }}>
                <div>With no preselected value</div>
                <InputDateTimePicker id="my-date-picker2" name="Datetime" onBlur={action('onBlur')} onChange={action('onChange')} useTime required={false} useSeconds hybridMode formMode />
                <div>With preselected time</div>
                <InputDateTimePicker id="my-date-picker2" name="Datetime" onBlur={action('onBlur')} onChange={action('onChange')} useTime required={false} useSeconds hybridMode selectedDateTime="14:33:00" formMode />
                <div>With preselected date</div>
                <InputDateTimePicker id="my-date-picker3" name="Datetime" onBlur={action('onBlur')} onChange={action('onChange')} useTime required={false} useSeconds hybridMode selectedDateTime="2012-12-12" formMode />
            </div>
        </Fragment>;
}`,...t.parameters?.docs?.source}}};const te=["FormModeDateTime","FormModeHybridDateTime"];export{i as FormModeDateTime,t as FormModeHybridDateTime,te as __namedExportsOrder,ie as default};
