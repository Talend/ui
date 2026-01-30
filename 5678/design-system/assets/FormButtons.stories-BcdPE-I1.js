import{j as e}from"./index-BfyV6fgH.js";import"./DialogBackdrop-Cck8yRo6.js";import{O as o,c as s,B as l,d as u}from"./Skeleton-DfZ5cPl-.js";import"./iframe-DB7vHRjW.js";import"./useCopyToClipboard-4_wheD1f.js";import"./index-BzQ6li6Y.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,d={component:o.Buttons,title:"Form/Buttons"},t=()=>e.jsx(o,{children:e.jsxs(o.Buttons,{children:[e.jsx(u,{variant:"button"}),e.jsx(u,{variant:"button"})]})});t.parameters={};const n=()=>e.jsx(o,{children:e.jsxs(o.Buttons,{children:[e.jsx(s,{onClick:r("Clicked Previous"),children:"Previous"}),e.jsx(s,{onClick:r("Clicked Save"),children:"Save"}),e.jsx(l,{onClick:r("Clicked Submit"),icon:"triangle-circle",children:"Run"})]})});n.parameters={};const i=()=>e.jsx(o,{children:e.jsxs(o.Buttons,{children:[e.jsx(s,{onClick:r("Clicked Previous"),disabled:!0,children:"Previous"}),e.jsx(s,{onClick:r("Clicked Save"),disabled:!0,children:"Save"}),e.jsx(l,{onClick:r("Clicked Submit"),icon:"triangle-circle",isLoading:!0,children:"Run"})]})});i.parameters={};const a=()=>e.jsxs(o,{children:[e.jsxs(o.Fieldset,{legend:"Run job",children:[e.jsx(o.Text,{name:"name",label:"Name",required:!0,placeholder:"Job using JDBC connection"}),e.jsx(o.Textarea,{name:"textarea",label:"Description",placeholder:"Describe the job"})]}),e.jsxs(o.Buttons,{children:[e.jsx(s,{onClick:r("Clicked Previous"),children:"Previous"}),e.jsx(s,{onClick:r("Clicked Save"),children:"Save"}),e.jsx(l,{onClick:r("Clicked Submit"),icon:"triangle-circle",children:"Run"})]})]});a.parameters={};const c=()=>e.jsxs(o,{children:[e.jsxs(o.Fieldset,{legend:"Run job",children:[e.jsx(o.Text,{name:"name",label:"Name",required:!0,placeholder:"Job using JDBC connection"}),e.jsx(o.Textarea,{name:"textarea",label:"Description",placeholder:"Describe the job"})]}),e.jsx(o.Buttons,{children:e.jsx(l,{onClick:r("Clicked Submit"),icon:"triangle-circle",children:"Run"})})]});c.parameters={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Buttons>
            <Skeleton variant="button" />
            <Skeleton variant="button" />
        </Form.Buttons>
    </Form>`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Buttons>
            <ButtonSecondary onClick={action('Clicked Previous')}>Previous</ButtonSecondary>
            <ButtonSecondary onClick={action('Clicked Save')}>Save</ButtonSecondary>
            <ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle">
                Run
            </ButtonPrimary>
        </Form.Buttons>
    </Form>`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <Form>
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
    </Form>`,...c.parameters?.docs?.source}}};const m=["FormButtonsSkeleton","FormButtonsDefault","FormButtonsLoading","FormButtonsOrder","FormButtonsSingle"],x=Object.freeze(Object.defineProperty({__proto__:null,FormButtonsDefault:n,FormButtonsLoading:i,FormButtonsOrder:a,FormButtonsSingle:c,FormButtonsSkeleton:t,__namedExportsOrder:m,default:d},Symbol.toStringTag,{value:"Module"}));export{t as F,x as S,n as a,i as b,a as c,c as d};
