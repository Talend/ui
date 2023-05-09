import PropTypes from 'prop-types';

import Inject from '../../Inject';
import ActionDropdown from '../../Actions/ActionDropdown';
import { getTheme } from '../../theme';

import headerBarCssModule from '../HeaderBar.module.scss';

const theme = getTheme(headerBarCssModule);

export function Environment({ getComponent, ...props }) {
	const Renderers = Inject.getAll(getComponent, { ActionDropdown });
	return (
		<li role="presentation" className={theme('tc-header-bar-action')}>
			<Renderers.ActionDropdown
				bsStyle="link"
				icon="talend-environment"
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}
Environment.propTypes = {
	getComponent: PropTypes.func,
	renderers: PropTypes.shape({
		ActionDropdown: PropTypes.func,
	}),
};
