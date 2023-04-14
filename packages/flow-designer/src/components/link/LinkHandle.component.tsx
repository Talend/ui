import { Component } from 'react';
import type { ReactElement, ElementRef } from 'react';
import { drag, select } from 'd3';
import { PositionRecord } from '../../customTypings/index.d';

type Props = {
	position: PositionRecord;
	onDrag?: (event: any) => void;
	onDragEnd?: (event: any) => void;
	component: ReactElement;
};

class LinkHandle extends Component<Props> {
	d3Handle: any;

	handle: ElementRef<'g'> | null;

	constructor(props: Props) {
		super(props);
		this.drag = this.drag.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.handle = null;
	}

	componentDidMount() {
		this.d3Handle = select(this.handle);
		this.d3Handle.call(drag().on('drag', this.drag).on('end', this.dragEnd));
	}

	componentWillUnmount() {
		this.d3Handle.remove();
	}

	drag(event: any) {
		if (this.props.onDrag) {
			this.props.onDrag(event);
		}
	}

	dragEnd(event: any) {
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
