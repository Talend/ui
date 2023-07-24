import { screen, render } from '@testing-library/react';

import { WidgetContext } from '../../context';
import KeyValue from './KeyValue.component';

jest.mock('ally.js');
jest.unmock('@talend/design-system');

const widgets = {
	text: props => (
		<div
			aria-disabled={props.schema.disabled}
			data-testid={`widget-text-${props.id}`}
			id={props.id}
			data-props={JSON.stringify(props)}
		>
			{props.schema.key.join('-')}
		</div>
	),
	number: props => (
		<div
			aria-disabled={props.schema.disabled}
			data-testid={`widget-number-${props.id}`}
			id={props.id}
			data-props={JSON.stringify(props)}
		>
			{props.schema.key.join('-')}
		</div>
	),
};

describe('KeyValue field', () => {
	const props = {
		id: 'my-key-value-field',
		errorId: 'my-key-value-field-error',
		descriptionId: 'my-key-value-field-description',
		isValid: true,
		errorMessage: 'This is wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		errors: {},
		schema: {
			autoFocus: false,
			description: 'This is the key/value field',
			disabled: false,
			key: ['infos', 'variable'],
			readOnly: false,
			title: 'Variable',
		},
		value: { key: 'lol', value: 'mdr' },
	};

	it('should render default KeyValue', () => {
		// when
		const { container } = render(
			<WidgetContext.Provider value={widgets}>
				<KeyValue {...props} />
			</WidgetContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render disabled KeyValue', () => {
		// given
		const disabledProps = {
			...props,
			schema: {
				...props.schema,
				disabled: true,
			},
		};

		// when
		render(
			<WidgetContext.Provider value={widgets}>
				<KeyValue {...disabledProps} />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByText('infos-variable-key')).toHaveAttribute('aria-disabled', 'true');
		expect(screen.getByText('infos-variable-value')).toHaveAttribute('aria-disabled', 'true');
	});

	it('should render readOnly KeyValue', () => {
		// given
		const readOnlyProps = {
			...props,
			schema: {
				...props.schema,
				readOnly: true,
			},
		};

		// when
		render(
			<WidgetContext.Provider value={widgets}>
				<KeyValue {...readOnlyProps} />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByRole('term')).toHaveTextContent('infos-variable-key');
		expect(screen.getByRole('definition')).toHaveTextContent('infos-variable-value');
	});

	it('should render autoFocused KeyValue', () => {
		// given
		const autoFocusProps = {
			...props,
			schema: {
				...props.schema,
				autoFocus: true,
			},
		};

		// when
		render(
			<WidgetContext.Provider value={widgets}>
				<KeyValue {...autoFocusProps} />
			</WidgetContext.Provider>,
		);

		// then dumb stuff happens we have autofocus on two fields
		const kprops = JSON.parse(screen.getByTestId('widget-text-infos_variable_key').dataset.props);
		const vprops = JSON.parse(screen.getByTestId('widget-text-infos_variable_value').dataset.props);
		expect(kprops.schema.autoFocus).toBe(true);
		expect(vprops.schema.autoFocus).toBe(true);
	});

	it('should render customized KeyValue', () => {
		// given
		const cProps = {
			...props,
			schema: {
				...props.schema,
				items: [
					{
						key: props.schema.key.concat('key'),
						autoFocus: true,
						readOnly: true,
						required: true,
						schema: { type: 'number' },
						type: 'number',
					},
				],
			},
		};

		// when
		render(
			<WidgetContext.Provider value={widgets}>
				<KeyValue {...cProps} />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByTestId('widget-number-infos_variable_key')).toHaveTextContent(
			'infos-variable-key',
		);
	});
});
