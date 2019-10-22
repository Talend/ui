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
	return (
		<BadgeFaceted
			badgeId={id}
			id={badgeSelectId}
			initialOperatorOpened={initialOperatorOpened}
			initialValueOpened={initialValueOpened}
			labelCategory={label}
			labelValue={value || t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' })}
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
					values={values}
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
