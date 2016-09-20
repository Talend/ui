import React, { PropTypes } from 'react';

import { select, event } from 'd3-selection';
import { drag } from 'd3-drag';

const LinkHandle = React.createClass({
    propTypes: {
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        onDrag: PropTypes.func,
        onDragEnd: PropTypes.func,
    },
    getInitialState() {
        return {
            grabbed: false,
        };
    },
    componentDidMount() {
        this.d3Handle = select(this.handle);
        this.d3Handle.call(
            drag()
                .on('start', this.dragStart)
                .on('drag', this.drag)
                .on('end', this.dragEnd)
        );
    },
    componentWillUnmount() {
        this.d3Handle.remove();
    },
    dragStart() {
        this.setState({ grabbed: true });
    },
    drag() {
        if (this.props.onDrag) {
            this.props.onDrag(event);
        }
    },
    dragEnd() {
        if (this.props.onDragEnd) {
            this.props.onDragEnd(event);
        }
        this.setState({ grabbed: false });
    },
    render() {
        const grabbedClass = this.state.grabbed ? 'edge-handle--grabbed' : '';
        return (
		  	<g
		  		ref={(c) => this.handle = c}
				transform={`translate(${this.props.position.x},${this.props.position.y})`}
			>
				{this.props.component}

		  	</g>
        );
    },
});

export default LinkHandle;
