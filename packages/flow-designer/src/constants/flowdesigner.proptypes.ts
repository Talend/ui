import PropTypes from 'prop-types';

export const NodeType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	position: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}),
});

export const PortType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	nodeId: PropTypes.string.isRequired,
	position: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}),
});

export const LinkType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	sourceId: PropTypes.string.isRequired,
	targetId: PropTypes.string.isRequired,
});
