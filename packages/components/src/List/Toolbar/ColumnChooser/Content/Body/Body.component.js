import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ColumnDisplayer from '../../ColumnDisplayer';
import theme from '../ColumnChooser.scss';
import { columnChooserContext } from '../columnChooser.context';

const ColumnChooserTable = ({ columns }) => {
	console.log({ columns });
	return columns.map((column, index) => {
		return (
			<ColumnDisplayer
				label={column.label}
				hidden={column.hidden}
				locked={column.locked}
				order={column.order}
				length={columns.length}
				index={index}
				default
			/>
		);
	});
};

const TooltipBody = props => {
	return (
		<div style={{ display: 'flex', flexDirection: 'row', margin: '20px' }}>{props.children}</div>
	);
};

const Body = ({ columns, ...rest }) => {
	const { id, stateColumnChooser } = useContext(columnChooserContext);
	const usedColumns = columns || stateColumnChooser.editedColumns;
	if (rest.default) {
		return (
			<div
				id={`${id}-content`}
				className={classNames(theme['tc-column-chooser-body'], 'tc-column-chooser-body')}
			>
				<ColumnChooserTable columns={usedColumns} />
			</div>
		);
	}
	return (
		<div
			id={`${id}-content`}
			className={classNames(theme['tc-column-chooser-body'], 'tc-column-chooser-body')}
		>
			{rest.children(usedColumns)}
		</div>
	);
};

Body.ColumnDisplayer = ColumnDisplayer;
Body.ColumnChooserTable = ColumnChooserTable;

Body.propTypes = {
	columns: PropTypes.array.isRequired,
};

export default Body;
