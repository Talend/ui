import{j as e}from"./index--KvFR1jg.js";import"./DialogBackdrop-DKmgnz_i.js";import{F as n,c as s,B as l,d as u}from"./Skeleton-y1-gpUX_.js";import"./iframe-RzlH1tvj.js";import"./useCopyToClipboard-BeD991x2.js";import"./index-jzd0SbQr.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:o}=__STORYBOOK_MODULE_ACTIONS__,d={component:n.Buttons,title:"Form/Buttons"},r=()=>e.jsx(n,{children:e.jsxs(n.Buttons,{children:[e.jsx(u,{variant:"button"}),e.jsx(u,{variant:"button"})]})});r.parameters={};const t=()=>e.jsx(n,{children:e.jsxs(n.Buttons,{children:[e.jsx(s,{onClick:o("Clicked Previous"),children:"Previous"}),e.jsx(s,{onClick:o("Clicked Save"),children:"Save"}),e.jsx(l,{onClick:o("Clicked Submit"),icon:"triangle-circle",children:"Run"})]})});t.parameters={};const i=()=>e.jsx(n,{children:e.jsxs(n.Buttons,{children:[e.jsx(s,{onClick:o("Clicked Previous"),disabled:!0,children:"Previous"}),e.jsx(s,{onClick:o("Clicked Save"),disabled:!0,children:"Save"}),e.jsx(l,{onClick:o("Clicked Submit"),icon:"triangle-circle",isLoading:!0,children:"Run"})]})});i.parameters={};const a=()=>e.jsxs(n,{children:[e.jsxs(n.Fieldset,{legend:"Run job",children:[e.jsx(n.Text,{name:"name",label:"Name",required:!0,placeholder:"Job using JDBC connection"}),e.jsx(n.Textarea,{name:"textarea",label:"Description",placeholder:"Describe the job"})]}),e.jsxs(n.Buttons,{children:[e.jsx(s,{onClick:o("Clicked Previous"),children:"Previous"}),e.jsx(s,{onClick:o("Clicked Save"),children:"Save"}),e.jsx(l,{onClick:o("Clicked Submit"),icon:"triangle-circle",children:"Run"})]})]});a.parameters={};const c=()=>e.jsxs(n,{children:[e.jsxs(n.Fieldset,{legend:"Run job",children:[e.jsx(n.Text,{name:"name",label:"Name",required:!0,placeholder:"Job using JDBC connection"}),e.jsx(n.Textarea,{name:"textarea",label:"Description",placeholder:"Describe the job"})]}),e.jsx(n.Buttons,{children:e.jsx(l,{onClick:o("Clicked Submit"),icon:"triangle-circle",children:"Run"})})]});c.parameters={};const m=["FormButtonsSkeleton","FormButtonsDefault","FormButtonsLoading","FormButtonsOrder","FormButtonsSingle"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Buttons>
            <Skeleton variant="button" />
            <Skeleton variant="button" />
        </Form.Buttons>
    </Form>`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Buttons>
            <ButtonSecondary onClick={action('Clicked Previous')}>Previous</ButtonSecondary>
            <ButtonSecondary onClick={action('Clicked Save')}>Save</ButtonSecondary>
            <ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle">
                Run
            </ButtonPrimary>
        </Form.Buttons>
    </Form>`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Buttons>
            <ButtonSecondary onClick={action('Clicked Previous')} disabled>
                Previous
            </ButtonSecondary>
            <ButtonSecondary onClick={action('Clicked Save')} disabled>
                Save
            </ButtonSecondary>
            <ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle" isLoading>
                Run
            </ButtonPrimary>
        </Form.Buttons>
    </Form>`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Fieldset legend="Run job">
            <Form.Text name="name" label="Name" required placeholder="Job using JDBC connection" />
            <Form.Textarea name="textarea" label="Description" placeholder="Describe the job" />
        </Form.Fieldset>
        <Form.Buttons>
            <ButtonSecondary onClick={action('Clicked Previous')}>Previous</ButtonSecondary>
            <ButtonSecondary onClick={action('Clicked Save')}>Save</ButtonSecondary>
            <ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle">
                Run
            </ButtonPrimary>
        </Form.Buttons>
    </Form>`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Fieldset legend="Run job">
            <Form.Text name="name" label="Name" required placeholder="Job using JDBC connection" />
            <Form.Textarea name="textarea" label="Description" placeholder="Describe the job" />
        </Form.Fieldset>
        <Form.Buttons>
            <ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle">
                Run
            </ButtonPrimary>
        </Form.Buttons>
    </Form>`,...c.parameters?.docs?.source}}};const x=Object.freeze(Object.defineProperty({__proto__:null,FormButtonsDefault:t,FormButtonsLoading:i,FormButtonsOrder:a,FormButtonsSingle:c,FormButtonsSkeleton:r,__namedExportsOrder:m,default:d},Symbol.toStringTag,{value:"Module"}));export{r as F,x as S,t as a,i as b,a as c,c as d};
