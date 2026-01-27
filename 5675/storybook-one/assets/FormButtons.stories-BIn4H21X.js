import{j as e}from"./iframe-tG6QAxGp.js";import"./DialogBackdrop-N06p4J8i.js";import{J as o,b as t,B as l,S as u}from"./Skeleton-L7DFVFIl.js";import"./StackItem-D6bOdz6V.js";import"./QualityBar.component-BZc_QuRi.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-B3Nh8BJ6.js";import"./index-lfDkKVxQ.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-BXOwPJfR.js";import"./RatioBar.component-CcljfwSJ.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,v={component:o.Buttons,title:"Form/Buttons"},n=()=>e.jsx(o,{children:e.jsxs(o.Buttons,{children:[e.jsx(u,{variant:"button"}),e.jsx(u,{variant:"button"})]})});n.parameters={};const i=()=>e.jsx(o,{children:e.jsxs(o.Buttons,{children:[e.jsx(t,{onClick:r("Clicked Previous"),children:"Previous"}),e.jsx(t,{onClick:r("Clicked Save"),children:"Save"}),e.jsx(l,{onClick:r("Clicked Submit"),icon:"triangle-circle",children:"Run"})]})});i.parameters={};const a=()=>e.jsx(o,{children:e.jsxs(o.Buttons,{children:[e.jsx(t,{onClick:r("Clicked Previous"),disabled:!0,children:"Previous"}),e.jsx(t,{onClick:r("Clicked Save"),disabled:!0,children:"Save"}),e.jsx(l,{onClick:r("Clicked Submit"),icon:"triangle-circle",isLoading:!0,children:"Run"})]})});a.parameters={};const c=()=>e.jsxs(o,{children:[e.jsxs(o.Fieldset,{legend:"Run job",children:[e.jsx(o.Text,{name:"name",label:"Name",required:!0,placeholder:"Job using JDBC connection"}),e.jsx(o.Textarea,{name:"textarea",label:"Description",placeholder:"Describe the job"})]}),e.jsxs(o.Buttons,{children:[e.jsx(t,{onClick:r("Clicked Previous"),children:"Previous"}),e.jsx(t,{onClick:r("Clicked Save"),children:"Save"}),e.jsx(l,{onClick:r("Clicked Submit"),icon:"triangle-circle",children:"Run"})]})]});c.parameters={};const s=()=>e.jsxs(o,{children:[e.jsxs(o.Fieldset,{legend:"Run job",children:[e.jsx(o.Text,{name:"name",label:"Name",required:!0,placeholder:"Job using JDBC connection"}),e.jsx(o.Textarea,{name:"textarea",label:"Description",placeholder:"Describe the job"})]}),e.jsx(o.Buttons,{children:e.jsx(l,{onClick:r("Clicked Submit"),icon:"triangle-circle",children:"Run"})})]});s.parameters={};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Buttons>
            <Skeleton variant="button" />
            <Skeleton variant="button" />
        </Form.Buttons>
    </Form>`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Buttons>
            <ButtonSecondary onClick={action('Clicked Previous')}>Previous</ButtonSecondary>
            <ButtonSecondary onClick={action('Clicked Save')}>Save</ButtonSecondary>
            <ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle">
                Run
            </ButtonPrimary>
        </Form.Buttons>
    </Form>`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <Form>
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
    </Form>`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <Form>
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
    </Form>`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <Form>
        <Form.Fieldset legend="Run job">
            <Form.Text name="name" label="Name" required placeholder="Job using JDBC connection" />
            <Form.Textarea name="textarea" label="Description" placeholder="Describe the job" />
        </Form.Fieldset>
        <Form.Buttons>
            <ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle">
                Run
            </ButtonPrimary>
        </Form.Buttons>
    </Form>`,...s.parameters?.docs?.source}}};const g=["FormButtonsSkeleton","FormButtonsDefault","FormButtonsLoading","FormButtonsOrder","FormButtonsSingle"];export{i as FormButtonsDefault,a as FormButtonsLoading,c as FormButtonsOrder,s as FormButtonsSingle,n as FormButtonsSkeleton,g as __namedExportsOrder,v as default};
