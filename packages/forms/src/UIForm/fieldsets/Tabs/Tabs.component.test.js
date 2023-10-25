import { screen, render } from '@testing-library/react';
import Tabs from './Tabs.component';
import { WidgetContext } from '../../context';
import widgets from '../../utils/widgets';

jest.unmock('@talend/design-system');

describe('Tabs widget', () => {
	const schema = {
		title: 'My Tabs',
		items: [
			{
				title: 'User',
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
			},
			{
				title: 'Other',
				items: [
					{
						key: ['comment'],
						type: 'text',
						schema: { type: 'string' },
					},
				],
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

	it('should render tabs', () => {
		// given

		// when
		const { container } = render(
			<WidgetContext.Provider value={widgets}>
				<Tabs {...props} />
			</WidgetContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render invalid tab', () => {
		// given
		// when
		render(
			<WidgetContext.Provider value={widgets}>
				<Tabs {...props} errors={{ 'user,firstname': 'This is wrong' }} />
			</WidgetContext.Provider>,
		);

		// then
		const inputs = screen.getAllByRole('textbox');
		expect(inputs[0]).toHaveAttribute('aria-invalid', 'true');
		expect(inputs[1]).toHaveAttribute('aria-invalid', 'false');
		expect(screen.getByRole('status')).toHaveTextContent('This is wrong');
	});
});
