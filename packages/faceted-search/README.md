# ui-faceted-search# Faceted search

## Installation

Add npm package

`yarn add @talend/react-faceted-search`

## General

Faceted has two mode, Basic and Advanced.  
You have to import the component FacetedSearch in your app.  
If you are using the two modes the implementation should look like this :

```
<FacetedSearch.Faceted id="my-faceted-search">
  {currentFacetedMode =>
    (currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
      <FacetedSearch.AdvancedSearch
        onSubmit={() => console.log('onSubmit')}
      />
    )) ||
    (currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
      <FacetedSearch.BasicSearch
        badgesDefinitions={badgesDefinitions}
        onSubmit={() => console.log('onSubmit')}
      />
    ))
  }
</FacetedSearch.Faceted>

```

Each mode take its own onSubmit callback if you need different behavior.

## Basic search

The BasicSearch search will only handle for you the badges management (CRUD).
You have to provide the onSubmit callback, which return the current badges.  
Be aware that onSubmit is trigger on each change of local state badges, even if this one is empty.
A badge is defined by a 'badgeDefinition' :

```
	properties: {
		attribute: name,
		initialOpenedOperator: false,
		initialOpenedValue: false,
		label: '',
		operator: {},
		operators: [],
		type: '',
	},
	metadata: {
		badgeId: '',
		badgesPerFacet: 1,
		entitiesPerBadge: 'N',
    ...
	},
```

      <FacetedSearch.BasicSearch
        badgesDefinitions={badgesDefinitions}
      />

If you need to save the badges in the local storage or the store you will have to handle the badges synchronization.  
Your parent component must passed badgesFaceted (to restore the saved badges) and a setBadgesFaceted props callback which will be trigger every time a badge will change and sync it with your parent (CRUD).

```
	<FacetedSearch.BasicSearch
		badgesDefinitions={badgesDefinitions}
		badgesFaceted={window.localStorage.getItem('myBadges')}
		setBadgesFaceted={
      basicSearchBadges => window.localStorage.setItem('myBadges', basicSearchBadges))}
	/>
```

## Advanced search

The advanced search is a free text input.  
To send the request the user have to press enter or to click on the validate icon.

## Tql

There is no coupling between the output's data send in the submit callback and the request send to the backend api.  
You will receive the current badges state.  
If you want to use tql (Talend query language) you should use the function given in the tql file

```
import { createTqlQuery } from './tql.js'
const tqlQuery = createTqlQuery(facetedSubmitOutput);
```

If for any reason you need to use another query language, you will have to create your own badges transformer.
