import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import { select, event } from 'd3-selection';
import { drag } from 'd3-drag';

class LinkHandle extends React.Component {
	static propTypes = {
		position: ImmutablePropTypes.recordOf({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
		}).isRequired,
		onDrag: PropTypes.func,
		onDragEnd: PropTypes.func,
		component: PropTypes.element.isRequired,
	};

	constructor(props) {
		super(props);
		this.drag = this.drag.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
	}

	componentDidMount() {
		this.d3Handle = select(this.handle);
		this.d3Handle.call(
			drag()
				.on('drag', this.drag)
				.on('end', this.dragEnd),
		);
	}

	componentWillUnmount() {
		this.d3Handle.remove();
	}

	drag() {
		if (this.props.onDrag) {
			this.props.onDrag(event);
		}
	}

	dragEnd() {
		if (this.props.onDragEnd) {
			this.props.onDragEnd(event);
		}
	}

	render() {
		const position = this.props.position;
		return (
			<g
				ref={c => {
					this.handle = c;
				}}
				transform={`translate(${position.get('x')},${position.get('y')})`}
			>
				{this.props.component}
			</g>
		);
	}
}

export default LinkHandle;
