import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Action from '@talend/react-components/lib/Actions/Action';
import FilterBar from '@talend/react-components/lib/FilterBar';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';
import { Checkbox } from '@talend/react-components/lib/Toggle';

// import { getTheme } from '@talend/react-components/lib/theme';

// import cssModule from './BadgeText.scss';

// const theme = getTheme(cssModule);

const useFilter = () => {
	const [filter, setFilter] = useState('');
	const onFilter = (_, filterValue) => setFilter(filterValue);
	const resetFilter = () => setFilter('');
	return [filter, onFilter, resetFilter];
};

const BadgeSelectCheckbox = ({ id, label, onChange, checked }) => {
	const describedby = `${id}-${label}`;
	return (
		<React.Fragment>
			<Checkbox
				onChange={onChange}
				aria-describedby={describedby}
				id={`${id}-checkbox-${label}`}
				label={label}
				checked={checked}
			/>
			<div id={describedby} className="sr-only">
				{label}
			</div>
		</React.Fragment>
	);
};

//TODO: dont forget data-feature for each box
const BadgeSelectInput = ({ id, onChange, onSubmit, value, values, t }) => {
	const [filter, onFilter, resetFilter] = useFilter();
	const badgeSelectInputId = `${id}-input`;
	const checkboxValues = values.map(checkbox => {
		const entity = value.find(v => v.id === checkbox.id);
		return {
			id: checkbox.id,
			label: checkbox.label,
			checked: entity ? entity.checked : checkbox.checked,
		};
	});

	const onChangeCheckBoxes = (event, checkboxId, checked) => {
		const entity = checkboxValues.find(checkboxValue => checkboxValue.id === checkboxId);
		entity.checked = checked;
		onChange(event, checkboxValues);
	};
	return (
		<form id={`${badgeSelectInputId}-form`} onSubmit={onSubmit}>
			<RichLayout.Body id={id}>
				<FilterBar
					autoFocus={false}
					dockable={false}
					docked={false}
					iconAlwaysVisible
					id={`${id}-filter`}
					placeholder={t('FIND_COLUMN_FILTER_PLACEHOLDER', {
						defaultValue: 'Find a column',
					})}
					onToggle={resetFilter}
					onFilter={onFilter}
					value={filter}
				/>
				{checkboxValues.map(({ label, checked }) => (
					<BadgeSelectCheckbox
						id={badgeSelectInputId}
						onChange={onChangeCheckBoxes}
						label={label}
						checked={checked}
					/>
				))}
			</RichLayout.Body>
			<RichLayout.Footer id={id}>
				<Action type="submit" label={t('APPLY', { defaultValue: 'Apply' })} bsStyle="info" />
			</RichLayout.Footer>
		</form>
	);
};

BadgeSelectInput.propTypes = {
	id: PropTypes.string.isRequired,
	// onChange: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	// value: PropTypes.string,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeSelectInput };
