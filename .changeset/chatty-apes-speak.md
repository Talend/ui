---
'@talend/design-system': major
---

chore: remove reakit

* Rewrite components without reakit
* use `@floating-ui/react` for tooltip, popover

Breaking changes:
* HTML structure output may have changed
* Some passed props from our component to reakit and not documented as a usage as been removed. If you need a different usage let us knwow, now we own the code
* Tabs props API has been completly changed

Components changed:
* Accordion (useId)
* Clickabke (rewrite)
* Combobox (add as primitive)
* Disclosure (add as primitive)
* Divider (rewrite)
* Dropdown (rewrite using `@floating-ui/react`)
* Form/Affix/Button (typings)
* Form/Affix/Select (useId)
* Form/Field/Datalist (useId)
* Form/Field/InputFile (useId)
* [ ] Form/Field/InputToggleSwitch (rewrite)
* Form/Primitives/Checkbox (rewrite)
* Form/Primitives/Field (useId)
* Form/Primitives/Radio (useId)
* Modal (rewrite Dialog as primitive)
* Popover (rewrite using `@floating-ui/react`)
* Switch (rewrite)
* Tabs (rewrite + props changed)
* Tooltip (rewrite using `@floating-ui/react`)
* VisuallyHidden (rewrite)