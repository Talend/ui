import PropTypes from 'prop-types';

// Runtime shape validation (via recordOf) was removed as part of the
// react-immutable-proptypes migration. TypeScript types in
// customTypings/index.d.ts provide compile-time type safety instead.

export const NodeType = PropTypes.object;

export const PortType = PropTypes.object;

export const LinkType = PropTypes.object;
