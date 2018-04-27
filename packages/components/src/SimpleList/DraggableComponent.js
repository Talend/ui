import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';

const DRAGGABLE_ELEMENT_TYPE = 'element';

export default function getDraggable(Comp) {

  const elementSource = {
  	beginDrag(props) {
  		return props.extra.beginDrag(props.element);
  	},
  	endDrag(props) {
  		props.extra.endDrag();
  	},
  };

  const elementTarget = {
  	canDrop(props, monitor) {
  		const sourceItem = monitor.getItem();
  		return props.extra.canDrop(sourceItem, props.element);
  	},
  	drop(props, monitor) {
  		props.extra.drop(monitor.getItem(), props.element);
  	},
  };

  function collectForDragSource(connect, monitor) {
  	return {
  		connectDragSource: connect.dragSource(),
  	};
  }

  function collectForDropTarget(connect, monitor) {
  	return {
  		connectDropTarget: connect.dropTarget(),
  	};
  }

  class DraggableComponent extends Component {

    render() {
  		const {
        element,
        data,
  			className,
        extra,
        connectDragSource,
        connectDropTarget,
  		} = this.props;
  		return connectDragSource(
  			connectDropTarget(
  				<div>
  					<Comp
              element={element}
              data={data}
              className={className}
              extra={extra}
  					/>
  				</div>,
  			),
  		);
  	}

  }

  return flow(
  	DragSource(DRAGGABLE_ELEMENT_TYPE, elementSource, collectForDragSource),
  	DropTarget(DRAGGABLE_ELEMENT_TYPE, elementTarget, collectForDropTarget),
  )(DraggableComponent);

}
