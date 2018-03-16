import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VirtualizedList from '../../VirtualizedList';

export default class SchemaAsList extends Component {

	constructor(props) {
		super(props);
	}

	getYPosition(element) {
		return 0;
	}

	getVisibleElements() {
		let visibleElements = [];
		return visibleElements;
	}

	reveal(element) {
		console.log('reveal(' + element + ')');
	}

	updateContentNodeRef(ref) {
		this.contentNode = ref;
	}

	render() {
		const {
			type,
			schema,
			draggable,
			mapped,
			performMapping,
			selection,
			onSelect,
			pendingItem,
			onEnterElement,
			onLeaveElement,
			focusedElements,
			beginDrag,
			canDrop,
			drop,
			endDrag,
			revealConnection,
		} = this.props;
		return (
			<div className="schema mapper-element">
				<div className="schema-name">{schema.name}</div>
				<div
					ref={this.updateContentNodeRef}
					className="schema-content"
					onScroll={this.props.onScroll}
				>
					
				</div>
			</div>
		);
	}
}

Schema.propTypes = {
	type: PropTypes.string,
	schema: PropTypes.object,
	mapped: PropTypes.array,
	performMapping: PropTypes.func,
	selection: PropTypes.object,
	draggable: PropTypes.bool,
	onSelect: PropTypes.func,
	onScroll: PropTypes.func,
	pendingItem: PropTypes.object,
	onEnterElement: PropTypes.func,
	onLeaveElement: PropTypes.func,
	focusedElements: PropTypes.array,
	beginDrag: PropTypes.func,
	canDrop: PropTypes.func,
	drop: PropTypes.func,
	endDrag: PropTypes.func,
	revealConnection: PropTypes.func,
};
