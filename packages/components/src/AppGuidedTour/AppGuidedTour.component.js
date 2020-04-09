import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GuidedTour from '../GuidedTour';
import Toggle from '../Toggle';
import Stepper from '../Stepper';
import { isAllSuccessful, isStepsLoading } from '../Stepper/Stepper.component';
import I18N_DOMAIN_COMPONENTS from '../constants';

const DEMO_CONTENT_STEP_ID = 1;

function AppGuidedTour({
	isOpen,
	appName,
	steps,
	demoContentSteps,
	onImportDemoContent,
	onRequestClose,
	...rest
}) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const [importDemoContent, setImportDemoContent] = useState(true);
	const [currentStep, setCurrentStep] = useState(0);

	const isNavigationDisabled =
		importDemoContent && currentStep === DEMO_CONTENT_STEP_ID && isStepsLoading(demoContentSteps);
	const isImportSuccessFul = demoContentSteps.length && isAllSuccessful(demoContentSteps);

	useEffect(() => {
		if (isImportSuccessFul) {
			setCurrentStep(prev => (prev === DEMO_CONTENT_STEP_ID ? DEMO_CONTENT_STEP_ID + 1 : prev));
		}
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
				setCurrentStep(0);
			}}
			steps={[
				{
					content: {
						header: t('GUIDED_TOUR_WELCOME_STEP_BODY', {
							appName,
							defaultValue: 'Welcome to {{appName}}',
						}),
						body: () => (
							<div>
								{t('GUIDED_TOUR_WELCOME_STEP_BODY', {
									defaultValue: `If you're new, you may want to take a quick tour of the tool now.
										 If not, you can replay the tour from the user menu.`,
								})}
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
							</div>
						),
					},
				},
				importDemoContent && {
					content: {
						header: t('GUIDED_TOUR_WELCOME_STEP_HEADER', {
							defaultValue: 'Importing demo content',
						}),
						body: () => (demoContentSteps.length ? <Stepper steps={demoContentSteps} /> : null),
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
	steps: GuidedTour.propTypes.steps,
	demoContentSteps: Stepper.propTypes.steps.isRequired,
	onImportDemoContent: PropTypes.func.isRequired,
	onRequestClose: PropTypes.func.isRequired,
};

export default AppGuidedTour;
