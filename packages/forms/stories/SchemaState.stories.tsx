import { useState } from 'react';

import { fn as action } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

import { UIForm } from '../src/UIForm';
import { argTypes } from './argTypes';
import { CustomArrayTemplate } from './CustomArrayTemplate.component';
import { customActionsSchema } from './UIFormStoriesSchemas/customActions.schema';
import { customTemplateSchema } from './UIFormStoriesSchemas/customTemplate.schema';
import { customWidgetSchema } from './UIFormStoriesSchemas/customWidget.schema';
import { displayModeSchema } from './UIFormStoriesSchemas/displayMode.schema';
import { errorsSchema } from './UIFormStoriesSchemas/errors.schema';
import { hoverSubmitSchema } from './UIFormStoriesSchemas/hoverSubmit.schema';
import { updatingSchema } from './UIFormStoriesSchemas/updating.schema';

function Template({ introduction, ...props }: any) {
	return (
		<>
			{introduction ? introduction : null}
			<UIForm {...props} />
		</>
	);
}

const meta: Meta<typeof UIForm> = {
	title: 'Forms/Schema/State',
	component: Template,
	argTypes: {
		...argTypes,
		updating: {
			table: { disable: true },
		},
		onSubmit: {
			table: { disable: true },
		},
		onReset: {
			table: { disable: true },
		},
	},
	args: {
		onChange: action('Change'),
		onSubmit: action('onSubmit'),
		onReset: action('onReset'),
		onTrigger: action('onTrigger'),
	},
	parameters: {
		centeredLayout: true,
	},
};

export default meta;

type Story = StoryObj<typeof UIForm>;

const updatingProps = updatingSchema.uiSchema.map(w => w.key);
export const Updating: Story = {
	args: {
		introduction: (
			<div>
				<h2>Updating status</h2>
				<p>
					Form can disable and add an animation feedback on the widgets. To do so, you need to pass
					a UIForm "updating" prop which is an array of the schema keys where to apply
				</p>
			</div>
		),
		data: updatingSchema,
		updating: updatingProps,
	},
};

export const DisplayMode: Story = {
	args: {
		data: displayModeSchema,
		displayMode: 'text',
		introduction: (
			<p style={{ marginBottom: '1.25rem' }}>Form can be used to display data in read only</p>
		),
	},
};

const errorsProps = errorsSchema.uiSchema.reduce(
	(acc, current) => ({
		...acc,
		[current.key.split('.').join(',')]: 'There is an error',
	}),
	{
		tabConfiguration: 'There is an error',
	},
);

export const Errors: Story = {
	args: {
		data: errorsSchema,
		errors: errorsProps,
	},
};

export const HoverSubmit: Story = {
	args: {
		data: hoverSubmitSchema,
		introduction: (
			<>
				<h2>Hover submit handler</h2>
				<p style={{ marginBottom: '1.25rem' }}>
					Submit can detect if mouse enters or leaves by using <code>onSubmitEnter</code> and{' '}
					<code>onSubmitLeave</code>
				</p>
			</>
		),
		onSubmitEnter: (...args: any) => {
			action('onSubmitEnter')(...args);
		},
		onSubmitLeave: (...args: any) => {
			action('onSubmitLeave')(...args);
		},
	},
};

export const CustomActions: Story = {
	args: {
		data: customActionsSchema,
		actions: [
			{
				title: 'Reset',
				type: 'reset',
				widget: 'button',
			},
			{
				disabled: true,
				title: 'Disabled',
				type: 'button',
				widget: 'button',
			},
			{
				inProgress: true,
				title: 'In progress',
				type: 'button',
				widget: 'button',
			},
			{
				title: 'Trigger',
				triggers: ['test'],
				type: 'button',
				widget: 'button',
			},
			{
				bsStyle: 'primary',
				'data-feature': 'form.feature',
				title: 'Submit',
				type: 'submit',
				widget: 'button',
			},
		],
	},
};

export const CustomTemplate: Story = {
	args: {
		templates: { array: CustomArrayTemplate },
		data: customTemplateSchema,
	},
};

function CustomWidgetComponent({ value }: { value: string }) {
	return (
		<div className="panel panel-info">
			<div className="panel-heading">
				<h3 className="panel-title">Custom widget</h3>
			</div>
			<div className="panel-body">
				Form was instantiated with a custom widget to display its selected value
				<code>{value}</code>.
			</div>
		</div>
	);
}

export const CustomWidget: Story = {
	args: {
		widgets: { custom: CustomWidgetComponent },
		data: customWidgetSchema,
	},
};
