import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from '../ColumnChooserRowRenderer.scss';

const RowLabel = ({ label }) => (
	<span className={classNames(theme['tc-column-chooser-row-label'], 'tc-column-chooser-row-label')}>
		{label}
	</span>
);

RowLabel.propTypes = {
	label: PropTypes.string.isRequired,
};

export default RowLabel;
