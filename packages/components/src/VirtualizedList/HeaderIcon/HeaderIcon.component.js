import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Icon from '../../Icon';
import theme from './HeaderIcon.scss';

/**
 * This renderer render the header with an icon
 * @param {object} props column header props
 */
function HeaderIcon({ label, columnData }) {
	return (
		<div className={classnames(theme['tc-header-icon'], 'tc-header-icon')}>
			<Icon name={columnData.iconName} title={label} />
		</div>
	);
}

HeaderIcon.displayName = 'VirtualizedList(HeaderIcon)';
HeaderIcon.propTypes = {
	label: PropTypes.string,
	columnData: PropTypes.shape({
		iconName: PropTypes.string,
	}).isRequired,
};

export default HeaderIcon;
