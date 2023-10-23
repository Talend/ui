import { screen, render } from '@testing-library/react';

import RadioOrSelect from './RadioOrSelect.component';

jest.unmock('@talend/design-system');

describe('RadioOrSelect field', () => {
	const schema = {
		description: 'Select me',
		placeholder: 'Please select a value',
		schema: {
			enum: ['foo', 'bar', 'lol'],
			type: 'string',
		},
		title: 'My Select title',
		titleMap: [
			{ name: 'My foo title', value: 'foo' },
			{ name: 'My bar title', value: 'bar' },
		],
	};

	it('should render select when titleMap has less than 2 options', () => {
		// when
		const { container } = render(
			<RadioOrSelect
				id="myRadioOrSelect"
				isValid
				errorMessage="My Error Message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value="foo"
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getAllByRole('radio')).toHaveLength(2);
		expect(screen.getAllByRole('radio')[0].nextSibling).toHaveTextContent('My foo title');
		expect(screen.getAllByRole('radio')[1].nextSibling).toHaveTextContent('My bar title');
		expect(screen.getByText('My Select title').tagName).toBe('LABEL');
		expect(screen.getByRole('status')).toHaveTextContent('Select me');
	});

	it('should render select when titleMap has more than 2 options', () => {
		// given
		const moreThan2OptionsSchema = {
			...schema,
			titleMap: [...schema.titleMap, { name: 'My lol title', value: 'lol' }],
		};

		// when
		render(
			<RadioOrSelect
				id="myRadioOrSelect"
				isValid
				errorMessage="My Error Message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={moreThan2OptionsSchema}
				value="lol"
			/>,
		);

		// then
		expect(screen.getAllByRole('option')).toHaveLength(4);
		expect(screen.getAllByRole('option')[1]).toHaveTextContent('My foo title');
		expect(screen.getAllByRole('option')[2]).toHaveTextContent('My bar title');
		expect(screen.getAllByRole('option')[3]).toHaveTextContent('My lol title');
	});
});
