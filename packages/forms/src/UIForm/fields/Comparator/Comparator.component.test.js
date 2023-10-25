import { render, screen } from '@testing-library/react';

import Comparator from './Comparator.component';
import { WidgetContext } from '../../context';

jest.unmock('@talend/design-system');

describe('Comparator field', () => {
	const widgets = {
		text: () => <div>Text</div>,
	};
	const props = {
		onChange: jest.fn(),
		onFinish: jest.fn(),
		id: 'default',
		schema: {
			key: ['default'],
			widget: 'comparator',
			title: 'Default comparator',
			schema: {
				type: 'object',
				required: ['value'],
				properties: {
					operator: { type: 'string', enum: ['greater_than', 'less_than', 'equals'] },
					value: { type: 'string' },
				},
			},
			type: 'fieldset',
			items: [
				{
					title: 'operator',
					schema: { type: 'string', enum: ['>', '<', '='] },
					key: ['default', 'operator'],
					type: 'select',
					titleMap: [
						{ name: 'Greater than', value: 'greater_than' },
						{ name: 'Less than', value: 'less_than' },
						{ name: 'Equals', value: 'equals' },
					],
				},
				{
					title: 'value',
					required: true,
					schema: { type: 'string' },
					key: ['default', 'value'],
					type: 'text',
				},
			],
		},
		errors: {},
		widgets: {},
		isValid: true,
		value: [],
	};

	it('should render default Comparator', () => {
		// when
		const { container } = render(
			<WidgetContext.Provider value={widgets}>
				<Comparator {...props} />
			</WidgetContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render disabled Comparator', () => {
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
				<Comparator {...disabledProps} />
			</WidgetContext.Provider>,
		);

		// then
		expect(screen.getByRole('button')).toBeDisabled();
	});
});
