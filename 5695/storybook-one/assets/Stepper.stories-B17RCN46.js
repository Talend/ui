import{j as t,r as C,S as I,a_ as U,J as G,aR as D}from"./iframe-BPWKJ2_o.js";import{A as m}from"./Action.component-CGKdISv0.js";import{S as e}from"./Stepper.component-YRMmwV-P.js";import{B as h}from"./ButtonSecondary-BiZoLiHA.js";import"./preload-helper-PPVm8Dsz.js";import"./ActionButton.component-nOOll17V.js";import"./TooltipTrigger.component-Cqzsa5JT.js";import"./index-B5TGO0So.js";import"./CircularProgress.component-COR0Xrwv.js";import"./constants-CZYEPhht.js";import"./translate-q8yQChef.js";import"./withTranslation-ByA2ZQp2.js";import"./Skeleton.component-DsXVPtu7.js";import"./index-BRrpl1wo.js";import"./theme-Cj2Fm6kQ.js";import"./OverlayTrigger.component-aV17y0dX.js";import"./RootCloseWrapper-CMQxteV5.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CpIv-jbF.js";import"./Transition-CPW5JkxA.js";import"./Transition-5lMdqHLm.js";import"./ActionSplitDropdown.component-8PenvcAp.js";import"./SplitButton-C2kpOeLT.js";import"./inheritsLoose-DEJIaahp.js";import"./get-6sLcuglD.js";import"./_baseGet-GCSfqC3R.js";import"./toString-RNHQn9jk.js";import"./isSymbol-DtjENQP0.js";import"./eq-CT9ytHj1.js";import"./omit-Dp4FCWoh.js";import"./_baseSlice-DRoy53G4.js";import"./_getTag-KzPaKQG2.js";import"./isArrayLike-BnxJKSWE.js";import"./DropdownButton-BvV7HSyt.js";import"./ActionIconToggle.component-ugUZNPkA.js";import"./ErrorState-CpwJJYvt.js";const{action:u}=__STORYBOOK_MODULE_ACTIONS__,ne={title:"Components/Messaging & Communication/Stepper"},s="Sample processing...";function d(S){return S?t.jsxs(I,{gap:"S",padding:"M",align:"center",children:[t.jsxs(U,{gap:"M",children:[t.jsx(G,{onClick:u("retry"),children:"Retry"}),t.jsx(h,{onClick:u("cancel"),children:"Cancel"})]}),t.jsx(D,{href:"http://www.google.com",children:"Get the documentation"})]}):null}const r=()=>{const S=[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.LOADING},{label:"Flattening",status:e.LOADING_STEP_STATUSES.LOADING},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.PENDING}];return t.jsx(e,{steps:S,title:s})},o=()=>{const S=[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS,message:{label:"Everything is fine 🔥🐶"}},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.FAILURE,message:{label:"We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine"}},{label:"Flattening",status:e.LOADING_STEP_STATUSES.ABORTED},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.ABORTED}];return t.jsx(e,{steps:S,title:s,renderActions:d})},l=()=>t.jsx(e,{title:s,renderActions:d,children:t.jsx("p",{children:"No step to display here, it means content is already loaded."})}),a=()=>t.jsx(e,{title:s,steps:[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS}]}),n=()=>t.jsxs(e.Form,{children:[t.jsx(e.Form.Step.Validated,{title:"I'm ok"}),t.jsx(e.Form.Step.Validated,{title:"Hey"}),t.jsx(e.Form.Step.Validated,{title:"Yup"}),t.jsx(e.Form.Step.InProgress,{title:"Hey, I'm in progress"}),t.jsx(e.Form.Step.Disabled,{title:"I'm disabled"}),t.jsx(e.Form.Step.Enabled,{title:"I'm enabled"})]}),p=()=>t.jsxs(e.Form.Horizontal,{children:[t.jsx(e.Form.Step.Validated,{title:"I'm ok"}),t.jsx(e.Form.Step.InProgress,{title:"Hey, I'm in progress"}),t.jsx(e.Form.Step.Enabled,{title:"I'm enabled"})]}),i=()=>{const S=[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Flattening",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.LOADING}];function E(c){const[A,T]=C.useState(S),_=()=>{T([{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Flattening",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.LOADING}])},b=()=>{T([{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Flattening",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.SUCCESS}])};return t.jsxs("div",{children:[t.jsxs("div",{children:[t.jsx(m,{onClick:_,label:"init"}),t.jsx(m,{onClick:b,label:"end"})]}),c.children(A)]})}return t.jsx(E,{children:c=>t.jsx(e,{steps:c,title:s,children:t.jsxs("div",{children:["Content is loaded.",t.jsx("div",{children:t.jsx(m,{label:"Action",bsStyle:"info",className:"btn-inverse button-padding",onClick:u("click")})})]})})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const steps = [{
    label: 'Fetch Sample',
    status: Stepper.LOADING_STEP_STATUSES.SUCCESS
  }, {
    label: 'Global Quality',
    status: Stepper.LOADING_STEP_STATUSES.LOADING
  }, {
    label: 'Flattening',
    status: Stepper.LOADING_STEP_STATUSES.LOADING
  }, {
    label: 'Column Quality',
    status: Stepper.LOADING_STEP_STATUSES.PENDING
  }];
  return <Stepper steps={steps} title={title} />;
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  const steps = [{
    label: 'Fetch Sample',
    status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
    message: {
      label: 'Everything is fine 🔥🐶'
    }
  }, {
    label: 'Global Quality',
    status: Stepper.LOADING_STEP_STATUSES.FAILURE,
    message: {
      label: "We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine"
    }
  }, {
    label: 'Flattening',
    status: Stepper.LOADING_STEP_STATUSES.ABORTED
  }, {
    label: 'Column Quality',
    status: Stepper.LOADING_STEP_STATUSES.ABORTED
  }];
  return <Stepper steps={steps} title={title} renderActions={renderActions} />;
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <Stepper title={title} renderActions={renderActions}>
        <p>No step to display here, it means content is already loaded.</p>
    </Stepper>`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <Stepper title={title} steps={[{
  label: 'Fetch Sample',
  status: Stepper.LOADING_STEP_STATUSES.SUCCESS
}]} />`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <Stepper.Form>
        <Stepper.Form.Step.Validated title="I'm ok" />
        <Stepper.Form.Step.Validated title="Hey" />
        <Stepper.Form.Step.Validated title="Yup" />
        <Stepper.Form.Step.InProgress title="Hey, I'm in progress" />
        <Stepper.Form.Step.Disabled title="I'm disabled" />
        <Stepper.Form.Step.Enabled title="I'm enabled" />
    </Stepper.Form>`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <Stepper.Form.Horizontal>
        <Stepper.Form.Step.Validated title="I'm ok" />
        <Stepper.Form.Step.InProgress title="Hey, I'm in progress" />
        <Stepper.Form.Step.Enabled title="I'm enabled" />
    </Stepper.Form.Horizontal>`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  const defaultSteps = [{
    label: 'Fetch Sample',
    status: Stepper.LOADING_STEP_STATUSES.SUCCESS
  }, {
    label: 'Global Quality',
    status: Stepper.LOADING_STEP_STATUSES.SUCCESS
  }, {
    label: 'Flattening',
    status: Stepper.LOADING_STEP_STATUSES.SUCCESS
  }, {
    label: 'Column Quality',
    status: Stepper.LOADING_STEP_STATUSES.LOADING
  }];
  function GetSteps(props) {
    const [steps, setSteps] = useState(defaultSteps);
    const init = () => {
      setSteps([{
        label: 'Fetch Sample',
        status: Stepper.LOADING_STEP_STATUSES.SUCCESS
      }, {
        label: 'Global Quality',
        status: Stepper.LOADING_STEP_STATUSES.SUCCESS
      }, {
        label: 'Flattening',
        status: Stepper.LOADING_STEP_STATUSES.SUCCESS
      }, {
        label: 'Column Quality',
        status: Stepper.LOADING_STEP_STATUSES.LOADING
      }]);
    };
    const end = () => {
      setSteps([{
        label: 'Fetch Sample',
        status: Stepper.LOADING_STEP_STATUSES.SUCCESS
      }, {
        label: 'Global Quality',
        status: Stepper.LOADING_STEP_STATUSES.SUCCESS
      }, {
        label: 'Flattening',
        status: Stepper.LOADING_STEP_STATUSES.SUCCESS
      }, {
        label: 'Column Quality',
        status: Stepper.LOADING_STEP_STATUSES.SUCCESS
      }]);
    };
    return <div>
                <div>
                    <Action onClick={init} label="init" />
                    <Action onClick={end} label="end" />
                </div>
                {props.children(steps)}
            </div>;
  }
  return <GetSteps>
            {steps => <Stepper steps={steps} title={title}>
                    <div>
                        Content is loaded.
                        <div>
                            <Action label="Action" bsStyle="info" className="btn-inverse button-padding" onClick={action('click')} />
                        </div>
                    </div>
                </Stepper>}
        </GetSteps>;
}`,...i.parameters?.docs?.source}}};const pe=["StepperDefault","StepperWithError","StepperWithoutSteps","StepperSuccessfulWithoutTransition","FormStepper","HorizontalFormStepper","StepperSuccessfulWithTransition"];export{n as FormStepper,p as HorizontalFormStepper,r as StepperDefault,i as StepperSuccessfulWithTransition,a as StepperSuccessfulWithoutTransition,o as StepperWithError,l as StepperWithoutSteps,pe as __namedExportsOrder,ne as default};
