/* eslint-disable jsx-a11y/no-autofocus */
import { useMemo, useState } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { DropdownButton } from '@talend/design-system';
import { Action } from '@talend/react-components/lib/Actions';
import FilterBar from '@talend/react-components/lib/FilterBar';
import Rich from '@talend/react-components/lib/Rich';
import { getTheme } from '@talend/react-components/lib/theme';

import cssModule from './BadgeMenu.module.scss';
import { getDataAttributesFrom } from '../../../helpers/usage.helpers';

const theme = getTheme(cssModule);

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
		? t('SHOW_SELECTED_ITEM', { defaultValue: 'Selected' })
		: t('SHOW_ALL_ITMES', { defaultValue: 'Show all' });
	return (
		<>
			<Rich.Layout.Header className={theme('fs-badge-menu-form-header')}>
				<FilterBar
					className={theme('menu-items-filter')}
					autoFocus={false}
					dockable={false}
					docked={false}
					iconAlwaysVisible
					id={`${badgeMenuFormId}-filter`}
					placeholder={
						filterBarPlaceholder ||
						t('FIND_COLUMN_FILTER_PLACEHOLDER', {
							defaultValue: 'Find a column',
						})
					}
					onToggle={() => setFilter('')}
					onFilter={(_, filterValue) => setFilter(filterValue)}
					value={filter}
					data-test="badge-menu-filter"
					data-testid="badge-menu-filter"
				/>
			</Rich.Layout.Header>
			<form
				className={theme('fs-badge-menu-form')}
				id={`${badgeMenuFormId}-form`}
				onSubmit={onSubmit}
			>
				<Rich.Layout.Body id={badgeMenuFormId} className={theme('fs-badge-menu-form-body')}>
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
				</Rich.Layout.Body>
				<Rich.Layout.Footer id={id} className={theme('fs-badge-menu-form-footer')}>
					<div>
						{!isEmpty(value) && (
							<Action
								type="button"
								onClick={() => {
									setShowAll(!showAll);
									setFilter('');
								}}
								label={showSelectedToggleLabel}
								bsStyle="link"
								className={theme('fs-badge-menu-form-left-button')}
							/>
						)}
					</div>
					<Action
						type="submit"
						label={t('APPLY', { defaultValue: 'Apply' })}
						bsStyle="info"
						{...getDataAttributesFrom(rest)}
					/>
				</Rich.Layout.Footer>
			</form>
		</>
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
