import PropTypes from 'prop-types';

const columnChooserPropTypes = PropTypes.shape({
	visible: PropTypes.bool,
	label: PropTypes.string.isRequired,
	locked: PropTypes.bool,
	order: PropTypes.number,
});

const columnsChooserPropTypes = PropTypes.arrayOf(columnChooserPropTypes);

export { columnChooserPropTypes, columnsChooserPropTypes };
