import { screen, render } from '@testing-library/react';
import FieldsetTextMode from './TextMode.component';
import { WidgetContext } from '../../../context';
import widgets from '../../../utils/widgets';

jest.unmock('@talend/design-system');

describe('Fieldset widget in text mode', () => {
	const schema = {
		title: 'My fieldset',
		items: [
			{
				key: ['user', 'firstname'],
				type: 'text',
				schema: { type: 'string' },
			},
			{
				key: ['user', 'lastname'],
				type: 'text',
				schema: { type: 'string' },
			},
		],
	};
	const props = {
		schema,
		errors: {},
		onChange: jest.fn(),
		onFinish: jest.fn(),
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should render a title described by a definition list', () => {
		// given

		// when
		const { container } = render(
			<WidgetContext.Provider value={widgets}>
				<FieldsetTextMode {...props} />
			</WidgetContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render a simple definition list without title', () => {
		// given

		// when
		render(
			<WidgetContext.Provider value={widgets}>
				<FieldsetTextMode {...props} />
			</WidgetContext.Provider>,
		);
		const inputs = screen.getAllByRole('textbox');

		// then
		expect(screen.getByRole('term')).toHaveTextContent('My fieldset');
		expect(inputs[0]).toHaveAttribute('id', 'user_firstname');
		expect(inputs[1]).toHaveAttribute('id', 'user_lastname');
	});
});
