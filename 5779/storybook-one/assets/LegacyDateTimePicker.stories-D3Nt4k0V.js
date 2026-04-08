import{j as e,r as m}from"./iframe-BlAwZJYC.js";import{I as o}from"./InputDateTimePicker.component-Bkj5QwB4.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-BEN468mJ.js";import"./omit-BE0rUHay.js";import"./toString-COxhx_ue.js";import"./isSymbol-DzJhhvfo.js";import"./_setToString-BieVKRad.js";import"./_baseGet-0UqVY_yl.js";import"./eq-BVmKQjva.js";import"./_getTag-BKZbvEh5.js";import"./isArrayLike-XyhmcoyG.js";import"./index-ZZUfvrmL.js";import"./FocusManager.component-BZUXPE-T.js";import"./setSeconds-DL9L1ye-.js";import"./locale-COyDlZWW.js";import"./setYear-Cebl7CkD.js";import"./index-mCtSq3HC.js";import"./index-Crmj5pbd.js";import"./Action.component-D1yN2heb.js";import"./ActionButton.component-BkFEJEsa.js";import"./TooltipTrigger.component-CKf8znt4.js";import"./index-B-SnfOJm.js";import"./CircularProgress.component-B4Wm3A86.js";import"./constants-CZYEPhht.js";import"./translate-C1JIiQxT.js";import"./withTranslation-CjGMgmnY.js";import"./Skeleton.component-DRj781-k.js";import"./index-BuMhPtEM.js";import"./theme-BPTRim7y.js";import"./OverlayTrigger.component-DQDt_Vit.js";import"./RootCloseWrapper-COPwb9jy.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BQW726Ug.js";import"./Transition-CF62pEtu.js";import"./Transition-Bz1h2jYx.js";import"./ActionSplitDropdown.component-B7kXeD4J.js";import"./SplitButton-DxWPgA46.js";import"./inheritsLoose-Dev66u7n.js";import"./get-C0ExTL_9.js";import"./DropdownButton-CHbSInmF.js";import"./ActionIconToggle.component-DVWjbCCo.js";import"./memoize-Dn3Ga4dE.js";import"./chunk-B7K8VjXb.js";import"./_isIterateeCall-CqYkCXJl.js";import"./toInteger-C3KqC1J0.js";import"./toFinite-BuWZUP5-.js";import"./toNumber-L4OGmNyB.js";import"./locale-C5d_A9P8.js";import"./Actions.component-BfJPOaLF.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
