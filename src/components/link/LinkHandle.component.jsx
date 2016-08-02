import React, { PropTypes } from 'react';

import { select, event } from 'd3-selection';
import { drag } from 'd3-drag';

const EdgeHandle = React.createClass({
  propTypes: {
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    onDrag: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
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
    this.props.onDrag(event);
  },
  dragEnd() {
    this.props.onDragEnd(event);
    this.setState({ grabbed: false });
  },
  render() {
    const grabbedClass = this.state.grabbed ? 'edge-handle--grabbed' : '';
    return (
      <circle
        ref={(c) => this.handle = c}
        cx={this.props.position.x} cy={this.props.position.y}
        width="8" height="8"
        className={`edge-handle ${grabbedClass}`}
      />
    );
  },
});

export default EdgeHandle;
