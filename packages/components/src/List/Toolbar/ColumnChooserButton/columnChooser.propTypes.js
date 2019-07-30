import PropTypes from 'prop-types';

const columnChooserPropTypes = PropTypes.shape({
	label: PropTypes.string.isRequired,
	hidden: PropTypes.bool,
	order: PropTypes.number,
});

const columnsChooserPropTypes = PropTypes.arrayOf(columnChooserPropTypes);

export { columnChooserPropTypes, columnsChooserPropTypes };
