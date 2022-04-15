import React from 'react';
import { render, screen, fireEvent, queryByAttribute, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { actions, getMockData, getMockNestedData, initProps } from '../../__mocks__/data';
import UIForm from './UIForm.container';

jest.mock('ally.js');

describe('UIForm container', () => {
	let props;
	beforeEach(() => {
		props = initProps();
	});

	it('should render form', () => {
		// when
		render(<UIForm data={getMockData()} {...props} />);

		// then
		expect(
			screen.getByRole('textbox', { name: 'Last Name (with description)' }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('textbox', { name: 'First Name (with placeholder)' }),
		).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Check the thing' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
	});

	it('should render a custom tag', () => {
		// when
		const dom = render(
			<form>
				<UIForm data={getMockData()} {...props} as="div" />
			</form>,
		);

		// then
		// eslint-disable-next-line testing-library/no-container
		const customElementForm = dom.container.querySelector('div.tf-uiform');
		expect(customElementForm).toBeDefined();
	});

	it('should render form in text display mode', () => {
		// when
		render(
			<UIForm
				data={getMockData()}
				properties={{ lastname: 'toto' }}
				{...props}
				displayMode="text"
			/>,
		);

		// then
		expect(
			screen.queryByRole('textbox', { name: 'Last Name (with description)' }),
		).not.toBeInTheDocument();
		expect(screen.getByText('toto')).toBeInTheDocument();
	});

	it('should render form with ids concatenated with ; if nested', () => {
		// when
		render(<UIForm data={getMockNestedData()} {...props} idSeparator=";" />);

		// then
		expect(screen.getByLabelText('Content of the comment')).toHaveAttribute(
			'id',
			'myFormId;content',
		);
		expect(screen.getByLabelText('Published at')).toHaveAttribute('id', 'timestamp;value');
		expect(screen.getByLabelText('+ GMT offset')).toHaveAttribute('id', 'timestamp;gmt_offset');
	});

	it('should render provided actions', () => {
		// when
		render(<UIForm data={getMockData()} {...props} actions={actions} />);

		// then
		expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Disabled' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
		expect(screen.getByRole('button', { name: 'In progress (in progress)' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
	});

	it('should update if form data structure changed', () => {
		// given
		const { rerender } = render(<UIForm data={getMockData()} {...props} />);

		const newMockedData = getMockData();
		newMockedData.uiSchema = newMockedData.uiSchema.filter(({ key }) => key !== 'lastname');

		// when
		rerender(<UIForm data={newMockedData} {...props} />);

		// then
		expect(
			screen.queryByRole('textbox', { name: 'Last Name (with description)' }),
		).not.toBeInTheDocument();
		expect(
			screen.getByRole('textbox', { name: 'First Name (with placeholder)' }),
		).toBeInTheDocument();
	});

	it('should update data if properties change', () => {
		// given
		const { rerender } = render(<UIForm data={getMockData()} {...props} />);
		expect(screen.getByRole('textbox', { name: 'Last Name (with description)' })).toHaveValue('');

		const newMockedData = getMockData();
		newMockedData.properties = { lastname: 'toto' };

		// when
		rerender(<UIForm data={newMockedData} {...props} />);

		// then
		expect(screen.getByRole('textbox', { name: 'Last Name (with description)' })).toHaveValue(
			'toto',
		);
	});

	it('should reset data on new initial data', () => {
		// given
		const mockedData = getMockData();
		const { rerender } = render(<UIForm {...props} data={mockedData} initialData={{}} />);
		expect(screen.getByRole('textbox', { name: 'Last Name (with description)' })).toHaveValue('');

		const initialData = { ...mockedData, properties: { lastname: 'toto' } };

		// when
		rerender(<UIForm {...props} data={mockedData} initialData={initialData} />);

		// then
		expect(screen.getByRole('textbox', { name: 'Last Name (with description)' })).toHaveValue(
			'toto',
		);
	});

	it('should call onChange callback', () => {
		// given
		const onChange = jest.fn();
		render(<UIForm {...props} data={getMockData()} initialData={{}} onChange={onChange} />);

		// when
		userEvent.type(screen.getByRole('textbox', { name: 'Last Name (with description)' }), 'toto');

		// then
		const lastCall = onChange.mock.calls.pop();
		expect(lastCall[1].properties).toEqual({ lastname: 'toto' });
	});

	it('should reset', () => {
		// given
		const onReset = jest.fn();
		const mockedData = { ...getMockData(), properties: { lastname: 'toto' } };
		render(
			<UIForm
				{...props}
				data={mockedData}
				onReset={onReset}
				actions={[
					{
						bsStyle: 'secondary',
						label: 'Reset',
						type: 'reset',
						widget: 'button',
						position: 'left',
					},
				]}
			/>,
		);

		// when
		userEvent.type(screen.getByRole('textbox', { name: 'Last Name (with description)' }), 'coucou');
		userEvent.click(screen.getByRole('button', { name: 'Reset' }));

		// then
		expect(screen.getByRole('textbox', { name: 'Last Name (with description)' })).toHaveValue(
			'toto',
		);
		expect(onReset).toHaveBeenCalled();
	});

	it('should set error', () => {
		// given

		const onChange = jest.fn();
		const dom = render(<UIForm {...props} data={getMockData()} onChange={onChange} />);

		// when
		const lastnameInput = screen.getByRole('textbox', { name: 'Last Name (with description)' });
		userEvent.type(lastnameInput, 'toto'); // min length is 10
		fireEvent.blur(lastnameInput);

		// then
		// we need to get it like that because of the DS mock in ui-scripts :/
		// TODO: remove that when we remove the mock
		const errorMessage = queryByAttribute('id', dom.container, 'myFormId_lastname-error');
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveAttribute(
			'description',
			'String is too short (4 chars), minimum 10',
		);
	});

	it('should take customFormat for validation', async () => {
		// given
		const customFormats = {
			noABC: fieldData => {
				if (typeof fieldData === 'string' && !/^((?!abc).)*$/.test(fieldData)) {
					return 'test custom';
				}
				return null;
			},
		};

		const mockedData = getMockData();
		mockedData.jsonSchema.properties.lastname.format = 'noABC';
		const dom = render(<UIForm data={mockedData} {...props} customFormats={customFormats} />);

		// when
		const lastnameInput = screen.getByRole('textbox', { name: 'Last Name (with description)' });
		userEvent.type(lastnameInput, 'abc_qoskdoqskdoqsk');
		fireEvent.blur(lastnameInput);

		// then
		// we need to get it like that because of the DS mock in ui-scripts :/
		// TODO: remove that when we remove the mock
		const errorMessage = queryByAttribute('id', dom.container, 'myFormId_lastname-error');
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveAttribute('description', 'Format validation failed (test custom)');
	});

	it('should update errors from trigger', async () => {
		// given
		const errors = { firstname: 'my firstname is invalid' };
		const onTrigger = jest.fn(() => Promise.resolve({ errors }));
		const dom = render(<UIForm data={getMockData()} {...props} onTrigger={onTrigger} />);
		expect(onTrigger).not.toBeCalled();

		// when
		userEvent.click(screen.getByRole('button', { name: 'Check the thing' }));
		await waitFor(() => {
			const errorMessage = queryByAttribute('id', dom.container, 'myFormId_firstname-error');
			expect(errorMessage).toBeInTheDocument();
		});

		// then
		const errorMessage = queryByAttribute('id', dom.container, 'myFormId_firstname-error');
		expect(errorMessage).toHaveAttribute('description', 'my firstname is invalid');
	});

	it('should call onTrigger from button', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve({}));
		render(<UIForm data={getMockData()} {...props} onTrigger={onTrigger} />);
		expect(onTrigger).not.toBeCalled();

		// when
		userEvent.click(screen.getByRole('button', { name: 'Check the thing' }));

		// then
		expect(onTrigger).toBeCalledWith(expect.anything(), {
			errors: {},
			properties: {},
			schema: {
				key: ['check'],
				title: 'Check the thing',
				triggers: ['after'],
				widget: 'button',
			},
			trigger: 'after',
		});
	});

	it('should call onTrigger from input type finish', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve({}));
		render(<UIForm data={getMockData()} {...props} onTrigger={onTrigger} />);
		expect(onTrigger).not.toBeCalled();

		// when
		const firstnameInput = screen.getByRole('textbox', { name: 'First Name (with placeholder)' });
		userEvent.type(firstnameInput, 'aze');
		fireEvent.blur(firstnameInput);

		// then
		expect(onTrigger).toBeCalledWith(expect.anything(), {
			errors: {},
			properties: { firstname: 'aze' },
			schema: expect.anything(),
			trigger: 'after',
		});
	});

	it('should handle submit mouse enter/leave callbacks', () => {
		// given
		const onEnter = jest.fn();
		const onLeave = jest.fn();
		render(
			<UIForm data={getMockData()} {...props} onSubmitEnter={onEnter} onSubmitLeave={onLeave} />,
		);
		expect(onEnter).not.toBeCalled();
		expect(onLeave).not.toBeCalled();

		// when / then
		userEvent.hover(screen.getByRole('button', { name: 'Submit' }));
		expect(onEnter).toBeCalled();

		// when / then
		userEvent.unhover(screen.getByRole('button', { name: 'Submit' }));
		expect(onLeave).toBeCalled();
	});

	it('should validate all fields on submit', async () => {
		// given
		const onSubmit = jest.fn();
		const onTrigger = jest.fn(() =>
			Promise.resolve({ errors: { check: 'error added via a trigger' } }),
		);
		const dom = render(
			<UIForm data={getMockData()} {...props} onSubmit={onSubmit} onTrigger={onTrigger} />,
		);

		// when
		userEvent.click(screen.getByRole('button', { name: 'Check the thing' })); // add error via trigger
		await waitFor(() => {
			const checkMessage = queryByAttribute('id', dom.container, 'myFormId_check-error');
			expect(checkMessage).toBeInTheDocument();
		});
		userEvent.click(screen.getByRole('button', { name: 'Submit' }));

		// then
		expect(onSubmit).not.toBeCalled();
		// new error via validation on submit
		const errorMessage = queryByAttribute('id', dom.container, 'myFormId_firstname-error');
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveAttribute('description', 'Missing required field');
		expect(screen.getByRole('textbox', { name: 'First Name (with placeholder)' })).toHaveFocus();
		// preserve old error added via trigger
		const checkMessage = queryByAttribute('id', dom.container, 'myFormId_check-error');
		expect(checkMessage).toBeInTheDocument();
		expect(checkMessage).toHaveAttribute('description', 'error added via a trigger');
	});

	it('should should take custom language error messages', () => {
		// given
		const onSubmit = jest.fn();
		const dom = render(
			<UIForm
				data={getMockData()}
				{...props}
				onSubmit={onSubmit}
				language={{ OBJECT_REQUIRED: 'is required' }}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('button', { name: 'Submit' }));

		// then
		expect(onSubmit).not.toBeCalled();
		const errorMessage = queryByAttribute('id', dom.container, 'myFormId_firstname-error');
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveAttribute('description', 'is required');
	});

	it('should submit with valid fields', () => {
		// given
		const onSubmit = jest.fn();
		const onTrigger = jest.fn(() => Promise.resolve({}));
		render(<UIForm data={getMockData()} {...props} onTrigger={onTrigger} onSubmit={onSubmit} />);

		// when
		userEvent.type(
			screen.getByRole('textbox', { name: 'Last Name (with description)' }),
			'long enough text',
		);
		userEvent.type(screen.getByRole('textbox', { name: 'First Name (with placeholder)' }), 'toto');
		userEvent.click(screen.getByRole('button', { name: 'Submit' }));

		// then
		expect(onSubmit).toBeCalledWith(
			expect.anything(),
			{
				firstname: 'toto',
				lastname: 'long enough text',
			},
			expect.anything(),
		);
	});
});
