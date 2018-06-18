import React from 'react';
import PropTypes from 'prop-types';
import theme from './YearPicker.scss';
import IconButton from '../../IconButton';
import PickerAction from '../../PickerAction';

function YearPicker(props) {
	const years = [
		2010,
		2011,
		2012,
		2013,
		2014,
		2015,
		2016,
		2017,
	].slice(0, 5);

	function isSelected(year) {
		return year === props.currentYear;
	}

	function onYearSelected(year) {
		return () => {
			props.onYearSelected(year);
		};
	}

	return (
		<div className={theme.container}>
			<IconButton
				icon={{
					name: 'talend-chevron-left',
					transform: 'rotate-90',
				}}
				className={theme['action-up']}
				aria-label="Scroll to previous years"
			/>
			<div className={theme.years}>
				{years.map(year =>
					<div
						key={year}
						className={theme.year}
					>
						<PickerAction
							aria-label={`Select '${year}'`}
							isSelected={isSelected(year)}
							label={year.toString()}
							onClick={onYearSelected(year)}
						/>
					</div>
				)}
			</div>
			<IconButton
				icon={{
					name: 'talend-chevron-left',
					transform: 'rotate-270',
				}}
				className={theme['action-down']}
				aria-label="Scroll to next years"
			/>
		</div>
	);
}

YearPicker.propTypes = {
	currentYear: PropTypes.number,
	onYearSelected: PropTypes.func,
};

export default YearPicker;
