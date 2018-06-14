import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../../subpickers/DatePicker';
import ViewLayout from '../common/ViewLayout';
import IconButton from '../../shared/IconButton';
import HeaderTitle from '../common/HeaderTitle';
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
