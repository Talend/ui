---
'@talend/design-system': minor
---

feat: rework some part of Message component

- The size of a message fit the container width while before, it has a max width of `28rem`
- add a new prop `titleInfo` that allow to display an information message aside the title
- add new prop `additionalIconAction` to allow to display an additional button icon instead (there was only the dropdown action available before)
- rename prop `additionalActions` to `additionalDropdownActions` to make the API more explicit
- remove the shadow on the message to make it more consistent with the rest of the design and integrate better in the page
