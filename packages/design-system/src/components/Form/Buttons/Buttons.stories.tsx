import React from 'react';
import { action } from '@storybook/addon-actions';

import Form from '..';
import { ButtonPrimary, ButtonSecondary } from '../../Button';
import Skeleton from '../../Skeleton';

export default {
	component: Form.Buttons,
};

export const FormButtonsSkeleton = () => (
	<Form>
		<Form.Buttons>
			<Skeleton.Button />
			<Skeleton.Button />
		</Form.Buttons>
	</Form>
);
FormButtonsSkeleton.parameters = {};

export const FormButtonsDefault = () => (
	<Form>
		<Form.Buttons>
			<ButtonSecondary onClick={action('Clicked Previous')}>Previous</ButtonSecondary>
			<ButtonSecondary onClick={action('Clicked Save')}>Save</ButtonSecondary>
			<ButtonPrimary onClick={action('Clicked Submit')} icon="talend-launch">
				Run
			</ButtonPrimary>
		</Form.Buttons>
	</Form>
);
FormButtonsDefault.parameters = {};

export const FormButtonsLoading = () => (
	<Form>
		<Form.Buttons>
			<ButtonSecondary onClick={action('Clicked Previous')} disabled>
				Previous
			</ButtonSecondary>
			<ButtonSecondary onClick={action('Clicked Save')} disabled>
				Save
			</ButtonSecondary>
			<ButtonPrimary onClick={action('Clicked Submit')} icon="talend-launch" isLoading>
				Run
			</ButtonPrimary>
		</Form.Buttons>
	</Form>
);
FormButtonsLoading.parameters = {};

export const FormButtonsOrder = () => (
	<Form>
		<Form.Fieldset legend="Run job">
			<Form.Text label="Name" required placeholder="Job using JDBC connection" />
			<Form.Textarea label="Description" placeholder="Describe the job" />
		</Form.Fieldset>
		<Form.Buttons>
			<ButtonSecondary onClick={action('Clicked Previous')}>Previous</ButtonSecondary>
			<ButtonSecondary onClick={action('Clicked Save')}>Save</ButtonSecondary>
			<ButtonPrimary onClick={action('Clicked Submit')} icon="talend-launch">
				Run
			</ButtonPrimary>
		</Form.Buttons>
	</Form>
);
FormButtonsOrder.parameters = {};
