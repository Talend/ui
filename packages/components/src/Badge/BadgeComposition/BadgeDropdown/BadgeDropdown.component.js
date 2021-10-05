import React from 'react';
import PropTypes from 'prop-types';
import badgeCssModule from '../../Badge.scss';
import { getTheme } from '../../../theme';
import ActionDropdown from '../../../Actions/ActionDropdown';

const theme = getTheme(badgeCssModule);

const BadgeDropdown = ({ props }) => (
	<ActionDropdown className={theme('tc-badge-dropdown')} bsStyle="link" {...props} />
);

BadgeDropdown.propTypes = {
	props: PropTypes.object,
};

export default BadgeDropdown;
