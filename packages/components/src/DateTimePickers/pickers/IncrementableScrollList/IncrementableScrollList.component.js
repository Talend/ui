import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import classNames from 'classnames';
import theme from './IncrementableScrollList.scss';
import IconButton from '../../IconButton';

class IncrementableScrollList extends React.Component {

	constructor(props) {
		super(props);

		this.initialIndex = props.initialIndex === undefined
			? 0
			: props.initialIndex;

		this.state = {
			startIndex: this.initialIndex,
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
		const newRowIndex = this.state.startIndex + increment;
		this.listRef.scrollToRow(newRowIndex);
	}

	render() {
		// Define new function in each render because item rendered can change
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
							const rowHeight = height / 5;
							return (
								<List
									ref={this.setListRef}
									height={height}
									overscanRowCount={5}
									rowCount={this.props.items.length}
									rowHeight={rowHeight}
									rowRenderer={rowRenderer}
									scrollToAlignment={'start'}
									scrollToIndex={this.initialIndex}
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

const idPropType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number,
]);

IncrementableScrollList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: idPropType.isRequired,
		label: PropTypes.string.isRequired,
	})).isRequired,
	itemRenderer: PropTypes.func.isRequired,
	initialIndex: PropTypes.number,
};

export default IncrementableScrollList;
