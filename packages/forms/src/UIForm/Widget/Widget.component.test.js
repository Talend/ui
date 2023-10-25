import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import defaultWidgets from '../utils/widgets';
import { WidgetContext } from '../context';

import Widget from './Widget.component';

jest.unmock('@talend/design-system');

describe('Widget component', () => {
	const schema = {
		key: ['user', 'firstname'],
		type: 'text',
		title: 'First Name',
	};
	const errors = {
		'user,firstname': 'This is not ok',
	};
	const properties = {
		user: {
			firstname: 'my firstname',
			lastname: 'my lastname',
		},
		comment: '',
	};
	const customWidgets = {
		customWidget: () => <div data-testid="customWidget">my widget</div>,
		customWidget_text: () => (
			<div data-testid="customWidget_text">my widget in text display mode</div>
		),
	};
	const props = {
		id: 'myForm',
		schema,
		errors,
		properties,
		onChange: jest.fn(),
		onFinish: jest.fn(),
		onTrigger: jest.fn(),
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should render widget', () => {
		// when
		const { container } = render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget {...props} />
			</WidgetContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should wrapper widget into a tooltip trigger', async () => {
		const { container } = render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget {...props} schema={{ ...schema, tooltip: 'example tooltip' }} />
			</WidgetContext.Provider>,
		);
		await userEvent.hover(container.firstChild);
		await screen.findByText('example tooltip');
		expect(screen.getByRole('tooltip')).toHaveTextContent('example tooltip');
	});

	it('should render widget with the specific displayMode', () => {
		// when
		render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget {...props} id="myForm" displayMode="text" />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByRole('term')).toHaveTextContent('First Name');
		expect(screen.getByRole('definition')).toHaveTextContent('my firstname');
	});

	it('should render nothing if widget does not exist', () => {
		// given
		const unknownWidgetSchema = {
			...schema,
			type: 'unknown',
		};

		// when
		render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget properties={properties} schema={unknownWidgetSchema} errors={errors} />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByText('Widget not found unknown')).toBeVisible();
		expect(screen.getByText('Widget not found unknown')).toHaveClass('text-danger');
	});

	it('should render custom widget', () => {
		// given
		const customWidgetSchema = {
			...schema,
			type: 'customWidget',
		};

		// when
		render(
			<WidgetContext.Provider value={{ ...defaultWidgets, ...customWidgets }}>
				<Widget {...props} schema={customWidgetSchema} value={customWidgets} />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByTestId('customWidget')).toBeVisible();
		expect(screen.getByTestId('customWidget')).toHaveTextContent('my widget');
	});

	it('should render custom widget in specific display mode', () => {
		// given
		const customWidgetSchema = {
			...schema,
			type: 'customWidget',
		};

		// when
		render(
			<WidgetContext.Provider value={{ ...defaultWidgets, ...customWidgets }}>
				<Widget {...props} schema={customWidgetSchema} value={customWidgets} displayMode="text" />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByTestId('customWidget_text')).toBeVisible();
		expect(screen.getByTestId('customWidget_text')).toHaveTextContent('my widget');
	});

	it('should pass validation message from schema over message from errors', () => {
		// given
		const customValidationMessageSchema = {
			...schema,
			validationMessage: 'My custom validation message',
		};

		// when
		render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget {...props} schema={customValidationMessageSchema} />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByText('My custom validation message')).toBeVisible();
	});

	it('should pass message from errors when there is no validation message in schema', () => {
		// when
		render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget {...props} />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByText('This is not ok')).toBeVisible();
	});

	it("should render null when widgetId is 'hidden'", () => {
		// when
		const hidden = { ...schema, widget: 'hidden' };
		const { container } = render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget {...props} schema={hidden} />
			</WidgetContext.Provider>,
		);

		// then
		expect(container).toBeEmptyDOMElement();
	});

	it('should render widget when conditions are met', () => {
		// when
		const withConditions = {
			...schema,
			condition: {
				and: [
					{ in: [{ var: 'user.firstname' }, ['toto', 'my firstname']] },
					{ '==': [{ var: 'user.lastname' }, 'my lastname'] },
				],
			},
		};
		render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget {...props} schema={withConditions} />,
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByRole('textbox')).toHaveValue('my firstname');
	});

	it('should render null when conditions are not met', () => {
		// when
		const withConditions = {
			...schema,
			condition: {
				and: [
					{ in: [{ var: 'user.firstname' }, ['toto', 'my firstname']] },
					{ '==': [{ var: 'user.lastname' }, 'my lastname is not here'] },
				],
			},
		};
		const { container } = render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget {...props} schema={withConditions} />
			</WidgetContext.Provider>,
		);

		// then
		expect(container).toBeEmptyDOMElement();
	});

	it('should pass value updating status', () => {
		// when
		const { container } = render(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget {...props} updating={[schema.key.join('.')]} />
			</WidgetContext.Provider>,
		);

		// then
		expect(container.firstChild).toHaveClass('theme-updating');
		expect(container.firstChild).toHaveAttribute('aria-busy', 'true');
		expect(screen.getByRole('textbox')).toBeDisabled();
	});
});
