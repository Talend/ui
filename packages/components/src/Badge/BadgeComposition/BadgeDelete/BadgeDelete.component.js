import React from 'react';
import PropTypes from 'prop-types';
import Action from '../../../Actions/Action';
import badgeCssModule from '../../Badge.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(badgeCssModule);

const BadgeDelete = ({ id, onClick, disabled, t }) => (
	<Action
		className={theme('tc-badge-delete-icon')}
		disabled={disabled}
		hideLabel
		icon={'talend-cross'}
		id={id && `tc-badge-delete-${id}`}
		key="delete"
		label={t('BADGE_DELETE', { defaultValue: 'delete' })}
		link
		onClick={onClick}
		role="button"
	/>
);

BadgeDelete.propTypes = {
	disabled: PropTypes.bool,
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export default BadgeDelete;
