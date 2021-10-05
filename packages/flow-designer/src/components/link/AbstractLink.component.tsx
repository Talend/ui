import React from 'react';

import { line, curveBasis, interpolateBasis } from 'd3';

import LinkHandle from './LinkHandle.component';
import { Position, PortRecord } from '../../customTypings/index.d';

const concreteLine = line()
	.x((d: any) => d.x)
	.y((d: any) => d.y)
	.curve(curveBasis);

function calculatePath(sourcePosition: Position, targetPosition: Position) {
	const pathCoords: Position[] = [];
	pathCoords[0] = targetPosition;
	pathCoords[1] = sourcePosition;
	const xInterpolate = interpolateBasis([targetPosition.x, pathCoords[1].x]);
	const yInterpolate = interpolateBasis([targetPosition.y, pathCoords[1].y]);
	const path = concreteLine(pathCoords as any);
	return { path, xInterpolate, yInterpolate };
}

type Props = {
	source: PortRecord;
	target: PortRecord;
	targetHandlePosition: Position;
	calculatePath: (
		sourcePosition: Position,
		targetPosition: Position,
	) => { path: any; xInterpolate: number; yInterpolate: number };
	onSourceDrag?: (event: any) => void;
	onSourceDragEnd?: (event: any) => void;
	onTargetDrag?: (event: any) => void;
	onTargetDragEnd?: (event: any) => void;
	children?: any;
	linkSourceHandleComponent?: React.ReactElement;
	sourceHandlePosition?: Position;
	linkTargetHandleComponent?: React.ReactElement;
};

class AbstractLink extends React.PureComponent<Props> {
	static calculatePath = calculatePath;

	renderLinkSourceHandle() {
		if (this.props.linkSourceHandleComponent) {
			return (
				<LinkHandle
					component={this.props.linkSourceHandleComponent}
					onDrag={this.props.onSourceDrag}
					onDragEnd={this.props.onSourceDragEnd}
					position={this.props.sourceHandlePosition || this.props.source.getPosition()}
				/>
			);
		}
		return null;
	}

	renderLinkTargetHandle() {
		if (this.props.linkTargetHandleComponent) {
			return (
				<LinkHandle
					component={this.props.linkTargetHandleComponent}
					onDrag={this.props.onTargetDrag}
					onDragEnd={this.props.onTargetDragEnd}
					position={this.props.targetHandlePosition || this.props.target.getPosition()}
				/>
			);
		}
		return null;
	}

	render() {
		const pathCalculationMethod = this.props.calculatePath || AbstractLink.calculatePath;
		const { path, xInterpolate, yInterpolate } = pathCalculationMethod(
			this.props.source.getPosition(),
			this.props.targetHandlePosition || this.props.target.getPosition(),
		);
		const newChildren = React.Children.map(this.props.children, child =>
			React.cloneElement(child, { d: path, xInterpolate, yInterpolate }),
		);
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
