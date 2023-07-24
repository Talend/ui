import PropTypes from 'prop-types';
import { useMemo } from 'react';

import ActionIntercom from '../../ActionIntercom';
import { getTheme } from '../../theme';

import headerBarCssModule from '../HeaderBar.module.scss';

const theme = getTheme(headerBarCssModule);
export function Intercom({ id, config, tooltipPlacement }) {
	return (
		<ActionIntercom
			className={theme('tc-header-bar-intercom-default-component', 'btn', 'btn-link')}
			id={id}
			config={useMemo(() => ({ ...config, vertical_padding: 70 }), [config])}
			tooltipPlacement={tooltipPlacement}
		/>
	);
}

Intercom.propTypes = {
	id: PropTypes.string.isRequired,
	config: PropTypes.object.isRequired,
	tooltipPlacement: PropTypes.string,
};
