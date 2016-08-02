import { PropTypes } from 'react';

export const nodePropType = PropTypes.shape({
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  data: PropTypes.shape({
    name: PropTypes.string,
    merge: PropTypes.func.isRequired,
  }),
}).isRequired;
