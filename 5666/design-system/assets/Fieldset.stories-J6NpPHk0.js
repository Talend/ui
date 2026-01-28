import{j as e}from"./index-BjJ1gK4Q.js";import{a as F}from"./iframe-BWotmeKP.js";import{u as g}from"./index.esm-DT4o2dl2.js";import"./DialogBackdrop-DrwYyHz3.js";import{O as r,P as y,Q as R,c as u,B as c}from"./Skeleton-BJ-qTseU.js";import"./useCopyToClipboard-Bz_CjoHD.js";import"./index-CKY2Phf9.js";import"./TalendDesignTokens-JgHEBmOa.js";const B={component:r.Fieldset,title:"Form/Fieldset"},n=()=>e.jsxs(r,{children:[e.jsxs(r.Fieldset,{legend:"Frequency",children:[e.jsxs(r.Select,{name:"repeat",label:"Repeat",children:[e.jsx("option",{children:"At specific intervals"}),e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(r.Row,{children:[e.jsx(r.Number,{label:"Minutes",suffix:"minutes",name:"minutes"}),e.jsx(r.Time,{name:"repeat-from",label:"Repeat from",required:!0}),e.jsx(r.Time,{name:"repeat-to",label:"Repeat to",required:!0})]})]}),e.jsxs(r.Buttons,{children:[e.jsx(u,{onClick:()=>{},children:"Cancel"}),e.jsx(c,{type:"submit",onClick:()=>{},children:"Submit"})]})]}),s=()=>e.jsxs(r,{children:[e.jsxs(r.Fieldset,{legend:"Frequency",children:[e.jsxs(r.Select,{name:"repeat",label:"Repeat",children:[e.jsx("option",{children:"At specific intervals"}),e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(r.Row,{children:[e.jsx(r.Number,{label:"Minutes",suffix:"minutes",name:"minutes"}),e.jsx(r.Time,{hasError:!0,name:"repeat-from",label:"Repeat from",required:!0,description:"Repeat from is invalid"}),e.jsx(r.Time,{name:"repeat-to",label:"Repeat to",required:!0})]})]}),e.jsxs(r.Buttons,{children:[e.jsx(u,{onClick:()=>{},children:"Cancel"}),e.jsx(c,{type:"submit",onClick:()=>{},children:"Submit"})]})]}),a=()=>e.jsxs(r,{children:[e.jsxs(r.Fieldset,{legend:"Frequency",children:[e.jsxs(r.Select,{name:"repeat",label:"Repeat",children:[e.jsx("option",{children:"At specific intervals"}),e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(r.Row,{children:[e.jsx(r.Number,{label:"Minutes",suffix:"minutes",name:"minutes"}),e.jsx(r.Time,{hasError:!0,name:"repeat-from",label:"Repeat from",required:!0,description:"Repeat from is invalid"}),e.jsx(r.Time,{hasError:!0,name:"repeat-to",label:"Repeat to",required:!0,description:"Repeat to is invalid"})]})]}),e.jsxs(r.Buttons,{children:[e.jsx(u,{onClick:()=>{},children:"Cancel"}),e.jsx(c,{type:"submit",onClick:()=>{},children:"Submit"})]})]}),m=()=>{const[d,h]=F.useState(null),{register:i,watch:f,handleSubmit:b,unregister:p,formState:x}=g(),{errors:t}=x,l=f("withUser",!1),o=Object.keys(t).length>1;F.useEffect(()=>{l||(p("name"),p("email"))},[l]);const S=j=>{h(JSON.stringify(j))};return e.jsxs(r,{onSubmit:b(S),children:[e.jsxs(r.Fieldset,{legend:"Create an account",children:[o&&e.jsx(r.Row,{children:e.jsx(y,{description:"Every displayed field is required",withBackground:!0})}),d&&e.jsx(r.Row,{children:e.jsx(R,{title:"Form submitted",description:d,withBackground:!0})}),e.jsxs(r.Row,{children:[e.jsx(r.Text,{label:"Account name",suffix:".info",hasError:!!t.accountName,description:!o&&t.accountName?.message||void 0,required:!0,...i("accountName",{required:"This field is required"})}),e.jsx(r.Number,{label:"Slots",hasError:!!t.numberOfSlots,description:!o&&t.numberOfSlots?.message||void 0,required:!0,...i("numberOfSlots",{required:"This field is required"})})]}),e.jsx(r.ToggleSwitch,{label:"Send invite to admin user",...i("withUser"),checked:l})]}),l&&e.jsxs(r.Fieldset,{legend:"Invite admin for this account",children:[e.jsx(r.Text,{label:"Username",hasError:"name"in t&&!!t.name,description:!o&&"name"in t&&t.name?.message||void 0,...i("name",{required:"This field is required"})}),e.jsx(r.Email,{label:"User email",hasError:"email"in t&&!!t.email,description:!o&&"email"in t&&t.email?.message||void 0,...i("email",{required:"This field is required"})})]}),e.jsxs(r.Buttons,{children:[e.jsx(u,{type:"reset",children:"Cancel"}),e.jsx(c,{type:"submit",onClick:()=>{},children:"Submit"})]})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  return <Form>
            <Form.Fieldset legend="Frequency">
                <Form.Select name="repeat" label="Repeat">
                    <option>At specific intervals</option>
                    <option>Foo</option>
                    <option>Bar</option>
                </Form.Select>
                <Form.Row>
                    <Form.Number label="Minutes" suffix="minutes" name="minutes" />
                    <Form.Time name="repeat-from" label="Repeat from" required />
                    <Form.Time name="repeat-to" label="Repeat to" required />
                </Form.Row>
            </Form.Fieldset>
            <Form.Buttons>
                <ButtonSecondary onClick={() => {}}>Cancel</ButtonSecondary>
                <ButtonPrimary type="submit" onClick={() => {}}>
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  return <Form>
            <Form.Fieldset legend="Frequency">
                <Form.Select name="repeat" label="Repeat">
                    <option>At specific intervals</option>
                    <option>Foo</option>
                    <option>Bar</option>
                </Form.Select>
                <Form.Row>
                    <Form.Number label="Minutes" suffix="minutes" name="minutes" />
                    <Form.Time hasError name="repeat-from" label="Repeat from" required description="Repeat from is invalid" />
                    <Form.Time name="repeat-to" label="Repeat to" required />
                </Form.Row>
            </Form.Fieldset>
            <Form.Buttons>
                <ButtonSecondary onClick={() => {}}>Cancel</ButtonSecondary>
                <ButtonPrimary type="submit" onClick={() => {}}>
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  return <Form>
            <Form.Fieldset legend="Frequency">
                <Form.Select name="repeat" label="Repeat">
                    <option>At specific intervals</option>
                    <option>Foo</option>
                    <option>Bar</option>
                </Form.Select>
                <Form.Row>
                    <Form.Number label="Minutes" suffix="minutes" name="minutes" />
                    <Form.Time hasError name="repeat-from" label="Repeat from" required description="Repeat from is invalid" />
                    <Form.Time hasError name="repeat-to" label="Repeat to" required description="Repeat to is invalid" />
                </Form.Row>
            </Form.Fieldset>
            <Form.Buttons>
                <ButtonSecondary onClick={() => {}}>Cancel</ButtonSecondary>
                <ButtonPrimary type="submit" onClick={() => {}}>
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...a.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [formData, setFormData] = useState<string | null>(null);
  const {
    register,
    watch,
    handleSubmit,
    unregister,
    formState
  } = useForm<FormDataWithUser>();
  const {
    errors
  } = formState;
  const withUserFormSelection = watch('withUser', false);
  const hasMultipleErrors = Object.keys(errors).length > 1;
  useEffect(() => {
    if (!withUserFormSelection) {
      unregister('name');
      unregister('email');
    }
  }, [withUserFormSelection]);
  const onSubmit = (data: FormDataWithUser) => {
    setFormData(JSON.stringify(data));
  };
  return <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Fieldset legend="Create an account">
                {hasMultipleErrors && <Form.Row>
                        <InlineMessageDestructive description="Every displayed field is required" withBackground />
                    </Form.Row>}
                {formData && <Form.Row>
                        <InlineMessageInformation title="Form submitted" description={formData} withBackground />
                    </Form.Row>}
                <Form.Row>
                    <Form.Text label="Account name" suffix=".info" hasError={!!errors.accountName} description={!hasMultipleErrors && errors.accountName?.message || undefined} required {...register('accountName', {
          required: 'This field is required'
        })} />
                    <Form.Number label="Slots" hasError={!!errors.numberOfSlots} description={!hasMultipleErrors && errors.numberOfSlots?.message || undefined} required {...register('numberOfSlots', {
          required: 'This field is required'
        })} />
                </Form.Row>
                <Form.ToggleSwitch label="Send invite to admin user" {...register('withUser')} checked={withUserFormSelection} />
            </Form.Fieldset>
            {withUserFormSelection && <Form.Fieldset legend="Invite admin for this account">
                    <Form.Text label="Username" hasError={'name' in errors && !!errors.name} description={!hasMultipleErrors && 'name' in errors && errors.name?.message || undefined} {...register('name', {
        required: 'This field is required'
      })} />
                    <Form.Email label="User email" hasError={'email' in errors && !!errors.email} description={!hasMultipleErrors && 'email' in errors && errors.email?.message || undefined} {...register('email', {
        required: 'This field is required'
      })} />
                </Form.Fieldset>}
            <Form.Buttons>
                <ButtonSecondary type="reset">Cancel</ButtonSecondary>
                <ButtonPrimary type="submit" onClick={() => {}}>
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...m.parameters?.docs?.source}}};const q=["Default","Error","Errors","ConditionalFieldset"],U=Object.freeze(Object.defineProperty({__proto__:null,ConditionalFieldset:m,Default:n,Error:s,Errors:a,__namedExportsOrder:q,default:B},Symbol.toStringTag,{value:"Module"}));export{m as C,n as D,s as E,U as S,a};
