import { useEffect, useState } from 'react';

import { isEqual } from 'lodash';
import PropTypes from 'prop-types';

import Badge from '@talend/react-components/lib/Badge';

import { USAGE_TRACKING_TAGS } from '../../../constants';
import { OVERLAY_FLOW_ACTIONS, useBadgeOverlayFlow } from '../../../hooks/badgeOverlayFlow.hook';
import { BADGES_ACTIONS } from '../../../hooks/facetedBadges.hook';
import { useBadgeFacetedContext } from '../../context/badgeFaceted.context';
import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';
import { BadgeOperatorOverlay } from '../BadgeOperator';
import { BadgeOverlay } from '../BadgeOverlay';

import styles from './BadgeFaceted.module.scss';

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
	const [overlayState, overlayDispatch, onChangeOperatorOverlay, onChangeValueOverlay] =
		useBadgeOverlayFlow(
			openValueJustAfterSelectionOfType ? false : initialOperatorOpened,
			openValueJustAfterSelectionOfType ? true : initialValueOpened,
		);

	const { dispatch } = useBadgeFacetedContext();
	const [badgeOperator, setBadgeOperator] = useState(operator);
	const [badgeValue, setBadgeValue] = useState(value);

	useEffect(() => {
		if (!isEqual(value, badgeValue)) {
			setBadgeValue(value);
		}
		if (!isEqual(operator, badgeOperator)) {
			setBadgeOperator(operator);
		}
	}, [value, operator]);

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
		overlayDispatch(OVERLAY_FLOW_ACTIONS.closeAll);
		dispatch(BADGES_ACTIONS.closeInitialOpened(badgeId));
	};

	const onHideSubmitBadge = (...args) => {
		dispatch(BADGES_ACTIONS.closeInitialOpened(badgeId));
		onSubmitBadge(...args);
	};

	return (
		<Badge id={id} className={styles['tc-badge-faceted']} display={size} type={displayType}>
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
					/>
				</>
			)}
			<BadgeOverlay
				id={id}
				className={styles['tc-badge-faceted-overlay']}
				showSpecialChars={!!displayType}
				label={labelValue}
				onHide={onHideSubmitBadge}
				opened={overlayState.valueOpened}
				onChange={onChangeValueOverlay}
				readOnly={readOnly}
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
