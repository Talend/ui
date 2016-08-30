import React, { PropTypes } from 'react';

import { select, event } from 'd3-selection';
import { zoom } from 'd3-zoom';

const ZoomHandler = React.createClass({
    propTypes: {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
    },
    getInitialState() {
        return {
            transform: undefined,
        };
    },
    componentDidMount() {
        select(this.zoomCatcher)
        .call(zoom()
          .scaleExtent([1 / 8, 4])
          .on('zoom', this.onZoom)
        );
    },
    onZoom() {
        this.setState({ transform: event.transform });
    },
    render() {
        return (
          <g x="0" y="0" width="100%" height="100%">
            <rect
              ref={(c) => { this.zoomCatcher = c; }}
              style={{ fill: 'none', pointerEvents: 'all' }}
              x="0" y="0" width="100%" height="100%"
            />
            <g transform={this.state.transform}>{this.props.children}</g>
          </g>
        );
    },
});

export default ZoomHandler;
