import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../pickers/DatePicker';
import ViewLayout from '../ViewLayout';
import IconButton from '../../IconButton';
import HeaderTitle from '../HeaderTitle';
import theme from './DateTimeView.scss';

/**
 * Get the positive euclidean modulo number from a dividend and a divisor
 * @param {number} dividend Dividend
 * @param {number} divisor Divisor
 * @return {number} The positive euclidean modulo
 */
export function euclideanModulo(dividend, divisor) {
	const modulo = ((dividend % divisor) + divisor) % divisor;
	return modulo < 0 ? modulo + Math.abs(divisor) : modulo;
}

class DateTimeView extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentDate: new Date(),
		};

		this.incrementMonthIndexDown = this.incrementMonthIndex.bind(this, -1);
		this.incrementMonthIndexUp = this.incrementMonthIndex.bind(this, 1);
	}

	incrementMonthIndex(monthIncrement) {
		const monthIndexIncremented = this.props.selectedMonthIndex + monthIncrement;
		const newMonthIndex = euclideanModulo(monthIndexIncremented, 12);
		const yearIncrement = Math.floor(monthIndexIncremented / 12);
		const newYear = this.props.selectedYear + yearIncrement;

		this.props.onSelectMonthYear({
			monthIndex: newMonthIndex,
			year: newYear,
		});
	}

	render() {
		const header = {
			leftElement: <IconButton
				icon={{
					name: 'talend-chevron-left',
				}}
				aria-label="Display previous calendar month"
				onClick={this.incrementMonthIndexDown}
			/>,
			middleElement: <HeaderTitle
				monthIndex={this.props.selectedMonthIndex}
				year={this.props.selectedYear}
				button={{
					'aria-label': 'Switch to month and year pickers view',
					onClick: this.props.onClickTitle,
				}}
			/>,
			rightElement: <IconButton
				icon={{
					name: 'talend-chevron-left',
					transform: 'rotate-180',
				}}
				aria-label="Display next calendar month"
				onClick={this.incrementMonthIndexUp}
			/>,
		};

		const currentCalendar = {
			year: this.props.selectedYear,
			monthIndex: this.props.selectedMonthIndex,
		};

		const bodyElement = (
			<div className={theme.body}>
				<div className={theme.date}>
					<DatePicker
						calendar={currentCalendar}
						currentDate={this.state.currentDate}
						selectedDate={this.props.selectedDate}
						onSelect={this.props.onSelectDate}
					/>
				</div>
				<div className={theme.time}>

				</div>
			</div>
		);

		return (
			<ViewLayout
				header={header}
				bodyElement={bodyElement}
			/>
		);
	}
}

DateTimeView.propTypes = {
	selectedMonthIndex: PropTypes.number.isRequired,
	selectedYear: PropTypes.number.isRequired,
	onClickTitle: PropTypes.func.isRequired,
	onSelectMonthYear: PropTypes.func.isRequired,
	onSelectDate: PropTypes.func.isRequired,
	selectedDate: PropTypes.instanceOf(Date),
};

export default DateTimeView;
