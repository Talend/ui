import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';

const elementSource = {
	beginDrag(props) {
		return props.dndListener.beginDrag(props.anchor.element, props.anchor.side);
	},
	endDrag(props) {
		props.dndListener.endDrag();
	},
};

const elementTarget = {
	drop(props, monitor) {
		const sourceItem = monitor.getItem();
		const targetItem = { element: props.anchor.element, side: props.anchor.side };
		props.dndListener.drop(sourceItem, targetItem);
	},
	canDrop(props, monitor) {
		const sourceItem = monitor.getItem();
		const targetItem = { element: props.anchor.element, side: props.anchor.side };
		return props.dndListener.canDrop(sourceItem, targetItem);
	},
};

function collectForDragSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

function collectForDropTarget(connect) {
	return {
		connectDropTarget: connect.dropTarget(),
	};
}

class DraggableAnchor extends Component {
	constructor(props) {
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.updateElementRef = this.updateElementRef.bind(this);
	}

	componentDidMount() {
		if (this.elementRef != null) {
			this.elementRef.addEventListener('mouseenter', this.handleMouseEnter);
			this.elementRef.addEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	componentWillUnmount() {
		if (this.elementRef != null) {
			this.elementRef.removeEventListener('mouseenter', this.handleMouseEnter);
			this.elementRef.removeEventListener('mouseleave', this.handleMouseLeave);
		}
	}

	handleMouseEnter() {
		this.props.onEnterAnchor(this.props.anchor.element, this.props.anchor.side);
	}

	handleMouseLeave() {
		this.props.onLeaveAnchor(this.props.anchor.element, this.props.anchor.side);
	}

	updateElementRef(ref) {
		this.elementRef = ref;
	}

	render() {
		const { anchorStyle, connectDragSource, connectDropTarget } = this.props;
		return connectDragSource(
			connectDropTarget(
				<div ref={this.updateElementRef} className="draggable-anchor" style={anchorStyle} />,
			),
		);
	}
}

DraggableAnchor.propTypes = {
	anchor: PropTypes.object,
	anchorStyle: PropTypes.object,
	onEnterAnchor: PropTypes.func,
	onLeaveAnchor: PropTypes.func,
	connectDragSource: PropTypes.func,
	connectDropTarget: PropTypes.func,
};

export default flow(
	DragSource('element', elementSource, collectForDragSource),
	DropTarget('element', elementTarget, collectForDropTarget),
)(DraggableAnchor);
