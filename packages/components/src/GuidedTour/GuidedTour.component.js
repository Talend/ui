import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import Action from '../Actions/Action';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';

import theme from './GuidedTour.scss';

function getTooltipContent({ header, body }) {
	return reactourCallbacks => (
		<React.Fragment>
			{header && <h2 className={classNames(theme.header, 'guided-tour__header')}>{header}</h2>}
			<p className={classNames(theme.body, 'guided-tour__body')}>
				{typeof body === 'function' ? body(reactourCallbacks) : body}
			</p>
		</React.Fragment>
	);
}

function formatSteps(steps) {
	return steps.map(step => {
		const { header, body } = step.content;
		const formattedStep = { ...step };
		formattedStep.content = getTooltipContent({ header, body });
		return formattedStep;
	});
}

function getLastStepNextButton(t) {
	return (
		<Action bsStyle={'info'} label={t('GUIDEDTOUR_LAST_STEP', { defaultValue: 'Let me try' })} />
	);
}

function GuidedTour({ className, disableAllInteractions, steps, t, tReady, ...rest }) {
	if (!tReady || !steps || !steps.length) {
		return <React.Fragment />;
	}

	return (
		<Tour
			className={classNames(
				theme['guided-tour'],
				'guided-tour',
				{ [theme['no-interaction']]: !!disableAllInteractions },
				{ 'guided-tour--no-interaction': !!disableAllInteractions },
				className,
			)}
			closeWithMask={false}
			disableDotsNavigation
			disableInteraction
			highlightedMaskClassName={classNames(theme.highlighted, 'guided-tour__highlighted-mask')}
			lastStepNextButton={getLastStepNextButton(t)}
			maskClassName={classNames(theme.mask, 'guided-tour__mask')}
			maskSpace={10}
			rounded={4}
			showNavigationNumber={false}
			showNumber={false}
			startAt={0}
			steps={formatSteps(steps)}
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
				content: PropTypes.shape({
					header: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
					body: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]).isRequired,
				}).isRequired,
				position: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
				action: PropTypes.func,
				style: PropTypes.object,
				stepInteraction: PropTypes.bool,
			}),
		).isRequired,
		isOpen: PropTypes.bool,
		onRequestClose: PropTypes.func,
		disableAllInteractions: PropTypes.bool,
		t: PropTypes.func,
		tReady: PropTypes.bool,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS)(GuidedTour);
