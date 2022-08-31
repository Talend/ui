import React, { useState } from 'react';
import Input from './Input/Input';
import Textarea from './Textarea/Textarea';
import Select from './Select/Select';
import { action } from '@storybook/addon-actions';
import Dropdown from '../../Dropdown';
import { AffixButton } from '../../Form/FieldGroup/Affix';
import { StackHorizontal, StackVertical } from '../../Stack';
import Checkbox from './Checkbox/Checkbox';
import Label from './Label/Label';
import Radio from './Radio/Radio';
import Field from './Field/Field';
import { ButtonPrimary } from '../../Button';

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
		<Input type="text" readOnly defaultValue="Test read-only" />
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

export const InputPrimitivePassword = () => (
	<StackVertical gap="XS" padding="XS" align="stretch" justify="start">
		<Input type="password" placeholder="Placeholder" />
		<Input type="password" defaultValue="With default value" />
		<Input type="password" readOnly defaultValue="Test read-only" />
		<Input type="password" disabled defaultValue="Test disabled" />
		<Input type="password" disabled placeholder="Test disabled empty" />
		<Input
			placeholder="Test with afixes"
			type="password"
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

export const CheckboxPrimitive = () => (
	<StackVertical gap="XS" padding="XS" align="stretch" justify="start">
		<Checkbox label="Test checkbox" id="checkbox-1" />
		<Checkbox label="Test checkbox selected" id="checkbox-2" defaultChecked />
		<Checkbox label="Test checkbox indeterminate" id="checkbox-3" indeterminate />
		<Checkbox label="Test checkbox read-only unselected" id="checkbox-4" readOnly />
		<Checkbox label="Test checkbox read-only" id="checkbox-5" readOnly defaultChecked />
		<Checkbox
			label="Test checkbox indeterminate read-only"
			id="checkbox-6"
			indeterminate
			readOnly
		/>
		<Checkbox label="Test checkbox disabled unselected" id="checkbox-7" disabled />
		<Checkbox label="Test checkbox disabled" id="checkbox-8" disabled defaultChecked />
		<Checkbox label="Test checkbox indeterminate disabled" id="checkbox-9" indeterminate disabled />
	</StackVertical>
);

export const RadioPrimitive = () => (
	<StackVertical gap="XS" padding="XS" align="stretch" justify="start">
		<Radio label="Test radio" id="radio-1" value="choice1" name="choice1" />
		<Radio label="Test radio selected" id="radio-2" value="choice2" name="choice2" defaultChecked />
		<Radio
			label="Test radio read-only unselected"
			id="radio-3"
			name="choice3"
			value="choice3"
			readOnly
		/>
		<Radio
			label="Test radio read-only"
			id="radio-4"
			value="choice4"
			name="choice4"
			readOnly
			defaultChecked
		/>
		<Radio
			label="Test radio disabled unselected"
			id="radio-5"
			value="choice5"
			name="choice5"
			disabled
		/>
		<Radio
			label="Test radio disabled"
			id="radio-6"
			value="choice6"
			name="choice6"
			disabled
			defaultChecked
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

export const FieldStory = () => {
	const [isError, setIsError] = useState<boolean>(false);
	return (
		<StackVertical gap="XS" padding="XS" align="stretch" justify="start">
			<Field
				label={{ children: 'Test label' }}
				id="testId"
				description={isError ? 'This is the error message' : 'This is a description'}
				hasError={isError}
				name="test"
			>
				<Input type="text" />
			</Field>
			<Field
				label={{ children: 'Test Textarea' }}
				id="testId2"
				description={isError ? 'This is the error message' : 'This is a description for a textarea'}
				hasError={isError}
				name="test"
			>
				<Textarea />
			</Field>
			<div>
				<ButtonPrimary onClick={() => setIsError(!isError)}>Set as error</ButtonPrimary>
			</div>
		</StackVertical>
	);
};

export const FakeForm = () => {
	return (
		<form>
			<StackVertical gap="S" padding="XS" align="stretch" justify="start">
				<StackHorizontal gap="XS" align="stretch" justify="spaceBetween">
					<StackVertical gap="XXS" align="stretch" justify="start">
						<Label htmlFor="test1">Name</Label>
						<Input id="test1" type="text" />
					</StackVertical>

					<StackVertical gap="XXS" align="stretch" justify="start">
						<Label htmlFor="test2">Email</Label>
						<Input id="test2" type="email" />
					</StackVertical>
				</StackHorizontal>
				<StackVertical gap="XXS" align="stretch" justify="start">
					<Label>Send me emails</Label>
					<Checkbox id="emails" label="Yes I love emails" />
				</StackVertical>
				<StackVertical gap="XXS" align="stretch" justify="start">
					<Label>Pick a thing</Label>
					<StackVertical gap="XXS" align="stretch" justify="start">
						<Radio id="choice1" label="Choice 1" value="choice1" name="choice" />
						<Radio id="choice2" label="Choice 2" value="choice2" name="choice" />
					</StackVertical>
				</StackVertical>
			</StackVertical>
		</form>
	);
};
