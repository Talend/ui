import PropTypes from 'prop-types';

const columnChooserPropTypes = PropTypes.shape({
	label: PropTypes.string.isRequired,
	locked: PropTypes.bool,
	order: PropTypes.number,
	visible: PropTypes.bool,
});

const columnsChooserPropTypes = PropTypes.arrayOf(columnChooserPropTypes);

export { columnChooserPropTypes, columnsChooserPropTypes };
