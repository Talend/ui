import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { distanceInWordsToNow, format } from 'date-fns';
import invariant from 'invariant';
import { translate } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import getLocale from '../../DateFnsLocale/locale';
import styles from './CellDatetime.scss';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function computeValue(cellData, columnData, t) {
	try {
		if (columnData.mode === 'ago') {
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
			this.props.cellData !== nextProps.cellData || this.props.columnData !== nextProps.columnData
		);
	}
	render() {
		const { cellData, columnData, t } = this.props;
		return (
			<div className={classnames('cell-datetime-container', styles['cell-datetime-container'])}>
				{computeValue(cellData, columnData, t)}
			</div>
		);
	}
}

CellDatetimeComponent.displayName = 'VirtualizedList(CellDatetime)';
CellDatetimeComponent.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.number,
	// Column data
	columnData: PropTypes.shape({
		mode: PropTypes.string.isRequired,
		pattern: PropTypes.string,
	}).isRequired,
	t: PropTypes.func,
};
CellDatetimeComponent.defaultProps = {
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(CellDatetimeComponent);
