import React from 'react';
import PropTypes from 'prop-types';
import theme from './PickerHeader.scss';

function Header(props) {
	return (
		<div className={theme.container}>
			<button className={theme.previous}>&#60;</button>
			<button className={theme.title}>Septembre 2017</button>
			<button className={theme.next}>&#62;</button>
		</div>
	);
}

Header.propTypes = {
};

export default Header;
