import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../DatePicker';
import ViewLayout from '../ViewLayout';
import { ActionButton } from '../../Actions';
import theme from './DateTimeView.scss';

function DateTimeView(props) {

	const header = {
		leftNode: <ActionButton
			icon="talend-chevron-left"
			link
			className={theme['action-left']}
			aria-label="Display previous calendar month"
		/>,
		middleNode: <ActionButton
			label="Septembre 2017"
			link
			className={theme['action-middle']}
			aria-label="Switch to month and year pickers view"
		/>,
		rightNode: <ActionButton
			icon="talend-chevron-left"
			iconTransform="rotate-180"
			link
			className={theme['action-right']}
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
