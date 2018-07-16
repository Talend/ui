import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import classNames from 'classnames';
import theme from './IncrementableScrollList.scss';
import IconButton from '../../../IconButton';

function keepInBoundaries(number, min, max) {
	if (number < min) {
		return min;
	}
	if (number > max) {
		return max;
	}
	return number;
}

const NB_ITEMS_DISPLAYED = 5;

class IncrementableScrollList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			startIndex: props.initialIndex,
		};

		this.scrollUp = this.scrollRows.bind(this, -5);
		this.scrollDown = this.scrollRows.bind(this, 5);
		this.onRowsRendered = this.onRowsRendered.bind(this);
		this.setListRef = this.setListRef.bind(this);
	}

	onRowsRendered(data) {
		const { startIndex } = data;

		this.setState({ startIndex });
	}

	setListRef(ref) {
		this.listRef = ref;
	}

	scrollRows(increment) {
		const firstIndex = 0;
		const lastIndex = this.props.items.length - NB_ITEMS_DISPLAYED;
		const needToScroll = increment < 0 && this.state.startIndex > firstIndex ||
							increment > 0 && this.state.startIndex < lastIndex;

		if (!needToScroll) {
			return;
		}

		const incrementedIndex = this.state.startIndex + increment;
		const newRowIndex = keepInBoundaries(incrementedIndex, firstIndex, lastIndex);
		this.listRef.scrollToRow(newRowIndex);
	}

	render() {
		// Define new function in each render because item rendered can change
		// new function reference enforce recomputing items
		const rowRenderer = data => {
			const {
				index,
				key,
				style,
			} = data;

			const item = this.props.items[index];

			return (
				<div
					key={key}
					style={style}
				>
					{this.props.itemRenderer(item)}
				</div>
			);
		};

		return (
			<div className={theme.container}>
				<IconButton
					icon={{
						name: 'talend-chevron-left',
						transform: 'rotate-90',
					}}
					className={classNames('tc-incrementable-scroll-list-action-up', theme['action-up'])}
					aria-label="Scroll to previous page"
					onClick={this.scrollUp}
				/>
				<div className={theme.items}>
					<AutoSizer>
						{({ height, width, scrollTop }) => {
							const rowHeight = height / NB_ITEMS_DISPLAYED;
							return (
								<List
									ref={this.setListRef}
									height={height}
									overscanRowCount={5}
									rowCount={this.props.items.length}
									rowHeight={rowHeight}
									rowRenderer={rowRenderer}
									scrollToAlignment={'start'}
									scrollToIndex={this.props.initialIndex}
									width={width}
									scrollTop={scrollTop}
									onRowsRendered={this.onRowsRendered}
								/>
							);
						}}
					</AutoSizer>
				</div>
				<IconButton
					icon={{
						name: 'talend-chevron-left',
						transform: 'rotate-270',
					}}
					className={classNames('tc-incrementable-scroll-list-action-down', theme['action-down'])}
					aria-label="Scroll to next page"
					onClick={this.scrollDown}
				/>
			</div>
		);
	}
}

IncrementableScrollList.propTypes = {
	items: PropTypes.array.isRequired,
	itemRenderer: PropTypes.func.isRequired,
	initialIndex: PropTypes.number,
};

IncrementableScrollList.defaultProps = {
	initialIndex: 0,
};

export default IncrementableScrollList;
