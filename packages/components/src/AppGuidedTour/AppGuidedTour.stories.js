import React from 'react';
import AppGuidedTour from './AppGuidedTour.component';
import Stepper from '../Stepper';

// eslint-disable-next-line react/prop-types
function AppGuidedTourContainer({ withDemoContent = false }) {
	const [stepStatus, setStepStatus] = React.useState(Stepper.LOADING_STEP_STATUSES.PENDING);
	const demoContentProps = {
		demoContentSteps: [
			{
				label: 'Importing datasets',
				status: stepStatus,
			},
		],
		onImportDemoContent: () => {
			setStepStatus(Stepper.LOADING_STEP_STATUSES.LOADING);
			setTimeout(() => {
				setStepStatus(Stepper.LOADING_STEP_STATUSES.SUCCESS);
			}, 2000);
		},
	};

	return (
		<AppGuidedTour
			isOpen
			appName="Data Preparation"
			steps={[
				{
					content: {
						header: 'Header',
						body: () => 'Content',
					},
				},
			]}
			onRequestOpen={() => {}}
			onRequestClose={() => {}}
			lastStepNextButtonDataFeature="HEHEEE"
			{...(withDemoContent ? demoContentProps : {})}
		/>
	);
}

export default {
	title: 'Messaging & Communication/AppGuidedTour',
};

export const Default = () => <AppGuidedTourContainer withDemoContent />;

Default.story = {
	name: 'default',
};

export const WithoutDemoContent = () => <AppGuidedTourContainer />;

WithoutDemoContent.story = {
	name: 'without demo content',
};
