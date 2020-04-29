import React from 'react';
import PropTypes from 'prop-types';
import { Column } from 'react-virtualized';
import theme from './Content.scss';
import { getTheme } from '../theme';
import Icon from '../Icon';

const css = getTheme(theme);

function DefaultRenderer({ cellData }) {
	if (typeof cellData === 'object' && cellData !== null) {
		return (
			<div className={css('tc-virtualizedlist-default-cell')}>
				<Icon name={cellData.icon} />
				<span className={css('tc-virtualizedlist-default-cell-text')}>{cellData.label}</span>
			</div>
		);
	}
	return <div className={css('tc-virtualizedlist-default-cell-text')}>{cellData}</div>;
}
DefaultRenderer.propTypes = {
	cellData: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			label: PropTypes.string,
			icon: PropTypes.string,
		}),
	]),
};

export const defaultColumnConfiguration = {
	...Column.defaultProps,
	cellRenderer: DefaultRenderer,
	width: -1,
};

// this is a fake component to be usable in JSX,
// but the element is used as props object internally (VirtualizedList / RV)
export default function Content() {
	return null;
}
Content.displayName = 'Content';
Content.defaultProps = defaultColumnConfiguration;
