import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';
import { BadgeTagsForm } from './BadgeTagsForm.component';
import { BadgeFaceted } from '../BadgeFaceted';
import {
	callbacksPropTypes,
	operatorPropTypes,
	operatorsPropTypes,
} from '../../facetedSearch.propTypes';

const getSelectBadgeLabel = (value, t) => {
	const labelAll = t('FACETED_SEARCH_VALUE_ALL', { defaultValue: 'All' });
	if (value) {
		const checkedCheckboxes = value.filter(v => v.checked);
		if (checkedCheckboxes.length > 3) {
			return t('FACETED_SEARCH_VALUES_COUNT', {
				count: checkedCheckboxes.length,
				defaultValue: '{{count}} value',
				defaultValue_plural: '{{count}} values',
			});
		} else if (!checkedCheckboxes.length) {
			return labelAll;
		}
		return checkedCheckboxes.map(val => val.label);
	}
	return labelAll;
};

// eslint-disable-next-line import/prefer-default-export
export const BadgeTags = ({
	id,
	label,
	initialOperatorOpened,
	initialValueOpened,
	operator,
	operators,
	size,
	value,
	category,
	callbacks,
	readOnly,
	removable,
	displayType,
	t,
}) => {
	const [tagsValues, setTagsValues] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (!callbacks || !callbacks.getTags) {
			setIsLoading(false);

			console.warn("get tags callback is not defined, tags can't be fetch from server");
			return;
		}

		setIsLoading(true);
		callbacks
			.getTags()
			.then(data => {
				setTagsValues(data.map(item => ({ id: item, label: item })));
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const currentOperator = operator || (operators && operators[0]);
	const badgeTagsId = `${id}-badge-tags`;
	const badgeLabel = useMemo(() => getSelectBadgeLabel(value, t), [value, t]);
	return (
		<BadgeFaceted
			badgeId={id}
			displayType={displayType}
			id={badgeTagsId}
			initialOperatorOpened={initialOperatorOpened}
			initialValueOpened={initialValueOpened}
			labelCategory={label}
			labelValue={badgeLabel}
			operator={currentOperator}
			operators={operators}
			readOnly={readOnly}
			removable={removable}
			size={size}
			t={t}
			value={value || []}
		>
			{({ onSubmitBadge, onChangeValue, badgeValue }) => (
				<BadgeTagsForm
					id={badgeTagsId}
					onChange={onChangeValue}
					onSubmit={onSubmitBadge}
					value={badgeValue}
					tagsValues={tagsValues}
					feature={category || label}
					isLoading={isLoading}
					t={t}
				/>
			)}
		</BadgeFaceted>
	);
};

BadgeTags.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	initialOperatorOpened: PropTypes.bool,
	initialValueOpened: PropTypes.bool,
	operator: operatorPropTypes,
	operators: operatorsPropTypes,
	size: PropTypes.oneOf(Object.values(Badge.SIZES)),
	category: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(
			PropTypes.shape({
				checked: PropTypes.bool,
				id: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired,
			}),
		),
	]),
	callbacks: callbacksPropTypes,
	t: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	removable: PropTypes.bool,
	displayType: PropTypes.oneOf(Object.values(Badge.TYPES)),
};
