import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Form } from './';
import { ButtonPrimary, ButtonSecondary } from '../Button';

jest.mock('@talend/utils', () => {
	let i = 0;
	return {
		// we need stable but different uuid (is fixed to 42 by current mock)
		randomUUID: () => `mocked-uuid-${i++}`,
	};
});

describe('Form', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Form>
					<Form.Fieldset legend="Complete your registration">
						<Form.Text label="Input" name="input" required />
						<Form.Tel label="Phone" name="tel" required />
						<Form.Number label="Amount" name="amount" prefix="$" suffix=".00" />
						<Form.File label="File" name="file" />
						<Form.Password label="Password" name="password" />
						<Form.Search label="Search" name="search" />
						<Form.Textarea label="Textarea" name="textarea" />
						<Form.Select label="Select" name="select">
							<option>Foo</option>
							<option>Bar</option>
						</Form.Select>
						<Form.ToggleSwitch defaultChecked required name="test-checkbox" label="Checkbox" />
						<Form.Radio label="Radio" name="radio" defaultChecked />
						<Form.ToggleSwitch label="Switch" defaultChecked name="Switch" />
						<Form.Buttons>
							<ButtonSecondary type="reset" onClick={jest.fn()}>
								Reset
							</ButtonSecondary>
							<ButtonPrimary onClick={jest.fn()}>Submit</ButtonPrimary>
						</Form.Buttons>
					</Form.Fieldset>
				</Form>
			</main>,
		);

		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
