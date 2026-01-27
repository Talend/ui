import{j as e,r as F}from"./iframe-B_4wJIS8.js";import{u as g}from"./index.esm-Mthp71id.js";import"./DialogBackdrop-D7MtKuoD.js";import{J as r,b as u,B as c,N as R,K as y}from"./Skeleton-cdDsJzRx.js";import"./StackItem-BxaxeEKu.js";import"./QualityBar.component-PUC-FCks.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-dCWTMpVk.js";import"./index-DudLnKAe.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-BxQmsZ3a.js";import"./RatioBar.component-CyE2ANiy.js";const P={component:r.Fieldset,title:"Form/Fieldset"},s=()=>e.jsxs(r,{children:[e.jsxs(r.Fieldset,{legend:"Frequency",children:[e.jsxs(r.Select,{name:"repeat",label:"Repeat",children:[e.jsx("option",{children:"At specific intervals"}),e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(r.Row,{children:[e.jsx(r.Number,{label:"Minutes",suffix:"minutes",name:"minutes"}),e.jsx(r.Time,{name:"repeat-from",label:"Repeat from",required:!0}),e.jsx(r.Time,{name:"repeat-to",label:"Repeat to",required:!0})]})]}),e.jsxs(r.Buttons,{children:[e.jsx(u,{onClick:()=>{},children:"Cancel"}),e.jsx(c,{type:"submit",onClick:()=>{},children:"Submit"})]})]}),a=()=>e.jsxs(r,{children:[e.jsxs(r.Fieldset,{legend:"Frequency",children:[e.jsxs(r.Select,{name:"repeat",label:"Repeat",children:[e.jsx("option",{children:"At specific intervals"}),e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(r.Row,{children:[e.jsx(r.Number,{label:"Minutes",suffix:"minutes",name:"minutes"}),e.jsx(r.Time,{hasError:!0,name:"repeat-from",label:"Repeat from",required:!0,description:"Repeat from is invalid"}),e.jsx(r.Time,{name:"repeat-to",label:"Repeat to",required:!0})]})]}),e.jsxs(r.Buttons,{children:[e.jsx(u,{onClick:()=>{},children:"Cancel"}),e.jsx(c,{type:"submit",onClick:()=>{},children:"Submit"})]})]}),m=()=>e.jsxs(r,{children:[e.jsxs(r.Fieldset,{legend:"Frequency",children:[e.jsxs(r.Select,{name:"repeat",label:"Repeat",children:[e.jsx("option",{children:"At specific intervals"}),e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(r.Row,{children:[e.jsx(r.Number,{label:"Minutes",suffix:"minutes",name:"minutes"}),e.jsx(r.Time,{hasError:!0,name:"repeat-from",label:"Repeat from",required:!0,description:"Repeat from is invalid"}),e.jsx(r.Time,{hasError:!0,name:"repeat-to",label:"Repeat to",required:!0,description:"Repeat to is invalid"})]})]}),e.jsxs(r.Buttons,{children:[e.jsx(u,{onClick:()=>{},children:"Cancel"}),e.jsx(c,{type:"submit",onClick:()=>{},children:"Submit"})]})]}),l=()=>{const[d,h]=F.useState(null),{register:i,watch:f,handleSubmit:b,unregister:p,formState:x}=g(),{errors:t}=x,n=f("withUser",!1),o=Object.keys(t).length>1;F.useEffect(()=>{n||(p("name"),p("email"))},[n]);const S=j=>{h(JSON.stringify(j))};return e.jsxs(r,{onSubmit:b(S),children:[e.jsxs(r.Fieldset,{legend:"Create an account",children:[o&&e.jsx(r.Row,{children:e.jsx(R,{description:"Every displayed field is required",withBackground:!0})}),d&&e.jsx(r.Row,{children:e.jsx(y,{title:"Form submitted",description:d,withBackground:!0})}),e.jsxs(r.Row,{children:[e.jsx(r.Text,{label:"Account name",suffix:".info",hasError:!!t.accountName,description:!o&&t.accountName?.message||void 0,required:!0,...i("accountName",{required:"This field is required"})}),e.jsx(r.Number,{label:"Slots",hasError:!!t.numberOfSlots,description:!o&&t.numberOfSlots?.message||void 0,required:!0,...i("numberOfSlots",{required:"This field is required"})})]}),e.jsx(r.ToggleSwitch,{label:"Send invite to admin user",...i("withUser"),checked:n})]}),n&&e.jsxs(r.Fieldset,{legend:"Invite admin for this account",children:[e.jsx(r.Text,{label:"Username",hasError:"name"in t&&!!t.name,description:!o&&"name"in t&&t.name?.message||void 0,...i("name",{required:"This field is required"})}),e.jsx(r.Email,{label:"User email",hasError:"email"in t&&!!t.email,description:!o&&"email"in t&&t.email?.message||void 0,...i("email",{required:"This field is required"})})]}),e.jsxs(r.Buttons,{children:[e.jsx(u,{type:"reset",children:"Cancel"}),e.jsx(c,{type:"submit",onClick:()=>{},children:"Submit"})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
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
}`,...a.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
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
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
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
}`,...l.parameters?.docs?.source}}};const A=["Default","Error","Errors","ConditionalFieldset"];export{l as ConditionalFieldset,s as Default,a as Error,m as Errors,A as __namedExportsOrder,P as default};
