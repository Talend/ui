import React from 'react';
import { select, zoom as d3ZoomFactory, ZoomBehavior } from 'd3';
import { Transform } from '../customTypings/index.d';

export function transformToString(transform?: Transform) {
	if (transform) {
		return `translate(${transform.x}, ${transform.y}) scale(${transform.k})`;
	}
	return '';
}

type State = {
	transform?: Transform;
	transformToApply?: Transform;
};

type Props = {
	children?: any;
	setZoom?: (transform: Transform) => void;
	transform?: Transform;
	transformToApply?: Transform;
};

class ZoomHandler extends React.Component<Props, State> {
	zoom: ZoomBehavior<Element, unknown>;

	selection: any;

	zoomCatcher: any;

	constructor(props: Props) {
		super(props);

		this.zoom = d3ZoomFactory()
			.scaleExtent([1 / 4, 2])
			.on('zoom', this.onZoom)
			.on('end', this.onZoomEnd);

		this.state = { transform: props.transform };
	}

	componentDidMount() {
		this.selection = select(this.zoomCatcher);
		this.selection.call(this.zoom);
	}

	componentDidUpdate(oldProps: Props) {
		if (this.props.transformToApply && oldProps.transformToApply !== this.props.transformToApply) {
			this.selection
				.transition()
				.duration(230)
				.call(this.zoom.transform, this.props.transformToApply);
		}
	}

	onZoomEnd = (event: any) => {
		if (this.props.setZoom) this.props.setZoom(event.transform);
	};

	onZoom = (event: any) => {
		this.setState({ transform: event.transform });
	};

	render() {
		const { transform } = this.state;
		const children = React.Children.map(this.props.children, children =>
			React.cloneElement(children, {
				transformData: transform,
				transform: transformToString(transform),
			}),
		);
		return (
			<g x="0" y="0" width="100%" height="100%">
				<rect
					ref={c => {
						this.zoomCatcher = c;
					}}
					style={{ fill: 'none', pointerEvents: 'all' }}
					x="0"
					y="0"
					width="100%"
					height="100%"
				/>
				{children}
			</g>
		);
	}
}

export default ZoomHandler;
