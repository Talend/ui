import PropTypes from 'prop-types';

import Inject from '../../Inject';
import Action from '../../Actions/Action';
import { getTheme } from '../../theme';

import headerBarCssModule from '../HeaderBar.module.css';

const theme = getTheme(headerBarCssModule);

export function Help({ getComponent, t, ...props }) {
	const global = {
		bsStyle: 'link',
		icon: 'talend-question-circle',
		label: t('HEADERBAR_HELP', { defaultValue: 'Help' }),
		tooltipPlacement: 'bottom',
		...props,
	};
	const className = theme('tc-header-bar-action', 'tc-header-bar-help', 'separated');
	const Renderers = Inject.getAll(getComponent, { Action });

	return (
		<li role="presentation" className={className}>
			<Renderers.Action {...global} />
		</li>
	);
}
Help.propTypes = {
	getComponent: PropTypes.func,
	renderers: PropTypes.shape({
		ActionSplitDropdown: PropTypes.func,
		Action: PropTypes.func,
	}),
	t: PropTypes.func.isRequired,
};
