import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Action } from '@talend/react-components/lib/Actions';
import FilterBar from '@talend/react-components/lib/FilterBar';
import { Rich } from '@talend/react-components';
import { Checkbox } from '@talend/react-components/lib/Toggle';
import { getTheme } from '@talend/react-components/lib/theme';
import cssModule from './BadgeCheckboxes.scss';
import { getApplyDataFeature } from '../../../helpers/usage.helpers';

const theme = getTheme(cssModule);

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

const getCheckboxes = (checkboxes, value, filterValue) => {
	const formatFilterValue = filterValue.trim().toLocaleLowerCase();

	return checkboxes
		.filter(checkbox => get(checkbox, 'label', '').toLocaleLowerCase().includes(formatFilterValue))
		.map(createCheckboxEntity(value));
};

const BadgeCheckboxesForm = ({ checkboxValues, id, onChange, onSubmit, value, feature, t }) => {
	const [filter, setFilter] = useState('');

	const badgeCheckBoxesFormId = `${id}-checkboxes-form`;
	const checkboxes = useCallback(getCheckboxes(checkboxValues, value, filter), [
		checkboxValues,
		value,
		filter,
	]);
	const applyDataFeature = useMemo(() => getApplyDataFeature(feature), [feature]);
	const onChangeCheckBoxes = (event, checkboxId) => {
		const entity = checkboxes.find(checkboxValue => checkboxValue.id === checkboxId);
		if (entity) {
			entity.checked = event.target.checked;
		}
		onChange(
			event,
			checkboxes.filter(c => c.checked),
		);
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
				onToggle={() => setFilter('')}
				onFilter={(_, filterValue) => setFilter(filterValue)}
				value={filter}
			/>
			<form
				className={theme('fs-badge-checkbox-form')}
				id={`${badgeCheckBoxesFormId}-form`}
				onSubmit={onSubmit}
			>
				<Rich.Layout.Body
					id={badgeCheckBoxesFormId}
					className={theme('fs-badge-checkbox-form-body')}
				>
					{checkboxes.map(checkbox => (
						<BadgeCheckbox
							key={checkbox.id}
							id={checkbox.id}
							onChange={onChangeCheckBoxes}
							label={checkbox.label}
							checked={checkbox.checked}
						/>
					))}
				</Rich.Layout.Body>
				<Rich.Layout.Footer id={id} className={theme('fs-badge-checkbox-form-footer')}>
					<Action
						data-feature={applyDataFeature}
						type="submit"
						label={t('APPLY', { defaultValue: 'Apply' })}
						bsStyle="info"
					/>
				</Rich.Layout.Footer>
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
	feature: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeCheckboxesForm };
