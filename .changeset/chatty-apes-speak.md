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
* Tabs (rewrite + props changed)
* Tooltip (rewrite using `@floating-ui/react` + API Change)
* VisuallyHidden (rewrite)


**Migration Guide**

* Checkbox component

    Checkbox has two versions now : controlled one and uncontrolled one.
    To use controlled version, import Checkbox component and provide `checked` and `onChange` props.
    To use uncontrolled version, import UncontrolledCheckbox component and optionally provide `defaultChecked` prop.

    We also change way to import it to be less verbose.

    Old use
    ```
    import { Form } from '@talend/design-system';
    (...)
    <Form.Checkbox (...) />
    ```

    New use
    ```
    import { Checkbox, UncontrolledCheckbox } from '@talend/design-system';
    (...)
    <Checkbox checked={isChecked} onChange={changeHandler} (...) />
    <UncontrolledCheckbox defaultChecked={isChecked} (...) />
    ```

* ToggleSwitch component

    ToggleSwitch has two versions now : controlled one and uncontrolled one.
    To use controlled version, import ToggleSwitch component and provide `checked` and `onChange` props.
    To use uncontrolled version, import UncontrolledToggleSwitch component and optionally provide `defaultChecked` prop.

    We also change way to import it to be less verbose.

    Old use
    ```
    import { Form } from '@talend/design-system';
    (...)
    <Form.ToggleSwitch (...) />
    ```

    New use
    ```
    import { ToggleSwitch, UncontrolledToggleSwitch } from '@talend/design-system';
    (...)
    <ToggleSwitch checked={isChecked} onChange={changeHandler} (...) />
    <UncontrolledToggleSwitch defaultChecked={isChecked} (...) />
    ```

* Switch component

    `onChange` prop's signature change from
    ```
    (event: React.MouseEvent<HTMLButtonElement>, value: string) => void
    ```
    to
    ```
    (value: string) => void
    ```

