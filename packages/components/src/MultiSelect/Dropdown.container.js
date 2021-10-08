import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../CircularProgress';
import VirtualizedList from '../VirtualizedList';
import theme from './Dropdown.scss';

export default function Dropdown(props) {
	return (
		<div className={theme.dropdown} style={{ height: props.height }}>
			{props.isLoading ? (
				<div className={theme.loading}>
					<CircularProgress />
				</div>
			) : (
				<VirtualizedList
					type="tc-multiselect-dropdown"
					rowHeight={props.renderItem.rowHeight}
					rowRenderers={{ 'tc-multiselect-dropdown': props.renderItem }}
					collection={props.items}
					onRowClick={props.onRowClick}
				/>
			)}
		</div>
	);
}
Dropdown.propTypes = {
	isLoading: PropTypes.bool,
	height: PropTypes.number,
	renderItem: PropTypes.func,
	items: PropTypes.array,
	onRowClick: PropTypes.func,
};
