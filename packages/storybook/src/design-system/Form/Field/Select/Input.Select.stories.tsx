import React from 'react';
import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.Select,
};

export const Select = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Select name="select" label="Default select" placeholder="Placeholder">
			<option>Foo</option>
			<option>Bar</option>
		</Form.Select>
		<Form.Select name="select" label="Default select disabled" placeholder="Placeholder" disabled>
			<option>Foo</option>
			<option>Bar</option>
		</Form.Select>
		<Form.Select name="select" label="Default select read-only" placeholder="Placeholder" readOnly>
			<option>Foo</option>
			<option>Bar</option>
		</Form.Select>
		<Form.Select
			name="select"
			label="Default select with error"
			placeholder="Placeholder"
			hasError
			description="This field is required"
			required
		>
			<option>Foo</option>
			<option>Bar</option>
		</Form.Select>
	</StackVertical>
);

export const SelectWithValue = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Select name="select" label="Default select with value">
			<option selected>Foo</option>
			<option>Bar</option>
		</Form.Select>
		<Form.Select name="select" label="Default select with value disabled" disabled>
			<option selected>Foo</option>
			<option>Bar</option>
		</Form.Select>
		<Form.Select name="select" label="Default select with value read-only" readOnly>
			<option selected>Foo</option>
			<option>Bar</option>
		</Form.Select>
		<Form.Select
			name="select"
			label="Default select with value and error"
			hasError
			description="This field is required"
			required
		>
			<option selected>Foo</option>
			<option>Bar</option>
		</Form.Select>
	</StackVertical>
);

export const SelectMultiple = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Select name="select" label="Multiple select" placeholder="Placeholder" multiple>
			<option>Foo</option>
			<option>Bar</option>
		</Form.Select>
		<Form.Select name="select" label="Multiple select with default values" multiple>
			<option selected>Foo</option>
			<option selected>Bar</option>
		</Form.Select>
		<Form.Select name="select" label="Multiple select disabled" disabled multiple>
			<option>Foo</option>
			<option>Bar</option>
		</Form.Select>
		<Form.Select name="select" label="Multiple select read-only" readOnly multiple>
			<option selected>Foo</option>
			<option selected>Bar</option>
		</Form.Select>
		<Form.Select
			name="select"
			label="Multiple select with error"
			multiple
			hasError
			description="This field is required"
			required
		>
			<option>Foo</option>
			<option>Bar</option>
		</Form.Select>
	</StackVertical>
);

export const SelectOptionGroups = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Select name="select-one" label="Select with option group">
			<optgroup label="Foo">
				<option>Foo-Foo</option>
				<option selected>Foo-Bar</option>
			</optgroup>
			<optgroup label="Bar">
				<option>Bar-Foo</option>
				<option>Bar-Bar</option>
			</optgroup>
		</Form.Select>
		<Form.Select name="select-two" label="Select with option group disabled" disabled>
			<optgroup label="Foo">
				<option>Foo-Foo</option>
				<option selected>Foo-Bar</option>
			</optgroup>
			<optgroup label="Bar">
				<option>Bar-Foo</option>
				<option>Bar-Bar</option>
			</optgroup>
		</Form.Select>
		<Form.Select name="select-three" label="Select with option group read-only" readOnly>
			<optgroup label="Foo">
				<option>Foo-Foo</option>
				<option selected>Foo-Bar</option>
			</optgroup>
			<optgroup label="Bar">
				<option>Bar-Foo</option>
				<option>Bar-Bar</option>
			</optgroup>
		</Form.Select>
		<Form.Select name="select-one-multiple" multiple label="Multiple select with option group">
			<optgroup label="Foo">
				<option>Foo-Foo</option>
				<option selected>Foo-Bar</option>
			</optgroup>
			<optgroup label="Bar">
				<option>Bar-Foo</option>
				<option>Bar-Bar</option>
			</optgroup>
		</Form.Select>
		<Form.Select
			name="select-two-multiple"
			multiple
			label="Multiple select with option group disabled"
			disabled
		>
			<optgroup label="Foo">
				<option>Foo-Foo</option>
				<option selected>Foo-Bar</option>
			</optgroup>
			<optgroup label="Bar">
				<option>Bar-Foo</option>
				<option>Bar-Bar</option>
			</optgroup>
		</Form.Select>
		<Form.Select
			name="select-three-multiple"
			multiple
			label="Multiple select with option group read-only"
			readOnly
		>
			<optgroup label="Foo">
				<option>Foo-Foo</option>
				<option selected>Foo-Bar</option>
			</optgroup>
			<optgroup label="Bar">
				<option>Bar-Foo</option>
				<option>Bar-Bar</option>
			</optgroup>
		</Form.Select>
	</StackVertical>
);
