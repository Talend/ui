import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import PropTypes from 'prop-types';

import I18N_DOMAIN_COMPONENTS from '../constants';
import GuidedTour from '../GuidedTour';
import Stepper from '../Stepper';
import Toggle from '../Toggle';
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
	tourId,
	...rest
}) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const [isAlreadyViewed, setIsAlreadyViewed] = useLocalStorage(localStorageKey, false);
	const [importDemoContent, setImportDemoContent] = useState(demoContentSteps && !isAlreadyViewed);
	const [currentStep, setCurrentStep] = useState(0);
	// Reset currentStep to 0 when tour is opened
	useEffect(() => {
		if (isOpen) {
			setCurrentStep(0);
		}
	}, [isOpen]);

	const isNavigationDisabled =
		importDemoContent &&
		currentStep === DEMO_CONTENT_STEP_ID &&
		Stepper.isStepsLoading(demoContentSteps);
	const isImportSuccessFul = demoContentSteps?.length && Stepper.isAllSuccessful(demoContentSteps);

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
			}, Stepper.SHOW_COMPLETED_TRANSITION_TIMER);
		}
		return () => clearTimeout(timeoutId);
	}, [isImportSuccessFul]);

	return (
		<GuidedTour
			tourId={tourId}
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
				if (importDemoContent) {
					setImportDemoContent(false);
					setCurrentStep(Math.max(0, currentStep - 1));
				}
			}}
			steps={[
				{
					content: {
						header: t('GUIDED_TOUR_WELCOME_STEP_HEADER', {
							appName,
							defaultValue: 'Welcome to {{appName}}',
						}),
						body: () => {
							return (
								welcomeStepBody || (
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
													data-feature={tourId && `guidedtour.${tourId}.demo`}
												/>
											</form>
										)}
									</div>
								)
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
	tourId: PropTypes.string,
};

export default AppGuidedTour;
