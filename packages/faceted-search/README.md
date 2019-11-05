# NOT UP TO DATE

# Faceted search

Faceted search module allows you to add a feature to filter a collection through a backend query.

## Components

### FacetedSearchIcon

Simple button icon switch, trigger a callback on click.

 | Props  | Type  | Info
|---|---|---|
| active  | boolean | The icon is activated or not |
| id | string | This is an action you have to pass an id
| label | string | Label displayed on hover
| onClick | function  | Callback when the button is trigger

---
### FacetedSearch

The wrapper component of the feature. 
It will directly instantiate the manager and the toolbar.
You will have two modes the basic and the advanced one.
The component holds the state of the mode displayed.
If you have a standard use case, it's the one you need.
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

The manager goal is to create the context of the faceted search.
It shares some value between the two faceted mode.

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
| id  | string | The id that will be shared to all chilren components |
| inProgress  | boolean | Indicates if the query call is in progress |
| t | function  | I18n translate function

---
### FacetedToolbar

This is the toolbar component, where you have the choosen display mode and the switch buttons.
The content of the toolbar take a children, so it allows you the possibility to deeply customize the rendered component.
The display mode have to be controlled. That means you have to pass a handler and the display mode you want.
In a standard use, the FacetedSearch component handles the logic behind the displayed mode.

 | Props  | Type  | Info
|---|---|---|
| children  | React element | children that will be render |
| id | string | The id that will be shared to all children components
| facetedMode | string  | You can choose between 'basic' and 'advanced'
| onChangeFacetedMode | func  | Callback trigger on the switch buttons. Return either 'basic' or 'advanced' value
| t | func | i18n translate function

---
###BasicSearch

This the search with badges. All the logical behavior of badges are embeded in this component. You have to feed him with some badges definition (see api)
It holds a hook, the useFacetedBadges and the useBadgeFactory (see hooks).
You can add custom operators and custom badges.
You also can give initial badges that will be mount at startup and a callback to synchronize the badges transformation with a parent.
It also init the provider of the badgeFaceted context (see hooks).

 | Props  | Type  | Info
|---|---|---|
| badgesDefinitionsRawData | badgesDefinitionsRawDataPropTypes | payload of badges definition |
| customFacetedBadges | object | a dictionary of new badges you want to display
| customOperators | object | a dictionary of new operators you want to display
| initialFacetedBadges | facetedBadgesPropTypes  | the badges mounted at startup
| onSubmit | func | callback trigger when submitting badges
| setFacetedBadges | func | callback trigger whenever the badges state change

---
###BadgesGenerator

You have to provide him with an array of badges (see struct) and a a function to get the correct badge (normaly the one given by the badgeFactory hooks).
From the badge definition it will instanciate a proper component with some new props.

 | Props  | Type  | Info
|---|---|---|
| badges | facetedBadgesPropTypes | faceted badges definition object |
| getBadge | func | get the component function from a id or name
| t | func | i18n translate function

---
###BadgeFaceted
This is the component backbone of every faceted badges. It always creates a badge (base on ui/badges) with a category, an operator, a value overlay button with a custom popover and finaly a delete action represents by a cross.
The custom popover is render props passing the handlers as parameters.
All the event handler of a badge are defined here.
It consumes the useFacetedBadges hook.

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



