---
'@talend/react-components': patch
---

fix: remove wrong propTypes from Checkbox component

fix: remove active props to Button which was responsible for the following error:

```
Warning: Received `true` for a non-boolean attribute `active`.
    
    If you want to write it to the DOM, pass a string instead: active="true" or active={value.toString()}.
```

fix: Columns fieldset propTypes
fix: Fieldset propTypes