import { useMemo } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';

import { BadgeFaceted } from '../BadgeFaceted';
import { BadgeMenuForm } from './BadgeMenuForm.component';
import { operatorPropTypes, operatorsPropTypes } from '../../facetedSearch.propTypes';

const getSelectBadgeLabel = (value, t) => {
	const labelAll = t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' });
	if (!isEmpty(value)) {
		return value.label;
	}
	return labelAll;
};

// eslint-disable-next-line import/prefer-default-export
export const BadgeMenu = ({
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
	values,
	displayType,
	filterBarPlaceholder,
	t,
	...rest
}) => {
	const currentOperators = useMemo(() => operators, [operators]);
	const currentOperator = operator || (currentOperators && currentOperators[0]);
	const badgeMenuId = `${id}-badge-menu`;
	const badgeLabel = useMemo(() => getSelectBadgeLabel(value, t), [value, t]);
	return (
		<BadgeFaceted
			badgeId={id}
			displayType={displayType}
			id={badgeMenuId}
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
		>
			{({ onSubmitBadge, onChangeValue, badgeValue }) => (
				<BadgeMenuForm
					id={badgeMenuId}
					onChange={onChangeValue}
					onSubmit={onSubmitBadge}
					value={badgeValue}
					values={values}
					filterBarPlaceholder={filterBarPlaceholder}
					t={t}
					{...rest}
				/>
			)}
		</BadgeFaceted>
	);
};

BadgeMenu.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
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
	readOnly: PropTypes.bool,
	removable: PropTypes.bool,
	values: PropTypes.array,
	t: PropTypes.func.isRequired,
	displayType: PropTypes.oneOf(Object.values(Badge.TYPES)),
	filterBarPlaceholder: PropTypes.string,
};
