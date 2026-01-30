import{j as e}from"./iframe-DRCDqYKx.js";import{a as x,U as j}from"./argTypes-CjKDMI4q.js";import"./TreeView.component-DgLdLfF3.js";import{h as w}from"./ResourcePicker.component-D6rTZZ2z.js";import{d as v}from"./displayMode.schema-B6V3NT0J.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-BXo64jaB.js";import"./toString-CSJO3U6T.js";import"./isSymbol-DlwjzEhs.js";import"./_baseSlice-BE1vJk-8.js";import"./_baseGet-MR6lSUTo.js";import"./eq-BrCzcbIc.js";import"./_getTag-CKy82HA6.js";import"./isArrayLike-C3kMs0g0.js";import"./map-Wzi2qWkQ.js";import"./isEqual-CyqI7IP4.js";import"./get-BnUbLWFW.js";import"./_hasPath-_pF2d1PW.js";import"./_baseFindIndex-B2cJHN3H.js";import"./_mapToArray-Dr1Ktip_.js";import"./has-DRK2p6_Y.js";import"./isEmpty-BFZ68lzt.js";import"./isString-CR4cYlla.js";import"./last-DYWshVl-.js";import"./union-CDAtDbLR.js";import"./_baseUniq-SFCAFZIv.js";import"./noop-BdyXNs-O.js";import"./withTranslation-CwRJApAz.js";import"./memoize-one.esm-BdPwpGay.js";import"./locale-APo7A6DH.js";import"./head-Gqou40yX.js";import"./head-DCcSS0Sj.js";import"./StackItem-ooVuKIRO.js";import"./reactour.esm-9OT5V9aA.js";import"./index-nAWFhZ66.js";import"./tslib.es6-DwEbZtuj.js";import"./inheritsLoose-DFSzpK5W.js";import"./ErrorState-P8AMSI8m.js";import"./Transition-yFpeChhI.js";import"./Transition-DAA4VcSW.js";import"./Modal-C_C8vsYe.js";import"./interopRequireDefault-CBIuXflU.js";import"./RootCloseWrapper-CKSfp_mT.js";import"./SplitButton-DWHaX3fp.js";import"./Popover-CW79-Ycx.js";import"./removeClass-B-DUduzN.js";import"./CellMeasurerCache-BmR9wSlT.js";import"./index-BQ9ZpvcE.js";import"./cjs-BXF2Ij1e.js";import"./Tab-BlAmkQBZ.js";import"./NavItem-DeeFIogA.js";import"./index-DDH2bbOn.js";import"./NavDropdown-uwNjpqzR.js";import"./Panel-BleTyKV5.js";import"./useLocalStorage-BfMc8liO.js";import"./util-jvF6Sxgj.js";import"./ButtonIconFloating-CQEjB3Dd.js";import"./index-ByhmeKmp.js";import"./transform-CLRdSQou.js";import"./string-xuEJKGi6.js";import"./arc-C8ymbxV7.js";import"./path-B39wOLeq.js";import"./Dot-Cv1DZI-0.js";import"./isObject-DPeWTt7k.js";import"./isNil-D3RkSqFI.js";import"./index-C50F_61E.js";import"./index-DoUc-N2D.js";import"./usePopper-DvNbErup.js";import"./index--pemhMVp.js";import"./setYear-BJnnv5xI.js";import"./isWithinInterval-DHhQSKz4.js";import"./setSeconds-CoZfGIPF.js";import"./cjs-DFLY66gC.js";import"./DropdownButton-BAhn8q_j.js";import"./FormControl-DAm9aAUo.js";import"./useKey-suhCuic0.js";function T({canReorder:t,id:o,onAdd:h,onRemove:f,onReorder:u,renderItem:S,value:k}){return e.jsxs("div",{children:[e.jsx("style",{children:`
					ol {
						list-style: none;
					}

					.icon-up svg {
						 transform: rotate(180deg);
					}
				`}),e.jsx("legend",{children:"This is a custom array template"}),e.jsx("ol",{id:o,style:{listStyle:"none"},children:k.map((E,r)=>{const g=[{label:"Remove",icon:"talend-trash",onClick:a=>f(a,r),bsStyle:"primary"}];return t&&g.push({label:"Move Up",icon:"talend-caret-down",className:"icon-up",onClick:a=>u(a,{previousIndex:r,nextIndex:r-1})},{label:"Move Down",icon:"talend-caret-down",onClick:a=>u(a,{previousIndex:r,nextIndex:r+1})}),e.jsxs("li",{children:[e.jsx(w,{actions:g,hideLabel:!0}),S(r)]},r)})}),e.jsx("div",{children:e.jsx("button",{type:"button",className:"btn btn-info",onClick:h,children:"New Element"})})]})}const C={jsonSchema:{title:"Form with custom actions",type:"object",properties:{name:{type:"string"},requiredField:{type:"string"}},required:["requiredField"]},properties:{name:"lol"},uiSchema:["name","requiredField"]},O={jsonSchema:{title:"Custom array",type:"object",properties:{list:{type:"array",items:{type:"string"}}}},properties:{list:["one","two"]},uiSchema:["list"]},A={jsonSchema:{title:"Unknown widget",type:"object",properties:{list:{type:"string",enum:["one","two","three"],enumNames:["One","Two","Three"]}}},properties:{list:"two"},uiSchema:[{key:"list",type:"custom"}]},y={jsonSchema:{type:"object",title:"Comment",required:["fieldname"],properties:{tabConfiguration:{type:"object",properties:{fieldname:{type:"string"}}},fieldname:{type:"string"},description:{type:"string"},tabs:{type:"tabs"},arrayOfObjects:{type:"array",items:{type:"object",properties:{string:{type:"string"},number:{type:"number"}},required:["string","number"]}},root:{type:"object",properties:{string:{type:"string"},number:{type:"number"},textarea:{type:"string"},checkbox:{type:"boolean"},multicheckbox:{type:"array",items:{type:"string",enum:["foo","bar","fuzz","qux"]}},code:{type:"string"},datalist:{type:"string",enum:["Apple","Pine[apple]","Banana","Cher[ry","Lemo}n","Grapefruit"]},date:{type:"string"},file:{type:"string"},multiSelectTag:{type:"array",items:{type:"string",enum:["Apple"]}},radios:{type:"string",enum:["foo","bar","fuzz","qux"]},toggle:{type:"boolean"},select:{type:"string",enum:["foo","bar","fuzz","qux"]},selectmulti:{type:"array",items:{type:"string",enum:["foo","bar","fuzz","qux"]},uniqueItems:!0}}}}},uiSchema:[{key:"tabs",title:"2 Tabs",widget:"tabs",items:[{key:"tabConfiguration",title:"Configuration",widget:"fieldset",items:[{key:"fieldname",title:"Field Name"}]},{key:"tabInfo",title:"Info",widget:"fieldset",items:[{key:"description",title:"Description"}]}]},{key:"arrayOfObjects",title:"Array of objects",itemTitle:"Array element",items:[{key:"arrayOfObjects[].string",title:"string"},{key:"arrayOfObjects[].number",title:"number"}]},{key:"root.string",title:"string"},{key:"root.number",title:"number"},{key:"root.textarea",widget:"textarea",title:"textarea",rows:5},{key:"root.checkbox",title:"checkbox"},{key:"root.multicheckbox",title:"multicheckbox"},{key:"root.code",widget:"code",title:"code",options:{language:"javascript",height:"100px"}},{key:"root.datalist",restricted:!0,title:"datalist",widget:"datalist"},{key:"root.date",title:"date",widget:"date",options:{dateFormat:"DD/MM/YYYY"}},{key:"root.file",title:"file",widget:"file"},{key:"root.multiSelectTag",title:"multiSelectTag",widget:"multiSelectTag",titleMap:[{name:"Apple12",value:"Apple"}]},{key:"root.toggle",title:"toggle",widget:"toggle"},{key:"root.radios",title:"radios",widget:"radios"},{key:"root.select",title:"select"},{key:"root.selectmulti",title:"Multiple choices list",widget:"select"}],properties:{arrayOfObjects:[{string:"string",number:3}]}},q={jsonSchema:{type:"object",title:"Comment",properties:{name:{type:"string"}},required:["name"]},uiSchema:[{key:"name",title:"Name"}],properties:{name:"Chuck Norris"}},b={jsonSchema:{type:"object",title:"Comment",properties:{arrayOfObjects:{type:"array",items:{type:"object",properties:{string:{type:"string"},number:{type:"number"}},required:["string","number"]}},string:{type:"string"},number:{type:"number"},textarea:{type:"string"},checkbox:{type:"boolean"},multicheckbox:{type:"array",items:{type:"string",enum:["foo","bar","fuzz","qux"]}},code:{type:"string"},datalist:{type:"string",enum:["Apple","Pine[apple]","Banana","Cher[ry","Lemo}n","Grapefruit"]},date:{type:"string"},file:{type:"string"},multiSelectTag:{type:"array",items:{type:"string",enum:["Apple"]}},radios:{type:"string",enum:["foo","bar","fuzz","qux"]},toggle:{type:"boolean"},select:{type:"string",enum:["foo","bar","fuzz","qux"]},selectmulti:{type:"array",items:{type:"string",enum:["foo","bar","fuzz","qux"]},uniqueItems:!0}}},uiSchema:[{key:"arrayOfObjects",title:"Array of objects",itemTitle:"Array element",items:[{key:"arrayOfObjects[].string",title:"string"},{key:"arrayOfObjects[].number",title:"number"}]},{key:"string",title:"string"},{key:"number",title:"number"},{key:"textarea",widget:"textarea",title:"textarea",rows:5},{key:"checkbox",title:"checkbox"},{key:"multicheckbox",title:"multicheckbox"},{key:"code",widget:"code",title:"code",options:{language:"javascript",height:"100px"}},{key:"datalist",restricted:!0,title:"datalist",widget:"datalist"},{key:"date",title:"date",widget:"date",options:{dateFormat:"DD/MM/YYYY"}},{key:"file",title:"file",widget:"file"},{key:"multiSelectTag",title:"multiSelectTag",widget:"multiSelectTag",titleMap:[{name:"Apple12",value:"Apple"}]},{key:"toggle",title:"toggle",widget:"toggle"},{key:"radios",title:"radios",widget:"radios"},{key:"select",title:"select"},{key:"selectmulti",title:"Multiple choices list",widget:"select"}],properties:{arrayOfObjects:[{string:"string",number:3}]}},{action:i}=__STORYBOOK_MODULE_ACTIONS__;function F({introduction:t,...o}){return e.jsxs(e.Fragment,{children:[t||null,e.jsx(j,{...o})]})}const it={title:"Forms/Schema/State",component:F,argTypes:{...x,updating:{table:{disable:!0}},onSubmit:{table:{disable:!0}},onReset:{table:{disable:!0}}},args:{onChange:i("Change"),onSubmit:i("onSubmit"),onReset:i("onReset"),onTrigger:i("onTrigger")},parameters:{centeredLayout:!0}},M=b.uiSchema.map(t=>t.key),n={args:{introduction:e.jsxs("div",{children:[e.jsx("h2",{children:"Updating status"}),e.jsx("p",{children:'Form can disable and add an animation feedback on the widgets. To do so, you need to pass a UIForm "updating" prop which is an array of the schema keys where to apply'})]}),data:b,updating:M}},s={args:{data:v,displayMode:"text",introduction:e.jsx("p",{style:{marginBottom:"1.25rem"},children:"Form can be used to display data in read only"})}},z=y.uiSchema.reduce((t,o)=>({...t,[o.key.split(".").join(",")]:"There is an error"}),{tabConfiguration:"There is an error"}),m={args:{data:y,errors:z}},p={args:{data:q,introduction:e.jsxs(e.Fragment,{children:[e.jsx("h2",{children:"Hover submit handler"}),e.jsxs("p",{style:{marginBottom:"1.25rem"},children:["Submit can detect if mouse enters or leaves by using ",e.jsx("code",{children:"onSubmitEnter"})," and"," ",e.jsx("code",{children:"onSubmitLeave"})]})]}),onSubmitEnter:(...t)=>{i("onSubmitEnter")(...t)},onSubmitLeave:(...t)=>{i("onSubmitLeave")(...t)}}},l={args:{data:C,actions:[{title:"Reset",type:"reset",widget:"button"},{disabled:!0,title:"Disabled",type:"button",widget:"button"},{inProgress:!0,title:"In progress",type:"button",widget:"button"},{title:"Trigger",triggers:["test"],type:"button",widget:"button"},{bsStyle:"primary","data-feature":"form.feature",title:"Submit",type:"submit",widget:"button"}]}},c={args:{templates:{array:T},data:O}};function I({value:t}){return e.jsxs("div",{className:"panel panel-info",children:[e.jsx("div",{className:"panel-heading",children:e.jsx("h3",{className:"panel-title",children:"Custom widget"})}),e.jsxs("div",{className:"panel-body",children:["Form was instantiated with a custom widget to display its selected value",e.jsx("code",{children:t}),"."]})]})}const d={args:{widgets:{custom:I},data:A}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    introduction: <div>
                <h2>Updating status</h2>
                <p>
                    Form can disable and add an animation feedback on the widgets. To do so, you need to pass
                    a UIForm "updating" prop which is an array of the schema keys where to apply
                </p>
            </div>,
    data: updatingSchema,
    updating: updatingProps
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    data: displayModeSchema,
    displayMode: 'text',
    introduction: <p style={{
      marginBottom: '1.25rem'
    }}>Form can be used to display data in read only</p>
  }
}`,...s.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    data: errorsSchema,
    errors: errorsProps
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    data: hoverSubmitSchema,
    introduction: <>
                <h2>Hover submit handler</h2>
                <p style={{
        marginBottom: '1.25rem'
      }}>
                    Submit can detect if mouse enters or leaves by using <code>onSubmitEnter</code> and{' '}
                    <code>onSubmitLeave</code>
                </p>
            </>,
    onSubmitEnter: (...args: any) => {
      action('onSubmitEnter')(...args);
    },
    onSubmitLeave: (...args: any) => {
      action('onSubmitLeave')(...args);
    }
  }
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    data: customActionsSchema,
    actions: [{
      title: 'Reset',
      type: 'reset',
      widget: 'button'
    }, {
      disabled: true,
      title: 'Disabled',
      type: 'button',
      widget: 'button'
    }, {
      inProgress: true,
      title: 'In progress',
      type: 'button',
      widget: 'button'
    }, {
      title: 'Trigger',
      triggers: ['test'],
      type: 'button',
      widget: 'button'
    }, {
      bsStyle: 'primary',
      'data-feature': 'form.feature',
      title: 'Submit',
      type: 'submit',
      widget: 'button'
    }]
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    templates: {
      array: CustomArrayTemplate
    },
    data: customTemplateSchema
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    widgets: {
      custom: CustomWidgetComponent
    },
    data: customWidgetSchema
  }
}`,...d.parameters?.docs?.source}}};const ot=["Updating","DisplayMode","Errors","HoverSubmit","CustomActions","CustomTemplate","CustomWidget"];export{l as CustomActions,c as CustomTemplate,d as CustomWidget,s as DisplayMode,m as Errors,p as HoverSubmit,n as Updating,ot as __namedExportsOrder,it as default};
