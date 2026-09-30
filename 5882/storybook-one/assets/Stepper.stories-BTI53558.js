import{j as t,r as C,S as I,aR as U,O as G,aA as D}from"./iframe-VHcrZt8_.js";import{A as m}from"./Action.component-bdj-K6Rk.js";import{S as e}from"./Stepper.component-IWr91ZUU.js";import{B as O}from"./ButtonSecondary-dzmAc01r.js";import"./preload-helper-PPVm8Dsz.js";import"./ActionButton.component-BLPyZlVZ.js";import"./TooltipTrigger.component-BDOJ9BfO.js";import"./index-Do17dimz.js";import"./CircularProgress.component-rcErY46J.js";import"./constants-CZYEPhht.js";import"./translate-BOUIz-uh.js";import"./withTranslation-BeBYPiey.js";import"./Skeleton.component-Cs6KqOuG.js";import"./index-pwioB_R5.js";import"./theme-RygKw-t-.js";import"./OverlayTrigger.component-DADnuN3f.js";import"./RootCloseWrapper-DFB0OJyD.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B_e9WTic.js";import"./Transition-5Dpr573j.js";import"./Transition-i1YBrKJi.js";import"./ActionSplitDropdown.component-CPgKp-ox.js";import"./SplitButton-B47KNU1M.js";import"./inheritsLoose-DlftjF2A.js";import"./DropdownButton-n-ZKdN2o.js";import"./ActionIconToggle.component-D3aKhc8h.js";import"./ErrorState-xC3rDqs0.js";const{action:u}=__STORYBOOK_MODULE_ACTIONS__,$={title:"Components/Messaging & Communication/Stepper"},s="Sample processing...";function d(S){return S?t.jsxs(I,{gap:"S",padding:"M",align:"center",children:[t.jsxs(U,{gap:"M",children:[t.jsx(G,{onClick:u("retry"),children:"Retry"}),t.jsx(O,{onClick:u("cancel"),children:"Cancel"})]}),t.jsx(D,{href:"http://www.google.com",children:"Get the documentation"})]}):null}const r=()=>{const S=[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.LOADING},{label:"Flattening",status:e.LOADING_STEP_STATUSES.LOADING},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.PENDING}];return t.jsx(e,{steps:S,title:s})},l=()=>{const S=[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS,message:{label:"Everything is fine 🔥🐶"}},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.FAILURE,message:{label:"We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine"}},{label:"Flattening",status:e.LOADING_STEP_STATUSES.ABORTED},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.ABORTED}];return t.jsx(e,{steps:S,title:s,renderActions:d})},o=()=>t.jsx(e,{title:s,renderActions:d,children:t.jsx("p",{children:"No step to display here, it means content is already loaded."})}),a=()=>t.jsx(e,{title:s,steps:[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS}]}),n=()=>t.jsxs(e.Form,{children:[t.jsx(e.Form.Step.Validated,{title:"I'm ok"}),t.jsx(e.Form.Step.Validated,{title:"Hey"}),t.jsx(e.Form.Step.Validated,{title:"Yup"}),t.jsx(e.Form.Step.InProgress,{title:"Hey, I'm in progress"}),t.jsx(e.Form.Step.Disabled,{title:"I'm disabled"}),t.jsx(e.Form.Step.Enabled,{title:"I'm enabled"})]}),p=()=>t.jsxs(e.Form.Horizontal,{children:[t.jsx(e.Form.Step.Validated,{title:"I'm ok"}),t.jsx(e.Form.Step.InProgress,{title:"Hey, I'm in progress"}),t.jsx(e.Form.Step.Enabled,{title:"I'm enabled"})]}),i=()=>{const S=[{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Flattening",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.LOADING}];function E(c){const[A,T]=C.useState(S),_=()=>{T([{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Flattening",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.LOADING}])},b=()=>{T([{label:"Fetch Sample",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Global Quality",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Flattening",status:e.LOADING_STEP_STATUSES.SUCCESS},{label:"Column Quality",status:e.LOADING_STEP_STATUSES.SUCCESS}])};return t.jsxs("div",{children:[t.jsxs("div",{children:[t.jsx(m,{onClick:_,label:"init"}),t.jsx(m,{onClick:b,label:"end"})]}),c.children(A)]})}return t.jsx(E,{children:c=>t.jsx(e,{steps:c,title:s,children:t.jsxs("div",{children:["Content is loaded.",t.jsx("div",{children:t.jsx(m,{label:"Action",bsStyle:"info",className:"btn-inverse button-padding",onClick:u("click")})})]})})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
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
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
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
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <Stepper title={title} renderActions={renderActions}>
        <p>No step to display here, it means content is already loaded.</p>
    </Stepper>`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <Stepper title={title} steps={[{
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
}`,...i.parameters?.docs?.source}}};const ee=["StepperDefault","StepperWithError","StepperWithoutSteps","StepperSuccessfulWithoutTransition","FormStepper","HorizontalFormStepper","StepperSuccessfulWithTransition"];export{n as FormStepper,p as HorizontalFormStepper,r as StepperDefault,i as StepperSuccessfulWithTransition,a as StepperSuccessfulWithoutTransition,l as StepperWithError,o as StepperWithoutSteps,ee as __namedExportsOrder,$ as default};
