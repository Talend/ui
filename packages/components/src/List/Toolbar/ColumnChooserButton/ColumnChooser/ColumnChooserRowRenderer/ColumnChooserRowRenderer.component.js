import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { columnChooserContext } from '../columnChooser.context';
import Label from './RowLabel';
import Visibility from './RowVisibilityCheckbox';

import theme from './ColumnChooserRowRenderer.scss';

const ColumnChooserRowRenderer = ({ children }) => {
	const { id } = useContext(columnChooserContext);
	return (
		<div
			id={`${id}-row`}
			className={classNames(theme['tc-column-chooser-row'], 'tc-column-chooser-row')}
		>
			{children}
		</div>
	);
};

ColumnChooserRowRenderer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

ColumnChooserRowRenderer.Visibility = Visibility;
ColumnChooserRowRenderer.Label = Label;

export default ColumnChooserRowRenderer;
