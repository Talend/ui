import React, { useState } from 'react';
import Input from './Input/Input';
import Textarea from './Textarea/Textarea';
import Select from './Select/Select';
import { action } from '@storybook/addon-actions';
import Dropdown from '../../Dropdown';
import { AffixButton } from '../FieldGroup/Affix';
import { StackVertical } from '../../Stack';

export default {
	component: Textarea,
};

export const TextareaPrimitive = () => (
	<StackVertical gap="XS" padding="XS" align="stretch" justify="start">
		<Textarea placeholder="Placeholder" />
		<Textarea defaultValue="With default value" />
		<Textarea defaultValue="Test read-only" readOnly />
		<Textarea defaultValue="Test disabled" disabled />
		<Textarea placeholder="Test disabled empty" disabled />
	</StackVertical>
);

export const InputPrimitive = () => (
	<StackVertical gap="XS" padding="XS" align="stretch" justify="start">
		<Input type="text" placeholder="Placeholder" />
		<Input type="text" defaultValue="With default value" />
		<Input type="text" readOnly disabled defaultValue="Test read-only" />
		<Input type="text" disabled defaultValue="Test disabled" />
		<Input type="text" disabled placeholder="Test disabled empty" />
		<Input
			placeholder="Test with afixes"
			type="text"
			prefix={{ type: 'text', children: 'Affix', hideText: false, icon: 'talend-file-o' }}
			suffix={{
				type: 'button',
				onClick: () => action('clicked'),
				children: 'action',
				icon: 'talend-file-o',
			}}
		/>
	</StackVertical>
);

export const SelectPrimitive = () => {
	return (
		<StackVertical gap="XS" padding="XS" align="stretch" justify="start">
			<Select name="select" placeholder="Placeholder">
				<option value="option 1">Option 1</option>
				<option value="option 2">Option 2</option>
			</Select>
			<Select name="select" defaultValue="option 1">
				<option value="option 1">With default value (controled)</option>
				<option value="option 2">Option 2</option>
			</Select>
			<Select name="select" defaultValue="option 1" readOnly>
				<option value="option 1" selected>
					Test read-only
				</option>
				<option value="option 2">Option 2</option>
			</Select>
			<Select name="select" disabled defaultValue="option 1">
				<option value="option 1">Test disabled</option>
				<option value="option 2">Option 2</option>
			</Select>
			<Select name="select" placeholder="Test disabled empty" disabled>
				<option value="option 1">Option 1</option>
				<option value="option 2">Option 2</option>
			</Select>
			<Select
				name="select"
				placeholder="Test with afixes"
				prefix={{ type: 'text', children: 'Affix', hideText: false, icon: 'talend-file-o' }}
				suffix={{
					type: 'button',
					onClick: () => action('clicked'),
					children: 'action',
					icon: 'talend-file-o',
				}}
			>
				<option value="option 1">Option 1</option>
				<option value="option 2">Option 2</option>
			</Select>
		</StackVertical>
	);
};

export const InputPrimitiveWithDropdown = () => {
	const [currentValue, setCurrentValue] = useState('Option 1');
	return (
		<StackVertical gap="XS" padding="XS" align="stretch" justify="start">
			<Input
				name="input"
				type="text"
				prefix={{ type: 'text', children: 'Affix', hideText: true, icon: 'talend-file-o' }}
				suffix={
					<Dropdown
						aria-label="List of options"
						items={[
							{ type: 'button', label: 'Option 1', onClick: () => setCurrentValue('Option 1') },
							{ type: 'button', label: 'Option 2', onClick: () => setCurrentValue('Option 2') },
						]}
					>
						<AffixButton isDropdown onClick={() => {}}>
							{currentValue}
						</AffixButton>
					</Dropdown>
				}
			/>
		</StackVertical>
	);
};
