import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from '../Constants';

function getStyles(anchor) {
	let styles = '';
	for (let i = 0; i < anchor.styles.length; i += 1) {
		styles += anchor.styles[i];
		styles += ' ';
	}
	return styles;
}

function getClassname(anchor) {
	return `anchor ${anchor.side} ${getStyles(anchor)}`;
}

function renderCircle(anchor, params) {
	return <circle className={getClassname(anchor)} cx={anchor.x} cy={anchor.y} r={params.r} />;
}

function renderArrow(anchor, params) {
	return <path className={getClassname(anchor)} d={params.arrow} />;
}

function renderAnchor(anchor, params) {
	switch (anchor.side) {
		case Constants.MappingSide.INPUT:
			return renderCircle(anchor, params);
		case Constants.MappingSide.OUTPUT:
			if (anchor.mapped) {
				return renderArrow(anchor, params);
			}
			return renderCircle(anchor, params);
		default:
			return <div>Cannot render anchor</div>;
	}
}

export default class AnchorSVG extends Component {
	render() {
		const { anchor, params } = this.props;
		return renderAnchor(anchor, params);
	}
}

AnchorSVG.propTypes = {
	anchor: PropTypes.object,
	params: PropTypes.object,
};
