import React, { PropTypes } from 'react';

import { line, curveBasis } from 'd3-shape';
import { interpolateBasis } from 'd3-interpolate';

import LinkHandle from './LinkHandle.component';
import { PortType } from '../../constants/flowdesigner.proptypes';

const concreteLine = line().x(d => d.x).y(d => d.y)
			.curve(curveBasis);

const calculatePath = (sourcePosition, targetPosition) => {
	const pathCoords = [];
	pathCoords[0] = targetPosition;
	pathCoords[1] = {
		x: sourcePosition.x,
		y: sourcePosition.y,
	};
	const xInterpolate = interpolateBasis([targetPosition.x, pathCoords[1].x]);
	const yInterpolate = interpolateBasis([targetPosition.y, pathCoords[1].y]);
	const path = concreteLine(pathCoords);
	return { path, xInterpolate, yInterpolate };
};

class AbstractLink extends React.Component {
	static propTypes = {
		source: PortType.isRequired,
		target: PortType.isRequired,
		markerSource: PropTypes.element,
		markedTarget: PropTypes.element,
		targetHandlePosition: PropTypes.shape({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
		}),
		calculatePath: PropTypes.func.isRequired,
		onSourceDrag: PropTypes.func,
		onSourceDragEnd: PropTypes.func,
		onTargetDrag: PropTypes.func,
		onTargetDragEnd: PropTypes.func,
		children: PropTypes.node,
		linkSourceHandleComponent: PropTypes.element,
		sourceHandlePosition: PropTypes.shape({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
		}),
		linkTargetHandleComponent: PropTypes.element,
	}

	static calculatePath = calculatePath;

	shouldComponentUpdate(nextProps) {
		return nextProps.source !== this.props.source ||
			nextProps.target !== this.props.target ||
			nextProps.targetHandlePosition !== this.props.targetHandlePosition;
	}

	renderLinkSourceHandle() {
		if (this.props.linkSourceHandleComponent) {
			return (<LinkHandle
				component={this.props.linkSourceHandleComponent}
				onDrag={this.props.onSourceDrag} onDragEnd={this.props.onSourceDragEnd}
				position={this.props.sourceHandlePosition || this.props.source.getPosition()}
			/>);
		}
		return null;
	}
  
	renderLinkTargetHandle() {
		if (this.props.linkTargetHandleComponent) {
			return (<LinkHandle
				component={this.props.linkTargetHandleComponent}
				onDrag={this.props.onTargetDrag} onDragEnd={this.props.onTargetDragEnd}
				position={this.props.targetHandlePosition || this.props.target.getPosition()}
			/>);
		}
		return null;
	}

	render() {
		const pathCalculationMethod = this.props.calculatePath || self.calculatePath;
		const { path, xInterpolate, yInterpolate } = pathCalculationMethod(
			this.props.source.getPosition(),
			this.props.targetHandlePosition || this.props.target.getPosition(),
		);
		const newChildren = React.Children.map(this.props.children, child => (
				React.cloneElement(child, { d: path, xInterpolate, yInterpolate })
			));
		return (
			<g>
				{newChildren}
				{this.renderLinkSourceHandle()}
				{this.renderLinkTargetHandle()}
			</g>
		);
	}
}

export default AbstractLink;
