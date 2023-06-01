/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';

import Buttons from './Buttons.component';
jest.unmock('@talend/design-system');

describe('Buttons field', () => {
	it('should render buttons', () => {
		// given
		const schema = {
			widget: 'buttons',
			description: 'My buttons',
			items: [
				{
					title: 'Reset',
					type: 'reset',
					widget: 'button',
					className: 'custom-class-name',
				},
				{
					position: 'right',
					title: 'Test',
					triggers: ['test'],
					type: 'button',
					widget: 'button',
				},
				{
					bsStyle: 'primary',
					title: 'Submit',
					type: 'submit',
					widget: 'button',
				},
			],
		};

		// when
		const { container } = render(
			<Buttons
				id="myForm"
				onTrigger={jest.fn()}
				onClick={jest.fn()}
				schema={schema}
				className="extra"
			/>,
		);

		// then
		const btns = screen.getAllByRole('button');
		expect(btns).toHaveLength(3);
		expect(btns[0]).toHaveClass('custom-class-name');
		expect(btns[0]).toHaveTextContent('Reset');
		expect(btns[0]).toHaveAttribute('type', 'reset');
		expect(btns[1]).toHaveTextContent('Test');
		expect(btns[1]).toHaveAttribute('type', 'button');
		expect(btns[2]).toHaveTextContent('Submit');
		expect(btns[2]).toHaveClass('btn-primary');
		expect(btns[2]).toHaveAttribute('type', 'submit');

		expect(container.firstChild).toMatchSnapshot();
	});
});
