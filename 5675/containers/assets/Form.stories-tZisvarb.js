import{I as n,r as p,P as o,e as h,V as d,j as r,W as c}from"./iframe-D7nf90uh.js";import"./preload-helper-PPVm8Dsz.js";var u={};let m=()=>null;u.FORM_MOZ&&(m=c.deprecated.templates.ArrayFieldTemplate);const e=new n.Map({});let l=class extends p.Component{static displayName="Container(Form)";static propTypes={...h.propTypes,formId:o.string.isRequired,data:o.oneOfType([o.func,o.object])};static defaultProps={data:{}};static getFormData(t,s){return t.cmf.components.getIn(["Container(Form)",s,"data"],new n.Map)}static getDerivedStateFromProps(t,s){return s?!t.state&&t.formId!==s.formId?(t.deleteState(),null):t.data!==s.data?{data:t.data}:null:(t.initState(),null)}constructor(t){super(t),this.state=e.toJS(),this.formActions=this.formActions.bind(this),this.onChange=this.onChange.bind(this),this.onSubmit=this.onSubmit.bind(this),this.onErrors=this.onErrors.bind(this),this.jsonSchema=this.jsonSchema.bind(this),this.uiSchema=this.uiSchema.bind(this),this.data=this.data.bind(this)}componentDidUpdate(t,s){s.data!==this.state.data&&this.props.setState({data:this.state.data})}onChange(t,s){this.props.setState({data:s.formData,dirty:!0}),this.props.onChange&&this.props.onChange(s)}onErrors(t,s){this.props.setState({errors:s}),this.props.onErrors&&this.props.onErrors(t,s)}onSubmit(t,s){this.props.onSubmit&&this.props.onSubmit(s),this.props.onSubmitActionCreator&&this.props.dispatchActionCreator(this.props.onSubmitActionCreator,null,{props:this.props,formData:s})}jsonSchema(){const t=(this.props.state||e).toJS();return typeof this.props.jsonSchema=="function"?this.props.jsonSchema(t.data):this.props.jsonSchema}uiSchema(){const t=(this.props.state||e).toJS();return typeof this.props.uiSchema=="function"?this.props.uiSchema(t.data):this.props.uiSchema}data(){const t=(this.props.state||e).toJS();return typeof this.props.data=="function"?this.props.data(t.data):{...this.props.data,...t.data}}errors(){const t=(this.props.state||e).toJS();return typeof this.props.errors=="function"?this.props.errors(t.errors):{...this.props.errors,...t.errors}}formActions(){if(typeof this.props.actions=="function"){const t=(this.props.state||e).toJS();return this.props.actions(t.data||this.props.data)}return this.props.actions}render(){const t=(this.props.state||e).toJS(),s={data:{jsonSchema:this.jsonSchema(),uiSchema:this.uiSchema(),properties:this.data(),errors:this.errors()},className:d("tc-form","rjsf",this.props.className,{dirty:t.dirty,pristine:!t.dirty}),ArrayFieldTemplate:this.props.ArrayFieldTemplate||m,actions:this.formActions(),fields:this.props.fields,onChange:this.onChange,onTrigger:this.props.onTrigger,onSubmit:this.onSubmit,onErrors:this.onErrors,customFormats:this.props.customFormats,customValidation:this.props.customValidation,buttonBlockClass:this.props.buttonBlockClass,children:this.props.children,uiform:this.props.uiform,language:this.props.language,widgets:this.props.widgets,getComponent:this.props.getComponent,loading:this.props.loading,...this.props.formProps};return r.jsx(c,{...s,children:this.props.children})}};const f=h({defaultState:e,componentId(a){return a.formId},omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(l),S=`{
    "jsonSchema": {
      "title": "A registration form",
      "description": "A simple form example.",
      "type": "object",
      "required": [
        "firstName",
        "lastName"
      ],
      "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "age": { "type": "integer" },
        "bio": { "type": "string" },
        "password": { "type": "string",  "minLength": 3 },
        "enum": {  "type": "string", "enum": ["1", "two", "three"] }
      }
    },
    "uiSchema": [
      { "key": "firstName", "title": "First name", "autofocus": true },
      { "key": "age", "title": "Age" },
      { "key": "bio", "title": "Bio", "widget": "textarea" },
      { "key": "password", "title": "Password", "type": "password", "description": "Hint: Make it strong!" }
    ],
    "data": {
      "firstName": "Chuck",
      "lastName": "Norris",
      "age": 75,
      "bio": "Roundhouse kicking asses since 1940",
      "password": "noneed"
    }
  }
`;class g extends p.Component{constructor(t){super(t),this.state={schema:S},this.onChange=this.onChange.bind(this)}onChange(t){this.setState({schema:t.target.value})}render(){return r.jsxs("div",{className:"container",children:[r.jsx("div",{className:"col-md-6",children:r.jsx(f,{...JSON.parse(this.state.schema)})}),r.jsxs("div",{className:"col-md-6",children:[r.jsx("h2",{children:"Schema"}),r.jsx("textarea",{rows:"20",onChange:this.onChange,value:this.state.schema})]})]})}}const j={title:"Form"};function i(){return r.jsx(g,{})}i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`function Default() {
  return <SchemaInState />;
}`,...i.parameters?.docs?.source}}};const F=["Default"];export{i as Default,F as __namedExportsOrder,j as default};
