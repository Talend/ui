import PropTypes from 'prop-types';

const columnPropTypes = PropTypes.shape({
	label: PropTypes.string.isRequired,
	order: PropTypes.order,
});

export { columnPropTypes };


// {
//     label: 'myLabel',
//     order: 1,
//     locked: false,
//     hidden: false,
//    }