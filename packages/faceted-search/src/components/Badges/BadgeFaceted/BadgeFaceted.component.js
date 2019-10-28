import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';
import BadgeComposition from '@talend/react-components/lib/Badge/BadgeComposition';
import { getTheme } from '@talend/react-components/lib/theme';

import { BadgeOperatorOverlay } from '../BadgeOperator';
import { BadgeOverlay } from '../BadgeOverlay';
import { useBadgeFacetedContext } from '../../context/badgeFaceted.context';

import cssModule from './BadgeFaceted.scss';

import { useBadgeOverlayFlow, OVERLAY_FLOW_ACTIONS } from '../../../hooks/badgeOverlayFlow.hook';
import { BADGES_ACTIONS } from '../../../hooks/facetedBadges.hook';

import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';

const theme = getTheme(cssModule);

const findOperatorByName = name => operator => name === operator.name;

const BadgeFaceted = ({
	badgeId,
	children,
	id,
	labelCategory,
	labelValue,
	initialOperatorOpened,
	initialValueOpened,
	operator,
	operators,
	value,
	size = Badge.SIZES.large,
	t,
}) => {
	const [
		overlayState,
		overlayDispatch,
		onChangeOperatorOverlay,
		onChangeValueOverlay,
	] = useBadgeOverlayFlow(initialOperatorOpened, initialValueOpened);

	const { dispatch } = useBadgeFacetedContext();
	const [badgeOperator, setBadgeOperator] = useState(operator);
	const [badgeValue, setBadgeValue] = useState(value);

	const onChangeOperator = (_, operatorName) => {
		const foundOperator = operators.find(findOperatorByName(operatorName));
		if (foundOperator) {
			setBadgeOperator(foundOperator);
		}
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
				},
				{ dirty: false },
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
	return (
		<Badge id={id} className={theme('tc-badge-faceted')} display={size}>
			<BadgeComposition.Category category={labelCategory} label={labelCategory} />
			<BadgeOperatorOverlay
				id={id}
				onChangeOverlay={onChangeOperatorOverlay}
				onHideOverlay={onHideOverlayOperator}
				operatorLabel={badgeOperator.label}
				operatorIconName={badgeOperator.iconName}
				opened={overlayState.operatorOpened}
				onClick={onChangeOperator}
				operators={operators}
				size={size}
			/>
			<BadgeOverlay
				id={id}
				className={theme('tc-badge-faceted-overlay')}
				hideLabel={false}
				label={labelValue}
				onHide={onSubmitBadge}
				opened={overlayState.valueOpened}
				onChange={onChangeValueOverlay}
			>
				{children({ onSubmitBadge, onChangeValue, badgeValue })}
			</BadgeOverlay>
			<BadgeComposition.DeleteAction
				id={id}
				label={t('DELETE_BADGE_ACTION', { defaultValue: 'Delete badge' })}
				onClick={onDeleteBadge}
				t={t}
			/>
		</Badge>
	);
};

BadgeFaceted.propTypes = {
	badgeId: PropTypes.string.isRequired,
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
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeFaceted };
