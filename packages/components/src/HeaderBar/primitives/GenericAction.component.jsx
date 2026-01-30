import PropTypes from 'prop-types';

import Inject from '../../Inject';
import Action from '../../Actions/Action';
import { getTheme } from '../../theme';

import headerBarCssModule from '../HeaderBar.module.css';

const theme = getTheme(headerBarCssModule);

export function GenericAction({ getComponent, ...props }) {
	const global = {
		bsStyle: 'link',
		tooltipPlacement: 'bottom',
		...props,
	};
	const className = theme('tc-header-bar-action', 'tc-header-bar-generic-action', 'separated');
	const Renderers = Inject.getAll(getComponent, { Action });

	return (
		<li role="presentation" className={className}>
			<Renderers.Action {...global} />
		</li>
	);
}
GenericAction.propTypes = {
	getComponent: PropTypes.func,
	renders: PropTypes.shape({
		Action: PropTypes.func,
	}),
};
