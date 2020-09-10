import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';

import { GRID_SIZE } from '../../constants/flowdesigner.constants';
import { Transform } from '../../customTypings/index.d';

function Grid({ transformData }: { transformData?: Transform }) {
	const largeGridSize = GRID_SIZE * get(transformData, 'k', 1);
	return (
		<g>
			<defs>
				<pattern
					id="grid"
					fill="none"
					stroke="#BFBDBD"
					strokeWidth="0.5"
					x={get(transformData, 'x')}
					y={get(transformData, 'y')}
					width={largeGridSize}
					height={largeGridSize}
					patternUnits="userSpaceOnUse"
				>
					<rect width={largeGridSize} height={largeGridSize} />
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
	transformData: PropTypes.shape({
		k: PropTypes.number.isRequired,
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}),
};

export default Grid;
