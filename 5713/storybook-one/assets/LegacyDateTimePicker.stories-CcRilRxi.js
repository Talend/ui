import{j as e,r as m}from"./iframe-BDzYBMaC.js";import{I as o}from"./InputDateTimePicker.component-BP4oungV.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-C6Czs4ij.js";import"./omit-u_0FUImL.js";import"./toString-D3MAot4O.js";import"./isSymbol-CfhP7y8g.js";import"./_baseSlice-BmVIjQqE.js";import"./_baseGet-qa8X972v.js";import"./eq-BicXA8Su.js";import"./_getTag-BFP-W8DA.js";import"./isArrayLike-DJQc95ca.js";import"./index-qpOXM2WK.js";import"./FocusManager.component-BtOCB0ts.js";import"./setSeconds-lAoM2QZX.js";import"./locale-B-2lRf6Q.js";import"./setYear-C8t3CluH.js";import"./index-DHGqP6jC.js";import"./index-xVUa4Jc0.js";import"./Action.component-CZ4U2OK5.js";import"./ActionButton.component-Bxjilb56.js";import"./TooltipTrigger.component-BnH52FLd.js";import"./index-CJ5sQWM1.js";import"./CircularProgress.component-BJX6z2P5.js";import"./constants-CZYEPhht.js";import"./translate-DaL0c1TJ.js";import"./withTranslation-C6292tqo.js";import"./Skeleton.component-Deo2Fhm1.js";import"./index-CgwxmQms.js";import"./theme-BkTAIP-h.js";import"./OverlayTrigger.component-Bm8TQHXw.js";import"./RootCloseWrapper-iY3kxLkJ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-hTNRUy-C.js";import"./Transition-6VlpfvTD.js";import"./Transition-66tmR4yx.js";import"./ActionSplitDropdown.component-xq5GqnO5.js";import"./SplitButton-D1VkrNzs.js";import"./inheritsLoose-CVceljL-.js";import"./get-r9bOepnM.js";import"./DropdownButton-BIJRhCnj.js";import"./ActionIconToggle.component-D2an_6WR.js";import"./memoize-D8pLjkfa.js";import"./chunk-CjPKdHyx.js";import"./_isIterateeCall-C4Wu7bhG.js";import"./toInteger-e9JfI7uY.js";import"./toFinite-Dp7_v-Om.js";import"./toNumber-DG1s4Og7.js";import"./locale-BvTTFCdg.js";import"./Actions.component-jIfW4RKk.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
