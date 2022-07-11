import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRow from '../ColumnChooserRow';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const getLabels = (checked, t) => {
	return checked
		? {
				label: t('TC_COLUMN_CHOOSER_UNSELECT_ALL', {
					defaultValue: 'Unselect all',
				}),
				description: t('CHECKBOX_DESELECT_ALL_COLUMNS_DESCRIPTION', {
					defaultValue: 'hide all the columns',
				}),
		  }
		: {
				label: t('TC_COLUMN_CHOOSER_SELECT_ALL', {
					defaultValue: 'Select all',
				}),
				description: t('CHECKBOX_SELECT_ALL_COLUMNS_DESCRIPTION', {
					defaultValue: 'display all the columns',
				}),
		  };
};

const SelectAllColumnsCheckbox = ({ id, onChange, value, t }) => {
	const { label, description } = getLabels(value, t);
	return (
		<ColumnChooserRow className={theme('tc-column-chooser-row-select-all')}>
			<ColumnChooserRow.Checkbox
				id={id}
				dataFeature="column-chooser.select.all"
				description={description}
				label={label}
				onChange={onChange}
				checked={value}
				intermediate={value === undefined}
				t={t}
			/>
		</ColumnChooserRow>
	);
};

SelectAllColumnsCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

export default SelectAllColumnsCheckbox;
