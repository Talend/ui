import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import Icon from '../../Icon';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import { getTheme } from '../../theme';

import theme from './CellBoolean.scss';

const css = getTheme(theme);
export const DISPLAY_MODE = {
	TEXT: 'TEXT',
	ICON: 'ICON',
};

/**
 * Cell renderer that displays a boolean
 */
class CellBoolean extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.cellData !== nextProps.cellData;
	}

	render() {
		const { cellData, t, columnData } = this.props;

		if (columnData.displayMode === DISPLAY_MODE.ICON) {
			if (cellData) {
				return (
					<div className={css('cell-boolean-container')}>
						<Icon
							name="talend-check-circle"
							title={t('CAD_LIST_MANDATORY_REQUIRED', { defaultValue: 'Required' })}
						/>
					</div>
				);
			}
			return null;
		}

		if (cellData === true) {
			return t('BOOLEAN_VALUE_TRUE', { defaultValue: 'Yes' });
		} else if (cellData === false) {
			return t('BOOLEAN_VALUE_FALSE', { defaultValue: 'No' });
		}
		return null;
	}
}

CellBoolean.displayName = 'VirtualizedList(CellBoolean)';
CellBoolean.propTypes = {
	cellData: PropTypes.bool,
	t: PropTypes.func,
	columnData: PropTypes.shape({
		displayMode: PropTypes.oneOf(Object.values(DISPLAY_MODE)),
	}).isRequired,
};

CellBoolean.defaultProps = {
	t: getDefaultT(),
	columnData: {
		displayMode: DISPLAY_MODE.TEXT,
	},
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(CellBoolean);
