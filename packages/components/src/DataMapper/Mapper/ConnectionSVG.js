import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from '../Constants';

function renderLine(params, style) {
	return <line className={style} x1={params.x1} y1={params.y1} x2={params.x2} y2={params.y2} />;
}

function getClassname(part, params, style) {
	switch (part) {
		case Constants.Connection.PART.CURVE:
			let gradClassName = '';
			switch (params.visibility) {
				case Constants.Connection.VISIBILITY.LEFT:
					if (params.y1 < params.y2) {
						gradClassName = 'grad-left-top';
					} else {
						gradClassName = 'grad-left-bottom';
					}
					break;
				case Constants.Connection.VISIBILITY.RIGHT:
					if (params.y1 < params.y2) {
						gradClassName = 'grad-right-bottom';
					} else {
						gradClassName = 'grad-right-top';
					}
					break;
				default:
					break;
			}
			return `connection ${part} ${style} ${gradClassName}`;
		default:
			return `connection ${part} ${style}`;
	}
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
				className={
					getClassname(Constants.Connection.PART.START, params, style)
				}
				cx={params.x1}
				cy={params.y1}
				r={getRadius(style)}
			/>
			<path
				className={
					getClassname(Constants.Connection.PART.CURVE, params, style)
				}
				d={params.path}
			/>
			<path
				className={
					getClassname(Constants.Connection.PART.END, params, style)
				}
				d={params.arrow}
			/>
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
