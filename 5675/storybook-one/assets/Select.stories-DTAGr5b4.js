import{j as e,X as s}from"./iframe-BeUrxS75.js";import{u as l,F as u}from"./index.esm-BZMgldXZ.js";import{R as a}from"./RHFSelect.component-aiJRpaCJ.js";import"./preload-helper-PPVm8Dsz.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,S={title:"Forms/RHF/Select",component:a,argTypes:{rules:{table:{disable:!0}},name:{control:{type:"text"}},label:{control:{type:"text"}},placeholder:{control:{type:"text"}},options:{control:{type:"object"}},description:{control:{type:"text"}},disabled:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"}}},t=o=>{const r=l();return e.jsx(u,{...r,children:e.jsxs(s,{onSubmit:r.handleSubmit(m("submit")),noValidate:!0,children:[e.jsx(a,{id:"name",...o}),e.jsx(a,{id:"disabled",name:"disabled",label:"Disabled",options:o.options,disabled:!0}),e.jsx(s.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};t.args={name:"default",label:"Default",options:[{value:"blue",name:"Blue color"},{value:"red",name:"Red color"}]};const n=o=>{const r=l();return e.jsx(u,{...r,children:e.jsxs(s,{onSubmit:r.handleSubmit(m("submit")),noValidate:!0,children:[e.jsx(a,{id:"name",...o}),e.jsx(s.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};n.args={...t.args,description:"This is a description"};const i=o=>{const r=l({mode:"onBlur"});return e.jsx(u,{...r,children:e.jsxs(s,{onSubmit:r.handleSubmit(m("submit")),noValidate:!0,children:[e.jsx(a,{id:"required",...o,rules:{required:"This is required"}}),e.jsx(a,{id:"notBlue",name:"notBlue",label:"Not blue",placeholder:"Select a color",options:[{value:"blue",name:"Blue color"},{value:"red",name:"Red color"}],rules:{validate(d){return d==="blue"?"This should not be blue":null}},required:!0}),e.jsx(s.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};i.args={...t.args,name:"required",label:"Required",required:!0};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm();
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <Select id="name" {...props} />
                <Select id="disabled" name="disabled" label="Disabled" options={props.options} disabled />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm();
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <Select id="name" {...props} />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm({
    mode: 'onBlur'
  });
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <Select id="required" {...props} rules={{
        required: 'This is required'
      }} />

                <Select id="notBlue" name="notBlue" label="Not blue" placeholder="Select a color" options={[{
        value: 'blue',
        name: 'Blue color'
      }, {
        value: 'red',
        name: 'Red color'
      }]} rules={{
        validate(value) {
          return value === 'blue' ? 'This should not be blue' : null;
        }
      }} required />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...i.parameters?.docs?.source}}};const F=["States","Description","Validation"];export{n as Description,t as States,i as Validation,F as __namedExportsOrder,S as default};
