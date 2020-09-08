import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { useTranslation } from 'react-i18next';
import GuidedTour from '../GuidedTour';
import Toggle from '../Toggle';
import Stepper from '../Stepper';
import {
	isAllSuccessful,
	isStepsLoading,
	SHOW_COMPLETED_TRANSITION_TIMER,
} from '../Stepper/Stepper.component';
import I18N_DOMAIN_COMPONENTS from '../constants';
import DemoContentStep from './DemoContentStep.component';

const DEMO_CONTENT_STEP_ID = 1;
export const DEFAULT_LOCAL_STORAGE_KEY = 'app-guided-tour-viewed';

function AppGuidedTour({
	isOpen,
	appName,
	steps,
	localStorageKey = DEFAULT_LOCAL_STORAGE_KEY,
	demoContentSteps,
	onRequestOpen,
	onImportDemoContent,
	onRequestClose,
	welcomeStepBody = null,
	...rest
}) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const [isAlreadyViewed, setIsAlreadyViewed] = useLocalStorage(localStorageKey, false);
	const [importDemoContent, setImportDemoContent] = useState(demoContentSteps && !isAlreadyViewed);
	const [currentStep, setCurrentStep] = useState(0);

	const isNavigationDisabled =
		importDemoContent && currentStep === DEMO_CONTENT_STEP_ID && isStepsLoading(demoContentSteps);
	const isImportSuccessFul = demoContentSteps?.length && isAllSuccessful(demoContentSteps);

	useEffect(() => {
		if (!isAlreadyViewed) {
			onRequestOpen();
		}
	}, [isAlreadyViewed, onRequestOpen]);

	useEffect(() => {
		let timeoutId = null;
		if (isImportSuccessFul) {
			timeoutId = setTimeout(() => {
				setCurrentStep(prev => (prev === DEMO_CONTENT_STEP_ID ? DEMO_CONTENT_STEP_ID + 1 : prev));
			}, SHOW_COMPLETED_TRANSITION_TIMER);
		}
		return () => clearTimeout(timeoutId);
	}, [isImportSuccessFul]);

	return (
		<GuidedTour
			isOpen={isOpen}
			showButtons={!isNavigationDisabled}
			showCloseButton={!isNavigationDisabled}
			disableKeyboardNavigation={isNavigationDisabled}
			disableAllInteractions={isNavigationDisabled}
			getCurrentStep={step => {
				if (
					importDemoContent &&
					step === DEMO_CONTENT_STEP_ID &&
					currentStep === DEMO_CONTENT_STEP_ID - 1
				) {
					onImportDemoContent();
				}
				setCurrentStep(step);
			}}
			goToStep={currentStep}
			onRequestClose={() => {
				onRequestClose();
				setIsAlreadyViewed(true);
				setCurrentStep(0);
				setImportDemoContent(false);
			}}
			steps={[
				{
					content: {
						header: t('GUIDED_TOUR_WELCOME_STEP_HEADER', {
							appName,
							defaultValue: 'Welcome to {{appName}}',
						}),
						body: () => {
							return welcomeStepBody || (
								<div>
									{t('GUIDED_TOUR_WELCOME_STEP_BODY', {
										defaultValue: `If you're new, you may want to take a quick tour of the tool now.
										 If not, you can replay the tour from the user menu.`,
									})}
									{demoContentSteps && (
										<form>
											<Toggle
												id="app-guided-tour__import-demo-content-toggle"
												label={t('GUIDED_TOUR_IMPORT_DEMO_CONTENT', {
													defaultValue: 'Import demo content',
												})}
												onChange={event => {
													setImportDemoContent(event.target.checked);
												}}
												checked={importDemoContent}
											/>
										</form>
									)}
								</div>
							);
						},
					},
				},
				importDemoContent && {
					content: {
						header: t('GUIDED_TOUR_DEMO_CONTENT_STEP_HEADER', {
							defaultValue: 'Importing demo content',
						}),
						body: () => <DemoContentStep demoContentSteps={demoContentSteps} />,
					},
				},
				...steps,
			].filter(Boolean)}
			{...rest}
		/>
	);
}

AppGuidedTour.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	appName: PropTypes.string.isRequired,
	localStorageKey: PropTypes.string,
	steps: GuidedTour.propTypes.steps,
	welcomeStepBody: PropTypes.node,
	demoContentSteps: Stepper.propTypes.steps,
	onRequestOpen: PropTypes.func.isRequired,
	onImportDemoContent: PropTypes.func,
	onRequestClose: PropTypes.func.isRequired,
};

export default AppGuidedTour;
