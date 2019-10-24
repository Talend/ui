import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';
import { BadgeSelectInput } from './BadgeSelectInput.component';
import { BadgeFaceted } from '../BadgeFaceted';
import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';

const getSelectBadgeLabel = (value, t) => {
	if (!value || !value.length) {
		return t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' });
	}
	if (value) {
		const checkedCheckboxes = value.filter(v => v.checked);
		if (checkedCheckboxes.length > 3) {
			return t('FACETED_SEARCH_4_VALUES', {
				count: checkedCheckboxes.length,
				defaultValue: '{{count}} values',
			});
		}
		return checkedCheckboxes.map(val => val.label);
	}
};

// eslint-disable-next-line import/prefer-default-export
export const BadgeSelect = ({
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
	const currentOperator = operator || currentOperators[0];
	const badgeSelectId = `${id}-badge-select`;
	const badgeLabel = useMemo(() => getSelectBadgeLabel(value, t), [value, t]);
	return (
		<BadgeFaceted
			badgeId={id}
			id={badgeSelectId}
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
				<BadgeSelectInput
					id={badgeSelectId}
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

BadgeSelect.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	initialOperatorOpened: PropTypes.bool,
	initialValueOpened: PropTypes.bool,
	operator: operatorPropTypes,
	operators: operatorsPropTypes,
	size: PropTypes.oneOf(Object.values(Badge.SIZES)),
	value: PropTypes.string,
	t: PropTypes.func.isRequired,
};
