import React from 'react';
import PropTypes from 'prop-types';
import badgeCssModule from '../../Badge.scss';
import { getTheme } from '../../../theme';
import ActionDropdown from '../../../Actions/ActionDropdown';

const theme = getTheme(badgeCssModule);

const BadgeIcon = ({ props }) => (
	<ActionDropdown className={theme('tc-badge-dropdown')} bsStyle="link" {...props} />
);

BadgeIcon.propTypes = {
	props: PropTypes.object,
};

export default BadgeIcon;
