import React from 'react';
import PropTypes from 'prop-types';
import MonthPicker from '../../pickers/MonthPicker';
import YearPicker from '../../pickers/YearPicker';
import theme from './MonthYearView.scss';
import ViewLayout from '../ViewLayout';
import IconButton from '../../IconButton';
import HeaderTitle from '../HeaderTitle';

class MonthYearView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const header = {
			leftElement: <IconButton
				icon={{
					name: 'talend-arrow-left',
					className: theme['action-left-icon'],
				}}
				className={theme['action-left']}
				aria-label="Switch back to date and time pickers view"
				onClick={this.props.onBackClick}
			/>,
			middleElement: <HeaderTitle
				label="Septembre 2017"
			/>,
		};


		const bodyElement = (
			<div className={theme.body}>
				<div className={theme.month}>
					<MonthPicker
						currentMonth={this.props.monthSelected}
						onMonthSelected={this.props.onMonthSelected}
					/>
				</div>
				<div className={theme.year}>
					<YearPicker
						currentYear={this.props.yearSelected}
						onYearSelected={this.props.onYearSelected}
					/>
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

MonthYearView.propTypes = {
	onBackClick: PropTypes.func,
	monthSelected: PropTypes.number,
	yearSelected: PropTypes.number,
	onMonthSelected: PropTypes.func,
	onYearSelected: PropTypes.func,
};

export default MonthYearView;
