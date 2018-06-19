import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../pickers/DatePicker';
import ViewLayout from '../ViewLayout';
import IconButton from '../../IconButton';
import HeaderTitle from '../HeaderTitle';
import theme from './DateTimeView.scss';

function DateTimeView(props) {
	const header = {
		leftElement: <IconButton
			icon={{
				name: 'talend-chevron-left',
			}}
			aria-label="Display previous calendar month"
		/>,
		middleElement: <HeaderTitle
			month={props.monthSelected}
			year={props.yearSelected}
			button={{
				'aria-label': 'Switch to month and year pickers view',
				onClick: props.onTitleClick,
			}}
		/>,
		rightElement: <IconButton
			icon={{
				name: 'talend-chevron-left',
				transform: 'rotate-180',
			}}
			aria-label="Display next calendar month"
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

DateTimeView.propTypes = {
	onTitleClick: PropTypes.func,
	monthSelected: PropTypes.number.isRequired,
	yearSelected: PropTypes.number.isRequired,
};

export default DateTimeView;
