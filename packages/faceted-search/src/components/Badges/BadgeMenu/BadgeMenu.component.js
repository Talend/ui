import { useEffect, useMemo, useState } from 'react';

import { isEmpty } from 'lodash';
import isObject from 'lodash/isObject';
import PropTypes from 'prop-types';

import Badge from '@talend/react-components/lib/Badge';

import {
	callbacksPropTypes,
	operatorPropTypes,
	operatorsPropTypes,
} from '../../facetedSearch.propTypes';
import { BadgeFaceted } from '../BadgeFaceted';
import { BadgeMenuForm } from './BadgeMenuForm.component';

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
	callbacks,
	...rest
}) => {
	const [options, setOptions] = useState(values);
	const currentOperators = useMemo(() => operators, [operators]);
	const currentOperator = operator || (currentOperators && currentOperators[0]);
	const [isLoading, setIsLoading] = useState(true);
	const callback = callbacks && callbacks[rest.attribute];
	useEffect(() => {
		if (!callback || !callback.getOptions) {
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		callback
			.getOptions()
			.then(data => {
				setOptions(
					data.map(item => {
						if (isObject(item)) {
							return { id: item.id, label: item.label };
						}
						return { id: item, label: item };
					}),
				);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [callback]);
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
					values={options}
					filterBarPlaceholder={filterBarPlaceholder}
					isLoading={isLoading}
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
	callbacks: callbacksPropTypes,
	t: PropTypes.func.isRequired,
	displayType: PropTypes.oneOf(Object.values(Badge.TYPES)),
	filterBarPlaceholder: PropTypes.string,
};
