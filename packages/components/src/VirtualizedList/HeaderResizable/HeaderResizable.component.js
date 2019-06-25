/* eslint-disable dot-notation */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import { SortIndicator } from 'react-virtualized';
import { virtualizedListContext } from '../virtualizedListContext';
import headerResizableCssModule from './HeaderResizable.scss';
import { getTheme } from '../../theme';

const theme = getTheme(headerResizableCssModule);

const HeaderResizableContent = ({ label, customRender, ...rest }) => {
	if (typeof customRender === 'function') {
		return customRender(rest);
	} else if (label) {
		return label;
	}
	throw new Error('[HeaderResizableContent]: No children as function or label provided.');
};

const HeaderResizable = ({ children, dataKey, label, sortDirection, sortBy }) => {
	const { Consumer } = virtualizedListContext;
	return (
		<Consumer>
			{({ resizeRow, setColumnDataKeyResizing }) => (
				<div key={dataKey} className={classNames(theme('tc-header-cell-resizable'))}>
					<div className={classNames(theme('tc-header-cell-resizable-truncated-text'))}>
						<HeaderResizableContent customRender={children} label={label} />
						{sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
					</div>
					<Draggable
						axis="x"
						defaultClassName={classNames(theme('tc-header-cell-resizable-drag-handle'))}
						onStart={() => setColumnDataKeyResizing(dataKey)}
						onDrag={(_, data) => {
							resizeRow(dataKey, data.deltaX);
						}}
						onStop={() => setColumnDataKeyResizing('')}
						position={{ x: 0 }}
					>
						<div className={classNames(theme('tc-header-cell-resizable-drag-handle-icon'))} />
					</Draggable>
				</div>
			)}
		</Consumer>
	);
};

HeaderResizable.propTypes = {
	children: PropTypes.oneOfType[(PropTypes.element, PropTypes.arrayOf(PropTypes.element))],
	dataKey: PropTypes.string,
	label: PropTypes.string,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.bool,
};

export default props => <HeaderResizable {...props} />;
