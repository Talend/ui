import React from 'react';
import PropTypes from 'prop-types';
import addYears from 'date-fns/add_years';
import setYear from 'date-fns/set_year';
import { AutoSizer, List } from 'react-virtualized';
import theme from './YearPicker.scss';
import IconButton from '../../IconButton';
import PickerAction from '../../PickerAction';

const baseDate = new Date(0);
const yearRange = 300;

class YearPicker extends React.Component {

	constructor(props) {
		super(props);

		const now = new Date();
		const middleYear = now.getFullYear();

		const firstYear = middleYear - Math.ceil(yearRange / 2);
		const firstDate = setYear(baseDate, firstYear);

		this.years = (new Array(yearRange))
			.fill(0)
			.map((_, i) => addYears(firstDate, i))
			.map(date => date.getFullYear());

		const indexOfYear = year => year - firstYear;

		const initialYear = props.selectedYear === undefined
			? now.getFullYear()
			: props.selectedYear;

		this.initialIndex = indexOfYear(initialYear) - 2;


		this.state = {
			startIndex: this.initialIndex,
		};

		this.isSelected = this.isSelected.bind(this);
		this.scrollUp = this.scrollRows.bind(this, -5);
		this.scrollDown = this.scrollRows.bind(this, 5);
		this.onRowsRendered = this.onRowsRendered.bind(this);
	}

	onRowsRendered(data) {
		const { startIndex } = data;

		this.setState({ startIndex });
	}

	isSelected(year) {
		return year === this.props.selectedYear;
	}

	scrollRows(increment) {
		const newRowIndex = this.state.startIndex + increment;
		this.listRef.scrollToRow(newRowIndex);
	}

	render() {
		const rowRenderer = ({
			index,
			key,
			style,
		}) => {
			const year = this.years[index];
			return (
				<div
					key={key}
					style={style}
				>
					<PickerAction
						aria-label={`Select '${year}'`}
						isSelected={this.isSelected(year)}
						label={year.toString()}
						onClick={() => this.props.onSelect(year)}
					/>
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
					className={theme['action-up']}
					aria-label="Scroll to previous years"
					onClick={this.scrollUp}
				/>
				<div className={theme.years}>
					<AutoSizer>
						{({ height, width, scrollTop }) => {
							const rowHeight = height / 5;
							return (
								<List
									ref={ref => { this.listRef = ref; }}
									height={height}
									overscanRowCount={5}
									rowCount={this.years.length}
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
					className={theme['action-down']}
					aria-label="Scroll to next years"
					onClick={this.scrollDown}
				/>
			</div>
		);
	}
}

YearPicker.propTypes = {
	selectedYear: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
};

export default YearPicker;
