import{bm as B,bn as w,$ as E,j as e}from"./iframe-MrVOqZw3.js";import{L as t}from"./List.component-DS0FMa3w.js";import{L as _,h as F}from"./index-DosmWNY5.js";import{A as P}from"./ActionBar.component-C40j70CU.js";import"./preload-helper-PPVm8Dsz.js";import"./OverlayTrigger.component-BWZ7_3Xz.js";import"./RootCloseWrapper-P4aoPSYe.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-RzICmMvR.js";import"./Transition-iTH7X9jW.js";import"./Transition-Do8KSkBS.js";import"./index-CHiZahZm.js";import"./TooltipTrigger.component-UsM6197Q.js";import"./index-CN_lvwf-.js";import"./index-C84PB36Y.js";import"./CircularProgress.component-B_YM5NXx.js";import"./constants-CZYEPhht.js";import"./translate-Dz8p909X.js";import"./withTranslation-D7xGU_tX.js";import"./findIndex-CmcnLCCG.js";import"./locale-BkUFDZ6B.js";import"./clsx-BUMf6-Na.js";import"./index-DH195LYN.js";import"./Skeleton.component-BQKFmsH7.js";import"./index-BDiubkZc.js";import"./theme-BcMiToL9.js";import"./Action.component-Ba1bXNIk.js";import"./ActionButton.component-BrkjI8jc.js";import"./ActionSplitDropdown.component-CFg9jRX6.js";import"./SplitButton-DbsqU5KZ.js";import"./inheritsLoose-F5FilpPG.js";import"./DropdownButton-BOIgAyNW.js";import"./ActionIconToggle.component-20Srudz5.js";import"./Actions.component-Cq2mckkr.js";import"./CellMeasurerCache-Bfpr0pYO.js";import"./CollapsiblePanel.component-C3Z34yai.js";import"./Status.component-CwrbvWPs.js";import"./Panel-C46GMkIE.js";import"./index-iwmss9wy.js";import"./Badge.component-D13Jdu5q.js";import"./locale-BIYaYFXk.js";import"./Checkbox-CB5W6-D1.js";import"./QualityBar.component-B1MSFh0P.js";import"./NavItem-BlG53Z_n.js";import"./NavDropdown-B7sbSMP9.js";import"./FilterBar.component-ByN_v1mj.js";import"./index-Bdiv4m56.js";import"./index-CJIEcoOQ.js";import"./FormControl-Br4sfDXY.js";import"./SelectAll.component-CmjLfkhG.js";import"./ColumnChooser.component-BUjSANpp.js";import"./RichLayout.component-I2dXY3L9.js";import"./useLocalStorage-D5FLo-A6.js";import"./util-jvF6Sxgj.js";import"./debounce-BZeUQpmG.js";import"./debounce-Dx0Z8SuN.js";import"./map-0ICeWLwg.js";import"./map-BHss5RYR.js";import"./isNil-6L29xBhg.js";Object.entries(_).forEach(([o,r])=>{t[o]=r});t.hooks=F;var k,N;function O(){if(N)return k;N=1;var o=Math.floor,r=Math.random;function d(h,m){return h+o(r()*(m-h+1))}return k=d,k}var S,R;function W(){if(R)return S;R=1;var o=O(),r=B(),d=w(),h=parseFloat,m=Math.min,A=Math.random;function I(a,l,c){if(c&&typeof c!="boolean"&&r(a,l,c)&&(l=c=void 0),c===void 0&&(typeof l=="boolean"?(c=l,l=void 0):typeof a=="boolean"&&(c=a,a=void 0)),a===void 0&&l===void 0?(a=0,l=1):(a=d(a),l===void 0?(l=a,a=0):l=d(l)),a>l){var K=a;a=l,l=K}if(c||a%1||l%1){var V=A();return m(a+V*(l-a+h("1e-"+((V+"").length-1))),l)}return o(a,l)}return S=I,S}var Y=W();const D=E(Y),{action:i}=__STORYBOOK_MODULE_ACTIONS__;i("onEdit"),i("onDelete");i("onEdit"),i("onDelete"),i("onCopy"),i("onEditParameters");const q=[{id:"edit",label:"edit","data-feature":"list.item.edit",icon:"talend-pencil",onClick:i("onEdit")},{id:"delete",label:"delete","data-feature":"list.item.delete",icon:"talend-trash",onClick:i("onDelete")},{id:"copy",label:"copy","data-feature":"list.item.copy",icon:"talend-files-o",onClick:i("onCopy")},{id:"parameters",label:"edit parameters","data-feature":"list.item.params",icon:"talend-cog",onClick:i("onEditParameters")},{id:"related",displayMode:"dropdown",label:"related items",icon:"talend-folder",items:[{label:"document 1","data-feature":"list.item.related",onClick:i("document 1 click")},{label:"document 2","data-feature":"list.item.related",onClick:i("document 2 click")},{label:"document 3","data-feature":"list.item.related",onClick:i("document 3 click")},{label:"document 4","data-feature":"list.item.related",onClick:i("document 4 click")},{label:"document 5","data-feature":"list.item.related",onClick:i("document 5 click")},{label:"document 6","data-feature":"list.item.related",onClick:i("document 6 click")},{label:"document 7","data-feature":"list.item.related",onClick:i("document 7 click")},{label:"document 8","data-feature":"list.item.related",onClick:i("document 8 click")},{label:"document 9","data-feature":"list.item.related",onClick:i("document 9 click")},{label:"document 10","data-feature":"list.item.related",onClick:i("document 10 click")}],pullRight:!0}],U=[{label:"favorite",icon:"talend-star",className:"favorite","data-feature":"list.item.favorite",onClick:i("onFavorite")},{label:"certify",icon:"talend-badge",className:"certify","data-feature":"list.item.certify",onClick:i("onCertify")}],s=[];for(let o=0;o<100;o+=1)s.push({id:o,iconAndText:{icon:"talend-list",label:"list"},iconAndTextWithGetter:"icon from getter",name:`Title with icon and actions ${o}`,isValid1:[!0,!1,void 0][D(2)],isValid2:[!0,!1,void 0][D(2)],tag:"test",created:14744952e5,modified:14744952e5,description:`Simple row with icon and actions${[" (crème brûlée)",""][D(1)]}`,author:"Jean-Pierre DUPONT",icon:"talend-file-xls-o",display:"text",className:"item-0-class",persistentActions:U,titleActions:q,quality:{invalid:1,empty:2,valid:3,na:4,onClick:i("onQualityClick")},tagLabel:{label:"incorrect",style:"warning"}});const z=o=>({onClick:()=>console.log("onTitleClick"),"data-feature":`list.item.title.${o.id}`,actionsKey:"titleActions",persistentActionsKey:"persistentActions",displayModeKey:"display",iconKey:"icon",onEditCancel:()=>console.log("cancel-edit"),onEditSubmit:()=>console.log("submit-edit"),iconTooltip:"TDP"});function n(o){return e.jsxs(t.VList,{id:"my-vlist",...o,children:[e.jsx(t.VList.Text,{label:"Id",dataKey:"id"}),e.jsx(t.VList.Title,{label:"Name",dataKey:"name",columnData:z}),e.jsx(t.VList.IconText,{label:"IconText",dataKey:"iconAndText"}),e.jsx(t.VList.IconText,{label:"IconText",columnData:{getIcon:()=>"talend-tdp-colored",getIconTooltip:({iconAndTextWithGetter:r})=>`${r}--icon tooltip`},dataKey:"iconAndTextWithGetter"}),e.jsx(t.VList.Boolean,{label:"Valid",dataKey:"isValid1"}),e.jsx(t.VList.Boolean,{label:"ValidWithIcon",dataKey:"isValid2",columnData:{displayMode:t.VList.Boolean.displayMode.ICON}}),e.jsx(t.VList.QualityBar,{label:"Quality",dataKey:"quality"}),e.jsx(t.VList.Label,{label:"TagLabel",dataKey:"tagLabel"}),e.jsx(t.VList.Badge,{label:"Tag",dataKey:"tag",columnData:{selected:!0},disableSort:!0}),e.jsx(t.VList.Text,{label:"Description",dataKey:"description",disableSort:!0}),e.jsx(t.VList.Text,{label:"Author",dataKey:"author"}),e.jsx(t.VList.Datetime,{label:"Created",dataKey:"created",columnData:{mode:"ago"}}),e.jsx(t.VList.Datetime,{label:"Modified",dataKey:"modified",columnData:{mode:"format"}})]})}const Xe={title:"Components/List/List Composition",component:t,tags:["autodocs"],parameters:{chromatic:{disableSnapshot:!0}}},u={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"Default list"}),e.jsx("p",{children:"By default List doesn't come with any feature"}),e.jsx("pre",{children:`
<List.Manager id="my-list" collection={simpleCollection}>
    <List.VList id="my-vlist">
        <List.VList.Text label="Id" dataKey="id" />
        <List.VList.Title label="Name" dataKey="name" columnData={titleProps} />
        ...
        <List.VList.Datetime label="Modified" dataKey="modified" />
    </List.VList>
</List.Manager>
`}),e.jsx("section",{style:{height:"50vh"},children:e.jsx(t.Manager,{id:"my-list",collection:s,children:e.jsx(n,{})})})]})},p={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List with display mode change"}),e.jsx("p",{children:"You can change display mode by adding the selector in toolbar"}),e.jsx("section",{style:{height:"50vh"},children:e.jsxs(t.Manager,{id:"my-list",collection:s,children:[e.jsx(t.Toolbar,{children:e.jsx(t.Toolbar.Right,{children:e.jsx(t.DisplayMode,{id:"my-list-displayMode"})})}),e.jsx(n,{})]})})]})},g={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List with display mode change"}),e.jsx("p",{children:"You can control the display mode by passing the display mode to List.DisplayMode"}),e.jsx("section",{style:{height:"50vh"},children:e.jsxs(t.Manager,{id:"my-list",collection:s,children:[e.jsx(t.Toolbar,{children:e.jsx(t.Toolbar.Right,{children:e.jsx(t.DisplayMode,{id:"my-list-displayMode",onChange:()=>console.log("onDisplayModeChange"),selectedDisplayMode:"table"})})}),e.jsx(n,{type:"TABLE"})]})})]})},y={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"Total items"}),e.jsx("p",{children:"You can show the total number of elements in the list"}),e.jsx("section",{style:{height:"50vh"},children:e.jsxs(t.Manager,{id:"my-list",collection:s,children:[e.jsx(t.Toolbar,{children:e.jsx(t.Toolbar.Right,{children:e.jsx(t.ItemsNumber,{totalItems:s.length,label:`${s.length} users`})})}),e.jsx(n,{type:"TABLE"})]})})]})},L={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"Text Filter"}),e.jsx("p",{children:"You can filter the dataset with the text"}),e.jsx("section",{style:{height:"50vh"},children:e.jsxs(t.Manager,{id:"my-list",collection:s,initialVisibleColumns:["id","name"],children:[e.jsx(t.Toolbar,{children:e.jsxs(t.Toolbar.Right,{children:[e.jsx(t.TextFilter,{id:"my-list-textFilter",applyOn:["name","description"]}),e.jsx(t.ColumnChooser,{onSubmit:()=>console.log("onSubmit")})]})}),e.jsx(n,{type:"TABLE"})]})})]})},b={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List with sorting feature"}),e.jsx("p",{children:"You can change the sorting criteria by adding the component in the toolbar"}),e.jsx("section",{style:{height:"50vh"},children:e.jsxs(t.Manager,{collection:s,id:"my-list",initialSortParams:{sortBy:"id",isDescending:!0},children:[e.jsx(t.Toolbar,{children:e.jsx(t.Toolbar.Right,{children:e.jsx(t.SortBy,{id:"my-list-sortBy",options:[{key:"id",label:"Id"},{key:"name",label:"Name"}]})})}),e.jsx(n,{})]})})]})},x={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List supporting Lazy Loading"}),e.jsx("p",{children:"The LazyLoadingList list component allows to create lists that supports lazy loading feature."}),e.jsx("section",{style:{height:"30vh"},children:e.jsx(t.Manager,{id:"my-table-list",collection:[s[0]],children:e.jsxs(t.LazyLoadingList,{id:"my-infinite-scroll-list",loadMoreRows:()=>console.log("onLoadMoreRows"),rowCount:s.length,onRowsRendered:()=>console.log("onRowsRendered"),children:[e.jsx(t.VList.Text,{label:"Id",dataKey:"id"}),e.jsx(t.VList.Title,{label:"Name",dataKey:"name",columnData:z}),e.jsx(t.VList.Badge,{label:"Tag",dataKey:"tag",columnData:{selected:!0},disableSort:!0})]})})})]})},C={render:()=>{const{isSelected:o,onToggleAll:r,onToggleItem:d}=t.hooks.useCollectionSelection(s,[],"id");return e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List with selectable items"}),e.jsx("p",{children:"The list also supports items selection, when using the proper hook."}),e.jsx("section",{style:{height:"50vh"},children:e.jsx(t.Manager,{id:"my-list",collection:s,children:e.jsx(n,{isSelected:o,onToggleAll:r,selectionToggle:(h,m)=>d(m)})})})]})}},v={render:()=>{const{isSelected:o,onToggleAll:r,onToggleItem:d}=t.hooks.useCollectionSelection(s,[1,2],"id");return e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List with selectable items + an ActionBar"}),e.jsx("section",{style:{height:"50vh"},children:e.jsxs(t.Manager,{id:"my-list",collection:s,children:[e.jsx(t.Toolbar,{children:e.jsx(P,{selected:2,multiSelectActions:{left:[{id:"remove-items",icon:"talend-trash",label:"Delete"}]}})}),e.jsx(n,{isSelected:o,onToggleAll:r,selectionToggle:(h,m)=>d(m)})]})})]})}},j={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List with Column chooser in header"}),e.jsx("section",{style:{height:"50vh"},children:e.jsx(t.Manager,{id:"my-list",collection:s,children:e.jsx(n,{columnChooser:!0})})})]})},T={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List with Column chooser and initialized visible columns"}),e.jsx("section",{style:{height:"50vh"},children:e.jsx(t.Manager,{id:"my-list",collection:s,initialVisibleColumns:["id","name","quality"],children:e.jsx(n,{columnChooser:!0})})})]})},f={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List with Column chooser and locked columns"}),e.jsx("section",{style:{height:"50vh"},children:e.jsx(t.Manager,{id:"my-list",collection:s,children:e.jsx(n,{columnChooser:{nbLockedLeftItems:2}})})})]})},M={render:()=>e.jsxs("div",{className:"virtualized-list",children:[e.jsx("h1",{children:"List with Column chooser and persisted visibility"}),e.jsx("section",{style:{height:"50vh"},children:e.jsx(t.Manager,{id:"my-list",collection:s,columnsVisibilityStorageKey:"my-list-column-visibility",children:e.jsx(n,{columnChooser:!0})})})]})};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>Default list</h1>
            <p>By default List doesn't come with any feature</p>
            <pre>
                {\`
<List.Manager id="my-list" collection={simpleCollection}>
    <List.VList id="my-vlist">
        <List.VList.Text label="Id" dataKey="id" />
        <List.VList.Title label="Name" dataKey="name" columnData={titleProps} />
        ...
        <List.VList.Datetime label="Modified" dataKey="modified" />
    </List.VList>
</List.Manager>
\`}
            </pre>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager id="my-list" collection={simpleCollection}>
                    <CustomList />
                </List.Manager>
            </section>
        </div>
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>List with display mode change</h1>
            <p>You can change display mode by adding the selector in toolbar</p>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager id="my-list" collection={simpleCollection}>
                    <List.Toolbar>
                        <List.Toolbar.Right>
                            <List.DisplayMode id="my-list-displayMode" />
                        </List.Toolbar.Right>
                    </List.Toolbar>
                    <CustomList />
                </List.Manager>
            </section>
        </div>
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>List with display mode change</h1>
            <p>You can control the display mode by passing the display mode to List.DisplayMode</p>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager id="my-list" collection={simpleCollection}>
                    <List.Toolbar>
                        <List.Toolbar.Right>
                            <List.DisplayMode id="my-list-displayMode" onChange={() => console.log('onDisplayModeChange')} selectedDisplayMode="table" />
                        </List.Toolbar.Right>
                    </List.Toolbar>
                    <CustomList type="TABLE" />
                </List.Manager>
            </section>
        </div>
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>Total items</h1>
            <p>You can show the total number of elements in the list</p>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager id="my-list" collection={simpleCollection}>
                    <List.Toolbar>
                        <List.Toolbar.Right>
                            <List.ItemsNumber totalItems={simpleCollection.length} label={\`\${simpleCollection.length} users\`} />
                        </List.Toolbar.Right>
                    </List.Toolbar>
                    <CustomList type="TABLE" />
                </List.Manager>
            </section>
        </div>
}`,...y.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>Text Filter</h1>
            <p>You can filter the dataset with the text</p>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager id="my-list" collection={simpleCollection} initialVisibleColumns={['id', 'name']}>
                    <List.Toolbar>
                        <List.Toolbar.Right>
                            <List.TextFilter id="my-list-textFilter" applyOn={['name', 'description']} />
                            <List.ColumnChooser onSubmit={() => console.log('onSubmit')} />
                        </List.Toolbar.Right>
                    </List.Toolbar>
                    <CustomList type="TABLE" />
                </List.Manager>
            </section>
        </div>
}`,...L.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>List with sorting feature</h1>
            <p>You can change the sorting criteria by adding the component in the toolbar</p>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager collection={simpleCollection} id="my-list" initialSortParams={{
        sortBy: 'id',
        isDescending: true
      }}>
                    <List.Toolbar>
                        <List.Toolbar.Right>
                            <List.SortBy id="my-list-sortBy" options={[{
              key: 'id',
              label: 'Id'
            }, {
              key: 'name',
              label: 'Name'
            }]} />
                        </List.Toolbar.Right>
                    </List.Toolbar>
                    <CustomList />
                </List.Manager>
            </section>
        </div>
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>List supporting Lazy Loading</h1>
            <p>
                The LazyLoadingList list component allows to create lists that supports lazy loading
                feature.
            </p>
            <section style={{
      height: '30vh'
    }}>
                <List.Manager id="my-table-list" collection={[simpleCollection[0]]}>
                    <List.LazyLoadingList id="my-infinite-scroll-list" loadMoreRows={() => console.log('onLoadMoreRows')} rowCount={simpleCollection.length} onRowsRendered={() => console.log('onRowsRendered')}>
                        <List.VList.Text label="Id" dataKey="id" />
                        <List.VList.Title label="Name" dataKey="name" columnData={titleProps} />
                        <List.VList.Badge label="Tag" dataKey="tag" columnData={{
            selected: true
          }} disableSort />
                    </List.LazyLoadingList>
                </List.Manager>
            </section>
        </div>
}`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      isSelected,
      onToggleAll,
      onToggleItem
    } = List.hooks.useCollectionSelection(simpleCollection, [], 'id');
    return <div className="virtualized-list">
                <h1>List with selectable items</h1>
                <p>The list also supports items selection, when using the proper hook.</p>

                <section style={{
        height: '50vh'
      }}>
                    <List.Manager id="my-list" collection={simpleCollection}>
                        <CustomList isSelected={isSelected} onToggleAll={onToggleAll} selectionToggle={(_, group) => onToggleItem(group)} />
                    </List.Manager>
                </section>
            </div>;
  }
}`,...C.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      isSelected,
      onToggleAll,
      onToggleItem
    } = List.hooks.useCollectionSelection(simpleCollection, [1, 2], 'id');
    return <div className="virtualized-list">
                <h1>List with selectable items + an ActionBar</h1>
                <section style={{
        height: '50vh'
      }}>
                    <List.Manager id="my-list" collection={simpleCollection}>
                        <List.Toolbar>
                            <ActionBar selected={2} multiSelectActions={{
              left: [{
                id: 'remove-items',
                icon: 'talend-trash',
                label: 'Delete'
              }]
            }} />
                        </List.Toolbar>
                        <CustomList isSelected={isSelected} onToggleAll={onToggleAll} selectionToggle={(_, group) => onToggleItem(group)} />
                    </List.Manager>
                </section>
            </div>;
  }
}`,...v.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>List with Column chooser in header</h1>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager id="my-list" collection={simpleCollection}>
                    <CustomList columnChooser />
                </List.Manager>
            </section>
        </div>
}`,...j.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>List with Column chooser and initialized visible columns</h1>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager id="my-list" collection={simpleCollection} initialVisibleColumns={['id', 'name', 'quality']}>
                    <CustomList columnChooser />
                </List.Manager>
            </section>
        </div>
}`,...T.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>List with Column chooser and locked columns</h1>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager id="my-list" collection={simpleCollection}>
                    <CustomList columnChooser={{
          nbLockedLeftItems: 2
        }} />
                </List.Manager>
            </section>
        </div>
}`,...f.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div className="virtualized-list">
            <h1>List with Column chooser and persisted visibility</h1>
            <section style={{
      height: '50vh'
    }}>
                <List.Manager id="my-list" collection={simpleCollection} columnsVisibilityStorageKey="my-list-column-visibility">
                    <CustomList columnChooser />
                </List.Manager>
            </section>
        </div>
}`,...M.parameters?.docs?.source}}};const Ze=["Default","DisplayModeUncontrolled","DisplayModeControlled","TotalItems","TextFilterUncontrolled","SortByUncontrolled","LazyLoading","SelectableItems","SelectableItemsActionBar","TableWithColumnChooser","TableWithColumnChooserAndInitialVisibleColumns","TableWithColumnChooserAndLockedColumns","TableWithColumnChooserPersisted"];export{u as Default,g as DisplayModeControlled,p as DisplayModeUncontrolled,x as LazyLoading,C as SelectableItems,v as SelectableItemsActionBar,b as SortByUncontrolled,j as TableWithColumnChooser,T as TableWithColumnChooserAndInitialVisibleColumns,f as TableWithColumnChooserAndLockedColumns,M as TableWithColumnChooserPersisted,L as TextFilterUncontrolled,y as TotalItems,Ze as __namedExportsOrder,Xe as default};
