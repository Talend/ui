# Faceted search components

### Table of Contents

1. Hooks  
   a. [badgeOpenedOverlayFlow](#badgeOpenedOverlayFlow)  
   b. [facetedBadges](#facetedBadges)

### badgeOpenedOverlayFlow

Handle the popover / overlay flow.

| Params                | Type | Info                                         |
| --------------------- | ---- | -------------------------------------------- |
| initialOperatorOpened | bool | show / hide operator popover at first render |
| initialValueOpened    | bool | show / hide value popover at first render    |

| Return                  | Type | Info                                                |
| ----------------------- | ---- | --------------------------------------------------- |
| state                   | obj  | current state of reducer                            |
| dispatch                | func | dispatch an action                                  |
| onChangeOperatorOverlay | func | show / hide the operator overlay depending on state |
| onChangeValueOverlay    | func | show / hide the value overlay depending on state    |

### facetedBadges

Handle the **management** of **badges**.

| Params           | Type | Info                                                                        |
| ---------------- | ---- | --------------------------------------------------------------------------- |
| externalState    | obj  | with key "badges" displayed at first render                                 |
| setExternalState | func | callback trigger every time the badges state change, passing state as param |

| Return   | Type | Info                           |
| -------- | ---- | ------------------------------ |
| state    | obj  | current state of reducer       |
| dispatch | func | dispatch CRUD action on badges |

---
