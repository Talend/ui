import{j as e,r as u}from"./iframe-BrV_C0lS.js";import{B as n,p as m,q as S,r as B,s as g}from"./DialogBackdrop-DbwjiT3q.js";import{Q as v}from"./Skeleton-Cmr4UMml.js";import{a as p,S as a}from"./StackItem-CwJIVyrD.js";import"./QualityBar.component-lSALKcac.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-Cg_vEvHB.js";import"./index-DNNeNqar.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-DEWbpGS1.js";import"./RatioBar.component-D9rIKtKu.js";const D={component:n,title:"Messaging/Badge"},o=t=>e.jsx(n,{...t});o.args={label:"Badge",value:["Feature"],semantic:"none"};o.argTypes={label:{control:{type:"text"}},value:{control:{type:"text"}},variant:{control:{type:"select"},options:["badge","tag","dropdown","popover"]}};const r=[{id:"1",label:"Feature"},{id:"2",label:"Item"},{id:"3",label:"Component"}],s=()=>e.jsxs(p,{gap:"S",justify:"spaceBetween",children:[e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:['Component Badge w/ variant "badge"',e.jsx(n,{label:"Wonderful",value:["Feature"],variant:"badge"})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgeValue",e.jsx(g,{label:"Wonderful",value:["Feature"]})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgeValue w/ multi value",e.jsx(g,{label:"Wonderful",value:["Feature","Item","Component"]})]})]}),l=()=>e.jsxs(p,{gap:"S",justify:"spaceBetween",children:[e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:['Component Badge w/ variant "tag"',e.jsx(n,{label:"Delightful",variant:"tag"})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgeTag",e.jsx(B,{label:"Delightful"})]})]}),c=()=>{const[t,d]=u.useState("3");return e.jsxs(p,{gap:"S",justify:"spaceBetween",children:[e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:['Component Badge w/ variant "dropdown"',e.jsx(n,{label:"Awesome",selectedId:t,value:r,onChange:d,variant:"dropdown"})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgeDropdown",e.jsx(m,{label:"Awesome",selectedId:t,value:r,onChange:d})]})]})},i=()=>e.jsxs(p,{gap:"S",justify:"spaceBetween",children:[e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:['Component Badge w/ variant "popover"',e.jsx(n,{label:"Marvellous",value:r,variant:"popover",children:e.jsx("div",{children:"Some content with very loooooooooooooooooooooong text"})})]}),e.jsxs(a,{align:"center",gap:"S",justify:"spaceBetween",children:["Variant component BadgePopover",e.jsx(S,{label:"Marvellous",value:r,children:r.map(t=>e.jsx(v,{label:t.label,name:t.id},`checkbox-${t.id}`))})]})]});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"(props: BadgeProps) => <Badge {...props} />",...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <StackVertical gap="S" justify="spaceBetween">
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
    </StackVertical>`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <StackVertical gap="S" justify="spaceBetween">
        <StackHorizontal align="center" gap="S" justify="spaceBetween">
            Component Badge w/ variant "tag"
            <Badge label="Delightful" variant="tag" />
        </StackHorizontal>

        <StackHorizontal align="center" gap="S" justify="spaceBetween">
            Variant component BadgeTag
            <BadgeTag label="Delightful" />
        </StackHorizontal>
    </StackVertical>`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
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
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
}`,...i.parameters?.docs?.source}}};const F=["Overview","StoryBadgeValue","StoryBadgeTag","StoryBadgeDropdown","StoryBadgePopover"];export{o as Overview,c as StoryBadgeDropdown,i as StoryBadgePopover,l as StoryBadgeTag,s as StoryBadgeValue,F as __namedExportsOrder,D as default};
