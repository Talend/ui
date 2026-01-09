/* eslint-disable jsx-a11y/no-autofocus */
import { useMemo, useState } from 'react';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import {
	ButtonPrimary,
	ButtonTertiary,
	DropdownButton,
	Form,
	SkeletonHeading,
	StackVertical,
} from '@talend/design-system';
import { getDataAttrFromProps } from '@talend/utils';

import styles from './BadgeMenu.module.css';

const createRowItemEntity = value => option => {
	return {
		id: option.id,
		label: option.label,
		checked: option.id === value.id,
	};
};

const getRows = (values, value) => {
	return values.map(createRowItemEntity(value));
};

const getVisibleRows = (rows, filterValue, showAll) => {
	const formatFilterValue = filterValue.trim().toLocaleLowerCase();
	return rows
		.filter(option => get(option, 'label', '').toLocaleLowerCase().includes(formatFilterValue))
		.filter(row => (showAll ? true : row.checked));
};

const BadgeMenuForm = ({
	values,
	id,
	onChange,
	onSubmit,
	value,
	filterBarPlaceholder,
	t,
	...rest
}) => {
	const [filter, setFilter] = useState('');
	const [showAll, setShowAll] = useState(true);

	const badgeMenuFormId = `${id}-menu-form`;
	const items = useMemo(() => getRows(values, value), [values, value]);
	const visibleItems = useMemo(
		() => getVisibleRows(items, filter, showAll),
		[items, filter, showAll],
	);
	const showSelectedToggleLabel = showAll
		? t('SHOW_SELECTED_ITEMS', { defaultValue: 'Show selected' })
		: t('SHOW_ALL_ITEMS', { defaultValue: 'Show all' });
	return (
		<Form id={`${badgeMenuFormId}-form`} onSubmit={onSubmit}>
			<Form.Search
				id={`${badgeMenuFormId}-filter`}
				placeholder={
					filterBarPlaceholder ||
					t('FIND_COLUMN_FILTER_PLACEHOLDER', {
						defaultValue: 'Find a column',
					})
				}
				onChange={event => {
					setFilter(event?.target?.value || '');
				}}
				value={filter}
				data-test="badge-menu-filter"
				data-testid="badge-menu-filter"
			/>
			<div className={styles['fs-badge-menu-form-items']}>
				{!rest.isLoading ? (
					<StackVertical gap="0">
						{visibleItems.map(rowItem => {
							return (
								<DropdownButton
									key={rowItem.id}
									onClick={event => {
										onChange(event, rowItem);
									}}
									checked={rowItem.checked}
									data-testid={`badge-menu-form-item-${rowItem.id}`}
									data-test={`badge-menu-form-item-${rowItem.id}`}
								>
									<span>{rowItem.label}</span>
								</DropdownButton>
							);
						})}
					</StackVertical>
				) : (
					<StackVertical
						gap="S"
						data-testid="badge-menu-form-skeleton-item"
						data-test="badge-menu-form-skeleton-item"
					>
						<SkeletonHeading size="L" width="100" />
						<SkeletonHeading size="L" width="100" />
						<SkeletonHeading size="L" width="100" />
					</StackVertical>
				)}
			</div>
			<Form.Buttons padding={{ x: 0, bottom: 0, top: 'M' }}>
				{!isEmpty(value) && (
					<ButtonTertiary
						type="button"
						onClick={() => {
							setShowAll(!showAll);
							setFilter('');
						}}
					>
						{showSelectedToggleLabel}
					</ButtonTertiary>
				)}
				<ButtonPrimary type="submit" disabled={rest.isLoading} {...getDataAttrFromProps(rest)}>
					{t('APPLY', { defaultValue: 'Apply' })}
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

BadgeMenuForm.propTypes = {
	values: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			checked: PropTypes.bool,
		}),
	),
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.object,
	filterBarPlaceholder: PropTypes.string,
	t: PropTypes.func.isRequired,
};

export { BadgeMenuForm };
