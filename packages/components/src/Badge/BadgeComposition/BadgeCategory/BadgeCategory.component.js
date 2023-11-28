import PropTypes from 'prop-types';
import badgeCssModule from '../../Badge.module.scss';
import { getTheme } from '../../../theme';
import { Tooltip } from '@talend/design-system';

const theme = getTheme(badgeCssModule);

const BadgeCategory = ({ label }) => (
	<Tooltip label={label}>
		<span aria-label={label} className={theme('tc-badge-category')}>
			{label}
		</span>
	</Tooltip>
);

BadgeCategory.propTypes = {
	label: PropTypes.string.isRequired,
};

export default BadgeCategory;
