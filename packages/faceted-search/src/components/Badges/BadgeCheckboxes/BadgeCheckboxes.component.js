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
				defaultValue: '{{count}} value',
				defaultValue_plural: '{{count}} values',
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
	readOnly,
	removable,
	label,
	initialOperatorOpened,
	initialValueOpened,
	operator,
	operators,
	size,
	value,
	category,
	values,
	displayType,
	t,
}) => {
	const currentOperators = useMemo(() => operators, [operators]);
	const currentOperator = operator || (currentOperators && currentOperators[0]);
	const badgeCheckboxesId = `${id}-badge-checkboxes`;
	const badgeLabel = useMemo(() => getSelectBadgeLabel(value, t), [value, t]);
	return (
		<BadgeFaceted
			badgeId={id}
			displayType={displayType}
			id={badgeCheckboxesId}
			initialOperatorOpened={initialOperatorOpened}
			initialValueOpened={initialValueOpened}
			labelCategory={label}
			labelValue={badgeLabel}
			operator={currentOperator}
			operators={currentOperators}
			readOnly={readOnly}
			removable={removable}
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
					feature={category || label}
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
	category: PropTypes.string,
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
	readOnly: PropTypes.bool,
	removable: PropTypes.bool,
	values: PropTypes.array,
	t: PropTypes.func.isRequired,
	displayType: PropTypes.oneOf(Object.values(Badge.TYPES)),
};
