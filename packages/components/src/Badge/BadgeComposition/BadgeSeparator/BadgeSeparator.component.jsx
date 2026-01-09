import PropTypes from 'prop-types';
import badgeCssModule from '../../Badge.module.css';
import { getTheme } from '../../../theme';

const theme = getTheme(badgeCssModule);

const BadgeSeparator = ({ iconSeparator }) => (
	<span className={theme('tc-badge-separator', { 'tc-badge-separator-icon': iconSeparator })} />
);

BadgeSeparator.propTypes = {
	iconSeparator: PropTypes.bool,
};

export default BadgeSeparator;
