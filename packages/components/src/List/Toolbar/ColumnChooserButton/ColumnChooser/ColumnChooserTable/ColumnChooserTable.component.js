import React from 'react';
import ColumnChooserRowRenderer from '../ColumnChooserRowRenderer';
import { columnsChooserPropTypes } from '../../columnChooser.propTypes';

const ColumnChooserTable = ({ columns = [], id, onClick, t }) =>
	columns.map(column => (
		<ColumnChooserRowRenderer key={column.label}>
			<ColumnChooserRowRenderer.Checkbox
				id={id}
				dataFeature="select-column-visibility-checkbox"
				describedby={`desc-column-${column.label}`}
				description={t('CHECKBOX_VISIBILITY_COLUMN_ARIA_DESCRIPTION', {
					defaultValue: `change visibility of column ${column.label}`,
				})}
				label={column.label}
				locked={column.locked}
				onClick={onClick}
				checked={column.visible}
				t={t}
			/>
		</ColumnChooserRowRenderer>
	));

ColumnChooserTable.propTypes = {
	columns: columnsChooserPropTypes,
};

export default ColumnChooserTable;
