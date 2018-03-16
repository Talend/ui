import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from '../Constants';

function renderLine(params, style) {
	return <line className={style} x1={params.x1} y1={params.y1} x2={params.x2} y2={params.y2} />;
}

function getClassname(part, style) {
	return `connection ${part} ${style}`;
}

function getRadius(style) {
	switch (style) {
		case Constants.Connection.STYLE.ALL:
			return 3;
		default:
			return 4;
	}
}

function renderBezierCurve(params, style) {
	return (
		<g>
			<circle
				className={getClassname(Constants.Connection.PART.START, style)}
				cx={params.x1}
				cy={params.y1}
				r={getRadius(style)}
			/>
			<path className={getClassname(Constants.Connection.PART.CURVE, style)} d={params.path} />
			<path className={getClassname(Constants.Connection.PART.END, style)} d={params.arrow} />
		</g>
	);
}

function renderConnection(params, style) {
	switch (params.kind) {
		case 'line':
			return renderLine(params, style);
		case 'bezier':
			return renderBezierCurve(params, style);
		default:
			return <div>Cannot render connection</div>;
	}
}

export default class ConnectionSVG extends Component {
	render() {
		const { params, style } = this.props;
		return renderConnection(params, style);
	}
}

ConnectionSVG.propTypes = {
	params: PropTypes.object,
	style: PropTypes.string,
};
