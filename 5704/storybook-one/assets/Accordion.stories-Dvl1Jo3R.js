import{j as a}from"./iframe-CfWawTfz.js";import{N as u,O as e,A as m}from"./DialogBackdrop-BORENU0g.js";import"./Skeleton-WqWGNSGs.js";import{a as g}from"./StackItem-DxCmUS5t.js";import"./QualityBar.component-BEOa_2t1.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-CCa96Lmg.js";import"./index-mnPuEzeF.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-DqY3BSxz.js";import"./RatioBar.component-Cq1ZosWw.js";const W={component:u,title:"Navigation/Accordion"},l=()=>a.jsx("p",{children:"Quisque efficitur, magna sit amet tempor malesuada, orci mauris vestibulum enim, quis gravida est urna et ipsum. Nunc rutrum, magna id fermentum dignissim, magna sem volutpat risus, ut ultrices ipsum lacus vitae sapien. Curabitur sodales risus ac nibh efficitur, dapibus posuere ipsum bibendum. Proin erat ipsum, tempus in aliquet sed, auctor id sem. Maecenas ultrices, magna vitae pretium condimentum, ipsum lectus hendrerit est, a ultrices lacus odio in mi. Phasellus accumsan diam in metus dictum ultrices. In hac habitasse platea dictumst. Curabitur vestibulum vitae libero sit amet blandit. Nulla bibendum sollicitudin dolor at vehicula. Morbi quis viverra velit, eget ornare velit. Praesent porttitor sagittis nulla non vehicula. u"}),t=i=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsx(e,{...i,children:a.jsx(l,{})})});t.args={id:"simple-panel",title:"simple panel"};t.argTypes={id:{control:{type:"text"}},title:{control:{type:"text"}},status:{control:{type:"select"},options:["successful","failed","inProgress","warning","canceled"]},disabled:{control:{type:"boolean"}}};const s=()=>a.jsxs("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:[a.jsx(e,{status:"successful",children:a.jsx(l,{})}),a.jsx(e,{status:"failed",children:a.jsx(l,{})}),a.jsx(e,{status:"inProgress",children:a.jsx(l,{})}),a.jsx(e,{status:"warning",children:a.jsx(l,{})}),a.jsx(e,{status:"canceled",children:a.jsx(l,{})})]}),r={render:i=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsx(e,{...i,id:"disabled-panel",title:"disabled panel",action:{icon:"plus",tooltip:"action tooltip",callback:()=>window.alert("action callback")},disabled:!0,children:a.jsx(l,{})})})},n=()=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsx(e,{title:"small panel",size:"S",children:a.jsx(l,{})})}),o=()=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsxs(g,{gap:"S",align:"stretch",children:[a.jsx(e,{title:"Simple panel with several metadata",metadata:["Duration : 3sec",a.jsx(m,{children:"Success"},"successTag")],children:a.jsx(l,{})}),a.jsx(e,{title:"Simple panel with several metadata and action",metadata:["Duration : 3sec",a.jsx(m,{children:"Success"},"successTag")],action:{icon:"plus",tooltip:"action tooltip",callback:()=>window.alert("action callback")},children:a.jsx(l,{})}),a.jsx(e,{title:"simple panel with one metadata",metadata:["Duration : 3sec"],children:a.jsx(l,{})})]})}),c={render:i=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsx(e,{...i,id:"panel-with-actions",title:"panel with actions",action:[{icon:"talend-cog",tooltip:"action tooltip",callback:()=>window.alert("action callback")},{icon:"plus",tooltip:"action tooltip",callback:()=>window.alert("action callback")}],children:a.jsx(l,{})})})},p={render:i=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsxs(u,{...i,children:[a.jsx(e,{id:"panel-a",title:"first panel",children:a.jsx(l,{})}),a.jsx(e,{id:"panel-b",title:"second panel",children:a.jsx(l,{})}),a.jsx(e,{id:"panel-c",title:"third panel",children:a.jsx(l,{})})]})})},d=()=>a.jsx("div",{style:{maxWidth:"50rem",marginLeft:"auto",marginRight:"auto",padding:"1.875rem"},children:a.jsxs(g,{gap:"S",align:"stretch",children:[a.jsx(e,{title:"first panel",children:a.jsx(l,{})}),a.jsx(e,{title:"second panel",children:a.jsx(l,{})}),a.jsx(e,{title:"third panel",children:a.jsx(l,{})})]})});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`(props: CollapsiblePanelProps) => <div style={{
  maxWidth: '50rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1.875rem'
}}>
        <CollapsiblePanel {...props}>
            <SampleParagraph />
        </CollapsiblePanel>
    </div>`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <div style={{
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
    </div>`,...d.parameters?.docs?.source}}};const R=["SimpleCollapsiblePanel","StatusCollapsiblePanel","DisabledPanel","SmallPanel","WithMetadata","WithActions","AccordionWrapper","GroupOfSimplePanels"];export{p as AccordionWrapper,r as DisabledPanel,d as GroupOfSimplePanels,t as SimpleCollapsiblePanel,n as SmallPanel,s as StatusCollapsiblePanel,c as WithActions,o as WithMetadata,R as __namedExportsOrder,W as default};
