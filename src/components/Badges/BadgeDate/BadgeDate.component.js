import React, { useMemo } from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';

import { BadgeFaceted } from '../BadgeFaceted';
import { BadgeDateForm } from './BadgeDateForm.component';
import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';
import { createOperatorsDict, operatorNames } from '../../../dictionary/operator.dictionary';

const DATE_FORMAT = 'YYYY-MM-DD';

const defaultOperatorsName = [
	operatorNames.notEquals,
	operatorNames.equals,
	operatorNames.greaterThan,
	operatorNames.greaterThanOrEquals,
	operatorNames.lessThan,
	operatorNames.lessThanOrEquals,
];

const createDefaultOperators = t =>
	Object.values(createOperatorsDict(t)).filter(operator =>
		defaultOperatorsName.includes(operator.name),
	);

const BadgeDate = ({
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
	const badgeDateId = `${id}-badge-date`;
	return (
		<BadgeFaceted
			badgeId={id}
			displayType={displayType}
			id={badgeDateId}
			initialOperatorOpened={initialOperatorOpened}
			initialValueOpened={initialValueOpened}
			labelCategory={label}
			labelValue={
				value
					? format(value, DATE_FORMAT)
					: t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' })
			}
			operator={currentOperator}
			operators={currentOperators}
			readOnly={readOnly}
			removable={removable}
			size={size}
			t={t}
			value={value || ''}
		>
			{({ onSubmitBadge, onChangeValue, badgeValue }) => (
				<BadgeDateForm
					id={badgeDateId}
					dateFormat={DATE_FORMAT}
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

BadgeDate.propTypes = {
	id: PropTypes.string.isRequired,
	initialOperatorOpened: PropTypes.bool,
	initialValueOpened: PropTypes.bool,
	label: PropTypes.string.isRequired,
	operator: operatorPropTypes,
	operators: operatorsPropTypes,
	size: PropTypes.oneOf(Object.values(Badge.SIZES)),
	t: PropTypes.func.isRequired,
	value: PropTypes.number,
	category: PropTypes.string,
	readOnly: PropTypes.bool,
	removable: PropTypes.bool,
	displayType: PropTypes.oneOf(Object.values(Badge.TYPES)),
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeDate };
