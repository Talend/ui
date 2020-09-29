import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../../constants';
import Action from '../../../Actions/Action';
import badgeCssModule from '../../Badge.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(badgeCssModule);

function BadgeDelete({ disabled, id, label, onClick, dataFeature }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	return (
		<Action
			className={theme('tc-badge-delete-icon')}
			disabled={disabled}
			hideLabel
			icon="talend-cross"
			id={id && `tc-badge-delete-${id}`}
			key="delete"
			label={label || t('BADGE_DELETE', { defaultValue: 'Delete' })}
			link
			onClick={onClick}
			role="button"
			data-feature={dataFeature}
		/>
	);
}

BadgeDelete.propTypes = {
	disabled: PropTypes.bool,
	id: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	dataFeature: PropTypes.string,
};

export default BadgeDelete;
