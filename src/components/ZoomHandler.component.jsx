import React, { PropTypes } from 'react';
import { select, event } from 'd3-selection';
import { zoom, zoomIdentity } from 'd3-zoom';

import Grid from '../components/grid/Grid.component';

const ZoomHandler = React.createClass({
	propTypes: {
		children: PropTypes.arrayOf(PropTypes.element).isRequired,
	},
	componentWillMount() {
		this.setState({ transform: this.props.transform });
	},
	componentDidMount() {
		this.selection = select(this.zoomCatcher);
		this.zoom = zoom()
			.scaleExtent([1 / 4, 2])
			.on('zoom', this.onZoom)
			.on('end', this.onZoomEnd);
		this.selection.call(this.zoom);
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.transformToApply) {
			if (nextProps.transformToApply !== this.props.transformToApply) {
				this.selection.transition().duration(230).call(
					this.zoom.transform,
					nextProps.transformToApply,
				);
			}
		}
	},
	onZoomEnd() {
		this.props.setZoom(event.transform);
	},
	onZoom() {
		this.setState({ transform: event.transform });
	},
	zoom: undefined,
	selection: undefined,
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
	},
});

export default ZoomHandler;
