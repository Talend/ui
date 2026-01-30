import{j as a}from"./index-B-4QAGRT.js";import{O as u,Q as e,C as m}from"./DialogBackdrop-9Sis8N-G.js";import{a as g}from"./Skeleton-QTANCvJ0.js";import"./iframe-Bzc6Acpn.js";import"./useCopyToClipboard-5SsFVDgy.js";import"./index-BBitzEYX.js";import"./TalendDesignTokens-JgHEBmOa.js";const h={component:u,title:"Navigation/Accordion"},l=()=>a.jsx("p",{children:"Quisque efficitur, magna sit amet tempor malesuada, orci mauris vestibulum enim, quis gravida est urna et ipsum. Nunc rutrum, magna id fermentum dignissim, magna sem volutpat risus, ut ultrices ipsum lacus vitae sapien. Curabitur sodales risus ac nibh efficitur, dapibus posuere ipsum bibendum. Proin erat ipsum, tempus in aliquet sed, auctor id sem. Maecenas ultrices, magna vitae pretium condimentum, ipsum lectus hendrerit est, a ultrices lacus odio in mi. Phasellus accumsan diam in metus dictum ultrices. In hac habitasse platea dictumst. Curabitur vestibulum vitae libero sit amet blandit. Nulla bibendum sollicitudin dolor at vehicula. Morbi quis viverra velit, eget ornare velit. Praesent porttitor sagittis nulla non vehicula. u"}),i=t=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsx(e,{...t,children:a.jsx(l,{})})});i.args={id:"simple-panel",title:"simple panel"};i.argTypes={id:{control:{type:"text"}},title:{control:{type:"text"}},status:{control:{type:"select"},options:["successful","failed","inProgress","warning","canceled"]},disabled:{control:{type:"boolean"}}};const s=()=>a.jsxs("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:[a.jsx(e,{status:"successful",children:a.jsx(l,{})}),a.jsx(e,{status:"failed",children:a.jsx(l,{})}),a.jsx(e,{status:"inProgress",children:a.jsx(l,{})}),a.jsx(e,{status:"warning",children:a.jsx(l,{})}),a.jsx(e,{status:"canceled",children:a.jsx(l,{})})]}),r={render:t=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsx(e,{...t,id:"disabled-panel",title:"disabled panel",action:{icon:"plus",tooltip:"action tooltip",callback:()=>window.alert("action callback")},disabled:!0,children:a.jsx(l,{})})})},n=()=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsx(e,{title:"small panel",size:"S",children:a.jsx(l,{})})}),o=()=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsxs(g,{gap:"S",align:"stretch",children:[a.jsx(e,{title:"Simple panel with several metadata",metadata:["Duration : 3sec",a.jsx(m,{children:"Success"},"successTag")],children:a.jsx(l,{})}),a.jsx(e,{title:"Simple panel with several metadata and action",metadata:["Duration : 3sec",a.jsx(m,{children:"Success"},"successTag")],action:{icon:"plus",tooltip:"action tooltip",callback:()=>window.alert("action callback")},children:a.jsx(l,{})}),a.jsx(e,{title:"simple panel with one metadata",metadata:["Duration : 3sec"],children:a.jsx(l,{})})]})}),c={render:t=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsx(e,{...t,id:"panel-with-actions",title:"panel with actions",action:[{icon:"talend-cog",tooltip:"action tooltip",callback:()=>window.alert("action callback")},{icon:"plus",tooltip:"action tooltip",callback:()=>window.alert("action callback")}],children:a.jsx(l,{})})})},p={render:t=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsxs(u,{...t,children:[a.jsx(e,{id:"panel-a",title:"first panel",children:a.jsx(l,{})}),a.jsx(e,{id:"panel-b",title:"second panel",children:a.jsx(l,{})}),a.jsx(e,{id:"panel-c",title:"third panel",children:a.jsx(l,{})})]})})},d=()=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsxs(g,{gap:"S",align:"stretch",children:[a.jsx(e,{title:"first panel",children:a.jsx(l,{})}),a.jsx(e,{title:"second panel",children:a.jsx(l,{})}),a.jsx(e,{title:"third panel",children:a.jsx(l,{})})]})});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`(props: CollapsiblePanelProps) => <div style={{
  maxWidth: '50rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1.875rem'
}}>
        <CollapsiblePanel {...props}>
            <SampleParagraph />
        </CollapsiblePanel>
    </div>`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <div style={{
  maxWidth: '50rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1.875rem'
}}>
        <CollapsiblePanel status="successful">
            <SampleParagraph />
        </CollapsiblePanel>
        <CollapsiblePanel status="failed">
            <SampleParagraph />
        </CollapsiblePanel>
        <CollapsiblePanel status="inProgress">
            <SampleParagraph />
        </CollapsiblePanel>
        <CollapsiblePanel status="warning">
            <SampleParagraph />
        </CollapsiblePanel>
        <CollapsiblePanel status="canceled">
            <SampleParagraph />
        </CollapsiblePanel>
    </div>`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <div style={{
    maxWidth: '50rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1.875rem'
  }}>
            <CollapsiblePanel {...props} id="disabled-panel" title="disabled panel" action={{
      icon: 'plus',
      tooltip: 'action tooltip',
      callback: () => window.alert('action callback')
    }} disabled>
                <SampleParagraph />
            </CollapsiblePanel>
        </div>
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <div style={{
  maxWidth: '50rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1.875rem'
}}>
        <CollapsiblePanel title="small panel" size="S">
            <SampleParagraph />
        </CollapsiblePanel>
    </div>`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <div style={{
  maxWidth: '50rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1.875rem'
}}>
        <StackVertical gap={'S'} align="stretch">
            <CollapsiblePanel title="Simple panel with several metadata" metadata={['Duration : 3sec', <TagSuccess key="successTag">Success</TagSuccess>]}>
                <SampleParagraph />
            </CollapsiblePanel>
            <CollapsiblePanel title="Simple panel with several metadata and action" metadata={['Duration : 3sec', <TagSuccess key="successTag">Success</TagSuccess>]} action={{
      icon: 'plus',
      tooltip: 'action tooltip',
      callback: () => window.alert('action callback')
    }}>
                <SampleParagraph />
            </CollapsiblePanel>
            <CollapsiblePanel title="simple panel with one metadata" metadata={['Duration : 3sec']}>
                <SampleParagraph />
            </CollapsiblePanel>
        </StackVertical>
    </div>`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <div style={{
    maxWidth: '50rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1.875rem'
  }}>
            <CollapsiblePanel {...props} id="panel-with-actions" title="panel with actions" action={[{
      icon: 'talend-cog',
      tooltip: 'action tooltip',
      callback: () => window.alert('action callback')
    }, {
      icon: 'plus',
      tooltip: 'action tooltip',
      callback: () => window.alert('action callback')
    }]}>
                <SampleParagraph />
            </CollapsiblePanel>
        </div>
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <div style={{
    maxWidth: '50rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1.875rem'
  }}>
            <Accordion {...props}>
                <CollapsiblePanel id="panel-a" title="first panel">
                    <SampleParagraph />
                </CollapsiblePanel>
                <CollapsiblePanel id="panel-b" title="second panel">
                    <SampleParagraph />
                </CollapsiblePanel>
                <CollapsiblePanel id="panel-c" title="third panel">
                    <SampleParagraph />
                </CollapsiblePanel>
            </Accordion>
        </div>
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <div style={{
  maxWidth: '50rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1.875rem'
}}>
        <StackVertical gap={'S'} align="stretch">
            <CollapsiblePanel title="first panel">
                <SampleParagraph />
            </CollapsiblePanel>
            <CollapsiblePanel title="second panel">
                <SampleParagraph />
            </CollapsiblePanel>
            <CollapsiblePanel title="third panel">
                <SampleParagraph />
            </CollapsiblePanel>
        </StackVertical>
    </div>`,...d.parameters?.docs?.source}}};const b=["SimpleCollapsiblePanel","StatusCollapsiblePanel","DisabledPanel","SmallPanel","WithMetadata","WithActions","AccordionWrapper","GroupOfSimplePanels"],w=Object.freeze(Object.defineProperty({__proto__:null,AccordionWrapper:p,DisabledPanel:r,GroupOfSimplePanels:d,SimpleCollapsiblePanel:i,SmallPanel:n,StatusCollapsiblePanel:s,WithActions:c,WithMetadata:o,__namedExportsOrder:b,default:h},Symbol.toStringTag,{value:"Module"}));export{p as A,r as D,d as G,w as S,c as W,i as a,s as b,n as c,o as d};
