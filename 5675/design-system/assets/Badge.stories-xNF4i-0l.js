import{j as e}from"./index-DqyI3zNy.js";import{a as u}from"./iframe-BqCCNGDC.js";import{B as n,q as g,r as m,s as S,t as B}from"./DialogBackdrop-Bbhqy77d.js";import{d as p,S as a,a4 as v}from"./Skeleton-DhSiadqt.js";import"./useCopyToClipboard-DqYYtEeu.js";import"./index-3dZT5jlp.js";import"./TalendDesignTokens-JgHEBmOa.js";const j={component:n,title:"Messaging/Badge"},o=t=>e.jsx(n,{...t});o.args={label:"Badge",value:["Feature"],semantic:"none"};o.argTypes={label:{control:{type:"text"}},value:{control:{type:"text"}},variant:{control:{type:"select"},options:["badge","tag","dropdown","popover"]}};const i=[{id:"1",label:"Feature"},{id:"2",label:"Item"},{id:"3",label:"Component"}],r=()=>e.jsxs(p,{gap:"S",justify:"spaceBetween",children:[e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:['Component Badge w/ variant "badge"',e.jsx(n,{label:"Wonderful",value:["Feature"],variant:"badge"})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgeValue",e.jsx(g,{label:"Wonderful",value:["Feature"]})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgeValue w/ multi value",e.jsx(g,{label:"Wonderful",value:["Feature","Item","Component"]})]})]}),s=()=>e.jsxs(p,{gap:"S",justify:"spaceBetween",children:[e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:['Component Badge w/ variant "tag"',e.jsx(n,{label:"Delightful",variant:"tag"})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgeTag",e.jsx(m,{label:"Delightful"})]})]}),l=()=>{const[t,d]=u.useState("3");return e.jsxs(p,{gap:"S",justify:"spaceBetween",children:[e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:['Component Badge w/ variant "dropdown"',e.jsx(n,{label:"Awesome",selectedId:t,value:i,onChange:d,variant:"dropdown"})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgeDropdown",e.jsx(S,{label:"Awesome",selectedId:t,value:i,onChange:d})]})]})},c=()=>e.jsxs(p,{gap:"S",justify:"spaceBetween",children:[e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:['Component Badge w/ variant "popover"',e.jsx(n,{label:"Marvellous",value:i,variant:"popover",children:e.jsx("div",{children:"Some content with very loooooooooooooooooooooong text"})})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgePopover",e.jsx(B,{label:"Marvellous",value:i,children:i.map(t=>e.jsx(v,{label:t.label,name:t.id},`checkbox-${t.id}`))})]})]});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"(props: BadgeProps) => <Badge {...props} />",...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <StackVertical gap="S" justify="spaceBetween">
        <StackHorizontal align="center" gap="S" justify="spaceBetween">
            Component Badge w/ variant "badge"
            <Badge label="Wonderful" value={['Feature']} variant="badge" />
        </StackHorizontal>

        <StackHorizontal align="center" gap="S" justify="spaceBetween">
            Variant component BadgeValue
            <BadgeValue label="Wonderful" value={['Feature']} />
        </StackHorizontal>

        <StackHorizontal align="center" gap="S" justify="spaceBetween">
            Variant component BadgeValue w/ multi value
            <BadgeValue label="Wonderful" value={['Feature', 'Item', 'Component']} />
        </StackHorizontal>
    </StackVertical>`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <StackVertical gap="S" justify="spaceBetween">
        <StackHorizontal align="center" gap="S" justify="spaceBetween">
            Component Badge w/ variant "tag"
            <Badge label="Delightful" variant="tag" />
        </StackHorizontal>

        <StackHorizontal align="center" gap="S" justify="spaceBetween">
            Variant component BadgeTag
            <BadgeTag label="Delightful" />
        </StackHorizontal>
    </StackVertical>`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  const [selectedValue, setSelectedValue] = useState('3');
  return <StackVertical gap="S" justify="spaceBetween">
            <StackHorizontal align="center" gap="S" justify="spaceBetween">
                Component Badge w/ variant "dropdown"
                <Badge label="Awesome" selectedId={selectedValue} value={items} onChange={setSelectedValue} variant="dropdown" />
            </StackHorizontal>

            <StackHorizontal align="center" gap="S" justify="spaceBetween">
                Variant component BadgeDropdown
                <BadgeDropdown label="Awesome" selectedId={selectedValue} value={items} onChange={setSelectedValue} />
            </StackHorizontal>
        </StackVertical>;
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  return <StackVertical gap="S" justify="spaceBetween">
            <StackHorizontal align="center" gap="S" justify="spaceBetween">
                Component Badge w/ variant "popover"
                <Badge label="Marvellous" value={items} variant="popover">
                    <div>Some content with very loooooooooooooooooooooong text</div>
                </Badge>
            </StackHorizontal>

            <StackHorizontal align="center" gap="S" justify="spaceBetween">
                Variant component BadgePopover
                <BadgePopover label="Marvellous" value={items}>
                    {items.map(item => <Checkbox key={\`checkbox-\${item.id}\`} label={item.label} name={item.id} />)}
                </BadgePopover>
            </StackHorizontal>
        </StackVertical>;
}`,...c.parameters?.docs?.source}}};const w=["Overview","StoryBadgeValue","StoryBadgeTag","StoryBadgeDropdown","StoryBadgePopover"],z=Object.freeze(Object.defineProperty({__proto__:null,Overview:o,StoryBadgeDropdown:l,StoryBadgePopover:c,StoryBadgeTag:s,StoryBadgeValue:r,__namedExportsOrder:w,default:j},Symbol.toStringTag,{value:"Module"}));export{z as S,r as a,s as b,l as c,c as d};
