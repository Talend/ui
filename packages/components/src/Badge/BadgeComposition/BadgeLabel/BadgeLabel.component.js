import PropTypes from 'prop-types';
import { Badge } from '@talend/design-system';

const BadgeLabel = ({ aslink, category, label, children }) => {
	return (
		<div className={theme('tc-badge-label')}>
			<Badge label={label} value={category} />
			{children}
		</div>
	);
};

BadgeLabel.propTypes = {
	aslink: PropTypes.bool,
	category: PropTypes.string,
	label: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

export default BadgeLabel;
