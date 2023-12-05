/* eslint-disable jsx-a11y/no-autofocus */
import { Fragment, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import get from 'lodash/get';
import PropTypes from 'prop-types';

import { Rich } from '@talend/react-components';
import { Action } from '@talend/react-components/lib/Actions';
import FilterBar from '@talend/react-components/lib/FilterBar';
import { getTheme } from '@talend/react-components/lib/theme';
import { Checkbox } from '@talend/react-components/lib/Toggle';

import { I18N_DOMAIN_FACETED_SEARCH } from '../../../constants';
import { getApplyDataFeature, getDataAttributesFrom } from '../../../helpers/usage.helpers';

import cssModule from './BadgeCheckboxes.module.scss';

const theme = getTheme(cssModule);

const BadgeCheckbox = ({ checked, id, label, onChange }) => {
	const describedby = `${id}-${label}`;
	const onChangeCheckbox = event => {
		onChange(event, id);
	};
	return (
		<Fragment>
			<Checkbox
				onChange={onChangeCheckbox}
				aria-describedby={describedby}
				id={`${id}-checkbox`}
				label={label}
				checked={checked}
				data-testid={`badge-checkbox-form-checkbox-${id}`}
				data-test={`badge-checkbox-form-checkbox-${id}`}
			/>
			<div id={describedby} className="sr-only">
				{label}
			</div>
		</Fragment>
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

const BadgeCheckboxesForm = ({
	checkboxValues,
	id,
	onChange,
	onSubmit,
	value,
	feature,
	filterBarPlaceholder,
	allSelector,
	...rest
}) => {
	const { t } = useTranslation(I18N_DOMAIN_FACETED_SEARCH);
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
	const onToggleAll = event => {
		const checked = event.target.checked;
		if (checked) {
			const checkedCheckboxes = checkboxes.map(entity => ({ ...entity, checked: true }));
			onChange(event, checkedCheckboxes);
		} else {
			onChange(event, []);
		}
	};
	return (
		<Fragment>
			{allSelector ? (
				<div className={theme('fs-badge-checkbox-all')}>
					<BadgeCheckbox
						key="selectAll"
						id="selectAll"
						onChange={onToggleAll}
						label={t('FACETED_SEARCH_VALUE_ALL', {
							defaultValue: 'All',
						})}
						checked={checkboxes.filter(c => c.checked).length === checkboxValues.length}
					/>
				</div>
			) : (
				<FilterBar
					autoFocus={false}
					dockable={false}
					docked={false}
					iconAlwaysVisible
					id={`${badgeCheckBoxesFormId}-filter`}
					placeholder={
						filterBarPlaceholder ||
						t('FIND_COLUMN_FILTER_PLACEHOLDER', {
							defaultValue: 'Find a column',
						})
					}
					onToggle={() => setFilter('')}
					onFilter={(_, filterValue) => setFilter(filterValue)}
					value={filter}
					data-test="badge-checkbox-form-filter"
					data-testid="badge-checkbox-form-filter"
				/>
			)}
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
						{...getDataAttributesFrom(rest)}
					/>
				</Rich.Layout.Footer>
			</form>
		</Fragment>
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
	filterBarPlaceholder: PropTypes.string,
	allSelector: PropTypes.bool,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeCheckboxesForm };
