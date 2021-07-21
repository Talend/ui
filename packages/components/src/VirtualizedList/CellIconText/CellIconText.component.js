import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../Icon';
import { getTheme } from '../../theme';
import TooltipTrigger from '../../TooltipTrigger';
import theme from './CellIconText.scss';

const css = getTheme(theme);

const DEFAULT_TOOLTIP_PLACEMENT = 'top';

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
		const { columnData } = this.props;
		const iconTooltip = columnData.iconTooltip;

		return (
			<div className={css('tc-icon-text')}>
				{icon &&
					(iconTooltip ? (
						<TooltipTrigger
							label={iconTooltip}
							tooltipPlacement={columnData.tooltipPlacement || DEFAULT_TOOLTIP_PLACEMENT}
						>
							<span><Icon name={icon} /></span>
						</TooltipTrigger>
					) : (
						<Icon name={icon} />
					))}
				<TooltipTrigger
					label={columnData.tooltip || label}
					tooltipPlacement={columnData.tooltipPlacement || DEFAULT_TOOLTIP_PLACEMENT}
				>
					<span className={theme.label}>{label}</span>
				</TooltipTrigger>
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
		tooltip: PropTypes.string,
		tooltipPlacement: PropTypes.string,
		iconTooltip: PropTypes.string,
	}).isRequired,
};

CellIconText.defaultProps = {
	cellData: {},
};

export default CellIconText;
