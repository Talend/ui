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

		this.onMonthSelected = this.onMonthSelected.bind(this);
		this.onYearSelected = this.onYearSelected.bind(this);
	}

	onMonthSelected(index) {
		console.log(index);
	}

	onYearSelected(year) {
		console.log(year);
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
						currentMonth={8}
						onMonthSelected={this.onMonthSelected}
					/>
				</div>
				<div className={theme.year}>
					<YearPicker
						currentYear={2012}
						onYearSelected={this.onYearSelected}
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
};

export default MonthYearView;
