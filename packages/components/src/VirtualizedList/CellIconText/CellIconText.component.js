import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../Icon';
import { getTheme } from '../../theme';
import theme from './CellIconText.scss';

const css = getTheme(theme);

function getCellIcon({ cellData, rowData, columnData = {} }) {
	const { getIcon } = columnData;
	if (getIcon && typeof getIcon === 'function') {
		return getIcon(rowData);
	}
	return cellData.icon;
}

function getCellLabel({ cellData }) {
	if (typeof cellData === 'object') {
		return cellData.label;
	}
	return cellData;
}

/**
 * Cell renderer that displays a boolean
 */
class CellIconText extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.cellData !== nextProps.cellData;
	}

	render() {
		const icon = getCellIcon(this.props);
		const label = getCellLabel(this.props);

		return (
			<div className={css('tc-icon-text')}>
				{icon && <Icon name={icon} />}
				<span className={theme.label}>{label}</span>
			</div>
		);
	}
}

CellIconText.displayName = 'VirtualizedList(CellIconText)';
CellIconText.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.oneOf([
		PropTypes.shape({
			label: PropTypes.string,
			icon: PropTypes.string,
		}),
		PropTypes.string,
	]),
	columnData: PropTypes.shape({
		getIcon: PropTypes.func,
	}).isRequired,
};

CellIconText.defaultProps = {
	cellData: {},
};

export default CellIconText;
