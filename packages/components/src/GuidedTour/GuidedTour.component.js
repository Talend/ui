import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Tour from 'reactour';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ButtonIcon, ButtonPrimary } from '@talend/design-system';

import I18N_DOMAIN_COMPONENTS from '../constants';

import theme from './GuidedTour.module.scss';

function getTooltipContent({ header, body }) {
	// eslint-disable-next-line react/display-name
	return reactourCallbacks => (
		<Fragment>
			{header && <h2 className={classNames(theme.header, 'tc-guided-tour__header')}>{header}</h2>}
			<div className={classNames(theme.body, 'tc-guided-tour__body')}>
				{typeof body === 'function' ? body(reactourCallbacks) : <p>{body}</p>}
			</div>
		</Fragment>
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
	tourId,
	...rest
}) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	if (!steps.length) {
		return null;
	}

	const dataFeature = action => tourId && `guidedtour.${tourId}.${action}`;

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
				<ButtonPrimary data-feature={lastStepNextButtonDataFeature ?? dataFeature('last')}>
					{t('GUIDEDTOUR_LAST_STEP', 'Let me try')}
				</ButtonPrimary>
			}
			nextButton={
				<ButtonIcon
					size="S"
					onClick={() => {}}
					icon="arrow-right"
					data-feature={dataFeature('next')}
				>
					{t('GUIDEDTOUR_NEXT_STEP', 'Next')}
				</ButtonIcon>
			}
			prevButton={
				<ButtonIcon
					size="S"
					onClick={() => {}}
					icon="arrow-left"
					data-feature={dataFeature('prev')}
				>
					{t('GUIDEDTOUR_PREV_STEP', 'Previous')}
				</ButtonIcon>
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
	tourId: PropTypes.string,
};

export default GuidedTour;
