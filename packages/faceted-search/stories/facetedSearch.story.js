import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import FacetedSearch from '../src';

const badgeName = {
	properties: {
		attribute: 'name',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Name',
		operator: {},
		operators: [],
		type: 'text',
	},
	metadata: {
		badges_per_facet: 'N',
		entities_per_badge: '1',
		operators: ['contains', '='],
	},
};

storiesOf('FacetedSearch', module).add('default', () => (
	<div>
		<IconsProvider />
		<FacetedSearch.Faceted id="my-faceted-search">
			{currentFacetedMode =>
				(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
					<FacetedSearch.AdvancedSearch onSubmit={action('onSubmit')} />
				)) ||
				(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
					<FacetedSearch.BasicSearch
						badgesDefinitions={[badgeName]}
						onSubmit={action('onSubmit')}
					/>
				))
			}
		</FacetedSearch.Faceted>
	</div>
));
