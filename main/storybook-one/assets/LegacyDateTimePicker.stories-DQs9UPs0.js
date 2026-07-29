import{j as e,r as m}from"./iframe-BIlTseOR.js";import{I as o}from"./InputDateTimePicker.component-D7CpSSqj.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-BFptbtbI.js";import"./omit-BaKyBsUW.js";import"./toString-bKpWVbaB.js";import"./isSymbol-Dzp-ihe1.js";import"./_setToString-DYTubzWT.js";import"./_baseGet-BG7BiJ02.js";import"./eq-D00YlZ_o.js";import"./_getTag-DxawX5ba.js";import"./isArrayLike-Cf2QI71o.js";import"./index-D_U9jXPO.js";import"./FocusManager.component-BYoFNU3K.js";import"./setSeconds-2l1zYfn-.js";import"./locale-CB1lySNb.js";import"./setYear-CjWVXlWc.js";import"./index-DDDN_4Ty.js";import"./index-CJPOdwMS.js";import"./Action.component-BEqvGwIH.js";import"./ActionButton.component-BAJFaB-X.js";import"./TooltipTrigger.component-BzH-4p_V.js";import"./index-Bq5aoIbe.js";import"./CircularProgress.component-CbtGAEkx.js";import"./constants-CZYEPhht.js";import"./translate-HdDYEQ7l.js";import"./withTranslation-BAq7qSAa.js";import"./Skeleton.component-DzGdl8Ok.js";import"./index-Bx3-Knuk.js";import"./theme-B8SIcIZ-.js";import"./OverlayTrigger.component-BCyOtEPb.js";import"./RootCloseWrapper-BrnMcBWH.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CFryWc8E.js";import"./Transition-BdAae8s4.js";import"./Transition-Djm1RO_m.js";import"./ActionSplitDropdown.component-BuZOOqtY.js";import"./SplitButton-ClREZmpf.js";import"./inheritsLoose-DYaf4ECg.js";import"./get-7LRZiTcy.js";import"./DropdownButton-VZRLYmH0.js";import"./ActionIconToggle.component-3Fpv-XX4.js";import"./memoize-BfE_vlVv.js";import"./chunk-RkD8w5ud.js";import"./_isIterateeCall-B12y3tv_.js";import"./toInteger-c5qnmtBh.js";import"./toFinite-DjsMK6Hb.js";import"./toNumber-TEgfsBcw.js";import"./locale-D1VNaMZL.js";import"./Actions.component-Cx-LLj1r.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
