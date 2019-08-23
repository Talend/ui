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

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function Content() {
	return null;
}
Content.displayName = 'Content';
Content.defaultProps = defaultColumnConfiguration;
