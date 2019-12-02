import React from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import { IconsProvider, Actions } from '@talend/react-components';
import { UIForm } from '../src/UIForm-v2/UIForm';

function CustomArrayTemplate(props) {
	const { canReorder, id, onAdd, onRemove, onReorder, renderItem, schema, value } = props;

	return (
		<div>
			<style>
				{`
					ol {
						list-style: none;
					}

					.icon-up svg {
						 transform: rotate(180deg);
					}
				`}
			</style>
			<legend>This is a custom array template</legend>
			<ol id={id} style={{ listStyle: 'none' }}>
				{value.map((itemValue, index) => {
					const actions = [
						{
							label: 'Remove',
							icon: 'talend-trash',
							onClick: event => onRemove(event, index),
							bsStyle: 'primary',
						},
					];

					if (canReorder) {
						actions.push(
							{
								label: 'Move Up',
								icon: 'talend-caret-down',
								className: 'icon-up',
								onClick: event =>
									onReorder(event, {
										previousIndex: index,
										nextIndex: index - 1,
									}),
							},
							{
								label: 'Move Down',
								icon: 'talend-caret-down',
								onClick: event =>
									onReorder(event, {
										previousIndex: index,
										nextIndex: index + 1,
									}),
							},
						);
					}

					return (
						<li key={index}>
							<Actions actions={actions} hideLabel />
							{renderItem(index)}
						</li>
					);
				})}
			</ol>
			<div>
				<button type="button" className="btn btn-info" onClick={onAdd}>
					New Element
				</button>
			</div>
		</div>
	);
}

CustomArrayTemplate.propTypes = {
	canReorder: PropTypes.bool,
	id: PropTypes.string,
	onAdd: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	onReorder: PropTypes.func.isRequired,
	renderItem: PropTypes.func.isRequired,
	schema: PropTypes.object.isRequired,
	value: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function story() {
	const templates = { array: CustomArrayTemplate };
	const schema = {
		jsonSchema: {
			title: 'Custom array',
			type: 'object',
			properties: {
				list: {
					type: 'array',
					items: {
						type: 'string',
					},
				},
			},
		},
		properties: {
			list: ['one', 'two'],
		},
		uiSchema: ['list'],
	};
	return (
		<div>
			<IconsProvider />
			<UIForm
				templates={templates}
				data={schema}
				onChange={action('Change')}
				onSubmit={action('onSubmit')}
			/>
		</div>
	);
}

export default {
	name: 'Core Custom template',
	story,
};
