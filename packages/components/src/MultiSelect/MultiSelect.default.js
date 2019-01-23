import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import theme from './MultiSelect.scss';

export function Item(props) {
	const item = props.parent.props.collection[props.index];
	return (
		<a
			className={classnames(theme.row, 'tc-multi-select-item', {
				active: item.selected,
			})}
			id={`multi-select-${item.value}`}
			onClick={event => props.parent.props.onRowClick({ event, rowData: item.value })}
			href={`#/${item.value}`}
			style={props.style}
		>
			<span className={theme.item}>{item.name}</span>
		</a>
	);
}
Item.propTypes = {
	style: PropTypes.object,
	index: PropTypes.number,
	parent: PropTypes.shape({
		props: PropTypes.shape({
			collection: PropTypes.array,
			onRowClick: PropTypes.func,
		}),
	}),
};
Item.rowHeight = 40;

export function ItemView(props) {
	return (
		<div className={theme.itemView} style={props.style}>
			<span className={theme.item}>{props.parent.props.collection[props.index].name}</span>
		</div>
	);
}
ItemView.propTypes = {
	style: PropTypes.object,
	index: PropTypes.number,
	parent: PropTypes.shape({
		props: PropTypes.shape({
			collection: PropTypes.array,
		}),
	}),
};
ItemView.rowHeight = 40;
