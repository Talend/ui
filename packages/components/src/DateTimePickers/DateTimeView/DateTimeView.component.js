import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../DatePicker';
import ViewLayout from '../ViewLayout';
import IconButton from '../IconButton';
import HeaderTitle from '../HeaderTitle';
import theme from './DateTimeView.scss';

function DateTimeView(props) {
	const header = {
		leftNode: <IconButton
			icon={{
				name: 'talend-chevron-left',
			}}
			aria-label="Display previous calendar month"
		/>,
		middleNode: <HeaderTitle
			label="Septembre 2017"
			button={{
				'aria-label': 'Switch to month and year pickers view',
			}}
		/>,
		rightNode: <IconButton
			icon={{
				name: 'talend-chevron-left',
				transform: 'rotate-180',
			}}
			aria-label="Display next calendar month"
		/>,
	};

	const bodyNode = (
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
			bodyNode={bodyNode}
		/>
	);
}

DateTimeView.propTypes = {
};

export default DateTimeView;
