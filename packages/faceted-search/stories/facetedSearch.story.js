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

const badgeConnectionType = {
	properties: {
		attribute: 'connection.type',
		initialOperatorOpened: true,
		initialValueOpened: false,
		label: 'Connection type',
		operator: {},
		operators: [],
		type: 'select',
	},
	metadata: {
		badges_per_facet: '1',
		entities_per_badge: 'N',
		operators: ['contains'],
	},
};

const badgesDefinitions = [badgeName, badgeConnectionType];

storiesOf('FacetedSearch', module)
	.addDecorator(story => (
		<div>
			<IconsProvider />
			<h1>Faceted Search</h1>
			{story()}
		</div>
	))
	.add('default', () => (
		<div>
			<IconsProvider />
			<FacetedSearch.Faceted id="my-faceted-search">
				{currentFacetedMode =>
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.ADVANCED && (
						<FacetedSearch.AdvancedSearch onSubmit={action('onSubmit')} />
					)) ||
					(currentFacetedMode === FacetedSearch.constants.FACETED_MODE.BASIC && (
						<FacetedSearch.BasicSearch
							badgesDefinitions={badgesDefinitions}
							onSubmit={action('onSubmit')}
						/>
					))
				}
			</FacetedSearch.Faceted>
		</div>
	));
