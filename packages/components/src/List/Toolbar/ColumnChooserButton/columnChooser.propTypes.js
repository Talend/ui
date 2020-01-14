import PropTypes from 'prop-types';

const columnPropTypes = PropTypes.shape({
	label: PropTypes.string.isRequired,
	locked: PropTypes.bool,
	order: PropTypes.number,
	visible: PropTypes.bool,
});

const columnsPropTypes = PropTypes.arrayOf(columnPropTypes);

export { columnPropTypes, columnsPropTypes };
