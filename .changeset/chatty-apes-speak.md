---
'@talend/design-system': major
---

chore: remove reakit

* Rewrite components without reakit
* use `@floating-ui/react` for tooltip, popover
* export all types and components from the root

Breaking changes:
* HTML structure output may have changed
* Some passed props from our component to reakit and not documented as a usage as been removed. If you need a different usage let us knwow, now we own the code
* Tabs props API has been completly changed

Components changed:
* Accordion (useId)
* Clickable (rewrite)
* Combobox (add as primitive)
* Disclosure (add as primitive)
* Divider (rewrite)
* Drawer (rewrite using `react-transition-group`)
* Dropdown (rewrite using `@floating-ui/react`)
* Form/Affix/Button (typings)
* Form/Affix/Select (useId)
* Form/Field/Datalist (useId)
* Form/Field/InputFile (useId)
* Form/Field/InputToggleSwitch (rewrite)
* Form/Primitives/Checkbox (rewrite)
* Form/Primitives/Field (useId)
* Form/Primitives/Radio (useId)
* Modal (rewrite Dialog as primitive)
* Popover (rewrite using `@floating-ui/react`)
* Switch (rewrite)
* Tabs (rewrite + props changed with old API support)
* Tooltip (rewrite using `@floating-ui/react` + API Change)
* VisuallyHidden (rewrite)


## Migration Guide

### Checkbox component

Checkbox support now control and uncontrolled mode.
To use controlled version, provide `checked` and `onChange` props.
To use uncontrolled version, you can provide optional `defaultChecked` prop.

We also change way to import it to be less verbose.


### ToggleSwitch component

ToggleSwitch now support controlled and uncontrolled mode.
To use controlled version provide `checked` and `onChange` props.
To use uncontrolled version, you can just provide optional provide `defaultChecked` prop.


### Tabs component

Previous API with the `tabs` props. TabsKit has been removed. We encourage you to use the following API:

```javascript
<Tabs.Container defaultActiveKey="profile">
    <Tabs.List>
        <Tabs.Tab aria-controls="home" title="Home" />
        <Tabs.Tab aria-controls="profile" title="Profile" />
        <Tabs.Tab aria-controls="contact" title="Contact" disabled />
    </Tabs.List>
    <Tabs.Panel id="home">Tab content for Home</Tabs.Panel>
    <Tabs.Panel id="profile">Tab content for Profile</Tabs.Panel>
    <Tabs.Panel id="contact">Tab content for Contact</Tabs.Panel>
</Tabs.Container>
```
