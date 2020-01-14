import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import FacetedSearch from '../src';
import { FacetedSearchIcon } from '../src/components/FacetedSearchIcon';

import { badgeName, badgeConnectionType, badgePrice } from './badgesDefinitions.story';

const badgesDefinitions = [badgeName, badgeConnectionType, badgePrice];
const lotsOfBadgesDefinitions = [];
let i = 0;
while (i < 50) {
	lotsOfBadgesDefinitions.push(badgeName);
	i += 1;
}

const paddingLeft = { paddingLeft: '10px' };

storiesOf('FacetedSearch', module)
	.addDecorator(story => (
		<div style={{ ...paddingLeft }}>
			<IconsProvider />
			<h1>Faceted Search</h1>
			{story()}
		</div>
	))
	.add('icon default, active and loading', () => (
		<div>
			<div style={{ display: 'flex' }}>
				<span style={{ ...paddingLeft }}>
					<FacetedSearchIcon loading onClick={action('onClick')} />
				</span>
				<span style={{ ...paddingLeft }}>
					<FacetedSearchIcon active onClick={action('onClick')} />
				</span>
				<span style={{ ...paddingLeft }}>
					<FacetedSearchIcon onClick={action('onClick')} />
				</span>
			</div>
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
	))
	.add('lots of badges definitions', () => (
		<div style={{ height: '5.5rem' }}>
			<IconsProvider />
			<FacetedSearch.Faceted id="my-faceted-search">
				<FacetedSearch.BasicSearch
					badgesDefinitions={lotsOfBadgesDefinitions}
					onSubmit={action('onSubmit')}
				/>
			</FacetedSearch.Faceted>
		</div>
	));
