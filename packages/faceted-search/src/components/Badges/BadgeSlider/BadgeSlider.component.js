import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';

import { BadgeFaceted } from '../BadgeFaceted';
import { BadgeSliderForm } from './BadgeSliderForm.component';
import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';

const createDefaultOperators = t => [
	{
		label: t('FACETED_SEARCH_EQUAL', { defaultValue: 'Equal' }),
		name: 'equals',
		iconName: 'equal',
	},
	{
		label: t('FACETED_SEARCH_GREATHER_THAN', { defaultValue: 'Greater than' }),
		name: 'GreaterThan',
		iconName: 'greater-than',
	},
	{
		label: t('FACETED_SEARCH_LESS_THAN', { defaultValue: 'Less than' }),
		name: 'LessThan',
		iconName: 'less-than',
	},
];

const BadgeSlider = ({
	id,
	initialOperatorOpened,
	initialValueOpened,
	label,
	operator,
	operators,
	size,
	t,
	value,
	category,
	defaultValue = 0,
	unit = '',
	...rest
}) => {
	const currentOperators = useMemo(() => operators || createDefaultOperators(t), [operators, t]);
	const currentOperator = operator || currentOperators[0];
	const badgeTextId = `${id}-badge-slider`;
	const labelValue = value != null && `${value}${unit}`;

	return (
		<BadgeFaceted
			badgeId={id}
			id={badgeTextId}
			initialOperatorOpened={initialOperatorOpened}
			initialValueOpened={initialValueOpened}
			labelCategory={label}
			labelValue={labelValue || defaultValue}
			operator={currentOperator}
			operators={currentOperators}
			size={size}
			t={t}
			value={value || defaultValue}
		>
			{({ onSubmitBadge, onChangeValue, badgeValue }) => (
				<BadgeSliderForm
					id={badgeTextId}
					onChange={onChangeValue}
					onSubmit={onSubmitBadge}
					value={badgeValue}
					feature={category || label}
					unit={unit}
					t={t}
					{...rest}
				/>
			)}
		</BadgeFaceted>
	);
};

BadgeSlider.propTypes = {
	id: PropTypes.string.isRequired,
	initialOperatorOpened: PropTypes.bool,
	initialValueOpened: PropTypes.bool,
	label: PropTypes.string.isRequired,
	operator: operatorPropTypes,
	operators: operatorsPropTypes,
	size: PropTypes.oneOf(Object.values(Badge.SIZES)),
	t: PropTypes.func.isRequired,
	value: PropTypes.string,
	category: PropTypes.string,
	defaultValue: PropTypes.number,
	unit: PropTypes.string,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeSlider };
