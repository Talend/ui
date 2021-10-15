import PropTypes from 'prop-types';
import { recordOf } from 'react-immutable-proptypes';

export const NodeType = recordOf({
	id: PropTypes.string.isRequired,
	position: recordOf({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}),
});

export const PortType = recordOf({
	id: PropTypes.string.isRequired,
	nodeId: PropTypes.string.isRequired,
	position: recordOf({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}),
});

export const LinkType = recordOf({
	id: PropTypes.string.isRequired,
	sourceId: PropTypes.string.isRequired,
	targetId: PropTypes.string.isRequired,
});
