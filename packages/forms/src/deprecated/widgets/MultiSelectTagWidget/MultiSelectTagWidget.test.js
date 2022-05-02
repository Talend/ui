import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MultiSelectTagWidgetComponent } from './MultiSelectTagWidget';

describe('MultiSelectTagWidget', () => {
	it('should render tag and combobox', () => {
		// given
		const options = {
			enumOptions: [
				{
					value: 'foo-1',
					label: 'Foo',
				},
				{
					value: 'bar-1',
					label: 'Bar',
				},
			],
		};

		const value = ['foo-1'];

		const schema = {
			createIfNoneMatch: false,
			noAvailableMessage: 'None',
		};

		render(<MultiSelectTagWidgetComponent options={options} schema={schema} value={value} />);

		// then
		expect(screen.getByText('Foo')).toBeInTheDocument();
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('should display message when there is no items', () => {
		// given
		const options = {
			enumOptions: [
				{
					value: 'foo-1',
					label: 'Foo',
				},
				{
					value: 'bar-1',
					label: 'Bar',
				},
			],
		};

		const value = ['foo-1'];

		const schema = {
			createIfNoneMatch: false,
		};

		render(<MultiSelectTagWidgetComponent options={options} schema={schema} value={value} />);

		// when
		userEvent.click(screen.getByRole('textbox'));
		userEvent.type(screen.getByRole('textbox'), 'unknown');

		// then
		expect(screen.getByText('No result.')).toBeInTheDocument();
	});

	it('should render section title when items has category', () => {
		// given
		const options = {
			enumOptions: [
				{
					value: 'apple',
					label: {
						label: 'Apple',
						group: 'fruit',
					},
				},
				{
					value: 'dog',
					label: {
						label: 'Puppy',
						group: 'pet',
					},
				},
			],
			groupBy: 'group',
		};

		const value = ['apple'];

		const schema = {
			createIfNoneMatch: false,
		};

		// when
		render(<MultiSelectTagWidgetComponent options={options} schema={schema} value={value} />);
		userEvent.click(screen.getByRole('textbox'));

		// then
		expect(screen.queryByText('fruit')).not.toBeInTheDocument(); // all fruits are already in values so group is not displayed anymore
		expect(screen.getByText('pet')).toBeInTheDocument();
	});
});
