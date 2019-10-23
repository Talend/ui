import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';
import { BadgeSelectInput } from './BadgeSelectInput.component';
import { BadgeFaceted } from '../BadgeFaceted';
import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';

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
	const createLabelValue = () => {
		//TODO : add case if 0 checked
		if (value && value.filter(v => v.checked).length > 3) {
			return t('FACETED_SEARCH_4_VALUES', {
				count: value.filter(v => v.checked).length,
				defaultValue: '{{count}} values',
			});
		}
		return value && value.filter(val => val.checked).map(val => val.label);
	};
	return (
		<BadgeFaceted
			badgeId={id}
			id={badgeSelectId}
			initialOperatorOpened={initialOperatorOpened}
			initialValueOpened={initialValueOpened}
			labelCategory={label}
			labelValue={createLabelValue() || t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' })}
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
