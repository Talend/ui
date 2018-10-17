import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'react-virtualized';

function DefaultRenderer(props) {
	return <div>{props.cellData}</div>;
}

DefaultRenderer.propTypes = {
	cellData: PropTypes.string,
};

function Content(props) {
	return <Column {...props} />;
}

Content.propTypes = {
	cellRenderer: PropTypes.func,
};

Content.defaultProps = {
	cellRenderer: DefaultRenderer,
};

export default Content;
