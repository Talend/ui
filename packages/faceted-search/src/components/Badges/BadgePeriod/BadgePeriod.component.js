import { useMemo } from 'react';

import { format, isValid } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import Badge from '@talend/react-components/lib/Badge';

import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';
import { BadgeFaceted } from '../BadgeFaceted';
import { BadgePeriodForm } from './BadgePeriodForm.component';

const DATE_FORMAT_YYYY_DD_MM = 'yyyy-MM-dd';

function isDateRange(value) {
	return value.id === 'CUSTOM';
}

function formatDate(date) {
	return format(date, DATE_FORMAT_YYYY_DD_MM);
}

function getRangeLabel(startDateTime, endDateTime, t) {
	return `${formatDate(startDateTime)} ${t('TO', { defaultValue: 'to' })} ${formatDate(
		endDateTime,
	)}`;
}

const getSelectBadgeLabel = (value, t) => {
	const labelAll = t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' });
	if (!isEmpty(value)) {
		if (isDateRange(value)) {
			if (isValid(value.startDateTime) && isValid(value.endDateTime)) {
				return getRangeLabel(value.startDateTime, value.endDateTime, t);
			}
			return labelAll;
		}
		return value.label;
	}
	return labelAll;
};

// eslint-disable-next-line import/prefer-default-export
export const BadgePeriod = ({
	displayType,
	filterBarPlaceholder,
	id,
	initialOperatorOpened,
	initialValueOpened,
	label,
	readOnly,
	removable,
	operator,
	operators,
	size,
	value,
	values,
	t,
	...rest
}) => {
	const currentOperators = useMemo(() => operators, [operators]);
	const currentOperator = operator || (currentOperators && currentOperators[0]);
	const badgePeriodId = `${id}-badge-period`;
	const badgeLabel = useMemo(() => getSelectBadgeLabel(value, t), [value, t]);
	return (
		<BadgeFaceted
			badgeId={id}
			displayType={displayType}
			id={badgePeriodId}
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
			value={value || {}}
			type="period"
		>
			{({ onSubmitBadge, onChangeValue, badgeValue }) => (
				<BadgePeriodForm
					id={badgePeriodId}
					onChange={onChangeValue}
					onSubmit={onSubmitBadge}
					value={badgeValue}
					values={values}
					t={t}
					{...rest}
				/>
			)}
		</BadgeFaceted>
	);
};

BadgePeriod.propTypes = {
	displayType: PropTypes.oneOf(Object.values(Badge.TYPES)),
	filterBarPlaceholder: PropTypes.string,
	id: PropTypes.string.isRequired,
	readOnly: PropTypes.bool,
	removable: PropTypes.bool,
	label: PropTypes.string,
	initialOperatorOpened: PropTypes.bool,
	initialValueOpened: PropTypes.bool,
	operator: operatorPropTypes,
	operators: operatorsPropTypes,
	size: PropTypes.oneOf(Object.values(Badge.SIZES)),
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			checked: PropTypes.bool,
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
	]),
	values: PropTypes.array,
	t: PropTypes.func.isRequired,
};

BadgePeriod.defaultProps = {
	readOnly: false,
	removable: true,
	initialOperatorOpened: false,
	initialValueOpened: false,
};
