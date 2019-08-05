import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRowRenderer from '../ColumnChooserRowRenderer';
import SelectAllColumnsCheckbox from '../SelectAllColumnsCheckbox';
import ColumnChooserTable from '../ColumnChooserTable';
import { useColumnChooserContext } from '../columnChooser.context';
import Tooltip from '../../../../../Tooltip';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

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
			<SelectAllColumnsCheckbox id={bodyId} onChange={onSelectAll} value={selectAll} t={t} />
			<ColumnChooserTable
				id={bodyId}
				columns={columnsChooser}
				onChangeCheckbox={onChangeVisibility}
				t={t}
			/>
		</React.Fragment>
	);
};

const ColumnChooserBody = ({ children = <Default /> }) => {
	const { columnsChooser } = useColumnChooserContext();
	if (typeof children === 'function') {
		return children(columnsChooser);
	}
	return (
		<Tooltip.Body id={'column-chooser'} className={theme('tc-column-chooser-body')}>
			{children}
		</Tooltip.Body>
	);
};

ColumnChooserBody.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

ColumnChooserBody.Row = ColumnChooserRowRenderer;

export default ColumnChooserBody;
