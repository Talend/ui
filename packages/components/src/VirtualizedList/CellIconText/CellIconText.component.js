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

function getCellLabelTooltip({ cellData, rowData, columnData = {} }) {
	const { getLabelTooltip } = columnData;
	let tooltip = '';
	if (typeof getLabelTooltip === 'function') {
		tooltip = getLabelTooltip(rowData);
	} else if (typeof cellData === 'object') {
		tooltip = cellData.labelTooltip;
	}
	return tooltip;
}

function getCellIconTooltip({ cellData, rowData, columnData = {} }) {
	const { getIconTooltip } = columnData;
	let tooltip = '';
	if (typeof getIconTooltip === 'function') {
		tooltip = getIconTooltip(rowData);
	} else if (typeof cellData === 'object') {
		tooltip = cellData.iconTooltip;
	}
	return tooltip;
}

/**
 * Cell renderer that displays a boolean
 */
class CellIconText extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.cellData !== nextProps.cellData;
	}

	render() {
		const { columnData = {} } = this.props;
		const icon = getCellIcon(this.props);
		const label = getCellLabel(this.props);
		const labelTooltip = getCellLabelTooltip(this.props);
		const iconTooltip = getCellIconTooltip(this.props);

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
					label={labelTooltip || label}
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
			iconTooltip: PropTypes.string,
			labelTooltip: PropTypes.string,
		}),
		PropTypes.string,
	]),
	columnData: PropTypes.shape({
		getIcon: PropTypes.func,
		getLabelTooltip: PropTypes.func,
		getIconTooltip: PropTypes.func,
		tooltipPlacement: PropTypes.string,
	}).isRequired,
};

CellIconText.defaultProps = {
	cellData: {},
};

export default CellIconText;
