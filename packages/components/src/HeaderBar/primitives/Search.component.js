import PropTypes from 'prop-types';

import Inject from '../../Inject';
import Typeahead from '../../Typeahead';
import { getTheme } from '../../theme';

import headerBarCssModule from '../HeaderBar.module.scss';

const theme = getTheme(headerBarCssModule);

export function Search({ getComponent, icon, ...props }) {
	const className = theme('tc-header-bar-action', 'tc-header-bar-search', 'separated');
	const Renderers = Inject.getAll(getComponent, { Typeahead });
	const a11yIcon = icon && { ...icon, role: 'search' };

	return (
		<li role="presentation" className={className}>
			<form className="navbar-form navbar-right">
				<Renderers.Typeahead {...props} role="searchbox" icon={a11yIcon} />
			</form>
		</li>
	);
}

Search.propTypes = {
	getComponent: PropTypes.func,
	icon: PropTypes.object,
	renderers: PropTypes.shape({
		Typeahead: PropTypes.func,
	}),
};
