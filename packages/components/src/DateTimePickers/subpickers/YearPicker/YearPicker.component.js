import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './YearPicker.scss';
import IconButton from '../../shared/IconButton';
import PickerAction from '../../shared/PickerAction';

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

	const selectedYear = 2012;

	function isSelected(y) {
		return selectedYear === y;
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
				{years.map((year, i) =>
					<div
						key={i}
						className={theme.year}
					>
						<PickerAction
							aria-label={`Select '${year}'`}
							isSelected={isSelected(year)}
							label={year.toString()}
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
};

export default YearPicker;
