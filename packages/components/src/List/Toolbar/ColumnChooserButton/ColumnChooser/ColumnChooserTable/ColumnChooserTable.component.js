import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRow from '../ColumnChooserRow';
import { columnsChooserPropTypes } from '../../columnChooser.propTypes';

const ColumnChooserTable = ({ columns = [], id, onChangeCheckbox, t }) =>
	columns.map(column => (
		<ColumnChooserRow key={column.label}>
			<ColumnChooserRow.Checkbox
				id={id}
				dataFeature="select-column-visibility-checkbox"
				describedby={`desc-column-${column.label}`}
				description={t('CHECKBOX_VISIBILITY_COLUMN_ARIA_DESCRIPTION', {
					defaultValue: `change visibility of column ${column.label}`,
				})}
				label={column.label}
				locked={column.locked}
				onChange={onChangeCheckbox}
				checked={column.visible}
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
