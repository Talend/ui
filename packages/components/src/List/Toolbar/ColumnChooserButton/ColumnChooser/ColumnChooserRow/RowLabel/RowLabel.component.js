import React from 'react';
import PropTypes from 'prop-types';
import cssModule from '../../ColumnChooser.scss';
import { getTheme } from '../../../../../../theme';

const theme = getTheme(cssModule);

const RowLabel = ({ label }) => (
	<span className={theme('tc-column-chooser-row-label')}>{label}</span>
);

RowLabel.propTypes = {
	label: PropTypes.string.isRequired,
};

export default RowLabel;
