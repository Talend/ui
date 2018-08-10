import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import classNames from 'classnames';
import theme from './IncrementableScrollList.scss';
import IconButton from '../../shared/components/IconButton';
import RowRenderer from './RowRenderer';

const NB_ITEMS_DISPLAYED = 5;

function keepInBoundaries(number, min, max) {
	if (number < min) {
		return min;
	}
	if (number > max) {
		return max;
	}
	return number;
}

class IncrementableScrollList extends React.Component {
	constructor(props) {
		super(props);
		const firstIndex = 0;
		const lastIndex = this.props.items.length - NB_ITEMS_DISPLAYED;

		const startIndex = Math.max(this.props.initialIndex - Math.floor(NB_ITEMS_DISPLAYED / 2), 0);
		this.scrollToIndex = keepInBoundaries(startIndex, firstIndex, lastIndex);

		this.state = {
			startIndex: this.scrollToIndex,
		};

		this.scrollUp = this.scrollRows.bind(this, -NB_ITEMS_DISPLAYED);
		this.scrollDown = this.scrollRows.bind(this, NB_ITEMS_DISPLAYED);
		this.onRowsRendered = this.onRowsRendered.bind(this);
		this.setListRef = this.setListRef.bind(this);
	}

	onRowsRendered(data) {
		this.setState({
			startIndex: data.startIndex,
		});
	}

	setListRef(ref) {
		this.listRef = ref;
	}

	scrollRows(increment) {
		const firstIndex = 0;
		const lastIndex = this.props.items.length - NB_ITEMS_DISPLAYED;
		const needToScroll =
			(increment < 0 && this.state.startIndex > firstIndex) ||
			(increment > 0 && this.state.startIndex < lastIndex);

		if (!needToScroll) {
			return;
		}

		const incrementedIndex = this.state.startIndex + increment;
		const newRowIndex = keepInBoundaries(incrementedIndex, firstIndex, lastIndex);
		this.listRef.scrollToRow(newRowIndex);
	}

	render() {
		return (
			<div className={`tc-picker-scrollable-list ${theme.container}`}>
				<IconButton
					icon={{
						name: 'talend-chevron-left',
						transform: 'rotate-90',
					}}
					className={classNames('tc-incrementable-scroll-list-action-up', theme['action-up'])}
					aria-label="Scroll to previous page"
					onClick={this.scrollUp}
				/>
				<div className={`tc-picker-scrollable-list-items ${theme.items}`}>
					<AutoSizer>
						{({ height, width, scrollTop }) => {
							const rowHeight = height / NB_ITEMS_DISPLAYED;
							return (
								<List
									ref={this.setListRef}
									height={height}
									items={this.props.items}
									overscanRowCount={5}
									rowCount={this.props.items.length}
									rowHeight={rowHeight}
									rowRenderer={RowRenderer}
									scrollToAlignment={'start'}
									scrollToIndex={this.scrollToIndex}
									width={width}
									scrollTop={scrollTop}
									selectedItemId={this.props.selectedItemId}
									onRowsRendered={this.onRowsRendered}
									onSelect={this.props.onSelect}
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
	initialIndex: PropTypes.number,
	selectedItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onSelect: PropTypes.func.isRequired,
};

IncrementableScrollList.defaultProps = {
	initialIndex: 0,
};

export default IncrementableScrollList;
