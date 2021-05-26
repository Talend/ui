import React from 'react';

import Form from '../Form';
import Button from '../../Button';
import Skeleton from '../../Skeleton';

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
			<Button.Secondary>Previous</Button.Secondary>
			<Button.Secondary>Save</Button.Secondary>
			<Button.Primary icon="talend-launch">Run</Button.Primary>
		</Form.Buttons>
	</Form>
);
FormButtonsDefault.parameters = {};

export const FormButtonsLoading = () => (
	<Form>
		<Form.Buttons>
			<Button.Secondary disabled>Previous</Button.Secondary>
			<Button.Secondary disabled>Save</Button.Secondary>
			<Button.Primary icon="talend-launch" loading>
				Run
			</Button.Primary>
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
			<Button.Secondary>Previous</Button.Secondary>
			<Button.Secondary>Save</Button.Secondary>
			<Button.Primary icon="talend-launch">Run</Button.Primary>
		</Form.Buttons>
	</Form>
);
FormButtonsOrder.parameters = {};
