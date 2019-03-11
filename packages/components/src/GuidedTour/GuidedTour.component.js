import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import Action from '../Actions/Action';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';

import theme from './GuidedTour.scss';

function lastStepNextButton(t) {
	return (
		<Action bsStyle={'info'} label={t('GUIDEDTOUR_LAST_STEP', { defaultValue: 'Let me try' })} />
	);
}

function GuidedTour({ className, t, ...rest }) {
	return (
		<Tour
			className={classNames(theme['guided-tour'], 'guided-tour', className)}
			maskClassName={classNames(theme.mask, 'guided-tour-mask')}
			highlightedMaskClassName={classNames(
				theme['highlighted-mask'],
				'guided-tour-highlighted-mask',
			)}
			showNavigationNumber={false}
			maskSpace={2}
			rounded={2}
			lastStepNextButton={lastStepNextButton(t)}
			{...rest}
		/>
	);
}

GuidedTour.displayName = 'GuidedTour';

GuidedTour.defaultProps = {
	t: getDefaultT(),
};

if (process.env.NODE_ENV !== 'production') {
	GuidedTour.propTypes = {
		className: PropTypes.string,
		steps: PropTypes.arrayOf(
			PropTypes.shape({
				selector: PropTypes.string,
				content: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func])
					.isRequired,
				position: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
				action: PropTypes.func,
				style: PropTypes.object,
				stepInteraction: PropTypes.bool,
			}),
		).isRequired,
		isOpen: PropTypes.bool,
		onRequestClose: PropTypes.func,
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS)(GuidedTour);
