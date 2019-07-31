import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ColumnChooserRowRenderer from '../ColumnChooserRowRenderer';
import theme from '../ColumnChooser.scss';
import { useColumnChooserContext } from '../columnChooser.context';
import { columnsChooserPropTypes } from '../../columnChooser.propTypes';
import Tooltip from '../../../../../Tooltip';

const ColumnChooserTable = ({ columns = [] }) =>
	columns.map((column, index) => (
		<ColumnChooserRowRenderer key={column.label}>
			<ColumnChooserRowRenderer.Visibility
				index={index}
				locked={column.locked}
				value={column.hidden}
			/>
			<ColumnChooserRowRenderer.Label label={column.label} />
		</ColumnChooserRowRenderer>
	));

ColumnChooserTable.propTypes = {
	columns: columnsChooserPropTypes,
};

const ColumnChooserBody = ({ children }) => {
	const { id, columnsChooser } = useColumnChooserContext();
	return (
		<Tooltip.Body
			id={`${id}-content`}
			className={classNames(theme['tc-column-chooser-body'], 'tc-column-chooser-body')}
		>
			{!children ? <ColumnChooserTable columns={columnsChooser} /> : children(columnsChooser)}
		</Tooltip.Body>
	);
};

ColumnChooserBody.Row = ColumnChooserRowRenderer;

ColumnChooserBody.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

export default ColumnChooserBody;
