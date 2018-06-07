import React from 'react';
import PropTypes from 'prop-types';
import theme from './YearPicker.scss';

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
	];

	return (
		<div className={theme.container}>
			{years.map((year, i) =>
				<div className={theme.year} key={i} >
					{year}
				</div>
			)}
		</div>
	);
}

YearPicker.propTypes = {
};

export default YearPicker;
