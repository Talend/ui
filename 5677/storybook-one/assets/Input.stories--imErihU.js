import{j as e,F as o}from"./iframe-ChHbVRNu.js";import{u as m,F as d}from"./index.esm-BIPXVIy6.js";import{R as r}from"./RHFInput.component-BKTMOP2r.js";import"./preload-helper-PPVm8Dsz.js";const{action:b}=__STORYBOOK_MODULE_ACTIONS__,f={title:"Forms/RHF/Input",component:r,argTypes:{rules:{table:{disable:!0}},name:{control:"text"},label:{control:"text"},defaultValue:{control:"text",description:"You must reload the story if you change this value"},placeholder:{control:"text"},description:{control:"text"},disabled:{control:"boolean"},readOnly:{control:"boolean"},required:{control:"boolean"}}},a=s=>{const t=m();return e.jsx(d,{...t,children:e.jsxs(o,{onSubmit:t.handleSubmit(b("submit")),noValidate:!0,children:[e.jsx(r,{id:"name",type:"text",...s}),e.jsx(r,{id:"disabled",type:"text",name:"disabled",label:"Disabled",defaultValue:"Jimmy",disabled:!0}),e.jsx(r,{id:"readonly",type:"text",name:"readonly",label:"Readonly",defaultValue:"Jimmy",readOnly:!0}),e.jsx(o.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};a.args={name:"default",label:"Default",defaultValue:"Jimmy"};const n=s=>{const t=m();return e.jsx(d,{...t,children:e.jsxs(o,{onSubmit:t.handleSubmit(b("submit")),noValidate:!0,children:[e.jsx(r,{id:"text",type:"text",...s}),e.jsx(r,{id:"number",type:"number",name:"number",label:"Number"}),e.jsx(r,{id:"password",type:"password",name:"password",label:"Password"}),e.jsx(o.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};n.args={label:"Text",name:"text",defaultValue:"Text value"};const i=s=>{const t=m();return e.jsx(d,{...t,children:e.jsxs(o,{onSubmit:t.handleSubmit(b("submit")),noValidate:!0,children:[e.jsx(r,{id:"defaultValue",type:"text",...s}),e.jsx(o.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};i.args={label:"Text",name:"text",description:"You must reload the story if you change the defaultValue",defaultValue:"Text value"};const u=s=>{const t=m();return e.jsx(d,{...t,children:e.jsxs(o,{onSubmit:t.handleSubmit(b("submit")),noValidate:!0,children:[e.jsx(r,{id:"description",...s}),e.jsx(o.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};u.args={label:"Text",name:"text",description:"This field has a description"};const l=s=>{const t=m({mode:"onBlur"});return e.jsx(d,{...t,children:e.jsxs(o,{onSubmit:t.handleSubmit(b("submit")),noValidate:!0,children:[e.jsx(r,{id:"required",type:"text",...s,rules:{required:"This is required"}}),e.jsx(r,{id:"notLol",type:"text",name:"notLol",description:"This field should not have the value lol",label:"Not lol",rules:{validate(p){return p==="lol"?"This should not be lol":null}},required:!0}),e.jsx(o.Buttons,{children:e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Submit"})})]})})};l.args={label:"Required",name:"required",required:!0};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm();
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <Input id="name" type="text" {...props} />
                <Input id="disabled" type="text" name="disabled" label="Disabled" defaultValue="Jimmy" disabled />
                <Input id="readonly" type="text" name="readonly" label="Readonly" defaultValue="Jimmy" readOnly />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm();
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <Input id="text" type="text" {...props} />
                <Input id="number" type="number" name="number" label="Number" />
                <Input id="password" type="password" name="password" label="Password" />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm();
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <Input id="defaultValue" type="text" {...props} />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm();
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <Input id="description" {...props} />
                <Form.Buttons>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </Form.Buttons>
            </Form>
        </FormProvider>;
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`props => {
  const rhf = useForm({
    mode: 'onBlur'
  });
  return <FormProvider {...rhf}>
            <Form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
                <Input id="required" type="text" {...props} rules={{
        required: 'This is required'
      }} />
                <Input id="notLol" type="text" name="notLol" description="This field should not have the value lol" label="Not lol" rules={{
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
}`,...l.parameters?.docs?.source}}};const F=["States","Types","DefaultValue","Description","Validation"];export{i as DefaultValue,u as Description,a as States,n as Types,l as Validation,F as __namedExportsOrder,f as default};
