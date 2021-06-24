import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '../Row/TableRow';
import theme from './TableBody.scss';

const PART = 'body';

/**
 * This component displays the body of the table. It is responsible for rendering the rows.
 */
export default function TableBody({
	elements,
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
		<ul className={theme['schema']} onScroll={onScroll} ref={bodyNode}>
			{elements.map(element => (
				<TableRow
					key={element.id}
					element={element}
					onEnterRow={onEnterRow}
					onLeaveRow={onLeaveRow}
				/>
			))}
		</ul>
	);
}

TableBody.propTypes = {
	elements: PropTypes.array.isRequired,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
	renderingListener: PropTypes.any,
};
