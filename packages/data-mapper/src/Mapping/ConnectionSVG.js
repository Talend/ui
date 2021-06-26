import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from '../Constants';

function renderLine(params, style, connectionId) {
	return <line id={connectionId} className={style} {...params} />;
}

function getClassname(part, params, style) {
	let gradClassName = '';
	switch (part) {
		case Constants.Connection.PART.CURVE:
			switch (params.visibility) {
				case Constants.Connection.VISIBILITY.LEFT:
					if (params.y1 < params.y2) {
						gradClassName = 'grad-left-top-50';
					} else {
						gradClassName = 'grad-left-bottom-50';
					}
					break;
				case Constants.Connection.VISIBILITY.RIGHT:
					if (params.y1 < params.y2) {
						gradClassName = 'grad-right-bottom-50';
					} else {
						gradClassName = 'grad-right-top-50';
					}
					break;
				case Constants.Connection.VISIBILITY.FULL:
					if (params.y1 < params.y2) {
						gradClassName = 'grad-left-top-100';
					} else if (params.y1 > params.y2) {
						gradClassName = 'grad-left-bottom-100';
					} else {
						gradClassName = 'grad-left-right-100';
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

function renderBezierCurve(params, style, connectionId) {
	return (
		<g id={connectionId}>
			<circle
				id={`${connectionId}-${Constants.Connection.PART.START}`}
				className={getClassname(Constants.Connection.PART.START, params, style)}
				cx={params.x1}
				cy={params.y1}
				r={getRadius(style)}
			/>
			<path
				id={`${connectionId}-${Constants.Connection.PART.CURVE}`}
				className={getClassname(Constants.Connection.PART.CURVE, params, style)}
				d={params.path}
			>
				<animate
					id={`anim-${connectionId}`}
					attributeType="CSS"
					attributeName="stroke-width"
					from="3"
					to="7"
					dur="0.2s"
					begin="indefinite"
				/>
				<animate
					attributeType="CSS"
					attributeName="stroke-width"
					from="7"
					to="3"
					dur="0.2s"
					begin={`anim-${connectionId}.begin + 0.2s`}
				/>
			</path>
			<path
				id={`${connectionId}-${Constants.Connection.PART.END}`}
				className={getClassname(Constants.Connection.PART.END, params, style)}
				d={params.arrow}
			/>
		</g>
	);
}

function renderConnection(params, style, connectionId) {
	switch (params.kind) {
		case 'line':
			return renderLine(params, style, connectionId);
		case 'bezier':
			return renderBezierCurve(params, style, connectionId);
		default:
			return <div>Cannot render connection</div>;
	}
}

export default class ConnectionSVG extends Component {
	render() {
		const { params, style, connectionId } = this.props;
		return renderConnection(params, style, connectionId);
	}
}

ConnectionSVG.propTypes = {
	params: PropTypes.object,
	style: PropTypes.string,
	connectionId: PropTypes.string,
};
