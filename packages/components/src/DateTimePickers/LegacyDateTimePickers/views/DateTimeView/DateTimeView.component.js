import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../../../../Actions';
import DatePicker from '../../pickers/DatePicker';
import TimePicker from '../../pickers/TimePicker';
import ViewLayout from '../ViewLayout';
import HeaderTitle from '../HeaderTitle';
import theme from './DateTimeView.scss';
import getDefaultT from '../../../../translate';

/**
 * Get the positive euclidean modulo number from a dividend and a divisor
 * @param {number} dividend Dividend
 * @param {number} divisor Divisor
 * @return {number} The positive euclidean modulo
 */
function euclideanModulo(dividend, divisor) {
	const modulo = ((dividend % divisor) + divisor) % divisor;
	return modulo < 0 ? modulo + Math.abs(divisor) : modulo;
}

class DateTimeView extends React.PureComponent {
	static propTypes = {
		allowFocus: PropTypes.bool,
		calendar: PropTypes.shape({
			monthIndex: PropTypes.number.isRequired,
			year: PropTypes.number.isRequired,
		}).isRequired,
		onTitleClick: PropTypes.func.isRequired,
		onSelectMonthYear: PropTypes.func.isRequired,
		onSelectDate: PropTypes.func.isRequired,
		onSelectTime: PropTypes.func.isRequired,
		selectedDate: PropTypes.instanceOf(Date),
		selectedTime: PropTypes.shape({
			hours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			minutes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		}),
		useSeconds: PropTypes.bool,
		useTime: PropTypes.bool,
		useUTC: PropTypes.bool,
		t: PropTypes.func,
	};

	static defaultProps = {
		t: getDefaultT(),
	};

	constructor(props) {
		super(props);

		this.goToPreviousMonth = this.incrementMonthIndex.bind(this, -1);
		this.goToNextMonth = this.incrementMonthIndex.bind(this, 1);
	}

	getTimePicker() {
		return (
			<div key="time" className={theme.time}>
				<TimePicker
					allowFocus={this.props.allowFocus}
					value={this.props.selectedTime}
					onChange={this.props.onSelectTime}
					useSeconds={this.props.useSeconds}
					useUTC={this.props.useUTC}
				/>
			</div>
		);
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
		const { t } = this.props;
		const header = {
			leftElement: (
				<Action
					aria-label={t('DATEPICKER_MONTH_PREVIOUS', { defaultValue: 'Go to previous month' })}
					icon="talend-arrow-left"
					label=""
					onClick={() => this.goToPreviousMonth()}
					tabIndex="-1"
					className={classNames('btn-tertiary', 'btn-info')}
				/>
			),
			middleElement: (
				<HeaderTitle
					monthIndex={this.props.calendar.monthIndex}
					year={this.props.calendar.year}
					button={{
						'aria-label': t('DATEPICKER_TO_MONTH_YEAR', {
							defaultValue: 'Switch to month and year pickers view',
						}),
						onClick: this.props.onTitleClick,
						tabIndex: this.props.allowFocus ? 0 : -1,
					}}
				/>
			),
			rightElement: (
				<Action
					aria-label={t('DATEPICKER_MONTH_NEXT', { defaultValue: 'Go to next month' })}
					icon="talend-arrow-left"
					iconTransform="rotate-180"
					label=""
					onClick={() => this.goToNextMonth()}
					tabIndex="-1"
					className="btn-tertiary btn-info"
				/>
			),
		};

		const bodyElement = (
			<div className={theme.body}>
				<div key="date" className={theme.date}>
					<DatePicker
						allowFocus={this.props.allowFocus}
						calendar={this.props.calendar}
						selectedDate={this.props.selectedDate}
						onSelect={this.props.onSelectDate}
						goToPreviousMonth={this.goToPreviousMonth}
						goToNextMonth={this.goToNextMonth}
					/>
				</div>
				{this.props.useTime && this.getTimePicker()}
			</div>
		);

		return <ViewLayout header={header} bodyElement={bodyElement} />;
	}
}

export default DateTimeView;
