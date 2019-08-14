import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRow from '../ColumnChooserRow';
import { columnsChooserPropTypes } from '../../columnChooser.propTypes';

const getDescription = (checked, label, t) => {
	if (checked) {
		return t('CHECKBOX_HIDE_COLUMN_DESCRIPTION', {
			defaultValue: 'hide the column {{  }}',
			label,
		});
	}
	return t('CHECKBOX_DISPLAY_COLUMN_DESCRIPTION', {
		defaultValue: 'display the column {{ label }}',
		label,
	});
};

const ColumnChooserTable = ({ columns = [], id, onChangeCheckbox, t }) =>
	columns.map(column => (
		<ColumnChooserRow key={column.label}>
			<ColumnChooserRow.Checkbox
				checked={column.visible}
				id={id}
				dataFeature="column-chooser.select"
				describedby={`desc-column-${column.label}`}
				description={getDescription(column.visible, column.label, t)}
				label={column.label}
				locked={column.locked}
				onChange={onChangeCheckbox}
				t={t}
			/>
		</ColumnChooserRow>
	));

ColumnChooserTable.propTypes = {
	columns: columnsChooserPropTypes,
	id: PropTypes.string.isRequired,
	onChangeCheckbox: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export default ColumnChooserTable;
