import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Action from '@talend/react-components/lib/Actions/Action';
import FilterBar from '@talend/react-components/lib/FilterBar';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';
import Toggle, { Checkbox } from '@talend/react-components/lib/Toggle';

import { getTheme } from '@talend/react-components/lib/theme';

import cssModule from './BadgeCheckboxes.scss';

const theme = getTheme(cssModule);

const useFilter = () => {
	const [filter, setFilter] = useState('');
	const onFilter = (_, filterValue) => setFilter(filterValue.trim().toLowerCase());
	const resetFilter = () => setFilter('');
	return [filter, onFilter, resetFilter];
};

const BadgeCheckbox = ({ checked, id, label, onChange }) => {
	const describedby = `${id}-${label}`;
	const onChangeCheckbox = event => {
		onChange(event, id);
	};
	return (
		<React.Fragment>
			<Checkbox
				onChange={onChangeCheckbox}
				aria-describedby={describedby}
				id={`${id}-checkbox`}
				label={label}
				checked={checked}
			/>
			<div id={describedby} className="sr-only">
				{label}
			</div>
		</React.Fragment>
	);
};

BadgeCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool,
};

const createCheckboxEntity = value => checkbox => {
	const entity = value.find(v => v.id === checkbox.id);
	return {
		id: checkbox.id,
		label: checkbox.label,
		checked: entity ? entity.checked : checkbox.checked || false,
	};
};

const getCheckboxes = (checkboxes, value, filterValue) =>
	checkboxes
		.filter(checkbox => checkbox.label.toLowerCase().includes(filterValue))
		.map(createCheckboxEntity(value));

const BadgeCheckboxesForm = ({ checkboxValues, id, onChange, onSubmit, value, t }) => {
	const [filter, onFilter, resetFilter] = useFilter();
	const [showSelected, setToggleShowSelected] = useState(false);
	const badgeCheckBoxesFormId = `${id}-checkboxes-form`;
	const checkboxes = useMemo(() => getCheckboxes(checkboxValues, value, filter), [
		checkboxValues,
		value,
		filter,
	]);
	const displayedCheckboxes = showSelected
		? checkboxes.filter(checkbox => checkbox.checked)
		: checkboxes;
	const onChangeCheckBoxes = (event, checkboxId) => {
		const entity = checkboxes.find(checkboxValue => checkboxValue.id === checkboxId);
		if (entity) {
			entity.checked = event.target.checked;
		}
		onChange(event, checkboxes.filter(c => c.checked));
	};
	return (
		<React.Fragment>
			<FilterBar
				autoFocus={false}
				dockable={false}
				docked={false}
				iconAlwaysVisible
				id={`${badgeCheckBoxesFormId}-filter`}
				placeholder={t('FIND_COLUMN_FILTER_PLACEHOLDER', {
					defaultValue: 'Find an entity',
				})}
				onToggle={resetFilter}
				onFilter={onFilter}
				value={filter}
			/>
			<form
				className={theme('fs-badge-checkbox-form')}
				id={`${badgeCheckBoxesFormId}-form`}
				onSubmit={onSubmit}
			>
				<RichLayout.Body
					id={badgeCheckBoxesFormId}
					className={theme('fs-badge-checkbox-form-body')}
				>
					{displayedCheckboxes.map(checkbox => (
						<BadgeCheckbox
							key={checkbox.id}
							id={checkbox.id}
							onChange={onChangeCheckBoxes}
							label={checkbox.label}
							checked={checkbox.checked}
						/>
					))}
				</RichLayout.Body>
				<RichLayout.Footer id={id} className={theme('fs-badge-checkbox-form-footer')}>
					<Toggle
						checked={showSelected}
						id={`${badgeCheckBoxesFormId}-show-checked`}
						label={t('TOGGLE_SELECTED_VALUES_ONLY', { defaultValue: 'Selected values only' })}
						onChange={() => setToggleShowSelected(!showSelected)}
						test-id="checkbox-selected-values-only"
					/>
					<Action type="submit" label={t('APPLY', { defaultValue: 'Apply' })} bsStyle="info" />
				</RichLayout.Footer>
			</form>
		</React.Fragment>
	);
};

BadgeCheckboxesForm.propTypes = {
	checkboxValues: PropTypes.arrayOf(
		PropTypes.shape({
			checked: PropTypes.bool,
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		}),
	),
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.array,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeCheckboxesForm };
