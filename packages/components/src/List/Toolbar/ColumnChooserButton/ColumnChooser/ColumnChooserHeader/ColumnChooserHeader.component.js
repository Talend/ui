import React from 'react';
import PropTypes from 'prop-types';
import { useColumnChooserContext } from '../columnChooser.context';
import Tooltip from '../../../../../Tooltip';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const filterVisibleColumns = column => !column.hidden;

const ColumnChooserHeader = ({ className, children }) => {
	const { id, columnsChooser, t } = useColumnChooserContext();
	const lengthVisibleColumns = columnsChooser.filter(filterVisibleColumns).length;
	const selectedColumns = t('SELECT_COLUMNS', {
		defaultValue: 'selected columns',
	});
	const Content = (
		<div>
			<div className={theme('tc-column-chooser-header-title', className)}>
				{t('COLUMN_CHOOSER_HEADER_TITLE', {
					defaultValue: 'Modify columns',
				})}
			</div>
			<div>{`${lengthVisibleColumns}/${columnsChooser.length} ${selectedColumns}`}</div>
		</div>
	);
	return (
		<Tooltip.Header className={theme('tc-column-chooser-header', className)} id={id}>
			{!children ? Content : children}
		</Tooltip.Header>
	);
};

ColumnChooserHeader.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	className: PropTypes.string,
};

export default ColumnChooserHeader;
