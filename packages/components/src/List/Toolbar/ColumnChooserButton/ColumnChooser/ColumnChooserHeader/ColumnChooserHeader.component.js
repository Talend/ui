import React from 'react';
import PropTypes from 'prop-types';
import { useColumnChooserContext } from '../columnChooser.context';
import RichLayout from '../../../../../RichTooltip/RichLayout';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const filterVisibleColumns = column => column.visible;

const Default = () => {
	const { columnsChooser, t } = useColumnChooserContext();
	const selectedColumns = t('SELECT_COLUMNS', {
		defaultValue: 'selected columns',
	});
	const lengthVisibleColumns = columnsChooser.filter(filterVisibleColumns).length;
	return (
		<div>
			<div className={theme('tc-column-chooser-header-title')}>
				{t('COLUMN_CHOOSER_HEADER_TITLE', {
					defaultValue: 'Modify columns',
				})}
			</div>
			<div id="selected-columns-text">{`${lengthVisibleColumns}/${
				columnsChooser.length
			} ${selectedColumns}`}</div>
		</div>
	);
};

const ColumnChooserHeader = ({ className, children = <Default /> }) => (
	<RichLayout.Header
		id="column-chooser-header"
		className={theme('tc-column-chooser-header', className)}
	>
		{children}
	</RichLayout.Header>
);

ColumnChooserHeader.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element])),
	]),
	className: PropTypes.string,
};

export default ColumnChooserHeader;
