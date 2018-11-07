import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../pickers/DatePicker';
import TimePicker from '../../pickers/TimePicker';
import ViewLayout from '../ViewLayout';
import IconButton from '../../shared/components/IconButton';
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

class DateTimeView extends React.PureComponent {
	constructor(props) {
		super(props);

		this.goToPreviousMonth = this.incrementMonthIndex.bind(this, -1);
		this.goToNextMonth = this.incrementMonthIndex.bind(this, 1);
	}

	incrementMonthIndex(monthIncrement, callback) {
		const monthIndexIncremented = this.props.calendar.monthIndex + monthIncrement;
		const newMonthIndex = euclideanModulo(monthIndexIncremented, 12);
		const yearIncrement = Math.floor(monthIndexIncremented / 12);
		const newYear = this.props.calendar.year + yearIncrement;

		this.props.onSelectMonthYear(
			{
				monthIndex: newMonthIndex,
				year: newYear,
			},
			callback,
		);
	}

	render() {
		const tabIndex = this.props.allowFocus ? 0 : -1;

		const header = {
			leftElement: (
				<IconButton
					icon={{
						name: 'talend-chevron-left',
					}}
					aria-label="Display previous calendar month"
					onClick={() => this.goToPreviousMonth()}
					tabIndex={tabIndex}
				/>
			),
			middleElement: (
				<HeaderTitle
					monthIndex={this.props.calendar.monthIndex}
					year={this.props.calendar.year}
					button={{
						'aria-label': 'Switch to month and year pickers view',
						onClick: this.props.onClickTitle,
						tabIndex,
					}}
				/>
			),
			rightElement: (
				<IconButton
					icon={{
						name: 'talend-chevron-left',
						transform: 'rotate-180',
					}}
					aria-label="Display next calendar month"
					onClick={() => this.goToNextMonth()}
					tabIndex={tabIndex}
				/>
			),
		};

		const bodyElement = (
			<div className={theme.body}>
				<div className={theme.date}>
					<DatePicker
						allowFocus={this.props.allowFocus}
						calendar={this.props.calendar}
						selectedDate={this.props.selectedDate}
						onSelect={this.props.onSelectDate}
						goToPreviousMonth={this.goToPreviousMonth}
						goToNextMonth={this.goToNextMonth}
					/>
				</div>
				<div className={theme.time}>
					<TimePicker
						allowFocus={this.props.allowFocus}
						value={this.props.selectedTime}
						onChange={this.props.onSelectTime}
					/>
				</div>
			</div>
		);

		return <ViewLayout header={header} bodyElement={bodyElement} />;
	}
}

DateTimeView.propTypes = {
	allowFocus: PropTypes.bool,
	calendar: PropTypes.shape({
		monthIndex: PropTypes.number.isRequired,
		year: PropTypes.number.isRequired,
	}).isRequired,
	onClickTitle: PropTypes.func.isRequired,
	onSelectMonthYear: PropTypes.func.isRequired,
	onSelectDate: PropTypes.func.isRequired,
	onSelectTime: PropTypes.func.isRequired,
	selectedDate: PropTypes.instanceOf(Date),
	selectedTime: PropTypes.shape({
		hours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		minutes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	}),
};

export default DateTimeView;
