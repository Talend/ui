import{u as i,j as e}from"./iframe-CsitcXE8.js";import{F as m,c as g,a as c,B as l,b,g as p,s as u,d as D}from"./index-GB4NYGT1.js";import"./preload-helper-PPVm8Dsz.js";const d={badges:[{properties:{attribute:"connection.type",initialOperatorOpened:!1,initialValueOpened:!1,label:"Connection Type",operator:{label:"In",name:"in"},operators:[{label:"In",name:"in"}],type:"checkbox",value:[{id:"amazon_s3",label:"Amazon S3",checked:!0},{id:"hdfs",label:"HDFS",checked:!0},{id:"localcon",label:"Local connection",checked:!0}]},metadata:{badgePerFacet:"1",entitiesPerBadge:"N",values:[{id:"amazon_s3",label:"Amazon S3"},{id:"hdfs",label:"HDFS"},{id:"kafka",label:"Kafka"},{id:"localcon",label:"Local connection"},{id:"salesforce",label:"Salesforce"},{id:"aws_kinesis",label:"AWS kinesis"}],operators:["in"],badgeId:"connection.type-9f0e5bc7-c687-4198-9635-d0fc7724dfd1",isInCreation:!1}}]},v={title:"Faceted search/Badge",component:m.Faceted,parameters:{docs:{description:{component:"Faceted search is a technique that involves augmenting traditional search techniques with a faceted navigation system, allowing users to narrow down search results by applying multiple filters based on faceted classification of the items. The user can look for any value, even if the field is not currently visible."}}},decorators:[(a,t)=>e.jsx("div",{children:e.jsx(a,{...t})})]},r=()=>{const{t:a}=i(),t=g(),s=c(d.badges[0]);return Object.assign(s.properties,{value:"  text  ",type:"text",displayType:D.TYPES.PATTERN}),e.jsx(l,{value:{},children:e.jsx(b,{badges:[s],badgesDictionary:t,getBadgeFromDict:p,t:a})})},n=()=>{const{t:a}=i(),t=g(),s=c(d.badges[0]);return Object.assign(s.properties,{value:Date.now(),type:"date"}),e.jsx(l,{value:{},children:e.jsx(b,{badges:[s],badgesDictionary:t,getBadgeFromDict:p,t:a})})},o=()=>{const{t:a}=i(),t=g();return e.jsx(l,{value:{},children:e.jsx(b,{badges:[u(c(d.badges[0]),"properties.readOnly",!0),u(c(d.badges[0]),"properties.removable",!1)],badgesDictionary:t,getBadgeFromDict:p,t:a})})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const {
    t
  } = useTranslation();
  const badgesDictionary = createBadgesDict();
  const badge = cloneDeep(badgesFaceted.badges[0]);
  Object.assign(badge.properties, {
    value: '  text  ',
    type: 'text',
    displayType: Badge.TYPES.PATTERN
  });
  return <BadgeFacetedProvider value={{}}>
            <BadgesGenerator badges={[badge]} badgesDictionary={badgesDictionary} getBadgeFromDict={getBadgesFromDict} t={t} />
        </BadgeFacetedProvider>;
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const {
    t
  } = useTranslation();
  const badgesDictionary = createBadgesDict();
  const badge = cloneDeep(badgesFaceted.badges[0]);
  Object.assign(badge.properties, {
    value: Date.now(),
    type: 'date'
  });
  return <BadgeFacetedProvider value={{}}>
            <BadgesGenerator badges={[badge]} badgesDictionary={badgesDictionary} getBadgeFromDict={getBadgesFromDict} t={t} />
        </BadgeFacetedProvider>;
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  const {
    t
  } = useTranslation();
  const badgesDictionary = createBadgesDict();
  return <BadgeFacetedProvider value={{}}>
            <BadgesGenerator badges={[set(cloneDeep(badgesFaceted.badges[0]), 'properties.readOnly', true), set(cloneDeep(badgesFaceted.badges[0]), 'properties.removable', false)]} badgesDictionary={badgesDictionary} getBadgeFromDict={getBadgesFromDict} t={t} />
        </BadgeFacetedProvider>;
}`,...o.parameters?.docs?.source}}};const h=["WithSpecialChars","DatePicker","ReadOnly"];export{n as DatePicker,o as ReadOnly,r as WithSpecialChars,h as __namedExportsOrder,v as default};
