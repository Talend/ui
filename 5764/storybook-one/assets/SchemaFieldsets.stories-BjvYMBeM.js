import"./index-YtYNWD3q.js";import{a as n,U as l}from"./argTypes-DKFVQAgD.js";import"./iframe-DZbVhgSq.js";import"./StackItem-BvbU7j8O.js";import"./RHFInput.component-BRKxJbSF.js";import"./index.esm-DUp6gC8v.js";import"./RHFSelect.component-BMKAPG8D.js";import"./RHFTextArea.component-629I9hSa.js";import"./omit-DfWDWnZr.js";import"./toString-DRypW0xg.js";import"./isSymbol-utH3E145.js";import"./_setToString-Cb9q76qX.js";import"./_baseGet-B6sZByIR.js";import"./eq-Gtm29xL-.js";import"./_getTag-Dflrppun.js";import"./isArrayLike-BA1-QX5o.js";import"./map-C9Cyb1nr.js";import"./_baseIteratee-CXdYI2ej.js";import"./_baseFindIndex-BI_wDfl5.js";import"./_mapToArray-Dr1Ktip_.js";import"./get-DQh4jKHT.js";import"./_hasPath-Dvauhtem.js";import"./has-BieX3JKh.js";import"./_basePickBy-DC3vRFqG.js";import"./isString-uNls8eJh.js";import"./last-vEcnwk7J.js";import"./union-TxXWgpb_.js";import"./_baseUniq-DJlayDUP.js";import"./noop-BdyXNs-O.js";import"./ResourcePicker.component-DCMAEoCc.js";import"./index-D8r2wgJD.js";import"./usePopper-hTYoqyVZ.js";import"./index-Bhmc-rPl.js";import"./index-fsXHssHI.js";import"./index-CTcQ-izg.js";import"./locale-BNgLu0P2.js";import"./setYear-DuUUQAvE.js";import"./isWithinInterval-C6y4L0Xg.js";import"./withTranslation-smRg6hW0.js";import"./setSeconds-Dr6-DXjW.js";import"./CellMeasurerCache-CQV67uvx.js";import"./cjs--JvCBWoO.js";import"./cjs-UvQsBOoL.js";import"./RootCloseWrapper-BLTTc6a5.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DgMVFoSo.js";import"./Transition-stKwlJ-Q.js";import"./Transition-ChCIhTF-.js";import"./SplitButton-BDlJUCCc.js";import"./inheritsLoose-G35GzxTI.js";import"./DropdownButton-CbhGUKqD.js";import"./FormControl-D2K-9iW8.js";import"./useKey-CsIDboPk.js";import"./tslib.es6-DwEbZtuj.js";import"./util-jvF6Sxgj.js";import"./Panel-Dy9u3BWD.js";import"./memoize-one.esm-BdPwpGay.js";import"./head-DDEdJ2ej.js";import"./head-DCcSS0Sj.js";import"./preload-helper-PPVm8Dsz.js";const p={type:"object",title:"Comment",required:["comments"],properties:{groupBy:{type:"array",minItems:1,maxItems:5,items:{type:"object",properties:{fieldName:{type:"string",enum:["First Field","Second Field","Third Field"]}}}},operations:{type:"array",minItems:1,maxItems:5,items:{type:"object",properties:{fieldName:{type:"string",enum:["First Field","Second Field","Third Field"]},operation:{type:"string",enum:["First Operation","Second Operation","Third Operation"]}}}}}},d=[{key:"groupBy",title:"Group by",items:[{key:"groupBy[].fieldName",title:"Field"}]},{key:"operations",title:"Operations",itemWidget:"columns",items:[{key:"operations[].fieldName",title:"Field"},{key:"operations[].operation",title:"Operation"}]}],c={groupBy:[{fieldName:"First Field"},{fieldName:"Second Field"}],operations:[{fieldName:"First Field",operation:"First Operation"},{fieldName:"Second Field",operation:"First Operation"}]},y={jsonSchema:p,uiSchema:d,properties:c},g={type:"object",title:"Comment",required:["names"],properties:{names:{type:"array",items:{type:"string"}}}},u=[{key:"names",title:"Names",options:{btnLabel:"Your custom title"}}],h={names:["aze","bslkdjf"]},f={jsonSchema:g,uiSchema:u,properties:h},F={type:"object",title:"Comment",required:["comments"],properties:{names:{type:"array",items:{title:"name",type:"string"}},readOnlyArray:{type:"array",items:{title:"name",type:"string"}},disabledArray:{type:"array",items:{title:"name",type:"string"}},comments:{type:"array",maxItems:2,items:{type:"object",title:"comment",properties:{name:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20}},required:["name","comment"]}},collapsibleComments:{type:"array",maxItems:2,items:{type:"object",properties:{name:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20}},required:["name","comment"]}},columns:{type:"array",items:{type:"object",properties:{value:{title:"Value",type:"string",default:""},key:{title:"Key",type:"string",default:""}}}}}},S=[{key:"names",title:"Names"},{key:"readOnlyArray",title:"Read only array",readOnly:!0},{key:"disabledArray",title:"Disabled array",disabled:!0},{key:"comments",title:"Comments",triggers:["validation"],itemTitle:"Comment",items:[{key:"comments[].name",title:"Name"},{key:"comments[].email",title:"Email",description:"Email will be used for evil."},{key:"comments[].comment",title:"Comment",type:"textarea",rows:3,validationMessage:"Don't be greedy!"}]},{key:"collapsibleComments",title:"Collapsible comments",itemWidget:"collapsibleFieldset",itemTitle:"Comment",items:[{key:"collapsibleComments[].name",title:"Name"},{key:"collapsibleComments[].email",title:"Email",description:"Email will be used for evil."},{key:"collapsibleComments[].comment",title:"Comment",type:"textarea",rows:3,validationMessage:"Don't be greedy!"}]},{key:"columns",title:"Columns",itemWidget:"collapsibleFieldset",itemTitle:"Column",items:[{key:"columns[]",items:[{widget:"columns",items:[{placeholder:"key",widget:"text",title:"Key",key:"columns[].key",required:!0},{placeholder:"value",widget:"text",title:"Value",key:"columns[].value"}]}]}]}],b={names:["foo","bar"],readOnlyArray:["foo","bar"],disabledArray:["foo","bar"],comments:[{name:"Jimmy",email:"jimmy@lol.com",comment:"Let's do this"},{name:"Jimmy",email:"jimmy@lol.com",comment:"Let's do this"}],collapsibleComments:[{name:"Jimmy",email:"jimmy@lol.com",comment:"Let's do this",isClosed:!0}]},C={jsonSchema:F,uiSchema:S,properties:b},k={type:"object",title:"Comment",properties:{lastname:{type:"string"},firstname:{type:"string"},age:{type:"number"},address:{type:"string"},comment:{type:"string",maxLength:20}},required:["firstname","email","comment"]},M=[{widget:"collapsibleFieldset",key:"technical.basic",title:"Basic",items:[{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with placeholder)",placeholder:"Enter your firstname here"}]},{widget:"collapsibleFieldset",key:"technical.details",title:"Details",items:[{key:"age",title:"Age"},{key:"address",title:"Adress"},{key:"comment",widget:"textarea",title:"Comment",placeholder:"Make a comment",validationMessage:"Don't be greedy!"}]},{widget:"collapsibleFieldset",key:"technical.description",title:"Description",description:"Hint: this is the description",items:[{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with description)",description:"Hint: this is the first name"}]}],A={comment:"lol"},E={jsonSchema:k,uiSchema:M,properties:A},D={type:"object",title:"Comment",required:["comments"],properties:{groupBy:{type:"array",minItems:1,maxItems:5,items:{type:"object",properties:{fieldName:{type:"string",enum:["First Field","Second Field","Third Field"]}}}},operations:{type:"array",minItems:1,maxItems:5,items:{type:"object",properties:{fieldName:{type:"string",enum:["First Field","Second Field","Third Field"]},operation:{type:"string",enum:["First Operation","Second Operation","Third Operation"]}}}}}},w=[{key:"operations",title:"Operations",itemWidget:"collapsibleFieldset",itemManaged:!1,items:[{key:"operations[].fieldName",title:"Field"},{key:"operations[].operation",title:"Operation"}]},{key:"groupBy",title:"Group by",items:[{key:"groupBy[].fieldName",title:"Field"}]}],N={groupBy:[{fieldName:"First Field"},{fieldName:"Second Field"}],operations:[{fieldName:"First Field",operation:"First Operation"},{fieldName:"Second Field",operation:"First Operation"}]},j={jsonSchema:D,uiSchema:w,properties:N},v={type:"object",title:"Comment",properties:{civility:{type:"string",enum:["M","Mrs"]},name:{type:"string"},lastname:{type:"string"},firstname:{type:"string"},age:{type:"number"},nochange:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20},singleInput:{type:"string"}},required:["name","firstname","email","comment"]},O=[{widget:"columns",title:"User title",items:[{key:"civility",title:"Civility",widget:"datalist"},{key:"name",title:"Name"}]},{widget:"columns",title:"My awesome columns",items:[{widget:"fieldset",title:"User Fieldset",items:[{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with placeholder)",placeholder:"Enter your firstname here"},{key:"age",title:"Age"}]},{widget:"fieldset",title:"Other Fieldset",items:[{key:"email",title:"Email (with pattern validation)",description:"Email will be used for evil.",validationMessage:"Please enter a valid email address, e.g. user@email.com"},{key:"nochange",title:"Field (read only mode)",readOnly:!0},{key:"comment",widget:"textarea",title:"Comment",placeholder:"Make a comment",validationMessage:"Don't be greedy!"}]},{key:"singleInput",description:"This one is a column composed by a single input"}]}],x={name:"Chuck Norris",nochange:"You can't change that",email:"ChuckyFTW@gmail.com",comment:"lol"},$={jsonSchema:v,uiSchema:O,properties:x},T={type:"object",title:"Comment",properties:{name:{type:"string"},lastname:{type:"string"},firstname:{type:"string"},age:{type:"number"},nochange:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20}},required:["name","firstname","email","comment"]},R=[{widget:"fieldset",title:"My awesome USER form",items:[{key:"name",title:"Name"},{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with placeholder)",placeholder:"Enter your firstname here"},{key:"age",title:"Age"}]},{widget:"fieldset",title:"My awesome OTHER form",items:[{key:"email",title:"Email (with pattern validation and custom validation message)",description:"Email will be used for evil.",validationMessage:"Please enter a valid email address, e.g. user@email.com"},{key:"nochange",title:"Field (read only mode)",readOnly:!0},{key:"comment",widget:"textarea",title:"Comment",placeholder:"Make a comment",validationMessage:"Don't be greedy!"}]}],L={name:"Chuck Norris",nochange:"You can't change that",email:"ChuckyFTW@gmail.com",comment:"lol"},I={jsonSchema:T,uiSchema:R,properties:L},q={type:"object",title:"Comment",properties:{name:{type:"string"},lastname:{type:"string"},firstname:{type:"string"},age:{type:"number"},nochange:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20}},required:["name","firstname","email","comment"]},W=[{widget:"tabs",items:[{title:"User",items:[{key:"name",title:"Name"},{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with placeholder)",placeholder:"Enter your firstname here"},{key:"age",title:"Age"}]},{title:"Other",items:[{key:"email",title:"Email (with pattern validation and custom validation message)",description:"Email will be used for evil.",validationMessage:"Please enter a valid email address, e.g. user@email.com"},{key:"nochange",title:"Field (read only mode)",readOnly:!0},{key:"comment",widget:"textarea",title:"Comment",placeholder:"Make a comment",validationMessage:"Don't be greedy!"}]}]}],B={name:"Chuck Norris",nochange:"You can't change that",email:"ChuckyFTW@gmail.com",comment:"lol"},H={jsonSchema:q,uiSchema:W,properties:B},Ke={title:"Forms/Schema/Fieldsets",component:l,argTypes:n,parameters:{formStoryDisplayMode:{category:"fieldsets"}}},e={parameters:{formStoryDisplayMode:{doc:"Array/README.md"}},args:{data:y}},t={parameters:{formStoryDisplayMode:{doc:"Array/README.md"}},args:{data:f}},i={parameters:{formStoryDisplayMode:{doc:"Array/README.md"}},args:{data:C}},r={parameters:{formStoryDisplayMode:{doc:"CollapsibleFieldset/README.md"}},args:{data:E}},a={parameters:{formStoryDisplayMode:{doc:"ArraysCollapsibleFieldset/README.md"}},args:{data:j}},o={parameters:{formStoryDisplayMode:{doc:"Columns/README.md"}},args:{data:$}},s={parameters:{formStoryDisplayMode:{doc:"Fieldset/README.md"}},args:{data:I}},m={parameters:{formStoryDisplayMode:{doc:"Tabs/README.md"}},args:{data:H}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    formStoryDisplayMode: {
      doc: 'Array/README.md'
    }
  },
  args: {
    data: fieldsets.coreArraysComplex
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    formStoryDisplayMode: {
      doc: 'Array/README.md'
    }
  },
  args: {
    data: fieldsets.coreArraysWithCustomOptions
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    formStoryDisplayMode: {
      doc: 'Array/README.md'
    }
  },
  args: {
    data: fieldsets.coreArrays
  }
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  parameters: {
    formStoryDisplayMode: {
      doc: 'CollapsibleFieldset/README.md'
    }
  },
  args: {
    data: fieldsets.coreCollapsibleFieldset
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    formStoryDisplayMode: {
      doc: 'ArraysCollapsibleFieldset/README.md'
    }
  },
  args: {
    data: fieldsets.coreArraysCollapsibleFieldset
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    formStoryDisplayMode: {
      doc: 'Columns/README.md'
    }
  },
  args: {
    data: fieldsets.coreColumns
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    formStoryDisplayMode: {
      doc: 'Fieldset/README.md'
    }
  },
  args: {
    data: fieldsets.coreFieldset
  }
}`,...s.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    formStoryDisplayMode: {
      doc: 'Tabs/README.md'
    }
  },
  args: {
    data: fieldsets.coreTabs
  }
}`,...m.parameters?.docs?.source}}};const Ve=["CoreArraysComplex","CoreArraysWithCustomOptions","CoreArrays","CoreCollapsibleFieldset","CoreArraysCollapsibleFieldset","CoreColumns","CoreFieldset","CoreTabs"];export{i as CoreArrays,a as CoreArraysCollapsibleFieldset,e as CoreArraysComplex,t as CoreArraysWithCustomOptions,r as CoreCollapsibleFieldset,o as CoreColumns,s as CoreFieldset,m as CoreTabs,Ve as __namedExportsOrder,Ke as default};
