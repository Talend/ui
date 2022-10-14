import React from 'react';
import Form from '../index';
import { StackVertical } from '../../Stack';
import { action } from '@storybook/addon-actions';

export default {
	component: Form.Text,
};

export const QuickStart = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Text
			name="text"
			label="Select affix"
			placeholder="ex: talend.com"
			prefix={{
				type: 'select',
				label: 'prefix',
				name: 'prefix',
				required: true,
				defaultValue: 'https://',
				children: (
					<>
						<option>https://</option>
						<option>http://</option>
					</>
				),
			}}
		/>
		<Form.Text
			name="text"
			label="Text affix"
			placeholder="ex: talend"
			prefix={{
				type: 'text',
				children: 'https://',
			}}
		/>
		<Form.Text
			name="text"
			label="Button affix"
			placeholder="ex: 4874-48f4-vh34-284h"
			defaultValue="4874-48f4-vh34-284h"
			readOnly
			prefix={{
				type: 'button',
				children: 'copy',
				icon: 'copy',
				onClick: () => action('Copied'),
			}}
		/>
	</StackVertical>
);

export const AffixSelect = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Text
			name="text"
			label="Select prefix and input text"
			placeholder="www.talend.com"
			prefix={{
				type: 'select',
				label: 'prefix',
				name: 'prefix',
				required: true,
				defaultValue: 'France (+33)',
				children: (
					<>
						<option>France (+33)</option>
						<option>UK (+31)</option>
					</>
				),
			}}
		/>
		<Form.Select
			name="select"
			label="Select suffix and select input"
			placeholder="www.talend.com"
			suffix={{
				type: 'select',
				label: 'prefix',
				name: 'prefix',
				required: true,
				defaultValue: '.com',
				children: (
					<>
						<option>.com</option>
						<option>.org</option>
					</>
				),
			}}
		>
			<option>www.talend</option>
			<option>www.stitch</option>
		</Form.Select>
		<Form.Text
			name="text"
			label="Disabled select prefix"
			placeholder="www.talend.com"
			prefix={{
				type: 'select',
				label: 'prefix',
				name: 'prefix',
				required: true,
				defaultValue: 'France (+33)',
				disabled: true,
				children: (
					<>
						<option>France (+33)</option>
						<option>UK (+31)</option>
					</>
				),
			}}
		/>
		<Form.Select
			name="select"
			label="Disabled select suffix"
			placeholder="www.talend.com"
			suffix={{
				type: 'select',
				label: 'prefix',
				name: 'prefix',
				required: true,
				defaultValue: '.com',
				disabled: true,
				children: (
					<>
						<option>.com</option>
						<option>.org</option>
					</>
				),
			}}
		>
			<option>www.talend</option>
			<option>www.stitch</option>
		</Form.Select>
		<Form.Text
			name="text"
			label="Read-only select prefix"
			placeholder="www.talend.com"
			readOnly
			prefix={{
				type: 'select',
				label: 'prefix',
				name: 'prefix',
				required: true,
				defaultValue: 'France (+33)',
				children: (
					<>
						<option>France (+33)</option>
						<option>UK (+31)</option>
					</>
				),
			}}
		/>
		<Form.Select
			name="select"
			label="Read-only select suffix"
			placeholder="www.talend"
			defaultValue="www.talend"
			readOnly
			suffix={{
				type: 'select',
				label: 'prefix',
				name: 'prefix',
				required: true,
				defaultValue: '.com',
				children: (
					<>
						<option>.com</option>
						<option>.org</option>
					</>
				),
			}}
		>
			<option>www.talend</option>
			<option>www.stitch</option>
		</Form.Select>
	</StackVertical>
);

export const AffixButton = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Text
			name="text"
			label="Button prefix with icon and input text"
			placeholder="www.talend.com"
			prefix={{
				type: 'button',
				onClick: () => action('prefix clicked'),
				children: 'Copy',
				icon: 'copy',
			}}
		/>
		<Form.Select
			name="select"
			label="Select suffix and select input"
			defaultValue="Dataset 001"
			suffix={{
				type: 'button',
				onClick: () => action('suffix clicked'),
				children: 'Check dataset',
			}}
		>
			<option>Dataset 001</option>
			<option>Dataset 002</option>
		</Form.Select>
		<Form.Text
			name="text"
			label="Button affix with dropdown"
			placeholder="www.talend.com"
			prefix={{
				type: 'button',
				onClick: () => action('prefix clicked'),
				children: 'https://',
				icon: 'locker-closed',
				isDropdown: true,
			}}
		/>
		<Form.Text
			name="text"
			label="Button affix with icon and hidden text"
			placeholder="www.talend.com"
			prefix={{
				type: 'button',
				onClick: () => action('prefix clicked'),
				children: 'Copy',
				icon: 'copy',
				hideText: true,
			}}
		/>
		<Form.Text
			name="text"
			label="Button affix disabled"
			placeholder="www.talend.com"
			prefix={{
				type: 'button',
				onClick: () => action('prefix clicked'),
				children: 'Copy',
				icon: 'copy',
				disabled: true,
			}}
		/>
	</StackVertical>
);

export const AffixText = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Text
			name="text"
			label="Text prefix with input text"
			placeholder="ex: 06 19 19 19 19"
			prefix={{
				type: 'text',
				children: 'France (+33)',
			}}
		/>
		<Form.Select
			name="text"
			label="Text suffix with select input"
			placeholder="Authorized domain list"
			defaultValue="www.talend"
			suffix={{
				type: 'text',
				children: '.com',
			}}
		>
			<option>www.talend</option>
			<option>www.stitch</option>
		</Form.Select>
		<Form.Text
			name="text"
			label="Text affix with icon"
			placeholder="ex: talend.com"
			prefix={{
				type: 'text',
				children: 'https://',
				icon: 'locker-closed',
			}}
		/>
		<Form.Text
			name="text"
			label="Text affix with icon and hidden text"
			placeholder="ex: https://talend.com"
			prefix={{
				type: 'text',
				children: 'Address to share',
				icon: 'export',
				hideText: true,
			}}
		/>
	</StackVertical>
);

export const DatalistAffix = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Datalist
			name="column"
			label="Input"
			values={['Id', 'Name', 'Country', 'Age']}
			multiple
			prefix={{
				type: 'select',
				label: 'type',
				name: 'type',
				defaultValue: 'Column',
				children: (
					<>
						<option>Value</option>
						<option>Column</option>
					</>
				),
			}}
		/>
		<Form.Select
			name="column"
			label="Input"
			multiple
			prefix={{
				type: 'select',
				label: 'type',
				name: 'type',
				defaultValue: 'Column',
				children: (
					<>
						<option>Value</option>
						<option>Column</option>
					</>
				),
			}}
		>
			<option>Id</option>
			<option>Name</option>
			<option selected>Country</option>
			<option>Age</option>
		</Form.Select>
	</StackVertical>
);

export const Mix = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Text
			name="generatedId"
			label="Button prefix and suffix on a single field"
			prefix={{
				type: 'button',
				children: 'Copy',
				icon: 'copy',
				onClick: () => action('Copied'),
			}}
			suffix={{
				type: 'button',
				children: 'Create a new ID',
				icon: 'restart',
				onClick: () => action('Refreshed'),
				hideText: true,
			}}
		/>
		<Form.Select
			name="fakeDomain"
			label="Select prefix, text suffix"
			suffix={{
				type: 'text',
				children: '.com',
			}}
			prefix={{
				type: 'select',
				label: 'prefix',
				name: 'prefix',
				required: true,
				defaultValue: 'https://',
				children: (
					<>
						<option>https://</option>
						<option>http://</option>
					</>
				),
			}}
		>
			<option>domain-name.com</option>
			<option selected>talend.com</option>
		</Form.Select>
		<Form.Number
			name="value"
			label="Text prefix, text suffix"
			prefix={{
				type: 'text',
				children: '$',
			}}
			suffix={{
				type: 'text',
				children: '.00',
			}}
		/>
	</StackVertical>
);
