import React from 'react';
import PropTypes from 'prop-types';

import theme from './SkipLinks.scss';

function SkipLinks(props) {
	const children = [];

	if (props.navigation) {
		children.push(
			<li>
				<a href="#tc-layout-side-menu">{'Skip header to navigation'}</a>
			</li>,
		);
	}

	if (props.main) {
		children.push(
			<li>
				<a href="#tc-layout-main">{'Skip navigation to main content'}</a>
			</li>,
		);
	}

	return <ul className={theme['tc-skip-links']}>{children}</ul>;
}

SkipLinks.defaultProps = {
	navigation: true,
	main: true,
};

SkipLinks.propTypes = {
	navigation: PropTypes.bool,
	main: PropTypes.bool,
};

export default SkipLinks;
