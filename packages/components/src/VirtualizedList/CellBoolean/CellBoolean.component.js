import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';

import Action from '../../Actions/Action';
import styles from './CellBoolean.scss';

/**
 * Cell renderer that displays a boolean
 */
class CellBoolean extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.cellData !== nextProps.cellData;
	}

	render() {
		const { cellData, t } = this.props;

		return (
			<div className={classnames('cell-boolean-container', styles['cell-boolean-container'])}>
				{ cellData === true && t('BOOLEAN_VALUE_TRUE', { defaultValue: 'Yes' }) }
				{ cellData === false && t('BOOLEAN_VALUE_FALSE', { defaultValue: 'No' }) }
			</div>
		);
	}
}

CellBoolean.displayName = 'VirtualizedList(CellBoolean)';
CellBoolean.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.string,
	t: PropTypes.func,
};

CellBoolean.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(CellBoolean);
