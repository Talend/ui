import{j as e,t as r}from"./iframe-BSz8vrfY.js";import{B as s}from"./ButtonSecondary-C4SsZjql.js";import{T as o}from"./TooltipTrigger.component-DUDXLG6K.js";import"./preload-helper-PPVm8Dsz.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__;function t(n,l){return e.jsx(o,{label:"This is a huuuuuuuuuuuuuuuuuuuuuuge tooltip for a very very demo",tooltipPlacement:l,"data-feature":"my.feature",children:e.jsx("div",{style:{display:"inline-block"},children:e.jsx(s,{onClick:a("click"),children:n})})})}const u={title:"Components/Messaging & Communication/Tooltip"},i=()=>{const n={flex:"0 0 auto",display:"flex",alignItems:"center",justifyContent:"center",width:"30.625rem",height:"18.75rem",textAlign:"center"};return e.jsxs("div",{style:{display:"flex",flexDirection:"column",height:"100vh"},children:[e.jsxs("div",{style:{display:"flex",flex:0,flexDirection:"row",padding:"0.625rem"},children:[e.jsxs("div",{style:{marginRight:"auto"},children:[t("↑","top"),t("←","left")]}),e.jsxs("div",{style:{marginLeft:"auto"},children:[t("→","right"),t("↑","top")]})]}),e.jsxs("div",{style:{display:"flex",flex:1,flexDirection:"row",padding:"0.625rem"},children:[e.jsx("div",{style:{display:"flex",alignItems:"center",marginRight:"auto"},children:t("←","left")}),e.jsxs("div",{children:[e.jsx("h1",{children:"TooltipTrigger"}),e.jsx("h2",{children:"Definition"}),e.jsx("p",{children:"The action component displays a dropdown where each element let the user dispatch an action"}),e.jsx("h2",{children:"Examples"}),e.jsx("p",{children:"By default :"}),e.jsxs("div",{style:{display:"flex",margin:"0 auto",flexWrap:"wrap",height:"18.75rem",width:"62.5rem",overflow:"auto",background:r.coralColorNeutralBackgroundMedium,border:"1px solid"},children:[e.jsx("div",{style:n,children:t("→")}),e.jsx("div",{style:n,children:t("↑","top")}),e.jsx("div",{style:n,children:t("↓","bottom")}),e.jsx("div",{style:n,children:t("←","left")})]}),e.jsx("p",{children:"With a custom component in the tooltip"}),e.jsx(o,{label:e.jsxs("div",{children:[e.jsx("span",{children:"I'm a custom component"}),`
`,e.jsx("span",{children:"with a line feeding 🙃"})]}),children:e.jsx("span",{children:"Loreum...."})})]}),e.jsx("div",{style:{display:"flex",alignItems:"center",marginLeft:"auto"},children:t("→","right")})]}),e.jsxs("div",{style:{display:"flex",flex:0,flexDirection:"row",padding:"0.625rem"},children:[e.jsxs("div",{style:{marginRight:"auto"},children:[t("↓","bottom"),t("←","left")]}),e.jsxs("div",{style:{marginLeft:"auto"},children:[t("→","right"),t("↓","bottom")]})]})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  const style = {
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30.625rem',
    height: '18.75rem',
    textAlign: 'center'
  };
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }}>
            <div style={{
      display: 'flex',
      flex: 0,
      flexDirection: 'row',
      padding: '0.625rem'
    }}>
                <div style={{
        marginRight: 'auto'
      }}>
                    {generateButtonWithTooltip('↑', 'top')}
                    {generateButtonWithTooltip('←', 'left')}
                </div>
                <div style={{
        marginLeft: 'auto'
      }}>
                    {generateButtonWithTooltip('→', 'right')}
                    {generateButtonWithTooltip('↑', 'top')}
                </div>
            </div>
            <div style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      padding: '0.625rem'
    }}>
                <div style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: 'auto'
      }}>
                    {generateButtonWithTooltip('←', 'left')}
                </div>
                <div>
                    <h1>TooltipTrigger</h1>
                    <h2>Definition</h2>
                    <p>
                        The action component displays a dropdown where each element let the user dispatch an
                        action
                    </p>
                    <h2>Examples</h2>
                    <p>By default :</p>
                    <div style={{
          display: 'flex',
          margin: '0 auto',
          flexWrap: 'wrap',
          height: '18.75rem',
          width: '62.5rem',
          overflow: 'auto',
          background: tokens.coralColorNeutralBackgroundMedium,
          border: '1px solid'
        }}>
                        <div style={style}>{generateButtonWithTooltip('→')}</div>
                        <div style={style}>{generateButtonWithTooltip('↑', 'top')}</div>
                        <div style={style}>{generateButtonWithTooltip('↓', 'bottom')}</div>
                        <div style={style}>{generateButtonWithTooltip('←', 'left')}</div>
                    </div>

                    <p>With a custom component in the tooltip</p>
                    <TooltipTrigger label={<div>
                                <span>I'm a custom component</span>
                                {'\\n'}
                                <span>with a line feeding 🙃</span>
                            </div>}>
                        <span>Loreum....</span>
                    </TooltipTrigger>
                </div>
                <div style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
      }}>
                    {generateButtonWithTooltip('→', 'right')}
                </div>
            </div>
            <div style={{
      display: 'flex',
      flex: 0,
      flexDirection: 'row',
      padding: '0.625rem'
    }}>
                <div style={{
        marginRight: 'auto'
      }}>
                    {generateButtonWithTooltip('↓', 'bottom')}
                    {generateButtonWithTooltip('←', 'left')}
                </div>
                <div style={{
        marginLeft: 'auto'
      }}>
                    {generateButtonWithTooltip('→', 'right')}
                    {generateButtonWithTooltip('↓', 'bottom')}
                </div>
            </div>
        </div>;
}`,...i.parameters?.docs?.source}}};const g=["Default"];export{i as Default,g as __namedExportsOrder,u as default};
