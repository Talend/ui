import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'react-virtualized';

function DefaultRenderer({ cellData }) {
	return <div className="tc-virtualizedlist-default-cell">{cellData}</div>;
}
DefaultRenderer.propTypes = {
	cellData: PropTypes.string,
};

export const defaultColumnConfiguration = {
	...Column.defaultProps,
	cellRenderer: DefaultRenderer,
	width: -1,
};

export default function Content(props) {
	return <Column {...props} />;
}
Content.defaultProps = defaultColumnConfiguration;
