import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';
import { BadgeCheckboxesForm } from './BadgeCheckboxesForm.component';
import { BadgeFaceted } from '../BadgeFaceted';
import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';

const getSelectBadgeLabel = (value, t) => {
	const labelAll = t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' });
	if (value) {
		const checkedCheckboxes = value.filter(v => v.checked);
		if (checkedCheckboxes.length > 3) {
			return t('FACETED_SEARCH_VALUES_COUNT', {
				count: checkedCheckboxes.length,
				defaultValue: '{{count}} values',
			});
		} else if (!checkedCheckboxes.length) {
			return labelAll;
		}
		return checkedCheckboxes.map(val => val.label);
	}
	return labelAll;
};

// eslint-disable-next-line import/prefer-default-export
export const BadgeCheckboxes = ({
	id,
	label,
	initialOperatorOpened,
	initialValueOpened,
	operator,
	operators,
	size,
	value,
	values,
	t,
}) => {
	const currentOperators = useMemo(() => operators, [operators]);
	const currentOperator = operator || (currentOperators && currentOperators[0]);
	const badgeCheckboxesId = `${id}-badge-checkboxes`;
	const badgeLabel = useMemo(() => getSelectBadgeLabel(value, t), [value, t]);
	return (
		<BadgeFaceted
			badgeId={id}
			id={badgeCheckboxesId}
			initialOperatorOpened={initialOperatorOpened}
			initialValueOpened={initialValueOpened}
			labelCategory={label}
			labelValue={badgeLabel}
			operator={currentOperator}
			operators={currentOperators}
			size={size}
			t={t}
			value={value || []}
		>
			{({ onSubmitBadge, onChangeValue, badgeValue }) => (
				<BadgeCheckboxesForm
					id={badgeCheckboxesId}
					onChange={onChangeValue}
					onSubmit={onSubmitBadge}
					value={badgeValue}
					checkboxValues={values}
					t={t}
				/>
			)}
		</BadgeFaceted>
	);
};

BadgeCheckboxes.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	initialOperatorOpened: PropTypes.bool,
	initialValueOpened: PropTypes.bool,
	operator: operatorPropTypes,
	operators: operatorsPropTypes,
	size: PropTypes.oneOf(Object.values(Badge.SIZES)),
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(
			PropTypes.shape({
				checked: PropTypes.bool,
				id: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired,
			}),
		),
	]),
	values: PropTypes.array,
	t: PropTypes.func.isRequired,
};
