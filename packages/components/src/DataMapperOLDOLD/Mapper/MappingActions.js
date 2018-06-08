import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { DEFAULT_I18N } from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import { Actions } from '../../Actions/index.js';

function getShowAllButtonLabel(showAll) {
	return showAll ? 'MAPPING_HIDE' : 'MAPPING_SHOW_ALL';
}

function getShowAllButtonDefaultLabel(showAll) {
	return showAll ? 'Hide' : 'Show';
}

function getActions(t, showAll, onShowAll, clearConnection, clearMapping) {
	return [
		{
			id: 'show-all',
			label: t(getShowAllButtonLabel(showAll), {
				defaultValue: getShowAllButtonDefaultLabel(showAll),
			}),
			onClick: onShowAll,
		},
		{
			id: 'clear-connection',
			label: t('MAPPING_CLEAR', { defaultValue: 'Clear' }),
			onClick: clearConnection,
		},
		{
			id: 'clear-mapping',
			label: t('MAPPING_CLEAR_ALL', { defaultValue: 'Clear All' }),
			onClick: clearMapping,
		},
	];
}

class MappingActions extends Component {
	render() {
		const { clearConnection, clearMapping, onShowAll, preferences, t } = this.props;
		return (
			<Actions
				className="mapping-tools"
				actions={getActions(t, preferences.showAll, onShowAll, clearConnection, clearMapping)}
			/>
		);
	}
}

MappingActions.propTypes = {
	clearConnection: PropTypes.func,
	clearMapping: PropTypes.func,
	preferences: PropTypes.object,
	onShowAll: PropTypes.func,
	t: PropTypes.func,
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N, withRef: true })(
	MappingActions,
);
