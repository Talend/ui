import React from 'react';
import { select } from 'd3';

import { Port, Position } from '../../api';
import { PortRecord } from '../../customTypings/index.d';

type Props = {
	port?: PortRecord;
	onClick?: React.MouseEventHandler;
	children?: React.ReactChildren;
};

class AbstractPort extends React.Component<Props> {
	d3Node: any;

	node: any;

	constructor(props: Props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.d3Node = select(this.node);
		this.d3Node.on('click', this.onClick);
	}

	shouldComponentUpdate(nextProps: Props) {
		return nextProps.port !== this.props.port || nextProps.children !== this.props.children;
	}

	onClick(event: any) {
		if (this.props.onClick) {
			this.props.onClick(event);
		}
	}

	render() {
		const position = Port.getPosition(this.props.port);
		return (
			<g>
				<g
					ref={c => {
						this.node = c;
					}}
					transform={`translate(${Position.getXCoordinate(
						position,
					)},${Position.getYCoordinate(position)})`}
				>
					{this.props.children}
				</g>
			</g>
		);
	}
}

export default AbstractPort;
