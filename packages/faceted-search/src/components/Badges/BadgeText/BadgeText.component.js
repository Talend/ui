import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';

import { BadgeFaceted } from '../BadgeFaceted';
import { BadgeTextForm } from './BadgeTextForm.component';
import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';

const createDefaultOperators = t => [
	{
		label: t('FACETED_SEARCH_DOES_NOT_CONTAINS', { defaultValue: 'Does not contains' }),
		name: 'notEquals',
		iconName: 'not-equal',
	},
	{
		label: t('FACETED_SEARCH_EQUAL', { defaultValue: 'Equal' }),
		name: 'equals',
		iconName: 'equal',
	},
	{
		label: t('FACETED_SEARCH_CONTAINS', { defaultValue: 'Contains' }),
		name: 'contains',
		iconName: 'contains',
	},
];

const BadgeText = ({
	id,
	initialOperatorOpened,
	initialValueOpened,
	label,
	operator,
	operators,
	size,
	t,
	value,
}) => {
	const currentOperators = useMemo(() => operators || createDefaultOperators(t), [operators, t]);
	const currentOperator = operator || currentOperators[0];
	const badgeTextId = `${id}-badge-text`;
	return (
		<BadgeFaceted
			badgeId={id}
			id={badgeTextId}
			initialOperatorOpened={initialOperatorOpened}
			initialValueOpened={initialValueOpened}
			labelCategory={label}
			labelValue={value || t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' })}
			operator={currentOperator}
			operators={currentOperators}
			size={size}
			t={t}
			value={value || ''}
		>
			{({ onSubmitBadge, onChangeValue, badgeValue }) => (
				<BadgeTextForm
					id={badgeTextId}
					onChange={onChangeValue}
					onSubmit={onSubmitBadge}
					value={badgeValue}
					t={t}
				/>
			)}
		</BadgeFaceted>
	);
};

BadgeText.propTypes = {
	id: PropTypes.string.isRequired,
	initialOperatorOpened: PropTypes.bool,
	initialValueOpened: PropTypes.bool,
	label: PropTypes.string.isRequired,
	operator: operatorPropTypes,
	operators: operatorsPropTypes,
	size: PropTypes.oneOf(Object.values(Badge.SIZES)),
	t: PropTypes.func.isRequired,
	value: PropTypes.string,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeText };
