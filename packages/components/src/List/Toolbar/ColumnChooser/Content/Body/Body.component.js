import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ColumnDisplayer from '../../ColumnDisplayer';
import theme from '../ColumnChooser.scss';
import { columnChooserContext } from '../columnChooser.context';
import Tooltip from '../../TooltipCompound';

const ColumnChooserTable = ({ columns }) =>
	columns.map((column, index) => (
		<ColumnDisplayer>
			<ColumnDisplayer.ColumnVisibility
				index={index}
				value={column.hidden}
				locked={column.locked}
			/>
			<ColumnDisplayer.ColumnLabel label={column.label} />
			<ColumnDisplayer.ColumnOrder
				index={index}
				length={length}
				locked={column.locked}
				value={column.order}
			/>
		</ColumnDisplayer>
	));

ColumnChooserTable.propTypes = {
	columns: PropTypes.array.isRequired,
};

const getColumnChooserBodyContent = (columns, children) => {
	if (children && typeof children === 'function') {
		return children(columns);
	}
	return <ColumnChooserTable columns={columns} />;
};

const ColumnChooserBody = ({ children }) => {
	const { id, stateColumnChooser } = useContext(columnChooserContext);
	return (
		<Tooltip.TooltipBody
			id={`${id}-content`}
			className={classNames(theme['tc-column-chooser-body'], 'tc-column-chooser-body')}
		>
			{getColumnChooserBodyContent(stateColumnChooser.editedColumns, children)}
		</Tooltip.TooltipBody>
	);
};

ColumnChooserBody.ColumnDisplayer = ColumnDisplayer;
ColumnChooserBody.ColumnChooserTable = ColumnChooserTable;

ColumnChooserBody.propTypes = {
	children: PropTypes.func,
};

export default ColumnChooserBody;
