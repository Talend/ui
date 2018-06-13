import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './YearPicker.scss';
import { ActionButton } from '../../Actions';
import IconButton from '../IconButton';

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

	function getClassIfSelected(y) {
		return selectedYear === y ? theme.selected : undefined;
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
					<ActionButton
						key={i}
						label={year}
						link
						className={classNames(
							theme.year,
							getClassIfSelected(year),
						)}
						aria-label={`Select '${year}'`}
					/>
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
