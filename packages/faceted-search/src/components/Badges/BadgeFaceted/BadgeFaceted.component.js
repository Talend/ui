import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';
import { getTheme } from '@talend/react-components/lib/theme';

import { BadgeOperatorOverlay } from '../BadgeOperator';
import { BadgeOverlay } from '../BadgeOverlay';
import { useBadgeFacetedContext } from '../../context/badgeFaceted.context';

import cssModule from './BadgeFaceted.scss';

import { useBadgeOverlayFlow, OVERLAY_FLOW_ACTIONS } from '../../../hooks/badgeOverlayFlow.hook';
import { BADGES_ACTIONS } from '../../../hooks/facetedBadges.hook';

import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';
import { USAGE_TRACKING_TAGS } from '../../../constants';

const theme = getTheme(cssModule);

const findOperatorByName = name => operator => name === operator.name;

const BadgeFaceted = ({
	badgeId,
	displayType,
	children,
	id,
	labelCategory,
	labelValue,
	initialOperatorOpened,
	initialValueOpened,
	operator,
	operators,
	readOnly,
	removable = true,
	value,
	size = Badge.SIZES.large,
	t,
}) => {
	const openValueJustAfterSelectionOfType = operators.length < 2 && initialOperatorOpened;
	const [
		overlayState,
		overlayDispatch,
		onChangeOperatorOverlay,
		onChangeValueOverlay,
	] = useBadgeOverlayFlow(
		openValueJustAfterSelectionOfType ? false : initialOperatorOpened,
		openValueJustAfterSelectionOfType ? true : initialValueOpened,
	);

	const { dispatch } = useBadgeFacetedContext();
	const [badgeOperator, setBadgeOperator] = useState(operator);
	const [badgeValue, setBadgeValue] = useState(value);

	const onChangeOperator = (_, operatorName) => {
		const foundOperator = operators.find(findOperatorByName(operatorName));
		if (foundOperator) {
			setBadgeOperator(foundOperator);
		}
		dispatch(
			BADGES_ACTIONS.update(badgeId, {
				operator: foundOperator,
			}),
		);
		overlayDispatch(OVERLAY_FLOW_ACTIONS.openValue);
		dispatch(BADGES_ACTIONS.closeInitialOpened(badgeId));
	};

	const onChangeValue = (_, entityValue) => {
		setBadgeValue(entityValue);
	};

	const onSubmitBadge = () => {
		overlayDispatch(OVERLAY_FLOW_ACTIONS.closeAll);
		event.preventDefault();
		dispatch(
			BADGES_ACTIONS.update(
				badgeId,
				{
					value: badgeValue,
					operator: badgeOperator,
					initialOperatorOpened: false,
					initialValueOpened: false,
				},
				{ isInCreation: false },
			),
		);
	};

	const onDeleteBadge = () => {
		dispatch(BADGES_ACTIONS.delete(badgeId));
	};

	const onHideOverlayOperator = () => {
		overlayDispatch(OVERLAY_FLOW_ACTIONS.openValue);
		dispatch(BADGES_ACTIONS.closeInitialOpened(badgeId));
	};

	const onHideSubmitBadge = (...args) => {
		dispatch(BADGES_ACTIONS.closeInitialOpened(badgeId));
		onSubmitBadge(...args);
	};

	return (
		<Badge id={id} className={theme('tc-badge-faceted')} display={size} type={displayType}>
			{labelCategory && (
				<>
					<Badge.Category category={labelCategory} label={labelCategory} />
					<BadgeOperatorOverlay
						id={id}
						onChangeOverlay={onChangeOperatorOverlay}
						onHideOverlay={onHideOverlayOperator}
						operatorLabel={badgeOperator.label}
						operatorIconName={badgeOperator.iconName}
						opened={overlayState.operatorOpened}
						onClick={onChangeOperator}
						operators={operators}
						readOnly={readOnly}
						size={size}
						t={t}
					/>
				</>
			)}
			<BadgeOverlay
				id={id}
				className={theme('tc-badge-faceted-overlay')}
				hideLabel={false}
				showSpecialChars={!!displayType}
				label={labelValue}
				onHide={onHideSubmitBadge}
				opened={overlayState.valueOpened}
				onChange={onChangeValueOverlay}
				readOnly={readOnly}
				t={t}
			>
				{children({ onSubmitBadge, onChangeValue, badgeValue })}
			</BadgeOverlay>
			{removable && (
				<Badge.DeleteAction
					id={id}
					label={t('DELETE_BADGE_ACTION', { defaultValue: 'Remove filter' })}
					dataFeature={USAGE_TRACKING_TAGS.BADGE_REMOVE}
					onClick={onDeleteBadge}
					t={t}
				/>
			)}
		</Badge>
	);
};

BadgeFaceted.propTypes = {
	badgeId: PropTypes.string.isRequired,
	displayType: PropTypes.oneOf(Object.values(Badge.TYPES)),
	labelCategory: PropTypes.string.isRequired,
	children: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	initialOperatorOpened: PropTypes.bool,
	initialValueOpened: PropTypes.bool,
	labelValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	operator: operatorPropTypes.isRequired,
	operators: operatorsPropTypes.isRequired,
	size: PropTypes.oneOf(Object.values(Badge.SIZES)),
	value: PropTypes.any,
	readOnly: PropTypes.bool,
	removable: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeFaceted };
