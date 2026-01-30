import{j as e}from"./iframe-DRCDqYKx.js";import{F as T}from"./FilterBar.component-BvxYuhsl.js";import{T as j}from"./Action.component-CJ9_2or_.js";import{S as o}from"./SubHeaderBar.component-C8AptNJT.js";import"./preload-helper-PPVm8Dsz.js";import"./index--pemhMVp.js";import"./index-nAWFhZ66.js";import"./Actions.component-Bp7xE756.js";import"./OverlayTrigger.component-DnlNtOeW.js";import"./RootCloseWrapper-CKSfp_mT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CW79-Ycx.js";import"./Transition-yFpeChhI.js";import"./Transition-DAA4VcSW.js";import"./SplitButton-DWHaX3fp.js";import"./inheritsLoose-DFSzpK5W.js";import"./ActionButton.component-1Icy61zR.js";import"./TooltipTrigger.component-Bqma5M62.js";import"./index-SGcJ9lCQ.js";import"./CircularProgress.component-nXeNfRZW.js";import"./constants-CZYEPhht.js";import"./translate-CgWnTO0f.js";import"./withTranslation-CwRJApAz.js";import"./Skeleton.component-CT9l-lWy.js";import"./index-BIily9ko.js";import"./theme-CzxyoK-X.js";import"./ActionIconToggle.component-B-AUkd0L.js";import"./ActionSplitDropdown.component-IXc4gLWS.js";import"./FormControl-DAm9aAUo.js";import"./get-BnUbLWFW.js";import"./_baseGet-MR6lSUTo.js";import"./toString-CSJO3U6T.js";import"./isSymbol-DlwjzEhs.js";import"./eq-BrCzcbIc.js";import"./omit-BXo64jaB.js";import"./_baseSlice-BE1vJk-8.js";import"./_getTag-CKy82HA6.js";import"./isArrayLike-C3kMs0g0.js";import"./DropdownButton-BAhn8q_j.js";import"./has-DRK2p6_Y.js";import"./_hasPath-_pF2d1PW.js";import"./ActionBar.component-CsTEe2tI.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,t={title:"My Long Title is Long Long Lé Long La La La Lé Long Long Long Long archi Long Lé Long La La La Lé Long Long Long Long Lé Long La La La Lé Long Long Long Long Long Lé Long La La La Lé Long Long Long Long Lé Long La La La Lé Long Long Long Long Long Lé Long La La La Lé Long Long Long Long Lé Long La La La Lé Long Long Long Long",onEdit:i("onEdit"),onSubmit:i("onSubmit"),onCancel:i("onCancel"),onChange:i("onChange")},r=i("onGoBack"),B=[{label:"icon + text",bsStyle:"link",icon:"talend-share-alt",onClick:i("icon + text")},{label:"action1",bsStyle:"link",icon:"talend-share-alt",onClick:i("return action1"),hideLabel:!0},{label:"Action2",bsStyle:"link",icon:"talend-activity",onClick:i("return action2"),displayMode:"iconToggle",active:!0},{label:"action3",bsStyle:"link",icon:"talend-bell",onClick:i("return action3"),hideLabel:!0,displayMode:"iconToggle"}],C={label:"action4",bsStyle:"link",icon:"talend-bell",onClick:i("return action4"),hideLabel:!0},n=e.jsx(o.Content,{center:!0,children:e.jsx(T,{t:()=>i("t"),onFilter:()=>i("onFilter"),navbar:!0,docked:!1,dockable:!1})}),be={title:"Components/Navigation/SubHeader"},a=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r})}),s=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,editable:!0})}),c=()=>e.jsx("div",{children:e.jsx(o,{...t,iconId:"talend-file-csv-o",onGoBack:r})}),d=()=>e.jsxs("div",{children:[e.jsx(o,{...t,subTitle:"mySubTitle",onGoBack:r}),e.jsx(o,{...t,subTitle:e.jsxs("div",{children:[e.jsx("span",{children:"Copying from : "}),e.jsx("b",{children:"mySubTitle ".repeat(50)})]}),onGoBack:r})]}),l=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,editable:!0,subTitle:"mySubTitle"})}),p=()=>e.jsx("div",{children:e.jsx(o,{...t,subTitleLoading:!0,onGoBack:r})}),u=()=>e.jsx("div",{children:e.jsx(o,{...t,subTitle:"mySubTitle",onGoBack:r,subTitleAs:({subTitle:x})=>e.jsx(j,{bsStyle:"info",children:x})})}),m=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,right:B})}),b=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,center:[C],children:n})}),g=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,children:e.jsx(o.Content,{tag:"form",center:!0,children:e.jsx("input",{id:"inputTitle",type:"text",onChange:i("onChange"),value:""})})})}),h=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,right:B,children:n})}),L=()=>e.jsx("div",{children:e.jsx(o,{...t,iconId:"talend-file-csv-o",subTitle:"mySubTitle",onGoBack:r,right:B,children:n})}),v=()=>e.jsx("div",{children:e.jsx(o,{...t,iconId:"talend-file-csv-o",subTitle:"mySubTitle",onGoBack:r,loading:!0,children:n})}),S=()=>e.jsx("div",{children:e.jsx(o,{...t,iconId:"talend-file-csv-o",subTitle:"mySubTitle",onGoBack:r,inProgress:!0,editable:!0,children:n})}),k=()=>e.jsx("div",{children:e.jsx(o,{...t,onGoBack:r,rightActionsLoading:!0})});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <div>
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
