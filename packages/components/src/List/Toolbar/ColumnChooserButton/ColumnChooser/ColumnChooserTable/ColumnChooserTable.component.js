import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRow from '../ColumnChooserRow';
import { columnsPropTypes } from '../../columnChooser.propTypes';

const ColumnChooserTable = ({ columns = [], id, onChangeCheckbox, t }) =>
	columns.map(column => (
		<ColumnChooserRow key={column.key}>
			<ColumnChooserRow.Checkbox
				checked={column.visible}
				id={id}
				dataFeature="column-chooser.select"
				description={t('CHECKBOX_DISPLAY_COLUMN_DESCRIPTION', {
					defaultValue: 'display the column {{label}}',
					label: column.label,
				})}
				label={column.label}
				locked={column.locked}
				onChange={onChangeCheckbox}
				t={t}
			/>
		</ColumnChooserRow>
	));

ColumnChooserTable.propTypes = {
	columns: columnsPropTypes,
	id: PropTypes.string.isRequired,
	onChangeCheckbox: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export default ColumnChooserTable;
