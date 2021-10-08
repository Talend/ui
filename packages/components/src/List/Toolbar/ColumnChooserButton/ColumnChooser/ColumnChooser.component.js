import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import FilterBar from '../../../../FilterBar';
import { getTheme } from '../../../../theme';
import { useColumnChooserManager } from '../hooks';
import { ColumnChooserProvider } from './columnChooser.context';
import cssModule from './ColumnChooser.scss';
import ColumnChooserBody from './ColumnChooserBody';
import ColumnChooserFooter from './ColumnChooserFooter';
import ColumnChooserHeader from './ColumnChooserHeader';

const theme = getTheme(cssModule);

const changeVisibleToHidden = column => ({
	hidden: !column.visible,
	label: column.label,
	order: column.order,
	key: column.key,
});
const mapToColumnsList = columns => columns.map(changeVisibleToHidden);

export default function ColumnChooser({
	children,
	id,
	columnsFromList,
	initialFilterValue,
	nbLockedLeftItems = 0,
	onSubmit,
	t,
}) {
	const {
		columns,
		filteredColumns,
		onChangeVisibility,
		onSelectAll,
		selectAll,
		setTextFilter,
		textFilter,
	} = useColumnChooserManager(columnsFromList, nbLockedLeftItems, initialFilterValue);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.warn(
			'Guideline and development of the ColumnChooser component still in progress. It may have breaking change in the future',
		);
	}, []);

	// We are transforming back the field visible to hidden, to be compliant with the list.
	const onSubmitForm = event => {
		event.preventDefault();
		onSubmit(event, mapToColumnsList(columns));
	};

	// Filter field callbacks
	const onFilter = useCallback((_, value) => setTextFilter(value), [setTextFilter]);
	const resetFilter = useCallback(() => setTextFilter(''), [setTextFilter]);

	const Default = (
		<React.Fragment>
			<ColumnChooserHeader />
			<FilterBar
				autoFocus={false}
				className={theme('tc-column-chooser-filter')}
				dockable={false}
				docked={false}
				iconAlwaysVisible
				id={`${id}-filter`}
				placeholder={t('FIND_COLUMN_FILTER_PLACEHOLDER', {
					defaultValue: 'Find a column',
				})}
				onToggle={resetFilter}
				onFilter={onFilter}
				value={textFilter}
			/>
			<form id={`${id}-form`} className={theme('tc-column-chooser')} onSubmit={onSubmitForm}>
				<ColumnChooserBody />
				<ColumnChooserFooter />
			</form>
		</React.Fragment>
	);
	return (
		<ColumnChooserProvider
			value={{
				columns: filteredColumns,
				id,
				onChangeVisibility,
				onSelectAll,
				selectAll,
				t,
			}}
		>
			{!children ? Default : children}
		</ColumnChooserProvider>
	);
}

ColumnChooser.Header = ColumnChooserHeader;
ColumnChooser.Body = ColumnChooserBody;
ColumnChooser.Footer = ColumnChooserFooter;

ColumnChooser.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	columnsFromList: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	initialFilterValue: PropTypes.string,
	nbLockedLeftItems: PropTypes.number,
	onSubmit: PropTypes.func.isRequired,
	t: PropTypes.func,
};
