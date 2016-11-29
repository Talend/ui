import React, { PropTypes } from 'react';
import { select, event } from 'd3-selection';
import { zoom, zoomIdentity } from 'd3-zoom';
import { connect } from 'react-redux';

import { setZoom } from '../actions/flow.actions';

export const ZoomHandler = React.createClass({
    selection: undefined,
    propTypes: {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
    },
    componentDidMount() {
        this.selection = select(this.zoomCatcher)
        .call(zoom()
          .scaleExtent([1 / 4, 2])
          .on('zoom', this.onZoom)
        );
    },
    onZoom() {
		  this.props.setZoom(event.transform);
    },
    componentWillReceiveProps(nextProps){
      if(nextProps.transformToApply){
        if(nextProps.transformToApply !== this.props.transformToApply){
          this.selection.transition().duration(113).call(nextProps.transformToApply, d3.zoomIdentity);
        }
      }
    },
    render() {
        return (
          <g x="0" y="0" width="100%" height="100%">
            <rect
              ref={(c) => { this.zoomCatcher = c; }}
              style={{ fill: 'none', pointerEvents: 'all' }}
              x="0" y="0" width="100%" height="100%"
            />
            <g transform={this.props.transform}>{this.props.children}</g>
          </g>
        );
    },
});

function mapStateToProps(state){
	return {
		transform: state.flowDesigner.get('transform'),
    transformToApply: state.flowDesigner.get('transformToApply'),
	}
}

function mapDispatchToProps (dispatch){
	return {
		setZoom: (transform) => dispatch(setZoom(transform)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoomHandler);
