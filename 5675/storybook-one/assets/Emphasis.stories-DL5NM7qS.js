import{j as e}from"./iframe-BKTgqfAy.js";import{E as t}from"./Emphasis.component-XtqeEHFT.js";import"./preload-helper-PPVm8Dsz.js";const a={title:"Components/Design Principles/Typography/Emphasis",component:t,tags:["autodocs"]},s={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"With value"}),e.jsx("p",{children:"The emphasised text is returned (value = BroWn) :"}),e.jsx(t,{value:"BroWn",text:"The quick brown fox jumps over the lazy dog"}),e.jsx("h1",{children:"Without value"}),e.jsx("p",{children:"The original text is returned :"}),e.jsx(t,{text:"The quick brown fox jumps over the lazy dog"}),e.jsx("h1",{children:"With multiple occurences"}),e.jsx("p",{children:"The emphasised text is returned (value = lazy) :"}),e.jsx(t,{value:"lazy",text:"The lazy quick brown fox jumps over the lazy dog"}),e.jsx("h1",{children:"With multiple words"}),e.jsx("p",{children:"The emphasised text is returned (value = [lazy,fox,dog]) :"}),e.jsx(t,{value:["lazy","fox","dog"],text:"The lazy quick brown fox jumps over the lazy dog"}),e.jsx("h1",{children:"With multiple substrings"}),e.jsx("p",{children:"The emphasised text is returned (value = [quick brown fox, lazy dog]) :"}),e.jsx(t,{value:["quick brown fox","lazy dog"],text:"The lazy quick brown fox jumps over the lazy dog"})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <h1>With value</h1>
            <p>The emphasised text is returned (value = BroWn) :</p>
            <Emphasis value="BroWn" text="The quick brown fox jumps over the lazy dog" />

            <h1>Without value</h1>
            <p>The original text is returned :</p>
            <Emphasis text="The quick brown fox jumps over the lazy dog" />

            <h1>With multiple occurences</h1>
            <p>The emphasised text is returned (value = lazy) :</p>
            <Emphasis value="lazy" text="The lazy quick brown fox jumps over the lazy dog" />

            <h1>With multiple words</h1>
            <p>The emphasised text is returned (value = [lazy,fox,dog]) :</p>
            <Emphasis value={['lazy', 'fox', 'dog']} text="The lazy quick brown fox jumps over the lazy dog" />

            <h1>With multiple substrings</h1>
            <p>The emphasised text is returned (value = [quick brown fox, lazy dog]) :</p>
            <Emphasis value={['quick brown fox', 'lazy dog']} text="The lazy quick brown fox jumps over the lazy dog" />
        </div>
}`,...s.parameters?.docs?.source}}};const h=["WithValue"];export{s as WithValue,h as __namedExportsOrder,a as default};
