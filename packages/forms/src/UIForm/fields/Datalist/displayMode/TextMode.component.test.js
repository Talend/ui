import { render, screen } from '@testing-library/react';

import DatalistTextMode from './TextMode.component';

jest.unmock('@talend/design-system');
const schema = {
	title: 'My List',
	titleMap: [
		{ name: 'Foo', value: 'foo' },
		{ name: 'Bar', value: 'bar' },
		{ name: 'Lol', value: 'lol' },
	],
	type: 'string',
	schema: {
		type: 'string',
	},
};
const schemaWithGroups = {
	title: 'Datalist with groups',
	type: 'string',
	schema: {
		type: 'string',
	},
	options: {
		isMultiSection: true,
		titleMap: [
			{ title: 'Foo group', suggestions: [{ name: 'Foo', value: 'foo' }] },
			{ title: 'Bar group', suggestions: [{ name: 'Bar', value: 'bar' }] },
			{ title: 'Lol group', suggestions: [{ name: 'Lol', value: 'lol' }] },
		],
	},
};

describe('Datalist component in text display mode', () => {
	it('should render', () => {
		// when
		const { container } = render(<DatalistTextMode id="my-datalist" schema={schema} value="foo" />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should call onTrigger on mount', () => {
		// given
		const data = { titleMap: [{ name: 'Foo', value: 'foo' }] };
		const props = {
			onTrigger: jest.fn(
				() =>
					new Promise(resolve => {
						return resolve(data);
					}),
			),
			schema: {
				type: 'string',
				schema: {
					type: 'string',
				},
				triggers: [
					{
						onEvent: 'focus',
					},
				],
			},
		};

		// when
		render(<DatalistTextMode {...props} value="foo" />);

		// then
		expect(props.onTrigger).toHaveBeenCalledWith(null, {
			trigger: props.schema.triggers[0],
			schema: props.schema,
			errors: props.errors,
			properties: props.properties,
		});
		expect(screen.getByRole('definition')).toHaveTextContent('foo (loading labels)');
	});
	it('should show name in text mode when have groups', () => {
		// when
		render(<DatalistTextMode id="my-datalist-with-groups" schema={schemaWithGroups} value="foo" />);

		// then
		expect(screen.getByRole('definition')).toHaveTextContent('Foo');
	});
});
