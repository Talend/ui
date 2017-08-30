import PropTypes from 'prop-types';
import React from 'react';

import { GRID_SIZE } from '../../constants/flowdesigner.constants';

function Grid({ transform }) {
	const smallGridSize = 10 * transform.k;
	const largeGridSize = GRID_SIZE * transform.k;
	const smallGridOpacity = transform.k < 1 ? transform.k : 1;
	return (
		<g>
			<defs>
				<pattern
					id="smallGrid"
					fill="none"
					stroke="#BFBDBD"
					strokeWidth="0.5"
					width={smallGridSize}
					height={smallGridSize}
					patternUnits="userSpaceOnUse"
				>
					<path d={`M ${smallGridSize} 0 L 0 0 0 ${smallGridSize}`} />
				</pattern>
				<pattern
					id="grid"
					fill="none"
					stroke="#BFBDBD"
					strokeWidth="0.5"
					x={transform.x}
					y={transform.y}
					width={largeGridSize}
					height={largeGridSize}
					patternUnits="userSpaceOnUse"
				>
					<rect
						width={largeGridSize}
						height={largeGridSize}
						fillOpacity={smallGridOpacity}
						fill="url(#smallGrid)"
					/>
					<path d={`M ${largeGridSize} 0 L 0 0 0 ${largeGridSize}`} />
				</pattern>
			</defs>
			<rect
				style={{ pointerEvents: 'none' }}
				x="0"
				y="0"
				width="100%"
				height="100%"
				fill="url(#grid)"
			/>
		</g>
	);
}

Grid.propTypes = {
	transform: PropTypes.shape({
		k: PropTypes.number.isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}),
};

export default Grid;
