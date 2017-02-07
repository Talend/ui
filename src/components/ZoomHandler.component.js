import React, { PropTypes } from 'react';
import { select, event } from 'd3-selection';
import { zoom as d3ZoomFactory, zoomIdentity } from 'd3-zoom';

import Grid from '../components/grid/Grid.component';

class ZoomHandler extends React.Component {
	static propTypes = {
		children: PropTypes.arrayOf(PropTypes.element).isRequired,
		setZoom: PropTypes.func,
		transform: PropTypes.shape({
			k: PropTypes.number.isRequired,
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
		}),
		transformToApply: PropTypes.shape({
			k: PropTypes.number.isRequired,
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
		}),

	};

	zoom;
	selection;

	constructor(props) {
		super(props);
		this.onZoom = this.onZoom.bind(this);
		this.onZoomEnd = this.onZoomEnd.bind(this);
	}

	componentWillMount() {
		this.setState({ transform: this.props.transform });
	}

	componentDidMount() {
		this.selection = select(this.zoomCatcher);
		this.zoom = d3ZoomFactory()
			.scaleExtent([1 / 4, 2])
			.on('zoom', this.onZoom)
			.on('end', this.onZoomEnd);
		this.selection.call(this.zoom);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.transformToApply) {
			if (nextProps.transformToApply !== this.props.transformToApply) {
				this.selection.transition().duration(230).call(
					this.zoom.transform,
					nextProps.transformToApply,
				);
			}
		}
	}

	onZoomEnd() {
		this.props.setZoom(event.transform);
	}

	onZoom() {
		this.setState({ transform: event.transform });
	}

	render() {
		return (
			<g x="0" y="0" width="100%" height="100%">
				<rect
					ref={(c) => { this.zoomCatcher = c; }}
					style={{ fill: 'none', pointerEvents: 'all' }}
					x="0" y="0" width="100%" height="100%"
				/>
				<Grid transform={this.state.transform} />
				<g transform={this.state.transform}>{this.props.children}</g>
			</g>
		);
	}
}

export default ZoomHandler;
