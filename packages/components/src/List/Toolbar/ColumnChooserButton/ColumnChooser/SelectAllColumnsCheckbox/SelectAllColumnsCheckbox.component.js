import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRow from '../ColumnChooserRow';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const SelectAllColumnsCheckbox = ({ id, onChange, value, t }) => (
	<ColumnChooserRow className={theme('tc-column-chooser-row-select-all')}>
		<ColumnChooserRow.Checkbox
			id={id}
			dataFeature="select-all-columns"
			describedby="desc-select-all-columns"
			description={t('CHECKBOX_SELECT_ALL_COLUMNS_ARIA_DESCRIPTION', {
				defaultValue: 'select or deselect all the columns',
			})}
			label={t('CHECKBOX_VISIBILITY_LABEL', {
				defaultValue: 'Columns',
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
