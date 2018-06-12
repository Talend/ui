import React from 'react';
import PropTypes from 'prop-types';
import theme from './YearPicker.scss';
import { ActionButton } from '../../Actions';

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

	return (
		<div className={theme.container}>
			<ActionButton
				className={theme.previous}
				icon="talend-chevron-left"
				iconTransform="rotate-90"
				link
			/>
			<div className={theme.years}>
				{years.map((year, i) =>
					<div className={theme.year} key={i} >
						{year}
					</div>
				)}
			</div>
			<ActionButton
				className={theme.next}
				icon="talend-chevron-left"
				iconTransform="rotate-270"
				link
			/>
		</div>
	);
}

YearPicker.propTypes = {
};

export default YearPicker;
