import{j as e}from"./index-Dhfj2E11.js";import"./DialogBackdrop-5SPCz04Q.js";import{O as o,d as i}from"./Skeleton-B3m-S_Aq.js";import"./iframe-Bhwq12Bt.js";import"./useCopyToClipboard-Bw1cKZv-.js";import"./index-D8nj1xkF.js";import"./TalendDesignTokens-JgHEBmOa.js";const a={title:"Form/Fields/Select",component:o.Select},t=()=>e.jsxs(i,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsxs(o.Select,{name:"select",label:"Default select",placeholder:"Placeholder",children:[e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Default select disabled",placeholder:"Placeholder",disabled:!0,children:[e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Default select read-only",placeholder:"Placeholder",readOnly:!0,children:[e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Default select with error",placeholder:"Placeholder",hasError:!0,description:"This field is required",required:!0,children:[e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]})]}),l=()=>e.jsxs(i,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsxs(o.Select,{name:"select",label:"Default select with value",children:[e.jsx("option",{selected:!0,children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Default select with value disabled",disabled:!0,children:[e.jsx("option",{selected:!0,children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Default select with value read-only",readOnly:!0,children:[e.jsx("option",{selected:!0,children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Default select with value and error",hasError:!0,description:"This field is required",required:!0,children:[e.jsx("option",{selected:!0,children:"Foo"}),e.jsx("option",{children:"Bar"})]})]}),r=()=>e.jsxs(i,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsxs(o.Select,{name:"select",label:"Multiple select",placeholder:"Placeholder",multiple:!0,children:[e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Multiple select with default values",multiple:!0,children:[e.jsx("option",{selected:!0,children:"Foo"}),e.jsx("option",{selected:!0,children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Multiple select disabled",disabled:!0,multiple:!0,children:[e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Multiple select read-only",readOnly:!0,multiple:!0,children:[e.jsx("option",{selected:!0,children:"Foo"}),e.jsx("option",{selected:!0,children:"Bar"})]}),e.jsxs(o.Select,{name:"select",label:"Multiple select with error",multiple:!0,hasError:!0,description:"This field is required",required:!0,children:[e.jsx("option",{children:"Foo"}),e.jsx("option",{children:"Bar"})]})]}),n=()=>e.jsxs(i,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsxs(o.Select,{name:"select-one",label:"Select with option group",children:[e.jsxs("optgroup",{label:"Foo",children:[e.jsx("option",{children:"Foo-Foo"}),e.jsx("option",{selected:!0,children:"Foo-Bar"})]}),e.jsxs("optgroup",{label:"Bar",children:[e.jsx("option",{children:"Bar-Foo"}),e.jsx("option",{children:"Bar-Bar"})]})]}),e.jsxs(o.Select,{name:"select-two",label:"Select with option group disabled",disabled:!0,children:[e.jsxs("optgroup",{label:"Foo",children:[e.jsx("option",{children:"Foo-Foo"}),e.jsx("option",{selected:!0,children:"Foo-Bar"})]}),e.jsxs("optgroup",{label:"Bar",children:[e.jsx("option",{children:"Bar-Foo"}),e.jsx("option",{children:"Bar-Bar"})]})]}),e.jsxs(o.Select,{name:"select-three",label:"Select with option group read-only",readOnly:!0,children:[e.jsxs("optgroup",{label:"Foo",children:[e.jsx("option",{children:"Foo-Foo"}),e.jsx("option",{selected:!0,children:"Foo-Bar"})]}),e.jsxs("optgroup",{label:"Bar",children:[e.jsx("option",{children:"Bar-Foo"}),e.jsx("option",{children:"Bar-Bar"})]})]}),e.jsxs(o.Select,{name:"select-one-multiple",multiple:!0,label:"Multiple select with option group",children:[e.jsxs("optgroup",{label:"Foo",children:[e.jsx("option",{children:"Foo-Foo"}),e.jsx("option",{selected:!0,children:"Foo-Bar"})]}),e.jsxs("optgroup",{label:"Bar",children:[e.jsx("option",{children:"Bar-Foo"}),e.jsx("option",{children:"Bar-Bar"})]})]}),e.jsxs(o.Select,{name:"select-two-multiple",multiple:!0,label:"Multiple select with option group disabled",disabled:!0,children:[e.jsxs("optgroup",{label:"Foo",children:[e.jsx("option",{children:"Foo-Foo"}),e.jsx("option",{selected:!0,children:"Foo-Bar"})]}),e.jsxs("optgroup",{label:"Bar",children:[e.jsx("option",{children:"Bar-Foo"}),e.jsx("option",{children:"Bar-Bar"})]})]}),e.jsxs(o.Select,{name:"select-three-multiple",multiple:!0,label:"Multiple select with option group read-only",readOnly:!0,children:[e.jsxs("optgroup",{label:"Foo",children:[e.jsx("option",{children:"Foo-Foo"}),e.jsx("option",{selected:!0,children:"Foo-Bar"})]}),e.jsxs("optgroup",{label:"Bar",children:[e.jsx("option",{children:"Bar-Foo"}),e.jsx("option",{children:"Bar-Bar"})]})]})]});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Select name="select" label="Default select" placeholder="Placeholder">
            <option>Foo</option>
            <option>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Default select disabled" placeholder="Placeholder" disabled>
            <option>Foo</option>
            <option>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Default select read-only" placeholder="Placeholder" readOnly>
            <option>Foo</option>
            <option>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Default select with error" placeholder="Placeholder" hasError description="This field is required" required>
            <option>Foo</option>
            <option>Bar</option>
        </Form.Select>
    </StackVertical>`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Select name="select" label="Default select with value">
            <option selected>Foo</option>
            <option>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Default select with value disabled" disabled>
            <option selected>Foo</option>
            <option>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Default select with value read-only" readOnly>
            <option selected>Foo</option>
            <option>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Default select with value and error" hasError description="This field is required" required>
            <option selected>Foo</option>
            <option>Bar</option>
        </Form.Select>
    </StackVertical>`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Select name="select" label="Multiple select" placeholder="Placeholder" multiple>
            <option>Foo</option>
            <option>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Multiple select with default values" multiple>
            <option selected>Foo</option>
            <option selected>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Multiple select disabled" disabled multiple>
            <option>Foo</option>
            <option>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Multiple select read-only" readOnly multiple>
            <option selected>Foo</option>
            <option selected>Bar</option>
        </Form.Select>
        <Form.Select name="select" label="Multiple select with error" multiple hasError description="This field is required" required>
            <option>Foo</option>
            <option>Bar</option>
        </Form.Select>
    </StackVertical>`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Select name="select-one" label="Select with option group">
            <optgroup label="Foo">
                <option>Foo-Foo</option>
                <option selected>Foo-Bar</option>
            </optgroup>
            <optgroup label="Bar">
                <option>Bar-Foo</option>
                <option>Bar-Bar</option>
            </optgroup>
        </Form.Select>
        <Form.Select name="select-two" label="Select with option group disabled" disabled>
            <optgroup label="Foo">
                <option>Foo-Foo</option>
                <option selected>Foo-Bar</option>
            </optgroup>
            <optgroup label="Bar">
                <option>Bar-Foo</option>
                <option>Bar-Bar</option>
            </optgroup>
        </Form.Select>
        <Form.Select name="select-three" label="Select with option group read-only" readOnly>
            <optgroup label="Foo">
                <option>Foo-Foo</option>
                <option selected>Foo-Bar</option>
            </optgroup>
            <optgroup label="Bar">
                <option>Bar-Foo</option>
                <option>Bar-Bar</option>
            </optgroup>
        </Form.Select>
        <Form.Select name="select-one-multiple" multiple label="Multiple select with option group">
            <optgroup label="Foo">
                <option>Foo-Foo</option>
                <option selected>Foo-Bar</option>
            </optgroup>
            <optgroup label="Bar">
                <option>Bar-Foo</option>
                <option>Bar-Bar</option>
            </optgroup>
        </Form.Select>
        <Form.Select name="select-two-multiple" multiple label="Multiple select with option group disabled" disabled>
            <optgroup label="Foo">
                <option>Foo-Foo</option>
                <option selected>Foo-Bar</option>
            </optgroup>
            <optgroup label="Bar">
                <option>Bar-Foo</option>
                <option>Bar-Bar</option>
            </optgroup>
        </Form.Select>
        <Form.Select name="select-three-multiple" multiple label="Multiple select with option group read-only" readOnly>
            <optgroup label="Foo">
                <option>Foo-Foo</option>
                <option selected>Foo-Bar</option>
            </optgroup>
            <optgroup label="Bar">
                <option>Bar-Foo</option>
                <option>Bar-Bar</option>
            </optgroup>
        </Form.Select>
    </StackVertical>`,...n.parameters?.docs?.source}}};const c=["Select","SelectWithValue","SelectMultiple","SelectOptionGroups"],j=Object.freeze(Object.defineProperty({__proto__:null,Select:t,SelectMultiple:r,SelectOptionGroups:n,SelectWithValue:l,__namedExportsOrder:c,default:a},Symbol.toStringTag,{value:"Module"}));export{j as S,t as a,l as b,r as c,n as d};
