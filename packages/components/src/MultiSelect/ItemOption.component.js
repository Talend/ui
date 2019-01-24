import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import getDerivedStateFromProps from './itemGetDerivedStateFromProps';
import theme from './ItemOption.scss';

class ItemOptionRow extends React.Component {
	static getDerivedStateFromProps = getDerivedStateFromProps;

	constructor(props) {
		super(props);
		this.state = {
			item: props.parent.props.collection[props.index],
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!nextProps.isVisible) {
			return false;
		}
		const nextItem = nextState.item;
		if (nextItem) {
			const results = ['selected', 'value', 'name'].every(
				attr => this.state.item[attr] === nextItem[attr],
			);
			return !results;
		}
		return false;
	}

	render() {
		const item = this.props.parent.props.collection[this.props.index];
		return (
			<a
				className={classnames(theme.row, 'tc-multi-select-item', {
					active: !!item.selected,
				})}
				id={`multi-select-${item.value}`}
				onClick={event => this.props.parent.props.onRowClick({ event, rowData: item.value })}
				href={`#/${item.value}`}
				style={this.props.style}
			>
				<span className={theme.item}>{item.name}</span>
			</a>
		);
	}
}
ItemOptionRow.propTypes = {
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
export function ItemOption(props) {
	return <ItemOptionRow {...props} />;
}
ItemOption.rowHeight = 40;
