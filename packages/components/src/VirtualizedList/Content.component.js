import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'react-virtualized';

function DefaultRenderer({ cellData }) {
	return <div className={'tc-virtualizedlist-default-cell'}>{cellData}</div>;
}

DefaultRenderer.propTypes = {
	cellData: PropTypes.string,
};

function Content(props) {
	return <Column {...props} />;
}

Content.propTypes = {
	...Column.propTypes,
};

Content.defaultProps = {
	...Column.defaultProps,
	cellRenderer: DefaultRenderer,
};

export default Content;
