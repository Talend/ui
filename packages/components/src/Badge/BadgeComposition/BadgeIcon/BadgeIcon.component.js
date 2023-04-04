import PropTypes from 'prop-types';
import Icon from '../../../Icon';
import badgeCssModule from '../../Badge.module.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(badgeCssModule);

const BadgeIcon = ({ name }) => <Icon name={name} className={theme('tc-badge-label-icon')} />;

BadgeIcon.propTypes = {
	name: PropTypes.string.isRequired,
};

export default BadgeIcon;
