import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from '../Constants';

function getClassname(anchor) {
	return `anchor ${anchor.part} ${anchor.style}`;
}

function renderCircle(anchor, params) {
	return <circle className={getClassname(anchor)} cx={anchor.x} cy={anchor.y} r={params.r} />;
}

function renderArrow(anchor, params) {
	return <path className={getClassname(anchor)} d={params.arrow} />;
}

function renderAnchor(anchor, params) {
	switch (anchor.part) {
		case Constants.Anchor.PART.START:
			return renderCircle(anchor, params);
		case Constants.Anchor.PART.END:
			return renderArrow(anchor, params);
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
