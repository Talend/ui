import PropTypes from 'prop-types';

import Inject from '../Inject';
import ActionDropdown from '../Actions/ActionDropdown';
import { getTheme } from '../theme';

import headerBarCssModule from './HeaderBar.module.scss';

const theme = getTheme(headerBarCssModule);

export function User({ name, firstName, lastName, getComponent, t, ...rest }) {
	const className = theme('tc-header-bar-action', 'tc-header-bar-user', 'separated');
	const Renderers = Inject.getAll(getComponent, { ActionDropdown });

	function getDisplayName(params) {
		if (params.firstName && params.lastName) {
			return `${params.firstName} ${params.lastName}`;
		}
		return params.name;
	}

	const displayName = getDisplayName({ name, firstName, lastName });
	const ariaLabel = t('HEADERBAR_USER_MENU', {
		defaultValue: 'Open user menu. Current user: {{name}}.',
		name: displayName,
	});

	return (
		<li role="presentation" className={className}>
			<Renderers.ActionDropdown
				bsStyle="link"
				icon="talend-user-circle"
				pullRight
				label={displayName}
				aria-label={ariaLabel}
				{...rest}
			/>
		</li>
	);
}

if (process.env.NODE_ENV !== 'production') {
	User.propTypes = {
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		getComponent: PropTypes.func,
		name: PropTypes.string,
		renderers: PropTypes.shape({ ActionDropdown: PropTypes.func }),
		t: PropTypes.func,
	};
}
