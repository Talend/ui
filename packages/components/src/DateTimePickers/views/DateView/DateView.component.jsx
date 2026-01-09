import { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ButtonIcon } from '@talend/design-system';

import getDefaultT from '../../../translate';
import DatePicker from '../../pickers/DatePicker';
import HeaderTitle from '../HeaderTitle';
import ViewLayout from '../ViewLayout';

import theme from './DateView.module.css';

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

class DateView extends PureComponent {
	static propTypes = {
		allowFocus: PropTypes.bool,
		calendar: PropTypes.shape({
			monthIndex: PropTypes.number.isRequired,
			year: PropTypes.number.isRequired,
		}).isRequired,
		onTitleClick: PropTypes.func.isRequired,
		onSelectMonthYear: PropTypes.func.isRequired,
		onSelectDate: PropTypes.func.isRequired,
		onSelectYear: PropTypes.func.isRequired,
		selectedDate: PropTypes.instanceOf(Date),
		startDate: PropTypes.instanceOf(Date),
		endDate: PropTypes.instanceOf(Date),
		isDisabledChecker: PropTypes.func,
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
				<ButtonIcon
					size="S"
					icon="arrow-left"
					onClick={() => this.goToPreviousMonth()}
					tabIndex="-1"
				>
					{t('DATEPICKER_MONTH_PREVIOUS', 'Go to previous month')}
				</ButtonIcon>
			),
			middleElement: (
				<HeaderTitle
					monthIndex={this.props.calendar.monthIndex}
					year={this.props.calendar.year}
					button={{
						'aria-label': t('DATEPICKER_TO_MONTH_YEAR', {
							defaultValue: 'Switch to month view',
						}),
						onClick: this.props.onTitleClick,
						tabIndex: this.props.allowFocus ? 0 : -1,
					}}
					onSelectYear={this.props.onSelectYear}
				/>
			),
			rightElement: (
				<ButtonIcon size="S" icon="arrow-right" onClick={() => this.goToNextMonth()} tabIndex="-1">
					{t('DATEPICKER_MONTH_NEXT', 'Go to next month')}
				</ButtonIcon>
			),
		};

		const bodyElement = (
			<div className={theme.body}>
				<div key="date" className={theme.date}>
					<DatePicker
						allowFocus={this.props.allowFocus}
						calendar={this.props.calendar}
						selectedDate={this.props.selectedDate}
						startDate={this.props.startDate}
						endDate={this.props.endDate}
						onSelect={this.props.onSelectDate}
						goToPreviousMonth={this.goToPreviousMonth}
						goToNextMonth={this.goToNextMonth}
						isDisabledChecker={this.props.isDisabledChecker}
					/>
				</div>
			</div>
		);

		return <ViewLayout header={header} bodyElement={bodyElement} />;
	}
}

export default DateView;
