import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './TableBody.scss';

const PART = 'body';

/**
 * This component displays the body of the table. It is responsible for rendering the rows.
 */
export default function TableBody({
																		elements,
																		columns,
																		onScroll,
																		onEnterRow,
																		onLeaveRow,
																		renderingListener,
																	}) {
	const bodyNode = useRef(null);
	useEffect(() => {
		if (renderingListener && renderingListener.onMounted) {
			renderingListener.onMounted(PART, bodyNode.current);
		}
	}, [renderingListener, bodyNode]);
	return (
		<tbody className={classnames('tc-table-body', theme['tc-table-body'])} onScroll={onScroll} ref={bodyNode}>
		{elements.map(element => {
			const Renderer = columns[0].cellRenderer;
			return (
				<Renderer
					element={element}
					{...columns[0].cellExtraProps}
					key={element.id}
					data-id={element.id}
					onEnterRow={onEnterRow}
					onLeaveRow={onLeaveRow}
				>
				</Renderer>
			);
		})}
		</tbody>
	)
		;
}

TableBody.propTypes = {
	elements: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	rowsClassName: PropTypes.objectOf(PropTypes.string),
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
	renderingListener: PropTypes.any,
};
