import{j as t,r as C,S as I,aD as U,J as G,au as D}from"./iframe-Do9MkTTB.js";import{A as m}from"./Action.component-B4OSEy6m.js";import{S as e}from"./Stepper.component-UAudoIXr.js";import{B as h}from"./ButtonSecondary-DYoBLYzw.js";import"./preload-helper-PPVm8Dsz.js";import"./ActionButton.component-2llTRVLN.js";import"./TooltipTrigger.component-BZ6GrODe.js";import"./index-BqJQNhAi.js";import"./CircularProgress.component-CZS3CNAl.js";import"./constants-CZYEPhht.js";import"./translate-Da30Cq5o.js";import"./withTranslation-DpYoDMdS.js";import"./Skeleton.component-CSSMiQZZ.js";import"./index-DmoB33Vx.js";import"./theme-DqWGs9jL.js";import"./OverlayTrigger.component-BSeuuoqm.js";import"./RootCloseWrapper-CmuOVIHm.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CnM3wOZM.js";import"./Transition-DzSe8eVs.js";import"./Transition-CDdRDE4G.js";import"./ActionSplitDropdown.component-B2j4EuU_.js";import"./SplitButton-CnIs2fxo.js";import"./inheritsLoose-Boj-Odam.js";import"./get-CEgWO4ky.js";import"./_baseGet-jYYCWLwL.js";import"./toString-DSXExHZS.js";import"./isSymbol-Bx5lGEtt.js";import"./eq-Bq5QjZni.js";import"./omit-hj1fVQf8.js";import"./_setToString-DY7q7weI.js";import"./_getTag-CwuLMQhN.js";import"./isArrayLike-ZUl_Fg1l.js";import"./DropdownButton-Ck-fuHum.js";import"./ActionIconToggle.component-DUJO9ftK.js";import"./ErrorState-DgNs3sme.js";const{action:u}=__STORYBOOK_MODULE_ACTIONS__,ne={title:"Components/Messaging & Communication/Stepper"},s="Sample processing...";function d(S){return S?t.jsxs(I,{gap:"S",padding:"M",align:"center",children:[t.jsxs(U,{gap:"M",children:[t.jsx(G,{onClick:u("retry"),children:"Retry"}),t.jsx(h,{onClick:u("cancel"),children:"Cancel"})]}),t.jsx(D,{href:"http://www.google.com",children:"Get the documentation"})]}):null}const r=()=>{const S=[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.LOADING},{label:"Flattening",status:e.LOADING_STEP_STATUSES.LOADING},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.PENDING}];return t.jsx(e,{steps:S,title:s})},o=()=>{const S=[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS,message:{label:"Everything is fine 🔥🐶"}},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.FAILURE,message:{label:"We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine"}},{label:"Flattening",status:e.LOADING_STEP_STATUSES.ABORTED},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.ABORTED}];return t.jsx(e,{steps:S,title:s,renderActions:d})},l=()=>t.jsx(e,{title:s,renderActions:d,children:t.jsx("p",{children:"No step to display here, it means content is already loaded."})}),a=()=>t.jsx(e,{title:s,steps:[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS}]}),n=()=>t.jsxs(e.Form,{children:[t.jsx(e.Form.Step.Validated,{title:"I'm ok"}),t.jsx(e.Form.Step.Validated,{title:"Hey"}),t.jsx(e.Form.Step.Validated,{title:"Yup"}),t.jsx(e.Form.Step.InProgress,{title:"Hey, I'm in progress"}),t.jsx(e.Form.Step.Disabled,{title:"I'm disabled"}),t.jsx(e.Form.Step.Enabled,{title:"I'm enabled"})]}),p=()=>t.jsxs(e.Form.Horizontal,{children:[t.jsx(e.Form.Step.Validated,{title:"I'm ok"}),t.jsx(e.Form.Step.InProgress,{title:"Hey, I'm in progress"}),t.jsx(e.Form.Step.Enabled,{title:"I'm enabled"})]}),i=()=>{const S=[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Flattening",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.LOADING}];function E(c){const[A,T]=C.useState(S),_=()=>{T([{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Flattening",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.LOADING}])},b=()=>{T([{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Flattening",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.SUCCESS}])};return t.jsxs("div",{children:[t.jsxs("div",{children:[t.jsx(m,{onClick:_,label:"init"}),t.jsx(m,{onClick:b,label:"end"})]}),c.children(A)]})}return t.jsx(E,{children:c=>t.jsx(e,{steps:c,title:s,children:t.jsxs("div",{children:["Content is loaded.",t.jsx("div",{children:t.jsx(m,{label:"Action",bsStyle:"info",className:"btn-inverse button-padding",onClick:u("click")})})]})})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
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
