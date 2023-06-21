---
'@talend/design-system': major
---

chore: remove reakit

* Rewrite components without reakit
* use `@floating-ui/react` for tooltip, popover

Breaking changes:
* HTML structure as a result may have changed
* Some passed props from our component to reakit and not documented as a usage as been removed. If you need a different usage let us knwow
