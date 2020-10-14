import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTheme } from '@talend/react-components/lib/theme';
import { ActionButton } from '@talend/react-components/lib/Actions';
import get from 'lodash/get';

import { AddFacetPopover } from '../AddFacetPopover';
import { BadgeOverlay } from '../Badges';
import { BadgesGenerator } from '../BadgesGenerator';
import { generateBadge } from '../types/badgeDefinition.type';
import { useFacetedSearchContext } from '../context/facetedSearch.context';
import { BadgeFacetedProvider } from '../context/badgeFaceted.context';

import {
	createBadgesDict,
	getBadgesFromDict,
	filterBadgeDefinitionsWithDictionary,
} from '../../dictionary/badge.dictionary';
import { createOperatorsDict, getOperatorsFromDict } from '../../dictionary/operator.dictionary';
import { useFacetedBadges, BADGES_ACTIONS } from '../../hooks/facetedBadges.hook';
import {
	badgesFacetedPropTypes,
	callbacksPropTypes,
	operatorsPropTypes,
} from '../facetedSearch.propTypes';

import theme from './BasicSearch.scss';
import { USAGE_TRACKING_TAGS } from '../../constants';

const css = getTheme(theme);

const isInCreation = badge => get(badge, 'metadata.isInCreation', true);

const BasicSearch = ({
	badgesDefinitions = [],
	badgesFaceted,
	customBadgesDictionary,
	customOperatorsDictionary,
	initialFilterValue,
	onSubmit,
	setBadgesFaceted,
	callbacks,
}) => {
	const { id, t } = useFacetedSearchContext();
	const operatorsDictionary = useMemo(() => createOperatorsDict(t, customOperatorsDictionary), [
		t,
		customOperatorsDictionary,
	]);
	const badgesDictionary = useMemo(() => createBadgesDict(customBadgesDictionary), [
		customBadgesDictionary,
	]);
	const badges = useMemo(
		() => filterBadgeDefinitionsWithDictionary(badgesDictionary, badgesDefinitions),
		[badgesDictionary, badgesDefinitions],
	);
	const [state, dispatch] = useFacetedBadges(badgesFaceted, setBadgesFaceted);

	useEffect(() => {
		if (!state.badges.some(isInCreation)) {
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
			<div className={css('tc-basic-search-content')}>
				<BadgeFacetedProvider value={badgeFacetedContextValue}>
					<BadgesGenerator
						badges={state.badges}
						badgesDictionary={badgesDictionary}
						getBadgeFromDict={getBadgesFromDict}
						id={basicSearchId}
						callbacks={callbacks}
						t={t}
					/>
				</BadgeFacetedProvider>
				<BadgeOverlay
					id={basicSearchId}
					iconName="plus-circle"
					label={t('OPEN_ADD_FACET_BUTTON', { defaultValue: 'Add filter' })}
					t={t}
					hideLabel
					hasAddButton
				>
					{setOverlayOpened => (
						<AddFacetPopover
							badges={state.badges}
							badgesDefinitions={badges}
							id={basicSearchId}
							initialFilterValue={initialFilterValue}
							onClick={onClickOverlayRow(setOverlayOpened)}
							t={t}
						/>
					)}
				</BadgeOverlay>
			</div>

			{state.badges.length > 0 && (
				<ActionButton
					className={css('tc-basic-search-clear-button')}
					tooltipLabel={t('FACETED_SEARCH_BASIC_CLEAR', { defaultValue: 'Remove all filters' })}
					data-feature={USAGE_TRACKING_TAGS.BASIC_CLEAR}
					icon="talend-trash"
					onClick={() => dispatch(BADGES_ACTIONS.deleteAll())}
					link
					label=""
					disabled={state.badges.length === 0}
				/>
			)}
		</div>
	);
};

BasicSearch.propTypes = {
	badgesDefinitions: badgesFacetedPropTypes,
	badgesFaceted: PropTypes.shape({
		badges: badgesFacetedPropTypes,
	}),
	customBadgesDictionary: PropTypes.object,
	customOperatorsDictionary: operatorsPropTypes,
	initialFilterValue: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	setBadgesFaceted: PropTypes.func,
	callbacks: callbacksPropTypes,
};

// eslint-disable-next-line import/prefer-default-export
export { BasicSearch };
