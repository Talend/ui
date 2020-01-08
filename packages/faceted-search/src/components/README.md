# Faceted search components

### Table of Contents
1. [Main components](#Main components)  
	a. [AddFacetPopover](#AddFacetPopover)  
	b. [AdvancedSearch](#AdvancedSearch)  
	c. [BasicSearch](#BasicSearch)  
	d. [FacetedManager](#FacetedManager)  
	e. [FacetedSearch](#FacetedSearch)  
	f. [FacetedSearchIcon](#FacetedSearchIcon)  
	g. [FacetedToolbar](#FacetedToolbar)  
2. [Badges components](#Badges components)  
	a. [BadgeOperatorOverlay](#BadgeOperatorOverlay)  
	b. [BadgeText](#BadgeText)  
3. [Badges toolbox](#Badges toolbox)  
	a. [BadgesGenerator](#BadgesGenerator)  
	b. [BadgeFaceted](#BadgeFaceted)  
	c. [BadgeOverlay](#BadgeOverlay)  
3. [Hooks](#Hooks)  
	a. [BadgeFactory](#BadgeFactory)  
	b. [FacetedBadgesManager](#FacetedBadgesManager)  
	c. [BadgeOpenedOverlayFlow](#BadgeOpenedOverlayFlow)  
4. [Context](#Context)  
	a. [FacetedSearchContext](#FacetedSearchContext)  
	b. [BadgeFacetedContext](#BadgeFacetedContext)  
5. [Structure and PropTypes](##Structure and PropTypes)  

## Main components

### AddFacetPopover

Popover used in the BasicSearch.
It displayed all the **available badges**, on click, a **badge is created** and the badge operator popover is opened.
You can apply a **filter** on the badges.

| Props  | Type  | Info
|---|---|---|
| badgesDefinitions | badgesFacetedPropTypes | badges available in the popover |
| id | string | id |
| initialFilterValue | string | the initial value in the input text filter
| onClick | func | callback trigger when a row is clicked
| t | func | i18n translate function

### AdvancedSearch
The advanced search enable a **text input** field where the user can directly enter a query.
It holds internally the state of the query but you can pass a bunch of **handler to take control**.
And it consumes the **facetedSearch context** (see [FacetedSearchContext](#FacetedSearchContext)). 

 | Props  | Type  | Info
|---|---|---|
| initialQuery | string | the query use in state at mount |
| onCancel | func | callback trigger when the user click on the red cross icon
| onChange | func | callback trigger when the value change, useful only in controlled mode
| onKeyDown | func  | callback trigger during each user input
| placeholder | string | placeholder in the text input ('Enter your query")
| onSubmit | func | callback trigger when user hit the enter keyboard or click on the green cross

---


### FacetedSearchIcon

Simple **button icon** switch, trigger a callback on click.

 | Props  | Type  | Info
|---|---|---|
| active  | boolean | The icon is activated or not |
| id | string | This is an action you have to pass an id
| label | string | Label displayed on hover
| onClick | function  | Callback when the button is trigger

---

### FacetedSearch

The **wrapper component** of the feature. 
It will directly instantiate the **manager** and the **toolbar**.
You will have two modes the **basic** and the **advanced** one.
The component holds the state of the mode displayed.
If you have a **standard use case**, it's the one you need.
The children must be a function.

 | Props  | Type  | Info
|---|---|---|
| children  | func | render props with current faceted mode as parameter  |
| error | string | The error send by the query call if there was an error
| id | string | The id that will be shared to all children components
| initialFacetedMode | string  | You can choose between 'basic' and 'advanced'
| inProgress | bool  | Indicates if the query call is in progress

---

### FacetedManager

The manager goal is to create the **context** of the **faceted search**.
It **shares** some value between the **two faceted mode**.

 | Props  | Type  | Info
|---|---|---|
| children  | React element | children that will be render |
| error | string | The error send by the query call if there was an error
| id  | string | The id that will be shared to all children components |
| inProgress  | boolean | Indicates if the query call is in progress |

The values passed in the context are :

 | Context  | Type  | Info
|---|---|---|
| error | string | The error send by the query call if there was an error
| id  | string | The id that will be shared to all children components |
| inProgress  | boolean | Indicates if the query call is in progress |
| t | function  | I18n translate function

---

### FacetedToolbar

This is the toolbar component, where you have the chosen **display mode** and the **switch buttons**.
The content of the toolbar take a **children**, so it allows you the possibility to **deeply customize** the rendered component.
The display mode have to be **controlled**. That means you have to pass a handler and the display mode you want.
In a standard use, the FacetedSearch component handles the logic behind the displayed mode.

 | Props  | Type  | Info
|---|---|---|
| children  | React element | children that will be render |
| id | string | The id that will be shared to all children components
| facetedMode | string  | You can choose between 'basic' and 'advanced'
| onChangeFacetedMode | func  | Callback trigger on the switch buttons. Return either 'basic' or 'advanced' value
| t | func | i18n translate function

---

### BasicSearch

This the **search with badges**. 
All the **logical behavior** of badges are **embedded** in this component. 
You have to feed him with some **badges definition**.
A **button icon** allows to **add badges**.
It holds hooks, the **useFacetedBadges** and the **useBadgeFactory** (see [FacetedBadgesManager](#FacetedBadgesManager) and [BadgeFactory](#BadgeFactory)).
You can add **custom operators** and **custom badges**.
You also can give **initial badges** that will be mount at startup and a callback to synchronize the badges transformation with a parent.
It init the **provider** of the **badgeFaceted context** (see [BadgeFacetedContext](#BadgeFacetedContext)).
And it consumes the **facetedSearch context** (see [FacetedSearchContext](#FacetedSearchContext)). 

 | Props  | Type  | Info
|---|---|---|
| badgesDefinitionsRawData | badgesDefinitionsRawDataPropTypes | payload of badges definition |
| customFacetedBadges | object | a dictionary of new badges you want to display
| customOperators | object | a dictionary of new operators you want to display
| initialFacetedBadges | facetedBadgesPropTypes  | the badges mounted at startup
| onSubmit | func | callback trigger when submitting badges
| setFacetedBadges | func | callback trigger whenever the badges state change

---

## Badges components

### BadgeOperatorOverlay
This badge is a **specialization of BadgeOverlay**.
It display a button operator icon, on click a popover is shown with a list of operator button rows. 
If a row is triggered the popover closed and the button icon is update with the new operator.

| Props  | Type  | Info
|---|---|---|
| id | string | id propagate to subComponent |
| onClick | func | callback trigger when an operator row is clicked, return the name of the operator and a function used to close the popover |
| onChangeOverlay | func | callback trigger when to hide / hide the overlay
| onHideOverlay | func | callback trigger when the popover is hiding
| opened | bool | hide / show the popover
| operatorIconName | string | the operator icon used for the button
| operatorLabel | string | the operator label used as label for the button
| operators | operatorsPropTypes | operators shown in the popover
| size | string | change the size of the icon button "small large"

---

### BadgeText

A faceted badge with a **text area** as input.

| Default Operators |
|---|
| equals |
| notEquals |
| contains |
| notContains |
| startWidth |
| endWidth |
| regExp |

| Props  | Type  | Info
|---|---|---|
| category | string | label displayed on the left side |
| id | string | id |
| initialOpenedOperator | bool | show / hide value of the operator popover at mount
| initialOpenedValue | bool | show / hide value of the value popover at mount
| operator | operatorPropTypes | the current chosen operator
| operators | operatorsPropTypes | list of operators displayed in the operator popover
| size | string |  change the size of the icon button "small large"
| value | string | value displayed in the textarea
| t | func | i18n translate function


## Badges toolbox

### BadgesGenerator

You have to provide him with an **array of badges** and a a function to get the correct badge (normally the one given by the **badgeFactory** hooks).
From the badge definition it will **instantiate** a proper component with some new props.

 | Props  | Type  | Info
|---|---|---|
| badges | facetedBadgesPropTypes | faceted badges definition object |
| getBadge | func | get the component function from a id or name
| t | func | i18n translate function

---

### BadgeFaceted
This is the component **backbone** of every faceted **badges**. 
It always **create a badge** (base on ui/badges) with a **category**, an **operator**, a **value overlay button** with a custom **popover**,
and finally a **delete action** represents by a cross.
The custom popover is a render props passing the handlers as parameters.
**All** the event **handlers** of a badge are defined **here**.
It consumes the **useFacetedBadges** hook (see [BadgeFacetedContext](#BadgeFacetedContext)),
and the **useBadgeOpenedOverlayFlow** (see [BadgeOpenedOverlayFlow](#BadgeOpenedOverlayFlow)).

 | Props  | Type  | Info
|---|---|---|
| badgeId | string | unique id for each badge |
| category | string | label displayed on the left of the badge |
| children | func | render props passing onSubmit, onChangeValue, badgeValue
| id | string | an id
| label | string | label displayed on the right of the badge, the value.
| initialOpenedOperator | bool | hide / show at mounting the popover operator
| initialOpenedValue | bool | hide / show at mounting the popover value
| operator | operatorPropTypes | the current operator of the badge
| operators | operatorsPropTypes | the list of all possible operators for this bade
| value | any | the input value (popover form)
| size | string | size of the badge either large or small
| t | func | i18n translate function

---

### BadgeOverlay

It creates a **button icon** which on trigger render a **popover**.
It can work in a **uncontrolled mode**, where the opening of the popover is none of your concert or in a complete **controlled mode**.
The popover is fully **customizable**. It will render the **children** you pass as a React.element or as a function if you need to access the opened value outside.

| Props  | Type  | Info
|---|---|---|
| children | function or React.element | unique id for each badge |
| className | string | class passed to the wrapper div |
| hideLabel | bool | hiding the label of the button
| iconName | string | the name of the icon to display
| label | string | label of the button (used for aria-label).
| initialOpened | bool | at mount set the popover show / hide
| id | string | the id passed to the subComponents
| onChange | func | callback trigger when the button is clicked (controlled mode)
| onHide | func | callback trigger when the popover is hiding (controlled mode)
| opened | bool | value show / hide (controlled mode)
| placement | string | placement of the tooltip "top, bottom, right, left"
| rootClose | bool | if true any click outside the popover will close it

##Hooks

###BadgeFactory

This hook helps you to **generate** new **badges** and **operators**.
It returns a **tuple** of **two functions**, one to get the badges, **getBadgeFacetedComponent** and the other one to get the operators, **getMatchingOperators**.
You can pass your own **custom** badges and operators, they will be added to the **default** ones.

---

###FacetedBadgesManager

It helps you handling the **management** of **badges**. 
It **provides** a real **CRUD** operations around a **collection** of **badges**.
You can pass an **initial collection** of badges
It **returns** an **object** with a set of **CRUD** function and the badges **collection**.

---

###BadgeOpenedOverlayFlow

It provides some function to help you **manage** the **flow** of the **operator** and **value overlay** of each faceted **badge**.
You can **initialize** the value hide (false) / show (true) of each overlay with **initialOperator** and **initialValue**.
It **returns** a object full of functions **hideOperator, hideValue ...** and the values **operatorOpened** and **valueOpened**

##Context

###FacetedSearchContext
The **provider** is mount by the **FacetedSearch** component and **consumer** in **BasicSearch** and **AdvancedSearch**.
It helps **share** info between the **basic** and the **advanced** search component.

| Values  | Type  | Info
|---|---|---|
| error | string | if the query returns an error |
| id | string | shared the id between the components |
| inProgress | bool | indicates if the query is still in progress |
| t | func | i18n translate func

---

###BadgeFacetedContext
Since there is some abstraction to instantiate the BadgeGenerator and some component layers, this context has been created to **avoid too much props drilling**.
This context helps **shared** some **event handler** to the **faceted badge**.
So the **provider** is set in the **BasicSearch** and **consumer** in **BadgeFaceted**.

| Values  | Type  | Info
|---|---|---|
| onDeleteBadge | func | callback triggered when a badge is deleted |
| onHideOperator | func | callback triggered when the overlay operator is hiding |
| onSubmitBadge | func | callback triggered when a badge is submit |

##Structure and PropTypes
**UNDER CONSTRUCTION**