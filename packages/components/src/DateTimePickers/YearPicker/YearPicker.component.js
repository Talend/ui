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
	].slice(0, 5);

	return (
		<div className={theme.container}>
			<button className={theme.previous}>
				<span>&#60;</span>
			</button>
			<div className={theme.years}>
				{years.map((year, i) =>
					<div className={theme.year} key={i} >
						{year}
					</div>
				)}
			</div>
			<button className={theme.next}>
				<span>&#60;</span>
			</button>
		</div>
	);
}

YearPicker.propTypes = {
};

export default YearPicker;
