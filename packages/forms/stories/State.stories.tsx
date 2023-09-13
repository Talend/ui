import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { UIForm } from '../src/UIForm';

import { updatingSchema } from './UIFormStoriesSchemas/updating.schema';
import { displayModeSchema } from './UIFormStoriesSchemas/displayMode.schema';
import { errorsSchema } from './UIFormStoriesSchemas/errors.schema';
import { hoverSubmitSchema } from './UIFormStoriesSchemas/hoverSubmit.schema';
import { customActionsSchema } from './UIFormStoriesSchemas/customActions.schema';
import { customTemplateSchema } from './UIFormStoriesSchemas/customTemplate.schema';
import { customWidgetSchema } from './UIFormStoriesSchemas/customWidget.schema';

import { CustomArrayTemplate } from './CustomArrayTemplate.component';

const meta: Meta<typeof UIForm> = {
	title: 'Forms/Schema/State',
	component: UIForm,
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
		schema: updatingSchema,
		updating: updatingProps,
	},
	render: ({ schema, onChange, onSubmit, updating }) => (
		<div>
			<h2>Updating status</h2>
			<p>
				Form can disable and add an animation feedback on the widgets. To do so, you need to pass a
				UIForm "updating" prop which is an array of the schema keys where to apply
			</p>
			<UIForm data={schema} onChange={onChange} onSubmit={onSubmit} updating={updating} />
		</div>
	),
};

export const DisplayMode: Story = {
	args: {
		schema: displayModeSchema,
	},
	render: ({ schema, onChange, onSubmit }) => (
		<>
			<p style={{ marginBottom: '2rem' }}>Form can be used to display data in read only</p>

			<UIForm data={schema} onChange={onChange} onSubmit={onSubmit} displayMode="text" />
		</>
	),
};

const errorsProps = errorsSchema.uiSchema.reduce(
	(acc, current) => ({
		...acc,
		[current.key.split('.').join(',')]: 'There is an error',
	}),
	{},
);

export const Errors: Story = {
	args: {
		schema: errorsSchema,
		errors: errorsProps,
	},
	render: ({ schema, onChange, onSubmit, errors }) => (
		<div>
			<h2>Updating status</h2>
			<p>
				Form can disable and add an animation feedback on the widgets. To do so, you need to pass a
				UIForm "updating" prop which is an array of the schema keys where to apply
			</p>
			<UIForm data={schema} onChange={onChange} onSubmit={onSubmit} errors={errors} />
		</div>
	),
};

function UIFormWithOnSubmitHover() {
	const [hover, setHover] = useState(false);
	return (
		<div
			style={{
				margin: '-5px',
				padding: '5px',
				borderRadius: '5px',
				background: hover ? '#EFEFEF' : 'transparent',
			}}
		>
			<UIForm
				data={hoverSubmitSchema}
				onSubmit={action('onSubmit')}
				onSubmitEnter={(...args: any) => {
					action('onSubmitEnter')(...args);
					setHover(true);
				}}
				onSubmitLeave={(...args: any) => {
					action('onSubmitLeave')(...args);
					setHover(false);
				}}
			/>
		</div>
	);
}

export const HoverSubmit: Story = {
	render: () => (
		<div>
			<h2>Hover submit handler</h2>
			<p style={{ marginBottom: '2rem' }}>
				Submit can detect if mouse enters or leaves by using <code>onSubmitEnter</code> and{' '}
				<code>onSubmitLeave</code>
			</p>
			<UIFormWithOnSubmitHover />
		</div>
	),
};

export const CustomActions: Story = {
	args: {
		schema: customActionsSchema,
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
	render: ({ schema, onSubmit, onReset, onTrigger, actions }) => (
		<section>
			<UIForm
				data={schema}
				onSubmit={onSubmit}
				onReset={onReset}
				onTrigger={onTrigger}
				actions={actions}
			/>
		</section>
	),
};

export const CustomTemplate: Story = {
	args: {
		templates: { array: CustomArrayTemplate },
		schema: customTemplateSchema,
	},
	render: ({ templates, schema, onChange, onSubmit }) => (
		<div>
			<UIForm templates={templates} data={schema} onChange={onChange} onSubmit={onSubmit} />
		</div>
	),
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
		schema: customWidgetSchema,
	},
	render: ({ widgets, schema, onChange, onSubmit }) => (
		<UIForm widgets={widgets} data={schema} onChange={onChange} onSubmit={onSubmit} />
	),
};
