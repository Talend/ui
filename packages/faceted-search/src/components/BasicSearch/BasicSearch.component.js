import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTheme } from '@talend/react-components/lib/theme';
import get from 'lodash/get';

import { AddFacetPopover } from '../AddFacetPopover';
import { BadgeOverlay } from '../Badges';
import { BadgesGenerator } from '../BadgesGenerator';
import { generateBadge } from '../types/badgeDefinition.type';
import { useFacetedSearchContext } from '../context/facetedSearch.context';
import { BadgeFacetedProvider } from '../context/badgeFaceted.context';

import { createBadgesDict, getBadgesFromDict } from '../../dictionary/badge.dictionary';
import { createOperatorsDict, getOperatorsFromDict } from '../../dictionary/operator.dictionary';
import { useFacetedBadges, BADGES_ACTIONS } from '../../hooks/facetedBadges.hook';
import { badgesFacetedPropTypes, operatorsPropTypes } from '../facetedSearch.propTypes';

import theme from './BasicSearch.scss';

const css = getTheme(theme);

const isDirty = badge => badge.metadata.dirty;

const BasicSearch = ({
	badgesDefinitions,
	badgesFaceted,
	customBadgesDictionary,
	customOperatorsDictionary,
	initialFilterValue,
	onSubmit,
	setBadgesFaceted,
}) => {
	const { id, t } = useFacetedSearchContext();
	const operatorsDictionary = useMemo(() => createOperatorsDict(t, customOperatorsDictionary));
	const badgesDictionary = useMemo(() => createBadgesDict(customBadgesDictionary));
	const [state, dispatch] = useFacetedBadges(badgesFaceted, setBadgesFaceted);

	useEffect(() => {
		if (!state.badges.some(isDirty)) {
			onSubmit({}, state.badges);
		}
	}, [state.badges, onSubmit]);

	const onClickOverlayRow = setOverlayOpened => (_, badgeDefinition) => {
		const operators = getOperatorsFromDict(
			operatorsDictionary,
			get(badgeDefinition, 'metadata.operators'),
		);
		dispatch(BADGES_ACTIONS.add(generateBadge(operators)(badgeDefinition)));
		setOverlayOpened(false);
	};
	const basicSearchId = `${id}-basic-search`;
	const badgeFacetedContextValue = { state, dispatch, onSubmit };
	return (
		<div id={basicSearchId} className={css('tc-basic-search')}>
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgesGenerator
					badges={state.badges}
					badgesDictionary={badgesDictionary}
					getBadgeFromDict={getBadgesFromDict}
					id={basicSearchId}
					t={t}
				/>
			</BadgeFacetedProvider>
			<BadgeOverlay
				id={basicSearchId}
				iconName="plus-circle"
				label={t('OPEN_ADD_FACET_BUTTON', { defaultValue: 'Add facets' })}
				hideLabel
			>
				{setOverlayOpened => (
					<AddFacetPopover
						badgesDefinitions={badgesDefinitions}
						id={basicSearchId}
						initialFilterValue={initialFilterValue}
						onClick={onClickOverlayRow(setOverlayOpened)}
						t={t}
					/>
				)}
			</BadgeOverlay>
		</div>
	);
};

BasicSearch.propTypes = {
	badgesDefinitions: badgesFacetedPropTypes,
	badgesFaceted: badgesFacetedPropTypes,
	customBadgesDictionary: PropTypes.object,
	customOperatorsDictionary: operatorsPropTypes,
	initialFilterValue: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	setBadgesFaceted: PropTypes.func,
};

// eslint-disable-next-line import/prefer-default-export
export { BasicSearch };
