import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRow from '../ColumnChooserRow';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const getDescription = (checked, t) => {
	if (checked) {
		return t('CHECKBOX_DESELECT_ALL_COLUMNS_DESCRIPTION', {
			defaultValue: 'hide all the columns',
		});
	}
	return t('CHECKBOX_SELECT_ALL_COLUMNS_DESCRIPTION', {
		defaultValue: 'display all the columns',
	});
};

const SelectAllColumnsCheckbox = ({ id, onChange, value, t }) => (
	<ColumnChooserRow className={theme('tc-column-chooser-row-select-all')}>
		<ColumnChooserRow.Checkbox
			id={id}
			dataFeature="column-chooser.select.all"
			description={getDescription(value, t)}
			label={t('CHECKBOX_VISIBILITY_LABEL', {
				defaultValue: 'Select All',
			})}
			onChange={onChange}
			checked={value}
			t={t}
		/>
	</ColumnChooserRow>
);

SelectAllColumnsCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

export default SelectAllColumnsCheckbox;
