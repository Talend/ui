import PropTypes from 'prop-types';
import Inject from '../../Inject';
import Action from '../../Actions/Action';
import { getTheme } from '../../theme';

import headerBarCssModule from '../HeaderBar.module.scss';

const theme = getTheme(headerBarCssModule);

export function CallToAction({ getComponent, ...props }) {
	const actionProps = {
		bsStyle: 'info',
		className: 'btn-inverse',
		tooltipPlacement: 'bottom',
		...props,
	};
	const className = theme('tc-header-bar-action', 'tc-header-bar-call-to-action', 'separated');
	const Renderers = Inject.getAll(getComponent, { Action });
	return (
		<li role="presentation" className={className}>
			<Renderers.Action {...actionProps} />
		</li>
	);
}

CallToAction.propTypes = {
	getComponent: PropTypes.func,
	renders: PropTypes.shape({
		Action: PropTypes.func,
	}),
};
