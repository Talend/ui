import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ColumnChooserProvider } from './columnChooser.context';
import { useColumnChooserManager } from '../hooks';
import FilterBar from '../../../../FilterBar';
import ColumnChooserBody from './ColumnChooserBody';
import ColumnChooserFooter from './ColumnChooserFooter';
import ColumnChooserHeader from './ColumnChooserHeader';
import cssModule from './ColumnChooser.scss';
import { getTheme } from '../../../../theme';

const theme = getTheme(cssModule);

const hasColumnLabel = label => column => column.label.toLowerCase().includes(label.toLowerCase());
const filterColumnsChooser = (columns, filter) => columns.filter(hasColumnLabel(filter));
const changeVisibleToHidden = column => ({ ...column, hidden: !column.visible });
const transformColumnsChooser = columns => columns.map(changeVisibleToHidden);

export default function ColumnChooser({
	children,
	columns,
	id,
	initialFilterValue,
	nbLockedLeftItems = 0,
	onClose,
	onSubmit,
}) {
	const { t } = useTranslation();
	const { columnsChooser, onChangeVisibility, onSelectAll, selectAll } = useColumnChooserManager(
		columns,
		nbLockedLeftItems,
	);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.warn(
			'Guideline and development of the ColumnChooser component still in progress. It may have breaking change in the future',
		);
	}, []);

	// We are transforming back the field visible to hidden, to be compliant with the list.
	const onSubmitForm = event => {
		event.preventDefault();
		onSubmit(event, transformColumnsChooser(columnsChooser));
	};
	const [filter, setFilter] = useState(initialFilterValue || '');
	const onFilter = (_, value) => setFilter(value);
	const resetFilter = () => setFilter('');
	const filteredColumnsChooser = useMemo(() => filterColumnsChooser(columnsChooser, filter), [
		columnsChooser,
		filter,
	]);
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
				value={filter}
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
				columnsChooser: filteredColumnsChooser,
				id,
				onChangeVisibility,
				onClose,
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
	columns: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	initialFilterValue: PropTypes.string,
	nbLockedLeftItems: PropTypes.number,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
};
