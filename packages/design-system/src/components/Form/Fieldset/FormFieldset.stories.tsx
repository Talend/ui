import React from 'react';

import Form from '../index';
import { ButtonPrimary, ButtonSecondary } from '../../Button';

export default {
	component: Form.Fieldset,
};

export const Default = () => {
	return (
		<Form>
			<Form.Fieldset legend="Frequency">
				<Form.Select name="repeat" label="Repeat">
					<option>At specific intervals</option>
					<option>Foo</option>
					<option>Bar</option>
				</Form.Select>
				<Form.Row>
					<Form.Number label="Minutes" suffix="minutes" name="minutes" />
					<Form.Time name="repeat-from" label="Repeat from" required />
					<Form.Time name="repeat-to" label="Repeat to" required />
				</Form.Row>
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonSecondary onClick={() => {}}>Cancel</ButtonSecondary>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

export const Error = () => {
	return (
		<Form>
			<Form.Fieldset legend="Frequency">
				<Form.Select name="repeat" label="Repeat">
					<option>At specific intervals</option>
					<option>Foo</option>
					<option>Bar</option>
				</Form.Select>
				<Form.Row>
					<Form.Number label="Minutes" suffix="minutes" name="minutes" />
					<Form.Time
						hasError
						name="repeat-from"
						label="Repeat from"
						required
						description="Repeat from is invalid"
					/>
					<Form.Time name="repeat-to" label="Repeat to" required />
				</Form.Row>
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonSecondary onClick={() => {}}>Cancel</ButtonSecondary>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};

export const Errors = () => {
	return (
		<Form>
			<Form.Fieldset legend="Frequency">
				<Form.Select name="repeat" label="Repeat">
					<option>At specific intervals</option>
					<option>Foo</option>
					<option>Bar</option>
				</Form.Select>
				<Form.Row>
					<Form.Number label="Minutes" suffix="minutes" name="minutes" />
					<Form.Time
						hasError
						name="repeat-from"
						label="Repeat from"
						required
						description="Repeat from is invalid"
					/>
					<Form.Time
						hasError
						name="repeat-to"
						label="Repeat to"
						required
						description="Repeat to is invalid"
					/>
				</Form.Row>
			</Form.Fieldset>
			<Form.Buttons>
				<ButtonSecondary onClick={() => {}}>Cancel</ButtonSecondary>
				<ButtonPrimary type="submit" onClick={() => {}}>
					Submit
				</ButtonPrimary>
			</Form.Buttons>
		</Form>
	);
};
