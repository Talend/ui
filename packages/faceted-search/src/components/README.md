# Faceted search components

### Table of Contents

1. Main components  
   a. [AddFacetPopover](#AddFacetPopover)  
   b. [AdvancedSearch](#AdvancedSearch)  
   c. [BasicSearch](#BasicSearch)  
   d. [FacetedManager](#FacetedManager)  
   e. [FacetedSearch](#FacetedSearch)  
   f. [FacetedSearchIcon](#FacetedSearchIcon)  
   g. [FacetedToolbar](#FacetedToolbar)
2. Badges
   a. [BadgeText](#BadgeText)
   b. [BadgeNumber](#BadgeNumber)
   c. [BadgeCheckboxes](#BadgeCheckboxes)
3. Badges api
   a. [BadgeOperatorOverlay](#BadgeOperatorOverlay)  
   b. [BadgesGenerator](#BadgesGenerator)  
   c. [BadgeFaceted](#BadgeFaceted)  
   d. [BadgeOverlay](#BadgeOverlay)
4. Context
   a. [FacetedSearchContext](#FacetedSearchContext)  
   b. [BadgeFacetedContext](#BadgeFacetedContext)
5. [Structure and PropTypes](##Structure and PropTypes)
   a. [BadgeDefinition](#BadgeDefinition)

## Main components

### AddFacetPopover

Popover used in the BasicSearch.
It displayed all the **available badges**, on click, a **badge is created** and the badge operator popover is opened.
You can apply a **filter** on the badges.

| Props              | Type                   | Info                                       |
| ------------------ | ---------------------- | ------------------------------------------ |
| badgesDefinitions  | badgesFacetedPropTypes | badges available in the popover            |
| id                 | string                 | id                                         |
| initialFilterValue | string                 | the initial value in the input text filter |
| onClick            | func                   | callback trigger when a row is clicked     |
| t                  | func                   | i18n translate function                    |

### AdvancedSearch

The advanced search enable a **text input** field where the user can directly enter a query.

| Props        | Type   | Info                                                                  |
| ------------ | ------ | --------------------------------------------------------------------- |
| dataFeature  | string | value of data-feature attributes                                      |
| initialQuery | string | the query use at first render                                         |
| onCancel     | func   | callback on the red cross icon                                        |
| onChange     | func   | callback when value change, controlled mode only                      |
| onKeyDown    | func   | callback at user input in input text                                  |
| placeholder  | string | placeholder in the text input ('Enter your query")                    |
| onSubmit     | func   | callback when user hit the enter keyboard or click on the green cross |

---

### BasicSearch

This is **search with badges**.
All the **logical behavior** of badges is embedded in this component ([facetedBadges.hook](#facetedBadges.hook)).  
You have to feed him with some **badges definitions** to allow the creation and the CRUD manipulation of badges.
It triggers a submit every time the badges change.  
Init the **badgeFaceted context** (see [BadgeFacetedContext](#BadgeFacetedContext)).

| Props                     | Type                              | Info                                                                    |
| ------------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| badgesDefinitions         | badgesFacetedPropTypes            | payload of badges definition                                            |
| badgesFaceted             | { badges: badgesFacetedPropTypes} | available badges                                                        |
| customBadgesDictionary    | object                            | a dictionary of new badges                                              |
| customOperatorsDictionary | operatorsPropTypes                | a dictionary of custom operators                                        |
| initialFilterValue        | string                            | filter value at first render of the [AddFacetPopover](#AddFacetPopover) |
| onSubmit                  | func                              | callback trigger when badges change                                     |
| setFacetedBadges          | func                              | callback trigger to sync the badges at every state change               |

---

### FacetedManager

It **shares** some value between the **two faceted mode**.

| Props      | Type          | Info                         |
| ---------- | ------------- | ---------------------------- |
| children   | React element | children that will be render |
| error      | string        | error returns by query call  |
| id         | string        | id shared to all children    |
| inProgress | bool          | indicates query progress     |

Theses values are shared through the context

---

### FacetedSearch

The **main component** of the feature.
It will directly instantiate the **manager** and the **toolbar**.
Use childrenAsProps pattern to pass the current display mode.

| Props          | Type   | Info                                                            |
| -------------- | ------ | --------------------------------------------------------------- |
| children       | func   | render props with current faceted mode as parameter             |
| error          | string | error returns by query call                                     |
| id             | string | id shared to all children                                       |
| facetedMode    | string | mode display at first render                                    |
| inProgress     | bool   | indicates query progress                                        |
| setFacetedMode | func   | function to set the faceted mode if it's a controlled component |

---

### FacetedSearchIcon

Simple **button icon** switch.

| Props   | Type     | Info                            |
| ------- | -------- | ------------------------------- |
| active  | boolean  | icon is activated or not        |
| loading | boolean  | display skeleton if true        |
| onClick | function | Callback when button is clicked |

---

### FacetedToolbar

The toolbar show the chosen **display mode** and the **switch buttons**.

| Props               | Type   | Info                                                                          |
| ------------------- | ------ | ----------------------------------------------------------------------------- |
| children            | any    | children that will be render                                                  |
| id                  | string | id                                                                            |
| facetedMode         | string | You can choose between 'basic' and 'advanced'                                 |
| onChangeFacetedMode | func   | Callback when user click on button. Return either 'basic' or 'advanced' value |
| t                   | func   | i18n translate function                                                       |

---

## Badges

Most badges will have props like this

| Props                 | Type               | Info                                  |
| --------------------- | ------------------ | ------------------------------------- |
| id                    | string             | id                                    |
| label                 | string             | label displayed on the left side      |
| initialOpenedOperator | bool               | show / hide operator popover at mount |
| initialOpenedValue    | bool               | show / hide value popover at mount    |
| operator              | operatorPropTypes  | current operator                      |
| operators             | operatorsPropTypes | list of operators                     |
| size                  | string             | button icon size "small large"        |
| value                 | string             | value displayed in the textarea       |
| t                     | func               | i18n translate function               |

### BadgeText

A badge with a **text area**.

| Default Operators | implemented |
| ----------------- | ----------- |
| contains          | DONE        |
| endWidth          | TO DO       |
| equals            | DONE        |
| notContains       | TO DO       |
| notEquals         | TO DO       |
| regExp            | TO DO       |
| startWidth        | DONE        |

### BadgeNumber

A badge with a **input** number.

| Default Operators   | implemented |
| ------------------- | ----------- |
| equals              | DONE        |
| GreaterThan         | DONE        |
| GreaterThanOrEquals | DONE        |
| LessThan            | DONE        |
| LessThanOrEquals    | DONE        |
| notEquals           | DONE        |

### BadgeCheckBoxes

A badges with **checkboxes**

| Default Operators | implemented |
| ----------------- | ----------- |
| in                | DONE        |

## Badges API

### BadgeOperatorOverlay

This badge is a **specialization of BadgeOverlay**.
The operator button display a popover, you can select a new operator by clicking on the corresponding row.

| Props            | Type               | Info                                                                                 |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------ |
| id               | string             | id                                                                                   |
| onClick          | func               | triggers on operator click, return operator name and a callback to close the popover |
| onChangeOverlay  | func               | triggers on show / hide overlay                                                      |
| onHideOverlay    | func               | triggers when popover is hiding                                                      |
| opened           | bool               | hide / show popover                                                                  |
| operatorIconName | string             | operator icon displayed in the button                                                |
| operatorLabel    | string             | operator label used as label for the button                                          |
| operators        | operatorsPropTypes | operators shown in the popover                                                       |
| size             | string             | button icon size "small large"                                                       |
| t                | func               | i18n translate function                                                              |

                                                             |

---

### BadgesGenerator

From an array of badges definition, the component generates badges.
You have to provide the badges dictionary and the function to access it.

| Props            | Type                   | Info                                                 |
| ---------------- | ---------------------- | ---------------------------------------------------- |
| badges           | facetedBadgesPropTypes | faceted badges definition                            |
| badgesDictionary | object                 | dictionary full of badges                            |
| getBadgeFromDict | func                   | take a badges dictionary and a key, return the badge |
| t                | func                   | i18n translate function                              |

---

### BadgeFaceted

The generic component at the based of **all badges**.  
Create a badge (base on ui/badges) with a **category**, an **operator**, a **value** button which open a custom **popover**,
and a **delete action** represents by a cross.  
Popover flow mechanics is handle by [BadgeOpenedOverlayFlow](#BadgeOpenedOverlayFlow).

| Props                 | Type               | Info                                         |
| --------------------- | ------------------ | -------------------------------------------- |
| badgeId               | string             | unique id for each badge                     |
| children              | func               | popover render props                         |
| labelCategory         | string             | left badge label                             |
| labelValue            | string             | right badge label                            |
| id                    | string             | id                                           |
| initialOpenedOperator | bool               | hide / show popover operator at first render |
| initialOpenedValue    | bool               | hide / show popover value at first render    |
| operator              | operatorPropTypes  | current operator                             |
| operators             | operatorsPropTypes | all operators                                |
| value                 | any                | from value                                   |
| size                  | string             | button icon size "small large"               |
| t                     | func               | i18n translate function                      |

---

### BadgeOverlay

Create a **button icon** with a **popover**.
Depending on props the button will be a icon, a label or "+ Add Filter".  
Worked in **uncontrolled mode**.
Render the **children** you pass as a React.element or as a function if you need to access the opened value outside.

| Props         | Type                      | Info                                                 |
| ------------- | ------------------------- | ---------------------------------------------------- |
| children      | function or React.element | popover content                                      |
| className     | string                    | style the wrapper div                                |
| hasAddButton  | string                    | render the button "+ Add Filter"                     |
| hideLabel     | bool                      | hiding button label                                  |
| iconName      | string                    | icon to display                                      |
| label         | string                    | button label (used for aria-label).                  |
| initialOpened | bool                      | show / hide popover at first render                  |
| id            | string                    | id                                                   |
| onChange      | func                      | trigger when the button is clicked (controlled mode) |
| onHide        | func                      | trigger when the popover is hiding (controlled mode) |
| opened        | bool                      | value show / hide (controlled mode)                  |
| placement     | string                    | tooltip placement "top, bottom, right, left"         |
| rootClose     | bool                      | close popover when outside click                     |

##Context

### FacetedSearchContext

The **provider** is mount by the **FacetedSearch** component and **consume** in **BasicSearch** and **AdvancedSearch**.
| Values | Type | Info |
| ---------- | ------ | ------------------------------------------- |
| error | string | if the query returns an error |
| id | string | shared the id between the components |
| inProgress | bool | indicates if the query is still in progress |
| t | func | i18n translate func |

---

### BadgeFacetedContext

The **provider** is mount by the **BasicSearch** component and **consume** in **BadgeFaceted**.
It shares the badges state and CRUD actions.

| Values   | Type | Info                                          |
| -------- | ---- | --------------------------------------------- |
| state    | obj  | state of useFacetedBadges hook                |
| dispatch | func | dispatch CRUD action to useFacetedBadges hook |
| onSubmit | func | callback triggered when a badge is submit     |

## Structure and PropTypes

### BadgeDefinition

Properties must be filled.
Metadata can store custom values.

```
{
	properties: {
		attribute: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		initialOperatorOpened: PropTypes.bool,
		initialValueOpened: PropTypes.bool,
		operator: operatorPropTypes,
		operators: operatorsPropTypes,
		type: PropTypes.string.isRequired,
	},
	metadata: {
		badgeId: PropTypes.string, // filled at creation
		badgePerFacet: PropTypes.string,
		entitiesPerBadge: PropTypes.string,
		isInCreation: PropTypes.bool,
		operators: PropTypes.arrayOf(PropTypes.string),
        ...
	},
}
```
