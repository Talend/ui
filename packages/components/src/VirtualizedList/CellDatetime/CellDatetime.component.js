import { Component } from 'react';
import { withTranslation } from 'react-i18next';

import classnames from 'classnames';
import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import isValid from 'date-fns/isValid';
import parseISO from 'date-fns/parseISO';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';

import { date as dateUtils } from '@talend/utils';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import getLocale from '../../i18n/DateFnsLocale/locale';
import TooltipTrigger from '../../TooltipTrigger';
import getDefaultT from '../../translate';

import styles from './CellDatetime.module.scss';

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export function computeValue(cellData, columnData, t) {
	const date = new Date(cellData);
	const isDateValid = isValid(date);

	if (isDateValid) {
		const dateFNS = parseISO(date.toISOString());
		if (dateFNS && columnData.mode === 'ago') {
			return formatDistanceToNow(dateFNS, {
				addSuffix: true,
				locale: getLocale(t),
			});
		} else if (columnData.mode === 'format') {
			if (columnData.timeZone) {
				return dateUtils.formatToTimeZone(dateFNS, columnData.pattern || DATE_TIME_FORMAT, {
					timeZone: columnData.timeZone,
					locale: getLocale(t),
				});
			}
			return format(dateFNS, dateUtils.formatToUnicode(columnData.pattern || DATE_TIME_FORMAT), {
				locale: getLocale(t),
			});
		}
	}

	return cellData;
}

export function getTooltipLabel(cellData, columnData, t) {
	if (typeof columnData.getTooltipLabel === 'function') {
		return columnData.getTooltipLabel(cellData);
	}
	const date = new Date(cellData);
	const isDateValid = isValid(date);

	if (columnData.mode === 'ago' && isDateValid) {
		let tooltipLabel = '';
		if (columnData.timeZone) {
			tooltipLabel = dateUtils.formatToTimeZone(date, columnData.pattern || DATE_TIME_FORMAT, {
				timeZone: columnData.timeZone,
				locale: getLocale(t),
			});
		} else {
			tooltipLabel = format(
				date,
				dateUtils.formatToUnicode(columnData.pattern || DATE_TIME_FORMAT),
				{
					locale: getLocale(t),
				},
			);
		}
		return tooltipLabel;
	}

	return columnData.tooltipLabel;
}
/**
 * Cell renderer that displays text + icon
 */
export class CellDatetimeComponent extends Component {
	shouldComponentUpdate(nextProps) {
		const watch = Object.keys(CellDatetimeComponent.propTypes.columnData);
		return (
			this.props.cellData !== nextProps.cellData ||
			!isEqual(pick(this.props.columnData, watch), pick(nextProps.columnData, watch))
		);
	}

	render() {
		const { cellData, columnData, t } = this.props;

		const computedValue = computeValue(cellData, columnData, t);
		const tooltipLabel = getTooltipLabel(cellData, columnData, t);

		const cell = (
			<div className={classnames('cell-datetime-container', styles['cell-datetime-container'])}>
				{computedValue}
			</div>
		);

		return (
			<TooltipTrigger
				label={tooltipLabel || computedValue}
				tooltipPlacement={columnData.tooltipPlacement || 'top'}
			>
				{cell}
			</TooltipTrigger>
		);
	}
}

CellDatetimeComponent.displayName = 'VirtualizedList(CellDatetime)';
CellDatetimeComponent.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	// Column data
	columnData: PropTypes.shape({
		tooltipPlacement: PropTypes.string,
		tooltipLabel: PropTypes.string,
		mode: PropTypes.string.isRequired,
		pattern: PropTypes.string,
		getTooltipLabel: PropTypes.func,
	}).isRequired,
	t: PropTypes.func,
};
CellDatetimeComponent.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(CellDatetimeComponent);
