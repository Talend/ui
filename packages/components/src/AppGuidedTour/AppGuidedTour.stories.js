import React from 'react';
import { storiesOf } from '@storybook/react';
import AppGuidedTour from './AppGuidedTour.component';
import { LOADING_STEP_STATUSES } from '../Stepper/Stepper.component';
import IconsProvider from '../IconsProvider';

function AppGuidedTourContainer() {
	const [stepStatus, setStepStatus] = React.useState(LOADING_STEP_STATUSES.PENDING);

	return (
		<AppGuidedTour
			isOpen
			appName={'Data Preparation'}
			demoContentSteps={[
				{
					label: 'Importing datasets',
					status: stepStatus,
				},
			]}
			steps={[
				{
					content: {
						header: 'Header',
						body: () => 'Content',
					},
				},
			]}
			onImportDemoContent={() => {
				setStepStatus(LOADING_STEP_STATUSES.LOADING);
				setTimeout(() => {
					setStepStatus(LOADING_STEP_STATUSES.SUCCESS);
				}, 2000);
			}}
		/>
	);
}

storiesOf('Messaging & Communication/AppGuidedTour', module)
	.addDecorator(fn => (
		<>
			<IconsProvider />
			{fn()}
		</>
	))
	.add('default', () => <AppGuidedTourContainer />);
