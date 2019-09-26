import React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsProvider } from '../src/index';
import { FacetedSearch, FacetedSearchConstants } from '../src/FacetedSearch';

// "operator": {
//     "label": "Equals",
//     "name": "=",
//     "iconName": "equal"
//   },
//   "operators": [
//     {
//       "label": "Contains",
//       "name": "contains",
//       "iconName": "contains"
//     },
//     {
//       "label": "Equals",
//       "name": "=",
//       "iconName": "equal"
//     }
//   ],

const badgeName = {
	properties: {
		attribute: 'name',
		initialOperatorOpened: false,
		initialValueOpened: false,
		label: 'Name',
		operator: {},
		operators: [],
		type: 'text',
		value: '',
	},
	metadata: {
		badges_per_facet: 'N',
		entities_per_badge: '1',
		operators: ['contains', '='],
		badgeId: 'name-b58378a8-b47d-4d8a-9501-46916401cbb0',
	},
};

storiesOf('Faceted search', module)
	.addDecorator(story => (
		<div>
			<IconsProvider />
			<h1>Faceted Search</h1>
			{story()}
		</div>
	))
	.add('default', () => (
		<div>
			<p>A faceted search with badge and advanced search.</p>
			<FacetedSearch.Faceted id="faceted-search" >
				{currentFacetedMode =>
					(currentFacetedMode === FacetedSearchConstants.FACETED_MODE.ADVANCED && (
						<FacetedSearch.AdvancedSearch
							onSubmit={jest.fn()}
						/>
					)) ||
					(currentFacetedMode === FacetedSearchConstants.FACETED_MODE.BASIC && (
						<FacetedSearch.BasicSearch
							badgesDefinitions={[badgeName]}
							onSubmit={jest.fn()}
						/>
					))
				}
			</FacetedSearch.Faceted>
		</div>
	));
