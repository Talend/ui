import React from 'react';
import PropTypes from 'prop-types';
import { getRowData } from '../VirtualizedList/utils/gridrow';
import Badge from '../Badge';

class ItemViewRow extends React.Component {
	static getDerivedStateFromProps(props) {
		return { item: getRowData(props.parent, props.index) };
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	shouldComponentUpdate(nextProps, nextState) {
		const oldData = this.state.item;
		const newData = nextState.item;

		return (
			oldData !== newData &&
			['selected', 'value', 'name'].some(attr => oldData[attr] !== newData[attr])
		);
	}

	render() {
		const item = this.state.item;
		return (
			<div style={this.props.style}>
				<Badge
					label={item.name}
					selected
					onDelete={event => this.props.parent.props.onRowClick({ event, rowData: item.value })}
				/>
			</div>
		);
	}
}
ItemViewRow.propTypes = {
	style: PropTypes.object,
	index: PropTypes.number,
	parent: PropTypes.shape({
		props: PropTypes.shape({
			collection: PropTypes.array,
			onRowClick: PropTypes.func,
		}),
	}),
};

// eslint-disable-next-line import/prefer-default-export
export function ItemView(props) {
	return <ItemViewRow {...props} />;
}
ItemView.rowHeight = 35;
