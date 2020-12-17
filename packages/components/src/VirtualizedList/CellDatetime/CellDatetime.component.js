import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import { distanceInWordsToNow, format } from 'date-fns';
import invariant from 'invariant';
import { withTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import getLocale from '../../i18n/DateFnsLocale/locale';
import styles from './CellDatetime.scss';
import TooltipTrigger from '../../TooltipTrigger';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function computeValue(cellData, columnData, t) {
	try {
		if (cellData && columnData.mode === 'ago') {
			return distanceInWordsToNow(cellData, {
				addSuffix: true,
				locale: getLocale(t),
			});
		} else if (columnData.mode === 'format') {
			return format(cellData, columnData.pattern || DATE_TIME_FORMAT);
		}
	} catch (e) {
		invariant(true, 'Conversion error in list cell ', columnData);
	}

	return cellData;
}
/**
 * Cell renderer that displays text + icon
 */
export class CellDatetimeComponent extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.cellData !== nextProps.cellData ||
			!isEqual(this.props.columnData, nextProps.columnData)
		);
	}

	render() {
		const { cellData, columnData, t } = this.props;
		const cell = (
			<div className={classnames('cell-datetime-container', styles['cell-datetime-container'])}>
				{computeValue(cellData, columnData, t)}
			</div>
		);

		if (columnData.mode === 'ago') {
			return (
				<TooltipTrigger
					label={format(cellData, columnData.pattern || DATE_TIME_FORMAT)}
					tooltipPlacement={columnData.tooltipPlacement || 'bottom'}
				>
					{cell}
				</TooltipTrigger>
			);
		}

		return cell;
	}
}

CellDatetimeComponent.displayName = 'VirtualizedList(CellDatetime)';
CellDatetimeComponent.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	// Column data
	columnData: PropTypes.shape({
		tooltipPlacement: PropTypes.string,
		mode: PropTypes.string.isRequired,
		pattern: PropTypes.string,
	}).isRequired,
	t: PropTypes.func,
};
CellDatetimeComponent.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(CellDatetimeComponent);
