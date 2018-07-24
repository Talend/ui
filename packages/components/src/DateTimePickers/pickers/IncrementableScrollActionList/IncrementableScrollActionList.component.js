import React from 'react';
import PropTypes from 'prop-types';
import IncrementableScrollList from '../IncrementableScrollList';
import PickerAction from '../../PickerAction';

class IncrementableScrollActionList extends React.Component {
	constructor(props) {
		super(props);

		const middleInitialIndex = this.props.items.findIndex(
			item => item.id === this.props.initialMiddleVisibleItemId,
		);

		this.initialIndex = middleInitialIndex === -1 ? 0 : Math.max(middleInitialIndex - 2, 0);
	}

	render() {
		const itemRenderer = item => {
			const { id, label } = item;
			return (
				<PickerAction
					aria-label={`Select '${label}'`}
					isSelected={id === this.props.selectedItemId}
					label={label}
					onClick={() => this.props.onSelect(item)}
				/>
			);
		};

		return (
			<IncrementableScrollList
				items={this.props.items}
				initialIndex={this.initialIndex}
				itemRenderer={itemRenderer}
			/>
		);
	}
}

IncrementableScrollActionList.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			label: PropTypes.string.isRequired,
		}),
	).isRequired,
	initialMiddleVisibleItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	selectedItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onSelect: PropTypes.func.isRequired,
};

export default IncrementableScrollActionList;
