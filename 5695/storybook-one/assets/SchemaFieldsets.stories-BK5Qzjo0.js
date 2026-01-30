import"./index-ZHcekQV5.js";import{a as n,U as l}from"./argTypes-oXWV-xNQ.js";import"./iframe-BPWKJ2_o.js";import"./StackItem-BfSbzeRh.js";import"./RHFInput.component-Cr5t-YoG.js";import"./index.esm-BXNGuhA9.js";import"./RHFSelect.component-ChpGCK_3.js";import"./RHFTextArea.component-CoysD5SU.js";import"./omit-Dp4FCWoh.js";import"./toString-RNHQn9jk.js";import"./isSymbol-DtjENQP0.js";import"./_baseSlice-DRoy53G4.js";import"./_baseGet-GCSfqC3R.js";import"./eq-CT9ytHj1.js";import"./_getTag-KzPaKQG2.js";import"./isArrayLike-BnxJKSWE.js";import"./map-Dllx8PFm.js";import"./isEqual-BD9NjD5i.js";import"./get-6sLcuglD.js";import"./_hasPath-BoeZ2kz_.js";import"./_baseFindIndex-DSL94zmR.js";import"./_mapToArray-Dr1Ktip_.js";import"./has-C2JTgw_p.js";import"./isEmpty-f_74Hy3B.js";import"./isString-DsT7vuMJ.js";import"./last-C4wV_2J2.js";import"./union-CB2OgwF9.js";import"./_baseUniq--x5VyDcA.js";import"./noop-BdyXNs-O.js";import"./ResourcePicker.component-CPZTwGOK.js";import"./index-Rbgy7uSV.js";import"./usePopper-CM0sjsC9.js";import"./index-CPccb1WS.js";import"./index-B5EOfhho.js";import"./index-BPavWh-U.js";import"./locale-BUXC210M.js";import"./setYear-D-oJS44X.js";import"./isWithinInterval-CUy1UPDd.js";import"./withTranslation-ByA2ZQp2.js";import"./setSeconds-bzIzS23A.js";import"./CellMeasurerCache-C-j05lk4.js";import"./cjs-BEvbhKhz.js";import"./cjs-D0BsagJH.js";import"./RootCloseWrapper-CMQxteV5.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CpIv-jbF.js";import"./Transition-CPW5JkxA.js";import"./Transition-5lMdqHLm.js";import"./SplitButton-C2kpOeLT.js";import"./inheritsLoose-DEJIaahp.js";import"./DropdownButton-BvV7HSyt.js";import"./FormControl-Byfim0nt.js";import"./useKey-CMZBaLcz.js";import"./tslib.es6-DwEbZtuj.js";import"./util-jvF6Sxgj.js";import"./Panel-CyyAvb2Y.js";import"./memoize-one.esm-BdPwpGay.js";import"./head-CU5ksv57.js";import"./head-DCcSS0Sj.js";import"./preload-helper-PPVm8Dsz.js";const p={type:"object",title:"Comment",required:["comments"],properties:{groupBy:{type:"array",minItems:1,maxItems:5,items:{type:"object",properties:{fieldName:{type:"string",enum:["First Field","Second Field","Third Field"]}}}},operations:{type:"array",minItems:1,maxItems:5,items:{type:"object",properties:{fieldName:{type:"string",enum:["First Field","Second Field","Third Field"]},operation:{type:"string",enum:["First Operation","Second Operation","Third Operation"]}}}}}},d=[{key:"groupBy",title:"Group by",items:[{key:"groupBy[].fieldName",title:"Field"}]},{key:"operations",title:"Operations",itemWidget:"columns",items:[{key:"operations[].fieldName",title:"Field"},{key:"operations[].operation",title:"Operation"}]}],c={groupBy:[{fieldName:"First Field"},{fieldName:"Second Field"}],operations:[{fieldName:"First Field",operation:"First Operation"},{fieldName:"Second Field",operation:"First Operation"}]},y={jsonSchema:p,uiSchema:d,properties:c},g={type:"object",title:"Comment",required:["names"],properties:{names:{type:"array",items:{type:"string"}}}},u=[{key:"names",title:"Names",options:{btnLabel:"Your custom title"}}],h={names:["aze","bslkdjf"]},f={jsonSchema:g,uiSchema:u,properties:h},F={type:"object",title:"Comment",required:["comments"],properties:{names:{type:"array",items:{title:"name",type:"string"}},readOnlyArray:{type:"array",items:{title:"name",type:"string"}},disabledArray:{type:"array",items:{title:"name",type:"string"}},comments:{type:"array",maxItems:2,items:{type:"object",title:"comment",properties:{name:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20}},required:["name","comment"]}},collapsibleComments:{type:"array",maxItems:2,items:{type:"object",properties:{name:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20}},required:["name","comment"]}},columns:{type:"array",items:{type:"object",properties:{value:{title:"Value",type:"string",default:""},key:{title:"Key",type:"string",default:""}}}}}},S=[{key:"names",title:"Names"},{key:"readOnlyArray",title:"Read only array",readOnly:!0},{key:"disabledArray",title:"Disabled array",disabled:!0},{key:"comments",title:"Comments",triggers:["validation"],itemTitle:"Comment",items:[{key:"comments[].name",title:"Name"},{key:"comments[].email",title:"Email",description:"Email will be used for evil."},{key:"comments[].comment",title:"Comment",type:"textarea",rows:3,validationMessage:"Don't be greedy!"}]},{key:"collapsibleComments",title:"Collapsible comments",itemWidget:"collapsibleFieldset",itemTitle:"Comment",items:[{key:"collapsibleComments[].name",title:"Name"},{key:"collapsibleComments[].email",title:"Email",description:"Email will be used for evil."},{key:"collapsibleComments[].comment",title:"Comment",type:"textarea",rows:3,validationMessage:"Don't be greedy!"}]},{key:"columns",title:"Columns",itemWidget:"collapsibleFieldset",itemTitle:"Column",items:[{key:"columns[]",items:[{widget:"columns",items:[{placeholder:"key",widget:"text",title:"Key",key:"columns[].key",required:!0},{placeholder:"value",widget:"text",title:"Value",key:"columns[].value"}]}]}]}],b={names:["foo","bar"],readOnlyArray:["foo","bar"],disabledArray:["foo","bar"],comments:[{name:"Jimmy",email:"jimmy@lol.com",comment:"Let's do this"},{name:"Jimmy",email:"jimmy@lol.com",comment:"Let's do this"}],collapsibleComments:[{name:"Jimmy",email:"jimmy@lol.com",comment:"Let's do this",isClosed:!0}]},C={jsonSchema:F,uiSchema:S,properties:b},k={type:"object",title:"Comment",properties:{lastname:{type:"string"},firstname:{type:"string"},age:{type:"number"},address:{type:"string"},comment:{type:"string",maxLength:20}},required:["firstname","email","comment"]},M=[{widget:"collapsibleFieldset",key:"technical.basic",title:"Basic",items:[{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with placeholder)",placeholder:"Enter your firstname here"}]},{widget:"collapsibleFieldset",key:"technical.details",title:"Details",items:[{key:"age",title:"Age"},{key:"address",title:"Adress"},{key:"comment",widget:"textarea",title:"Comment",placeholder:"Make a comment",validationMessage:"Don't be greedy!"}]},{widget:"collapsibleFieldset",key:"technical.description",title:"Description",description:"Hint: this is the description",items:[{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with description)",description:"Hint: this is the first name"}]}],A={comment:"lol"},E={jsonSchema:k,uiSchema:M,properties:A},D={type:"object",title:"Comment",required:["comments"],properties:{groupBy:{type:"array",minItems:1,maxItems:5,items:{type:"object",properties:{fieldName:{type:"string",enum:["First Field","Second Field","Third Field"]}}}},operations:{type:"array",minItems:1,maxItems:5,items:{type:"object",properties:{fieldName:{type:"string",enum:["First Field","Second Field","Third Field"]},operation:{type:"string",enum:["First Operation","Second Operation","Third Operation"]}}}}}},w=[{key:"operations",title:"Operations",itemWidget:"collapsibleFieldset",itemManaged:!1,items:[{key:"operations[].fieldName",title:"Field"},{key:"operations[].operation",title:"Operation"}]},{key:"groupBy",title:"Group by",items:[{key:"groupBy[].fieldName",title:"Field"}]}],N={groupBy:[{fieldName:"First Field"},{fieldName:"Second Field"}],operations:[{fieldName:"First Field",operation:"First Operation"},{fieldName:"Second Field",operation:"First Operation"}]},j={jsonSchema:D,uiSchema:w,properties:N},v={type:"object",title:"Comment",properties:{civility:{type:"string",enum:["M","Mrs"]},name:{type:"string"},lastname:{type:"string"},firstname:{type:"string"},age:{type:"number"},nochange:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20},singleInput:{type:"string"}},required:["name","firstname","email","comment"]},O=[{widget:"columns",title:"User title",items:[{key:"civility",title:"Civility",widget:"datalist"},{key:"name",title:"Name"}]},{widget:"columns",title:"My awesome columns",items:[{widget:"fieldset",title:"User Fieldset",items:[{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with placeholder)",placeholder:"Enter your firstname here"},{key:"age",title:"Age"}]},{widget:"fieldset",title:"Other Fieldset",items:[{key:"email",title:"Email (with pattern validation)",description:"Email will be used for evil.",validationMessage:"Please enter a valid email address, e.g. user@email.com"},{key:"nochange",title:"Field (read only mode)",readOnly:!0},{key:"comment",widget:"textarea",title:"Comment",placeholder:"Make a comment",validationMessage:"Don't be greedy!"}]},{key:"singleInput",description:"This one is a column composed by a single input"}]}],x={name:"Chuck Norris",nochange:"You can't change that",email:"ChuckyFTW@gmail.com",comment:"lol"},$={jsonSchema:v,uiSchema:O,properties:x},T={type:"object",title:"Comment",properties:{name:{type:"string"},lastname:{type:"string"},firstname:{type:"string"},age:{type:"number"},nochange:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20}},required:["name","firstname","email","comment"]},R=[{widget:"fieldset",title:"My awesome USER form",items:[{key:"name",title:"Name"},{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with placeholder)",placeholder:"Enter your firstname here"},{key:"age",title:"Age"}]},{widget:"fieldset",title:"My awesome OTHER form",items:[{key:"email",title:"Email (with pattern validation and custom validation message)",description:"Email will be used for evil.",validationMessage:"Please enter a valid email address, e.g. user@email.com"},{key:"nochange",title:"Field (read only mode)",readOnly:!0},{key:"comment",widget:"textarea",title:"Comment",placeholder:"Make a comment",validationMessage:"Don't be greedy!"}]}],L={name:"Chuck Norris",nochange:"You can't change that",email:"ChuckyFTW@gmail.com",comment:"lol"},I={jsonSchema:T,uiSchema:R,properties:L},q={type:"object",title:"Comment",properties:{name:{type:"string"},lastname:{type:"string"},firstname:{type:"string"},age:{type:"number"},nochange:{type:"string"},email:{type:"string",pattern:"^\\S+@\\S+$"},comment:{type:"string",maxLength:20}},required:["name","firstname","email","comment"]},W=[{widget:"tabs",items:[{title:"User",items:[{key:"name",title:"Name"},{key:"lastname",title:"Last Name (with description)",description:"Hint: this is the last name"},{key:"firstname",title:"First Name (with placeholder)",placeholder:"Enter your firstname here"},{key:"age",title:"Age"}]},{title:"Other",items:[{key:"email",title:"Email (with pattern validation and custom validation message)",description:"Email will be used for evil.",validationMessage:"Please enter a valid email address, e.g. user@email.com"},{key:"nochange",title:"Field (read only mode)",readOnly:!0},{key:"comment",widget:"textarea",title:"Comment",placeholder:"Make a comment",validationMessage:"Don't be greedy!"}]}]}],B={name:"Chuck Norris",nochange:"You can't change that",email:"ChuckyFTW@gmail.com",comment:"lol"},H={jsonSchema:q,uiSchema:W,properties:B},Ke={title:"Forms/Schema/Fieldsets",component:l,argTypes:n,parameters:{formStoryDisplayMode:{category:"fieldsets"}}},e={parameters:{formStoryDisplayMode:{doc:"Array/README.md"}},args:{data:y}},t={parameters:{formStoryDisplayMode:{doc:"Array/README.md"}},args:{data:f}},i={parameters:{formStoryDisplayMode:{doc:"Array/README.md"}},args:{data:C}},r={parameters:{formStoryDisplayMode:{doc:"CollapsibleFieldset/README.md"}},args:{data:E}},a={parameters:{formStoryDisplayMode:{doc:"ArraysCollapsibleFieldset/README.md"}},args:{data:j}},o={parameters:{formStoryDisplayMode:{doc:"Columns/README.md"}},args:{data:$}},s={parameters:{formStoryDisplayMode:{doc:"Fieldset/README.md"}},args:{data:I}},m={parameters:{formStoryDisplayMode:{doc:"Tabs/README.md"}},args:{data:H}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
