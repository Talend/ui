---
'@talend/design-system': minor
---

feat(TDC-7254/Stepper): Add a new props `currentStepIndex` to control current step. Set to zero by default.

This fix an issue as the previous code is based on react ref which is not updated when dom is changed. As we don't want to observe mutation on the DOM, let's go back on classic react patterns, make it pure and ask for a state
