import PropTypes from 'prop-types';

import Action from '../../Actions/Action';
import Inject from '../../Inject';
import { getTheme } from '../../theme';

import headerBarCssModule from '../HeaderBar.module.scss';

const theme = getTheme(headerBarCssModule);

export function Logo({ isFull, getComponent, t, ...props }) {
	const icon = isFull ? 'talend-logo' : undefined;
	const itemClassName = theme('tc-header-bar-action', 'separated');
	const actionClassName = theme('tc-header-bar-logo', {
		full: isFull,
	});
	const Renderers = Inject.getAll(getComponent, { Action });
	return (
		<li role="presentation" className={itemClassName}>
			<Renderers.Action
				bsStyle="link"
				className={actionClassName}
				hideLabel
				label={t('HEADERBAR_GO_PORTAL', { defaultValue: 'Go to Portal' })}
				icon={icon}
				tooltipPlacement="bottom"
				{...props}
			/>
		</li>
	);
}
Logo.propTypes = {
	getComponent: PropTypes.func,
	isFull: PropTypes.bool,
	renderers: PropTypes.shape({
		Action: PropTypes.func,
	}),
	t: PropTypes.func.isRequired,
};
