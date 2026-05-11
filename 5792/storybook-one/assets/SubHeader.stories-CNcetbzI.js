import{j as e}from"./iframe-a6xiEYuy.js";import{F as T}from"./FilterBar.component-C7r1s4Xx.js";import{T as j}from"./Action.component-DqtUqR0u.js";import{S as o}from"./SubHeaderBar.component-DsKM5uFb.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CoP-0gOE.js";import"./index-BDtk5PRO.js";import"./Actions.component-2tUNKz7v.js";import"./OverlayTrigger.component-tx3JvTPu.js";import"./RootCloseWrapper-C0sV5jo_.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CerpRm2L.js";import"./Transition-D3zIP1lt.js";import"./Transition-D5bVNl6N.js";import"./SplitButton-CrIWYVRv.js";import"./inheritsLoose-CKfnZvzy.js";import"./ActionButton.component-cKy5g6LW.js";import"./TooltipTrigger.component-CITdH7pE.js";import"./index-BTcVgyDx.js";import"./CircularProgress.component-CH-1GiuP.js";import"./constants-CZYEPhht.js";import"./translate-BdRXs8yh.js";import"./withTranslation-BB2aKQbx.js";import"./Skeleton.component-DRPinVx-.js";import"./index-DwwAVDLO.js";import"./theme-BsVFmEJs.js";import"./ActionIconToggle.component-ChddMXPM.js";import"./ActionSplitDropdown.component-CxbDpLXj.js";import"./FormControl-TQAc5FCe.js";import"./get-CuuORsUe.js";import"./_baseGet-Cz2lJXYo.js";import"./toString-DtB-B3f9.js";import"./isSymbol-Cg5qelfb.js";import"./eq-n8YMwXX5.js";import"./omit-DbcP29q1.js";import"./_setToString-ubMkSUoF.js";import"./_getTag-EwqW6hLy.js";import"./isArrayLike-DJHIFDtz.js";import"./DropdownButton-DpMSfSHH.js";import"./has-CFN4xEpH.js";import"./_hasPath-DGlUtcj3.js";import"./ActionBar.component-POlZTEOk.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,t={title:"My Long Title is Long Long Lé Long La La La Lé Long Long Long Long archi Long Lé Long La La La Lé Long Long Long Long Lé Long La La La Lé Long Long Long Long Long Lé Long La La La Lé Long Long Long Long Lé Long La La La Lé Long Long Long Long Long Lé Long La La La Lé Long Long Long Long Lé Long La La La Lé Long Long Long Long",onEdit:i("onEdit"),onSubmit:i("onSubmit"),onCancel:i("onCancel"),onChange:i("onChange")},r=i("onGoBack"),B=[{label:"icon + text",bsStyle:"link",icon:"talend-share-alt",onClick:i("icon + text")},{label:"action1",bsStyle:"link",icon:"talend-share-alt",onClick:i("return action1"),hideLabel:!0},{label:"Action2",bsStyle:"link",icon:"talend-activity",onClick:i("return action2"),displayMode:"iconToggle",active:!0},{label:"action3",bsStyle:"link",icon:"talend-bell",onClick:i("return action3"),hideLabel:!0,displayMode:"iconToggle"}],C={label:"action4",bsStyle:"link",icon:"talend-bell",onClick:i("return action4"),hideLabel:!0},n=e.jsx(o.Content,{center:!0,children:e.jsx(T,{t:()=>i("t"),onFilter:()=>i("onFilter"),navbar:!0,docked:!1,dockable:!1})}),be={title:"Components/Navigation/SubHeader"},a=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r})}),s=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,editable:!0})}),c=()=>e.jsx("div",{children:e.jsx(o,{...t,iconId:"talend-file-csv-o",onGoBack:r})}),d=()=>e.jsxs("div",{children:[e.jsx(o,{...t,subTitle:"mySubTitle",onGoBack:r}),e.jsx(o,{...t,subTitle:e.jsxs("div",{children:[e.jsx("span",{children:"Copying from : "}),e.jsx("b",{children:"mySubTitle ".repeat(50)})]}),onGoBack:r})]}),l=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,editable:!0,subTitle:"mySubTitle"})}),p=()=>e.jsx("div",{children:e.jsx(o,{...t,subTitleLoading:!0,onGoBack:r})}),u=()=>e.jsx("div",{children:e.jsx(o,{...t,subTitle:"mySubTitle",onGoBack:r,subTitleAs:({subTitle:x})=>e.jsx(j,{bsStyle:"info",children:x})})}),m=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,right:B})}),b=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,center:[C],children:n})}),g=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,children:e.jsx(o.Content,{tag:"form",center:!0,children:e.jsx("input",{id:"inputTitle",type:"text",onChange:i("onChange"),value:""})})})}),h=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,right:B,children:n})}),L=()=>e.jsx("div",{children:e.jsx(o,{...t,iconId:"talend-file-csv-o",subTitle:"mySubTitle",onGoBack:r,right:B,children:n})}),v=()=>e.jsx("div",{children:e.jsx(o,{...t,iconId:"talend-file-csv-o",subTitle:"mySubTitle",onGoBack:r,loading:!0,children:n})}),S=()=>e.jsx("div",{children:e.jsx(o,{...t,iconId:"talend-file-csv-o",subTitle:"mySubTitle",onGoBack:r,inProgress:!0,editable:!0,children:n})}),k=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,rightActionsLoading:!0})});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} onGoBack={backAction} />
    </div>`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} onGoBack={backAction} editable />
    </div>`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} iconId="talend-file-csv-o" onGoBack={backAction} />
    </div>`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} subTitle="mySubTitle" onGoBack={backAction} />
        <SubHeaderBar {...viewProps} subTitle={<div>
                    <span>Copying from : </span>
                    <b>{'mySubTitle '.repeat(50)}</b>
                </div>} onGoBack={backAction} />
    </div>`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} onGoBack={backAction} editable subTitle="mySubTitle" />
    </div>`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} subTitleLoading onGoBack={backAction} />
    </div>`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} subTitle="mySubTitle" onGoBack={backAction} subTitleAs={({
    subTitle
  }) => <Tag bsStyle="info">{subTitle}</Tag>} />
    </div>`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} onGoBack={backAction} right={injectedComponentsRight} />
    </div>`,...m.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} onGoBack={backAction} center={[componentAction]}>
            {center}
        </SubHeaderBar>
    </div>`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} onGoBack={backAction}>
            <SubHeaderBar.Content tag="form" center>
                <input id="inputTitle" type="text" onChange={action('onChange')} value="" />
            </SubHeaderBar.Content>
        </SubHeaderBar>
    </div>`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} onGoBack={backAction} right={injectedComponentsRight}>
            {center}
        </SubHeaderBar>
    </div>`,...h.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} iconId="talend-file-csv-o" subTitle="mySubTitle" onGoBack={backAction} right={injectedComponentsRight}>
            {center}
        </SubHeaderBar>
    </div>`,...L.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} iconId="talend-file-csv-o" subTitle="mySubTitle" onGoBack={backAction} loading>
            {center}
        </SubHeaderBar>
    </div>`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} iconId="talend-file-csv-o" subTitle="mySubTitle" onGoBack={backAction} inProgress editable>
            {center}
        </SubHeaderBar>
    </div>`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => <div>
        <SubHeaderBar {...viewProps} onGoBack={backAction} rightActionsLoading />
    </div>`,...k.parameters?.docs?.source}}};const ge=["WithDefault","WithEditable","WithIcon","WithSubtitle","WithEditableSubtitle","WithLoadingSubtitle","WithCustomSubtitle","WithRightComponents","WithCenterComponents","WithCenterComponentsWithTagProps","WithCenterRightComponents","WithAll","WithSkeleton","WithInProgress","WithRightActionsLoading"];export{L as WithAll,b as WithCenterComponents,g as WithCenterComponentsWithTagProps,h as WithCenterRightComponents,u as WithCustomSubtitle,a as WithDefault,s as WithEditable,l as WithEditableSubtitle,c as WithIcon,S as WithInProgress,p as WithLoadingSubtitle,k as WithRightActionsLoading,m as WithRightComponents,v as WithSkeleton,d as WithSubtitle,ge as __namedExportsOrder,be as default};
