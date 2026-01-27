import{j as e,X as o}from"./iframe-B9f9Cci2.js";import{u as l,F as u}from"./index.esm-CtZGN8C0.js";import{R as t}from"./RHFTextArea.component-DRCr4BqD.js";import"./preload-helper-PPVm8Dsz.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,x={title:"Forms/RHF/TextArea",component:t,argTypes:{rules:{table:{disable:!0}},name:{control:"text"},label:{control:"text"},defaultValue:{control:"text",description:"You must reload the story if you change this value"},placeholder:{control:"text"},description:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"}}},s=a=>{const r=l();return e.jsx(u,{...r,children:e.jsxs(o,{onSubmit:r.handleSubmit(d("submit")),noValidate:!0,children:[e.jsx(t,{id:"name",...a}),e.jsx(t,{id:"disabled",name:"disabled",label:"Disabled",defaultValue:"Jimmy",disabled:!0}),e.jsx(t,{id:"readonly",name:"readonly",label:"Readonly",defaultValue:"Jimmy",readOnly:!0}),e.jsx(o.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};s.args={name:"default",label:"Default",defaultValue:"Jimmy"};const i=a=>{const r=l();return e.jsx(u,{...r,children:e.jsxs(o,{onSubmit:r.handleSubmit(d("submit")),noValidate:!0,children:[e.jsx(t,{id:"description",...a}),e.jsx(o.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};i.args={name:"name",label:"Name",description:"This field has a description"};const n=a=>{const r=l({mode:"onBlur"});return e.jsx(u,{...r,children:e.jsxs(o,{onSubmit:r.handleSubmit(d("submit")),noValidate:!0,children:[e.jsx(t,{id:"required",...a,rules:{required:"This is required"}}),e.jsx(t,{id:"notLol",name:"notLol",label:"Not lol",rules:{validate(m){return m==="lol"?"This should not be lol":null}},required:!0}),e.jsx(o.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};n.args={name:"required",label:"Required",required:!0};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm();
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <TextArea id="name" {...props} />
                <TextArea id="disabled" name="disabled" label="Disabled" defaultValue="Jimmy" disabled />
                <TextArea id="readonly" name="readonly" label="Readonly" defaultValue="Jimmy" readOnly />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm();
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <TextArea id="description" {...props} />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm({
    mode: 'onBlur'
  });
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <TextArea id="required" {...props} rules={{
        required: 'This is required'
      }} />
                <TextArea id="notLol" name="notLol" label="Not lol" rules={{
        validate(value) {
          return value === 'lol' ? 'This should not be lol' : null;
        }
      }} required />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...n.parameters?.docs?.source}}};const y=["States","Description","Validation"];export{i as Description,s as States,n as Validation,y as __namedExportsOrder,x as default};
