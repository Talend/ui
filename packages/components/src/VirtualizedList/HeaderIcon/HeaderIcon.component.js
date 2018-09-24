import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { SortIndicator } from 'react-virtualized';

import Icon from '../../Icon';
import theme from './HeaderIcon.scss';

/**
 * This renderer render the header with an icon
 * @param {object} props column header props
 */
function HeaderIcon({ label, sortBy, dataKey, sortDirection, columnData }) {
	return (
		<div className={classnames(theme['tc-header-icon'], 'tc-header-icon')}>
			<span title={label} aria-label={label}>
				{columnData.iconName && <Icon name={columnData.iconName} />}
				{sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
			</span>
		</div>
	);
}

HeaderIcon.displayName = 'VirtualizedList(HeaderIcon)';
HeaderIcon.propTypes = {
	sortBy: PropTypes.string,
	dataKey: PropTypes.string,
	sortDirection: PropTypes.string,
	label: PropTypes.string,
	columnData: PropTypes.shape({
		iconName: PropTypes.string,
	}).isRequired,
};

export default HeaderIcon;
