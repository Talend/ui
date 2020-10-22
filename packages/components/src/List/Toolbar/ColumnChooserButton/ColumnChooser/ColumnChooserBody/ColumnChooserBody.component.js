import React from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRow from '../ColumnChooserRow';
import SelectAllColumnsCheckbox from '../SelectAllColumnsCheckbox';
import ColumnChooserTable from '../ColumnChooserTable';
import { useColumnChooserContext } from '../columnChooser.context';
import RichLayout from '../../../../../Rich/Layout';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const Default = () => {
	const { columns, id, onChangeVisibility, onSelectAll, selectAll, t } = useColumnChooserContext();
	const bodyId = `${id}-body`;
	return (
		<React.Fragment>
			<SelectAllColumnsCheckbox id={bodyId} onChange={onSelectAll} value={selectAll} t={t} />
			<div className={theme('tc-column-chooser-columns-list')}>
				<ColumnChooserTable
					id={bodyId}
					columns={columns}
					onChangeCheckbox={onChangeVisibility}
					t={t}
				/>
			</div>
		</React.Fragment>
	);
};

const ColumnChooserBody = ({ children = <Default /> }) => {
	const { columns } = useColumnChooserContext();
	if (typeof children === 'function') {
		return children(columns);
	}
	return (
		<RichLayout.Body id="column-chooser-body">
			<div className={theme('tc-column-chooser-body')}>{children}</div>
		</RichLayout.Body>
	);
};

ColumnChooserBody.propTypes = {
	children: PropTypes.func,
};

ColumnChooserBody.Row = ColumnChooserRow;

export default ColumnChooserBody;
