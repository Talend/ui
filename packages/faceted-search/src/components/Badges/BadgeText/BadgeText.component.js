import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';

import { BadgeFaceted } from '../BadgeFaceted';
import { BadgeTextForm } from './BadgeTextForm.component';
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
	category,
	readOnly,
	removable,
	displayType,
}) => {
	const currentOperators = useMemo(() => operators || createDefaultOperators(t), [operators, t]);
	const currentOperator = operator || currentOperators[0];
	const badgeTextId = `${id}-badge-text`;
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
				<BadgeTextForm
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
	category: PropTypes.string,
	readOnly: PropTypes.bool,
	removable: PropTypes.bool,
	displayType: PropTypes.oneOf(Object.values(Badge.TYPES)),
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeText };
