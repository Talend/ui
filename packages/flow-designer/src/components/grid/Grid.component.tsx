import PropTypes from 'prop-types';
import get from 'lodash/get';

import tokens from '@talend/design-tokens';

import { GRID_SIZE } from '../../constants/flowdesigner.constants';
import { Transform } from '../../customTypings/index.d';

const size = (4 * 5) / 3;
const halfSize = size / 2;

function Grid({ transformData }: { transformData?: Transform }) {
	const scale = get(transformData, 'k', 1);
	const largeGridSize = GRID_SIZE * scale;
	const halfCrossSize = halfSize * scale;
	const deltaSize = largeGridSize - halfCrossSize;

	return (
		<g>
			<defs>
				<pattern
					id="grid"
					fill="none"
					stroke={tokens.coralColorNeutralBorder}
					strokeWidth="0.5"
					x={get(transformData, 'x')}
					y={get(transformData, 'y')}
					width={largeGridSize}
					height={largeGridSize}
					patternUnits="userSpaceOnUse"
				>
					<path d={`M 0 0 V ${halfCrossSize}`} />
					<path d={`M 0 0 H ${halfCrossSize}`} />
					<line x1="0" y1={largeGridSize} x2="0" y2={deltaSize} />
					<line x1={largeGridSize} y1="0" x2={deltaSize} y2="0" />
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
