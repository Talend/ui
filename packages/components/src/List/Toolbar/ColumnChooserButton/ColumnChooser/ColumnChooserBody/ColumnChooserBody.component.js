import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRowRenderer from '../ColumnChooserRowRenderer';
import SelectAllColumnsCheckbox from '../SelectAllColumnsCheckbox';
import { useColumnChooserContext } from '../columnChooser.context';
import { columnsChooserPropTypes } from '../../columnChooser.propTypes';
import Tooltip from '../../../../../Tooltip';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const ColumnChooserTable = ({ columns = [], id, onClick, t }) =>
	columns.map(column => (
		<ColumnChooserRowRenderer key={column.label}>
			<ColumnChooserRowRenderer.Checkbox
				id={id}
				dataFeature={'select-column-visibility-checkbox'}
				describedby={`desc-column-${column.label}`}
				description={t('CHECKBOX_VISIBILITY_COLUMN_ARIA_DESCRIPTION', {
					defaultValue: `change visibility of column ${column.label}`,
				})}
				label={column.label}
				locked={column.locked}
				onClick={onClick(column.label)}
				value={column.hidden}
				t={t}
			/>
		</ColumnChooserRowRenderer>
	));

ColumnChooserTable.propTypes = {
	columns: columnsChooserPropTypes,
};

const ColumnChooserBody = ({ children }) => {
	const {
		id,
		columnsChooser,
		onChangeVisibility,
		onSelectAll,
		selectAll,
		t,
	} = useColumnChooserContext();
	const bodyId = `${id}-body`;

	return (
		<Tooltip.Body id={bodyId} className={theme('tc-column-chooser-body')}>
			{!children ? (
				<React.Fragment>
					<SelectAllColumnsCheckbox id={bodyId} onClick={onSelectAll} value={selectAll} t={t} />
					<ColumnChooserTable
						id={bodyId}
						columns={columnsChooser}
						onClick={onChangeVisibility}
						t={t}
					/>
				</React.Fragment>
			) : (
				children(columnsChooser)
			)}
		</Tooltip.Body>
	);
};

ColumnChooserBody.Row = ColumnChooserRowRenderer;

ColumnChooserBody.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

export default ColumnChooserBody;
