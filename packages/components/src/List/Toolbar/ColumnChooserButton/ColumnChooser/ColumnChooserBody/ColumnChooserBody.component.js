import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ColumnChooserRowRenderer from '../ColumnChooserRowRenderer';
import SelectAllColumnsCheckbox from '../SelectAllColumnsCheckbox';
import FilterBar from '../../../../../FilterBar';
import { useColumnChooserContext } from '../columnChooser.context';
import { columnsChooserPropTypes } from '../../columnChooser.propTypes';
import Tooltip from '../../../../../Tooltip';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const ColumnChooserTable = ({ columns = [], id, onClick, t }) => {
	return columns.map((column, index) => (
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
				onClick={onClick(index)}
				value={column.hidden}
				t={t}
			/>
		</ColumnChooserRowRenderer>
	));
};

ColumnChooserTable.propTypes = {
	columns: columnsChooserPropTypes,
};

const haveColumnLabel = label => column => column.label.toLowerCase().includes(label.toLowerCase());
const filterColumnsChooser = (columns, filter) =>
	columns.filter(haveColumnLabel(filter));

const ColumnChooserBody = ({ children, filterValue }) => {
	const {
		id,
		columnsChooser,
		onChangeVisibility,
		onSelectAll,
		selectAll,
		t,
	} = useColumnChooserContext();
	const bodyId = `${id}-body`;
	const [filter, setFilter] = useState(filterValue || '');

	const onFilter = (_, value) => setFilter(value);
	const resetFilter = () => setFilter('');
	const filteredColumnsChooser = useMemo(() => filterColumnsChooser(columnsChooser, filter), [
		columnsChooser,
		filter,
	]);
	return (
		<Tooltip.Body id={bodyId} className={theme('tc-column-chooser-body')}>
			{!children ? (
				<React.Fragment>
					<FilterBar
						autoFocus={false}
						className={theme('tc-column-chooser-body-filter')}
						dockable={false}
						docked={false}
						iconAlwaysVisible
						id={`${id}-filter`}
						placeholder={t('FIND_COLUMN_FILTER_PLACEHOLDER', {
							defaultValue: 'Find a column',
						})}
						onToggle={resetFilter}
						onFilter={onFilter}
						value={filter}
					/>
					<SelectAllColumnsCheckbox id={bodyId} onClick={onSelectAll} value={selectAll} t={t} />
					<ColumnChooserTable
						id={bodyId}
						columns={filteredColumnsChooser}
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
	filterValue: PropTypes.string,
};

export default ColumnChooserBody;
