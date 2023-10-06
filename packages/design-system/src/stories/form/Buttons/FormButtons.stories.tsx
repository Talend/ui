import { action } from '@storybook/addon-actions';

<<<<<<<< HEAD:packages/design-system/src/stories/FormButtons.stories.tsx
import { ButtonPrimary, ButtonSecondary, Form, Skeleton } from '../';
========
import { ButtonPrimary, ButtonSecondary, Form, Skeleton } from '../../../';
>>>>>>>> master:packages/design-system/src/stories/form/Buttons/FormButtons.stories.tsx

export default {
	component: Form.Buttons,
	title: 'Form/Buttons',
};

export const FormButtonsSkeleton = () => (
	<Form>
		<Form.Buttons>
			<Skeleton variant="button" />
			<Skeleton variant="button" />
		</Form.Buttons>
	</Form>
);
FormButtonsSkeleton.parameters = {};

export const FormButtonsDefault = () => (
	<Form>
		<Form.Buttons>
			<ButtonSecondary onClick={action('Clicked Previous')}>Previous</ButtonSecondary>
			<ButtonSecondary onClick={action('Clicked Save')}>Save</ButtonSecondary>
			<ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle">
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
			<ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle" isLoading>
				Run
			</ButtonPrimary>
		</Form.Buttons>
	</Form>
);
FormButtonsLoading.parameters = {};

export const FormButtonsOrder = () => (
	<Form>
		<Form.Fieldset legend="Run job">
			<Form.Text name="name" label="Name" required placeholder="Job using JDBC connection" />
			<Form.Textarea name="textarea" label="Description" placeholder="Describe the job" />
		</Form.Fieldset>
		<Form.Buttons>
			<ButtonSecondary onClick={action('Clicked Previous')}>Previous</ButtonSecondary>
			<ButtonSecondary onClick={action('Clicked Save')}>Save</ButtonSecondary>
			<ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle">
				Run
			</ButtonPrimary>
		</Form.Buttons>
	</Form>
);
FormButtonsOrder.parameters = {};

export const FormButtonsSingle = () => (
	<Form>
		<Form.Fieldset legend="Run job">
			<Form.Text name="name" label="Name" required placeholder="Job using JDBC connection" />
			<Form.Textarea name="textarea" label="Description" placeholder="Describe the job" />
		</Form.Fieldset>
		<Form.Buttons>
			<ButtonPrimary onClick={action('Clicked Submit')} icon="triangle-circle">
				Run
			</ButtonPrimary>
		</Form.Buttons>
	</Form>
);
FormButtonsSingle.parameters = {};
