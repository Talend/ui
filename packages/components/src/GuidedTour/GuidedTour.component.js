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

function GuidedTour({ className, steps, t, tReady, ...rest }) {
	if (!tReady) {
		return null;
	}

	const translatedSteps = steps.map(step => {
		const translatedStep = { ...step };
		const { content } = translatedStep;
		if (typeof content === 'string') {
			translatedStep.content = <div dangerouslySetInnerHTML={{ __html: t(content, {}) }} />;
		}
		return translatedStep;
	});

	return (
		<Tour
			className={classNames(theme['guided-tour'], 'guided-tour', className)}
			maskClassName={classNames(theme.mask, 'guided-tour-mask')}
			highlightedMaskClassName={classNames(
				theme['highlighted-mask'],
				'guided-tour-highlighted-mask',
			)}
			showNavigationNumber={false}
			maskSpace={0}
			rounded={4}
			lastStepNextButton={lastStepNextButton(t)}
			disableInteraction
			{...rest}
			steps={translatedSteps}
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
		tReady: PropTypes.bool,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS)(GuidedTour);
