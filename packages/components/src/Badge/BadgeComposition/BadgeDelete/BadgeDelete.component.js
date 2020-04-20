import React from 'react';
import PropTypes from 'prop-types';
import Action from '../../../Actions/Action';
import badgeCssModule from '../../Badge.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(badgeCssModule);

const BadgeDelete = ({ disabled, id, label, onClick, t, dataFeature }) => (
	<Action
		className={theme('tc-badge-delete-icon')}
		disabled={disabled}
		hideLabel
		icon={'talend-cross'}
		id={id && `tc-badge-delete-${id}`}
		key="delete"
		label={label || t('BADGE_DELETE', { defaultValue: 'Delete' })}
		link
		onClick={onClick}
		role="button"
		data-feature={dataFeature}
	/>
);

BadgeDelete.propTypes = {
	disabled: PropTypes.bool,
	id: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	dataFeature: PropTypes.string,
	t: PropTypes.func,
};

export default BadgeDelete;
