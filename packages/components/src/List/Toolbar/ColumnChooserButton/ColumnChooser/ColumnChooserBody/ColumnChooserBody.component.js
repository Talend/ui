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

const Default = () => {
	const {
		columnsChooser,
		id,
		onChangeVisibility,
		onSelectAll,
		selectAll,
		t,
	} = useColumnChooserContext();
	const bodyId = `${id}-body`;
	return (
		<React.Fragment>
			<SelectAllColumnsCheckbox id={bodyId} onClick={onSelectAll} value={selectAll} t={t} />
			<ColumnChooserTable id={bodyId} columns={columnsChooser} onClick={onChangeVisibility} t={t} />
		</React.Fragment>
	);
};

const ColumnChooserBody = ({ children = <Default /> }) => (
	<Tooltip.Body id={'column-chooser'} className={theme('tc-column-chooser-body')}>
		{children}
	</Tooltip.Body>
);
ColumnChooserBody.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

ColumnChooserBody.Row = ColumnChooserRowRenderer;

export default ColumnChooserBody;
