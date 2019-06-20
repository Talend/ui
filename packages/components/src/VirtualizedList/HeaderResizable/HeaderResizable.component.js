/* eslint-disable dot-notation */
import React from 'react';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import { virtualizedListContext } from '../virtualizedListContext';
import test from './HeaderResizable.scss';

const HeaderResizableContent = ({ label, customRender, ...rest }) => {
	if (typeof customRender === 'function') {
		return customRender(rest);
	} else if (label) {
		return label;
	}
	throw new Error('blabla api');
};

console.log({ test });

const HeaderResizable = ({
	children,
	columnData,
	dataKey,
	disableSort,
	label,
	sortBy,
	sortDirection,
}) => {
	const { Consumer } = virtualizedListContext;
	return (
		<Consumer>
			{({ resizeRow }) => (
				<React.Fragment className={classNames(test['tc-header-column'])} key={dataKey}>
					<div className={classNames(test['tc-header-TruncatedText'])} style={{ flex: 'auto' }}>
						<HeaderResizableContent customRender={children} label={label} />
					</div>
					<Draggable
						axis="x"
						defaultClassName={classNames(test['tc-header-DragHandle'])}
						defaultClassNameDragging={classNames(test['tc-header-DragHandleActive'])}
						onDrag={(_, { deltaX }) => resizeRow(dataKey, deltaX)}
						position={{ x: 0 }}
						zIndex={999}
					>
						<span className={classNames(test['tc-header-DragHandleIcon'])}>⋮</span>
					</Draggable>
				</React.Fragment>
			)}
		</Consumer>
	);
};

export default HeaderResizable;
