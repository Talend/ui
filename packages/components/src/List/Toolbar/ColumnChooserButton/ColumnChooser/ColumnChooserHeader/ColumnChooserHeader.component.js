import React from 'react';
import PropTypes from 'prop-types';
import { useColumnChooserContext } from '../columnChooser.context';
import RichLayout from '../../../../../Rich/RichLayout';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const isVisible = column => column.visible;

const Default = () => {
	const { columns, t } = useColumnChooserContext();
	const selectedColumns = t('SELECT_COLUMNS', {
		count: columns.filter(isVisible).length,
		defaultValue: `{{count}}/${columns.length} selected`,
	});
	return (
		<div>
			<div className={theme('tc-column-chooser-header-title')}>
				{t('COLUMN_CHOOSER_HEADER_TITLE', {
					defaultValue: 'Select columns to display',
				})}
			</div>
			<div id="selected-columns-text">{selectedColumns}</div>
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

ColumnChooserHeader.SelectAll = ColumnChooserHeader;

export default ColumnChooserHeader;
