import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import Action from '../Actions/Action';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';

import theme from './GuidedTour.scss';

function TooltipContent({ header, body }) {
	return (
		<div>
			{header && <h2 className={classNames(theme.header, 'guided-tour__header')}>{header}</h2>}
			<p className={classNames(theme.body, 'guided-tour__body')}>{body}</p>
		</div>
	);
}

function getTooltipContent({ header, body }) {
	return ({ goTo, step }) => (
		<TooltipContent
			header={header}
			body={typeof body === 'function' ? body({ goTo, step }) : body}
		/>
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
	if (!tReady) {
		return null;
	}

	if (!steps || !steps.length) {
		return null;
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
			maskClassName={classNames(theme.mask, 'guided-tour__mask')}
			highlightedMaskClassName={classNames(theme.highlighted, 'guided-tour__highlighted-mask')}
			showNumber={false}
			showNavigationNumber={false}
			closeWithMask={false}
			disableDotsNavigation
			disableInteraction
			maskSpace={10}
			rounded={4}
			startAt={0}
			lastStepNextButton={getLastStepNextButton(t)}
			{...rest}
			steps={formatSteps(steps)}
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
					header: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
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
