import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';

import { BadgeFaceted } from '../BadgeFaceted';
import { BadgeNumberForm } from './BadgeNumberForm.component';
import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';

const createDefaultOperators = t => [
	{
		label: t('FACETED_SEARCH_DOES_NOT_CONTAIN', { defaultValue: 'Does not contain' }),
		name: 'notEquals',
		iconName: 'not-equal',
	},
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
		label: t('FACETED_SEARCH_GREATHER_THAN_OR_EQUAL', { defaultValue: 'Greater than or equal' }),
		name: 'GreaterThanOrEquals',
		iconName: 'greater-than-equal',
	},
	{
		label: t('FACETED_SEARCH_LESS_THAN', { defaultValue: 'Less than' }),
		name: 'LessThan',
		iconName: 'less-than',
	},
	{
		label: t('FACETED_SEARCH_LESS_THAN_OR_EQUAL', { defaultValue: 'Less than or equal' }),
		name: 'LessThanOrEquals',
		iconName: 'less-than-equal',
	},
];

const BadgeNumber = ({
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
	readOnly,
	removable,
	displayType,
}) => {
	const currentOperators = useMemo(() => operators || createDefaultOperators(t), [operators, t]);
	const currentOperator = operator || currentOperators[0];
	const badgeTextId = `${id}-badge-number`;
	return (
		<BadgeFaceted
			badgeId={id}
			displayType={displayType}
			id={badgeTextId}
			initialOperatorOpened={initialOperatorOpened}
			initialValueOpened={initialValueOpened}
			labelCategory={label}
			labelValue={value || t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' })}
			operator={currentOperator}
			operators={currentOperators}
			readOnly={readOnly}
			removable={removable}
			size={size}
			t={t}
			value={value || ''}
		>
			{({ onSubmitBadge, onChangeValue, badgeValue }) => (
				<BadgeNumberForm
					id={badgeTextId}
					onChange={onChangeValue}
					onSubmit={onSubmitBadge}
					value={badgeValue}
					feature={category || label}
					t={t}
				/>
			)}
		</BadgeFaceted>
	);
};

BadgeNumber.propTypes = {
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
	readOnly: PropTypes.bool,
	removable: PropTypes.bool,
	displayType: PropTypes.oneOf(Object.values(Badge.TYPES)),
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeNumber };
