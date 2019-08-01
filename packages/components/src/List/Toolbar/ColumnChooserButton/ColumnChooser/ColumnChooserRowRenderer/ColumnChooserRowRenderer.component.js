import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { columnChooserContext } from '../columnChooser.context';
import Label from './RowLabel';
import Checkbox from './RowCheckbox';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const ColumnChooserRowRenderer = ({ children, className }) => {
	const { id } = useContext(columnChooserContext);
	return (
		<div id={`${id}-row`} className={theme('tc-column-chooser-row', className)}>
			{children}
		</div>
	);
};

ColumnChooserRowRenderer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	className: PropTypes.string,
};

ColumnChooserRowRenderer.Checkbox = Checkbox;
ColumnChooserRowRenderer.Label = Label;

export default ColumnChooserRowRenderer;
