import React from 'react';
import { storiesOf } from '@storybook/react';
import AppGuidedTour from './AppGuidedTour.component';
import Stepper from '../Stepper';
import IconsProvider from '../IconsProvider';

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

storiesOf('Messaging & Communication/AppGuidedTour', module)
	.addDecorator(fn => (
		<>
			<IconsProvider bundles={[`${location.origin}${location.pathname}all.svg`]} />
			{fn()}
		</>
	))
	.add('default', () => <AppGuidedTourContainer withDemoContent />)
	.add('without demo content', () => <AppGuidedTourContainer />);
