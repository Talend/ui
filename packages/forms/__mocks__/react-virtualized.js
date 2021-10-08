import React from 'react';
const reactVirtualized = require('react-virtualized');

const autoSizerProps = {
	height: 3000,
	width: 3000,
};
const MockAutoSizer = props => (<div id="autoSizer">{props.children(autoSizerProps)}</div>);

module.exports = {
	...reactVirtualized,
	AutoSizer: MockAutoSizer,
};
