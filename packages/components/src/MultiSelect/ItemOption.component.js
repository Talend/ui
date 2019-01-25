import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getRowData } from '../VirtualizedList/utils/gridrow';
import theme from './ItemOption.scss';
import Emphasis from '../Emphasis/Emphasis.component';

class ItemOptionRow extends React.Component {
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
			['selected', 'value', 'name', 'searchTerm'].some(attr => oldData[attr] !== newData[attr])
		);
	}

	render() {
		const item = this.state.item;
		const id = `${item.id || item.value}`;
		return (
			<div
				className={classnames('form-group', theme.row, 'tc-multi-select-item')}
				style={this.props.style}
			>
				<div className="checkbox">
					{/* eslint-disable-next-line  jsx-a11y/label-has-for */}
					<label>
						<input
							id={`checkbox-${id}`}
							type="checkbox"
							checked={!!item.selected}
							onChange={event => this.props.parent.props.onRowClick({ event, rowData: item.value })}
						/>
						<span className={`${theme.item} control-label`} htmlFor={`checkbox-${id}`}>
							<Emphasis text={item.name} value={item.searchTerm} />
						</span>
					</label>
				</div>
			</div>
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
