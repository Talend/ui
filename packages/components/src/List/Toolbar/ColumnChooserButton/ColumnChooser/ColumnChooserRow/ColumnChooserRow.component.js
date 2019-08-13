import React from 'react';
import PropTypes from 'prop-types';
import Label from './RowLabel';
import Checkbox from './RowCheckbox';
import cssModule from '../ColumnChooser.scss';
import { getTheme } from '../../../../../theme';

const theme = getTheme(cssModule);

const ColumnChooserRow = ({ children, className }) => (
	<div className={theme('tc-column-chooser-row', className)}>{children}</div>
);

ColumnChooserRow.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	className: PropTypes.string,
};

ColumnChooserRow.Checkbox = Checkbox;
ColumnChooserRow.Label = Label;

export default ColumnChooserRow;
