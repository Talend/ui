import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Action from '../Actions/Action';
import Stepper from './Stepper.component';
import {
	ButtonPrimary,
	ButtonSecondary,
	Link,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';

export default {
	title: 'Messaging & Communication/Stepper',
};
const title = 'Sample processing...';

function renderActions(isInError) {
	if (!isInError) {
		return null;
	}
	return (
		<StackVertical gap="S" padding="M" align="center">
			<StackHorizontal gap="M">
				<ButtonPrimary onClick={action('retry')}>Retry</ButtonPrimary>
				<ButtonSecondary onClick={action('cancel')}>Cancel</ButtonSecondary>
			</StackHorizontal>
			<Link href="http://www.google.com">Get the documentation</Link>
		</StackVertical>
	);
}

export const StepperDefault = () => {
	const steps = [
		{ label: 'Fetch Sample', status: Stepper.LOADING_STEP_STATUSES.SUCCESS },
		{
			label: 'Global Quality',
			status: Stepper.LOADING_STEP_STATUSES.LOADING,
		},
		{ label: 'Flattening', status: Stepper.LOADING_STEP_STATUSES.LOADING },
		{
			label: 'Column Quality',
			status: Stepper.LOADING_STEP_STATUSES.PENDING,
		},
	];
	return <Stepper steps={steps} title={title} />;
};

export const StepperWithError = () => {
	const steps = [
		{
			label: 'Fetch Sample',
			status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
			message: { label: 'Everything is fine 🔥🐶' },
		},
		{
			label: 'Global Quality',
			status: Stepper.LOADING_STEP_STATUSES.FAILURE,
			message: {
				label:
					"We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine - We couldn't connect to the remote engine",
			},
		},
		{ label: 'Flattening', status: Stepper.LOADING_STEP_STATUSES.ABORTED },
		{
			label: 'Column Quality',
			status: Stepper.LOADING_STEP_STATUSES.ABORTED,
		},
	];
	return <Stepper steps={steps} title={title} renderActions={renderActions} />;
};

export const StepperWithoutSteps = () => (
	<Stepper title={title} renderActions={renderActions}>
		<p>No step to display here, it means content is already loaded.</p>
	</Stepper>
);

export const StepperSuccessfulWithoutTransition = () => (
	<Stepper
		title={title}
		steps={[{ label: 'Fetch Sample', status: Stepper.LOADING_STEP_STATUSES.SUCCESS }]}
	/>
);

export const FormStepper = () => (
	<Stepper.Form>
		<Stepper.Form.Step.Validated title="I'm ok" />
		<Stepper.Form.Step.Validated title="Hey" />
		<Stepper.Form.Step.Validated title="Yup" />
		<Stepper.Form.Step.InProgress title="Hey, I'm in progress" />
		<Stepper.Form.Step.Disabled title="I'm disabled" />
		<Stepper.Form.Step.Enabled title="I'm enabled" />
	</Stepper.Form>
);

export const HorizontalFormStepper = () => (
	<Stepper.Form.Horizontal>
		<Stepper.Form.Step.Validated title="I'm ok" />
		<Stepper.Form.Step.InProgress title="Hey, I'm in progress" />
		<Stepper.Form.Step.Enabled title="I'm enabled" />
	</Stepper.Form.Horizontal>
);

export const StepperSuccessfulWithTransition = () => {
	const defaultSteps = [
		{ label: 'Fetch Sample', status: Stepper.LOADING_STEP_STATUSES.SUCCESS },
		{
			label: 'Global Quality',
			status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
		},
		{ label: 'Flattening', status: Stepper.LOADING_STEP_STATUSES.SUCCESS },
		{
			label: 'Column Quality',
			status: Stepper.LOADING_STEP_STATUSES.LOADING,
		},
	];

	function GetSteps(props) {
		const [steps, setSteps] = useState(defaultSteps);

		const init = () => {
			setSteps([
				{
					label: 'Fetch Sample',
					status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
				},
				{
					label: 'Global Quality',
					status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
				},
				{
					label: 'Flattening',
					status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
				},
				{
					label: 'Column Quality',
					status: Stepper.LOADING_STEP_STATUSES.LOADING,
				},
			]);
		};

		const end = () => {
			setSteps([
				{
					label: 'Fetch Sample',
					status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
				},
				{
					label: 'Global Quality',
					status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
				},
				{
					label: 'Flattening',
					status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
				},
				{
					label: 'Column Quality',
					status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
				},
			]);
		};

		return (
			<div>
				<div>
					<Action onClick={init} label="init" />
					<Action onClick={end} label="end" />
				</div>
				{props.children(steps)}
			</div>
		);
	}

	return (
		<GetSteps>
			{steps => (
				<Stepper steps={steps} title={title}>
					<div>
						Content is loaded.
						<div>
							<Action
								label="Action"
								bsStyle="info"
								className="btn-inverse button-padding"
								onClick={action('click')}
							/>
						</div>
					</div>
				</Stepper>
			)}
		</GetSteps>
	);
};
