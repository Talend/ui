import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@talend/react-components/lib/Icon';
import CircularProgress from '@talend/react-components/lib/CircularProgress';
import { withTranslation } from 'react-i18next';
import { getTheme } from '@talend/react-components/lib/theme';

import I18N_NAMESPACE from './constant';
import theme from './Stepper.component.scss';
import { LOADING_STEP_STATUSES } from '../Stepper.constants';
import { DEFAULT_TRANSITION_DURATION, StepperTransition } from './StepperTransition.component';
import { isErrorInSteps, isStepsLoading, isAllSuccessful } from '../service/Stepper.utils';
import getDefaultT from '../translate';

const getClass = getTheme(theme);

const SHOW_COMPLETED_TRANSITION_TIMER = 1000;
export const TRANSITION_STATE = {
	STEPS: 'STEPS',
	TRANSITION: 'TRANSITION',
	CHILD: 'CHILD',
};

/**
 * This function returns a label for some status
 * @param {string} status the current step status
 */
function getStatusText(t, status) {
	switch (status) {
		case LOADING_STEP_STATUSES.ABORTED:
			return t('ABORTED', { defaultValue: ' (Aborted)' });
		case LOADING_STEP_STATUSES.PENDING:
			return t('PENDING', { defaultValue: ' (Pending)' });
		default:
			return null;
	}
}

/**
 * This function returns an icon that represent the current step
 * @param {string} status the current step status
 */
function getIconByStatus(status) {
	const iconCLass = getClass(`stepper-icon-${status}`, 'stepper-icon');
	switch (status) {
		case LOADING_STEP_STATUSES.SUCCESS:
			return <Icon name="talend-check" className={iconCLass} />;
		case LOADING_STEP_STATUSES.ABORTED:
			return <Icon name="talend-cross" className={iconCLass} />;
		case LOADING_STEP_STATUSES.PENDING:
			return <span className={iconCLass}>-</span>;
		case LOADING_STEP_STATUSES.FAILURE:
			return <Icon name="talend-warning" className={iconCLass} />;
		case LOADING_STEP_STATUSES.LOADING:
			return <CircularProgress className={iconCLass} />;
		default:
			return null;
	}
}

function changeTransitionState(newTransitionState, setTransitionState, timer = 0) {
	if (timer === 0) {
		setTransitionState(newTransitionState);
	} else {
		setTimeout(() => {
			setTransitionState(newTransitionState);
		}, timer);
	}
}

/**
 * This function returns a rendered step
 * @param {object} step the current loading step
 * @param {number} index the index for the key
 */
function showStep(t, step, index, steps) {
	const cssStep = getClass('stepper-step', `stepper-step-${step.status}`);

	const a11y = {};
	if (
		[LOADING_STEP_STATUSES.LOADING, LOADING_STEP_STATUSES.FAILURE].includes(step.status) ||
		(index === (steps.length - 1) && step.status === LOADING_STEP_STATUSES.SUCCESS)
	) {
		a11y['aria-current'] = true;
	}

	return (
		<li className={cssStep} key={`step-${index}`} {...a11y}>
			<div className={getClass('stepper-step-infos')}>
				{getIconByStatus(step.status)}
				{step.label}
				{getStatusText(t, step.status)}
			</div>

			{step.message && (
				<div className={getClass('stepper-step-message')}>
					<span className={getClass('stepper-step-message-label')}>{step.message.label}</span>
					{step.message.description && <p>{step.message.description}</p>}
				</div>
			)}
		</li>
	);
}

/**
 * This function generates a set transition state function
 * @param {string} transition the transition state to set
 * @param {number} timer the timer to set the transition
 */
function transition(transitionState, timer = 0) {
	return setTransitionState => changeTransitionState(transitionState, setTransitionState, timer);
}

const transitionLoadingToEmpty = transition(
	TRANSITION_STATE.TRANSITION,
	SHOW_COMPLETED_TRANSITION_TIMER,
);
const transitionEmptyToChildren = transition(
	TRANSITION_STATE.CHILD,
	SHOW_COMPLETED_TRANSITION_TIMER + DEFAULT_TRANSITION_DURATION,
);
const transitionChildrenToEmpty = transition(TRANSITION_STATE.TRANSITION);
const transitionEmptyToLoading = transition(TRANSITION_STATE.STEPS, DEFAULT_TRANSITION_DURATION);

export function Stepper({ steps, title, renderActions, children, t }) {
	const isInError = isErrorInSteps(steps);
	const [transitionState, setTransitionState] = useState(
		isStepsLoading(steps) ? TRANSITION_STATE.STEPS : TRANSITION_STATE.CHILD,
	);

	useEffect(() => {
		const allSuccessful = isAllSuccessful(steps);
		if (
			allSuccessful &&
			(transitionState === TRANSITION_STATE.STEPS ||
				transitionState === TRANSITION_STATE.TRANSITION)
		) {
			transitionLoadingToEmpty(setTransitionState);
			transitionEmptyToChildren(setTransitionState);
		} else if (!allSuccessful && transitionState === TRANSITION_STATE.CHILD) {
			transitionChildrenToEmpty(setTransitionState);
			transitionEmptyToLoading(setTransitionState);
		}
	}, [steps]);

	return (
		<React.Fragment>
			<StepperTransition active={transitionState === TRANSITION_STATE.CHILD}>
				{children}
			</StepperTransition>
			<StepperTransition active={transitionState === TRANSITION_STATE.STEPS}>
				<div className={getClass('stepper')}>
					<div
						className={getClass('loading-content-steps', {
							'stepper-content-error': isInError,
						})}
					>
						{title && <h2>{title}</h2>}
						<ol className={getClass('stepper-steps')}>
							{steps.map((step, index, array) => showStep(t, step, index, array))}
						</ol>
						{renderActions && renderActions(isInError) ? (
							<div>{renderActions(isInError)}</div>
						) : null}
					</div>
				</div>
			</StepperTransition>
		</React.Fragment>
	);
}

Stepper.displayName = 'Stepper';

Stepper.defaultProps = {
	steps: [],
	t: getDefaultT(),
};

Stepper.propTypes = {
	t: PropTypes.func,
	title: PropTypes.string,
	renderActions: PropTypes.func,
	children: PropTypes.element.isRequired,
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			status: PropTypes.oneOf(Object.values(LOADING_STEP_STATUSES)),
			message: PropTypes.shape({
				label: PropTypes.string,
				description: PropTypes.string,
			}),
		}),
	),
};

export default withTranslation(I18N_NAMESPACE)(Stepper);
