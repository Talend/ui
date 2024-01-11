import { useEffect, useMemo, useState } from 'react';

import { get, isEqual } from 'lodash';
import PropTypes from 'prop-types';

import { ButtonIcon, ButtonSecondary, Popover } from '@talend/design-system';

import { USAGE_TRACKING_TAGS } from '../../constants';
import {
	createBadgesDict,
	filterBadgeDefinitionsWithDictionary,
	getBadgesFromDict,
} from '../../dictionary/badge.dictionary';
import { createOperatorsDict, getOperatorsFromDict } from '../../dictionary/operator.dictionary';
import { BADGES_ACTIONS, useFacetedBadges } from '../../hooks/facetedBadges.hook';
import { AddFacetPopover } from '../AddFacetPopover';
import { BadgesGenerator } from '../BadgesGenerator';
import { BadgeFacetedProvider } from '../context/badgeFaceted.context';
import { useFacetedSearchContext } from '../context/facetedSearch.context';
import {
	badgesFacetedPropTypes,
	callbacksPropTypes,
	operatorsPropTypes,
} from '../facetedSearch.propTypes';
import { QuickSearchInput } from '../QuickSearchInput';
import { DEFAULT_QUICKSEARCH_OPERATOR } from '../QuickSearchInput/QuickSearchInput.component';
import { generateBadge } from '../types/badgeDefinition.type';

import styles from './BasicSearch.module.scss';

const isInCreation = badge => get(badge, 'metadata.isInCreation', true);

const BasicSearch = ({
	badgesDefinitions = [],
	badgesFaceted,
	initialBadges = [],
	customBadgesDictionary,
	customOperatorsDictionary,
	initialFilterValue,
	onSubmit,
	setBadgesFaceted,
	callbacks,
	badgesDefinitionsSort,
	quickSearchPlaceholder,
	quickSearchFacetsFilter,
	quickSearchInputProps,
	disclosureProps,
}) => {
	const { id, t } = useFacetedSearchContext();
	const operatorsDictionary = useMemo(
		() => createOperatorsDict(t, customOperatorsDictionary),
		[t, customOperatorsDictionary],
	);
	const badgesDictionary = useMemo(
		() => createBadgesDict(customBadgesDictionary),
		[customBadgesDictionary],
	);
	const badges = useMemo(
		() => filterBadgeDefinitionsWithDictionary(badgesDictionary, badgesDefinitions),
		[badgesDictionary, badgesDefinitions],
	);
	const [state, dispatch] = useFacetedBadges(badgesFaceted, setBadgesFaceted);
	const quicksearchable = useMemo(
		() => badgesDefinitions.filter(({ metadata = {} }) => metadata.isAvailableForQuickSearch),
		[badgesDefinitions],
	);

	const [badgeState, setBadgeState] = useState(state.badges);

	useEffect(() => {
		if (!state.badges.some(isInCreation) && !isEqual(badgeState, state.badges)) {
			setBadgeState(state.badges);
			onSubmit({}, state.badges);
		}
	}, [state.badges, onSubmit]);

	useEffect(() => {
		initialBadges.forEach(initial => {
			const facet = badges.find(({ properties }) => properties.attribute === initial.attribute);
			const operators = getOperatorsFromDict(operatorsDictionary, get(facet, 'metadata.operators'));
			dispatch(
				BADGES_ACTIONS.addWithValue(
					generateBadge(operators)(facet),
					operatorsDictionary[initial.operator],
					initial.value,
				),
			);
		});
		// This is intended
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onClickOverlayRow = (_, badgeDefinition) => {
		const operators = getOperatorsFromDict(
			operatorsDictionary,
			get(badgeDefinition, 'metadata.operators'),
		);
		dispatch(BADGES_ACTIONS.add(generateBadge(operators)(badgeDefinition)));
	};
	const basicSearchId = `${id}-basic-search`;
	const badgeFacetedContextValue = { state, dispatch, onSubmit };
	// removable = undefined means badge can be removed (backward compatible change)
	const hasRemovableBadge = state.badges.some(badge => badge.properties.removable !== false);
	const quickSearchMinLength =
		Math.max(quicksearchable.map(quicksearchableItem => quicksearchableItem.metadata?.minLength)) ||
		1;

	return (
		<div id={basicSearchId} className={styles['tc-basic-search']}>
			<QuickSearchInput
				t={t}
				className={styles['tc-basic-search-quicksearch']}
				facets={quicksearchable}
				placeholder={quickSearchPlaceholder}
				facetsFilter={quickSearchFacetsFilter}
				onSelect={(facet, value) => {
					const operators = getOperatorsFromDict(
						operatorsDictionary,
						get(facet, 'metadata.operators'),
					);
					dispatch(
						BADGES_ACTIONS.addWithValue(
							generateBadge(operators)(facet),
							operators.find(({ name }) => name === DEFAULT_QUICKSEARCH_OPERATOR) || operators[0],
							value,
						),
					);
				}}
				inputProps={quickSearchInputProps}
				minLength={quickSearchMinLength}
			/>
			<div className={styles['tc-basic-search-content']}>
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
				{badgesDefinitions.length > 0 && (
					<div>
						<Popover
							position="bottom"
							isFixed
							disclosure={
								<ButtonSecondary
									size="S"
									isDropdown
									data-feature={USAGE_TRACKING_TAGS.BASIC_ADD}
									{...disclosureProps}
								>
									{t('BASIC_SEARCH_ADD_FILTER', 'Add filter')}
								</ButtonSecondary>
							}
						>
							{popover => (
								<AddFacetPopover
									badges={state.badges}
									badgesDefinitions={badges}
									badgesDefinitionsSort={badgesDefinitionsSort}
									id={basicSearchId}
									initialFilterValue={initialFilterValue}
									onClick={(...args) => {
										onClickOverlayRow(...args);
										popover?.hide();
									}}
									t={t}
								/>
							)}
						</Popover>
					</div>
				)}
			</div>

			{hasRemovableBadge && (
				<div className={styles['tc-basic-search-clear-content']}>
					<ButtonIcon
						icon="trash"
						size="S"
						data-feature={USAGE_TRACKING_TAGS.BASIC_CLEAR}
						onClick={() => dispatch(BADGES_ACTIONS.deleteAll())}
					>
						{t('FACETED_SEARCH_BASIC_CLEAR', 'Remove all filters')}
					</ButtonIcon>
				</div>
			)}
		</div>
	);
};

BasicSearch.propTypes = {
	badgesDefinitions: badgesFacetedPropTypes,
	badgesDefinitionsSort: PropTypes.func,
	badgesFaceted: PropTypes.shape({
		badges: badgesFacetedPropTypes,
	}),
	initialBadges: PropTypes.arrayOf(
		PropTypes.shape({
			attribute: PropTypes.string,
			value: PropTypes.any,
			operator: PropTypes.string,
		}),
	),
	customBadgesDictionary: PropTypes.object,
	customOperatorsDictionary: operatorsPropTypes,
	initialFilterValue: PropTypes.string,
	quickSearchPlaceholder: PropTypes.string,
	/* Can be used to filter facets displayed when input changes; (term, facets) => [facets] */
	quickSearchFacetsFilter: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	setBadgesFaceted: PropTypes.func,
	callbacks: callbacksPropTypes,
	quickSearchInputProps: PropTypes.object,
	disclosureProps: PropTypes.object,
};

export { BasicSearch };
