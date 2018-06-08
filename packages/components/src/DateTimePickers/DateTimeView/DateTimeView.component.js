import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../DatePicker';
import ViewLayout from '../ViewLayout';
import { ActionButton } from '../../Actions';
import theme from './DateTimeView.scss';

function DateTimeView(props) {

	const header = {
		leftItem: <ActionButton
			icon="talend-chevron-left"
			hideLabel
			link
		/>,
		middleItem: <ActionButton
			className={theme.title}
			label="Septembre 2017"
			link
		/>,
		rightItem: <ActionButton
			icon="talend-chevron-left"
			iconTransform="rotate-180"
			hideLabel
			link
		/>,
	};

	const viewComponent = (
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
			viewComponent={viewComponent}
		/>
	);
}

DateTimeView.propTypes = {
};

export default DateTimeView;
