import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ColumnChooserRowRenderer from '../ColumnChooserRowRenderer';
import theme from '../ColumnChooser.scss';
import { columnChooserContext } from '../columnChooser.context';
import Tooltip from '../../Tooltip';

const ColumnChooserTable = ({ columns }) =>
	columns.map((column, index) => (
		<ColumnChooserRowRenderer>
			<ColumnChooserRowRenderer.Visibility
				index={index}
				value={column.hidden}
				locked={column.locked}
			/>
			<ColumnChooserRowRenderer.Label label={column.label} />
		</ColumnChooserRowRenderer>
	));

ColumnChooserTable.propTypes = {
	columns: PropTypes.array.isRequired,
};

const getColumnChooserBodyContent = (columns, children) => {
	if (typeof children === 'function') {
		return children(columns);
	}
	return <ColumnChooserTable columns={columns} />;
};

const ColumnChooserBody = ({ children }) => {
	const { id, stateColumnChooser } = useContext(columnChooserContext);
	return (
		<Tooltip.Body
			id={`${id}-content`}
			className={classNames(theme['tc-column-chooser-body'], 'tc-column-chooser-body')}
		>
			{getColumnChooserBodyContent(stateColumnChooser.editedColumns, children)}
		</Tooltip.Body>
	);
};

ColumnChooserBody.RowRenderer = ColumnChooserRowRenderer;
ColumnChooserBody.Table = ColumnChooserTable;

ColumnChooserBody.propTypes = {
	children: PropTypes.func,
};

export default ColumnChooserBody;
