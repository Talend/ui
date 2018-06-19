import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../pickers/DatePicker';
import ViewLayout from '../ViewLayout';
import IconButton from '../../IconButton';
import HeaderTitle from '../HeaderTitle';
import theme from './DateTimeView.scss';

/**
 * Get the positive euclidean modulo number from a dividend and a divisor
 * @param {number} a Dividend
 * @param {number} b Divisor
 * @return The positive euclidean modulo
 */
function euclideanModulo(a, b) {
	const m = ((a % b) + b) % b;
	return m < 0 ? m + Math.abs(b) : m;
}

class DateTimeView extends React.Component {

	constructor(props) {
		super(props);

		this.incrementMonthIndexDown = this.incrementMonthIndex.bind(this, -1);
		this.incrementMonthIndexUp = this.incrementMonthIndex.bind(this, 1);
	}

	incrementMonthIndex(monthIncrement) {
		const monthIndexIncremented = this.props.monthSelected + monthIncrement;
		const newMonthIndex = euclideanModulo(monthIndexIncremented, 12);
		const yearIncrement = Math.floor(monthIndexIncremented / 12);

		if (this.props.onMonthSelected !== undefined) {
			this.props.onMonthSelected(newMonthIndex);
		}

		if (
			this.props.onYearSelected !== undefined
			&& yearIncrement !== 0
		) {
			const newYear = this.props.yearSelected + yearIncrement;
			this.props.onYearSelected(newYear);
		}
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
				month={this.props.monthSelected}
				year={this.props.yearSelected}
				button={{
					'aria-label': 'Switch to month and year pickers view',
					onClick: this.props.onTitleClick,
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

		const bodyElement = (
			<div className={theme.body}>
				<div className={theme.date}>
					<DatePicker />
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
	monthSelected: PropTypes.number.isRequired,
	yearSelected: PropTypes.number.isRequired,
	onTitleClick: PropTypes.func,
	onMonthSelected: PropTypes.func,
	onYearSelected: PropTypes.func,
};

export default DateTimeView;
