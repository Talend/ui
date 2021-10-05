import React from 'react';
import Tour from 'reactour';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Action from '../Actions/Action';
import I18N_DOMAIN_COMPONENTS from '../constants';

import theme from './GuidedTour.scss';

function getTooltipContent({ header, body }) {
	return reactourCallbacks => (
		<React.Fragment>
			{header && <h2 className={classNames(theme.header, 'tc-guided-tour__header')}>{header}</h2>}
			<div className={classNames(theme.body, 'tc-guided-tour__body')}>
				{typeof body === 'function' ? body(reactourCallbacks) : <p>{body}</p>}
			</div>
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

function GuidedTour({
	className,
	disableAllInteractions,
	steps,
	lastStepNextButtonDataFeature,
	...rest
}) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	if (!steps.length) {
		return null;
	}

	return (
		<Tour
			className={classNames(
				theme['tc-guided-tour'],
				'tc-guided-tour',
				{ [theme['no-interaction']]: !!disableAllInteractions },
				{ 'tc-guided-tour--no-interaction': !!disableAllInteractions },
				className,
			)}
			closeWithMask={false}
			disableDotsNavigation
			disableInteraction
			highlightedMaskClassName="tc-guided-tour__highlighted-mask"
			lastStepNextButton={
				<Action
					bsStyle="info"
					label={t('GUIDEDTOUR_LAST_STEP', { defaultValue: 'Let me try' })}
					data-feature={lastStepNextButtonDataFeature}
				/>
			}
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
	steps: [],
};

GuidedTour.propTypes = {
	className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
	lastStepNextButtonDataFeature: PropTypes.string,
};

export default GuidedTour;
