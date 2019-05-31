import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TooltipTrigger } from '@talend/react-components';

import Widget from './Widget.component';
import widgets from '../utils/widgets';
import { UIFormContext } from '../context';

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children, valueUpdater = val => val }) => {
	const properties = {
		user: {
			firstname: 'my firstname',
			lastname: 'my lastname',
		},
		comment: '',
	};
	const value = valueUpdater({
		id: 'myForm',
		onChange: jest.fn('onChange'),
		onFinish: jest.fn('onFinish'),
		onTrigger: jest.fn('onTrigger'),
		state: { properties, errors: {} },
		widgets,
	});
	return <UIFormContext.Provider value={value}>{children}</UIFormContext.Provider>;
};

describe('Widget component', () => {
	const schema = {
		key: ['user', 'firstname'],
		type: 'text',
	};

	const customWidgets = {
		...widgets,
		customWidget: () => <div>my widget</div>,
		customWidget_text: () => <div>my widget in text display mode</div>,
	};

	it('should render widget', () => {
		// when
		const wrapper = mount(
			<ContextProvider>
				<Widget schema={schema} />
			</ContextProvider>,
		);

		// then
		expect(toJson(wrapper.find('Widget > *'))).toMatchSnapshot();
	});

	it('should wrapper widget into a tooltip trigger', () => {
		const wrapper = mount(
			<ContextProvider>
				<Widget schema={{ ...schema, tooltip: 'example tooltip' }} />
			</ContextProvider>,
		);

		expect(wrapper.find(TooltipTrigger).length).toBe(1);
	});

	it('should render widget with the specific displayMode', () => {
		// when
		const wrapper = mount(
			<ContextProvider valueUpdater={value => ({ ...value, displayMode: 'text' })}>
				<Widget schema={schema} />
			</ContextProvider>,
		);

		// then
		expect(toJson(wrapper.find('Widget > *'))).toMatchSnapshot();
	});

	it('should render nothing if widget does not exist', () => {
		// given
		const unknownWidgetSchema = { ...schema, type: 'unknown' };

		// when
		const wrapper = mount(
			<ContextProvider>
				<Widget schema={unknownWidgetSchema} />
			</ContextProvider>,
		);

		// then
		expect(toJson(wrapper.find('Widget > *'))).toMatchSnapshot();
	});

	it('should render custom widget', () => {
		// given
		const customWidgetSchema = {
			...schema,
			type: 'customWidget',
		};

		// when
		const wrapper = mount(
			<ContextProvider valueUpdater={value => ({ ...value, widgets: customWidgets })}>
				<Widget schema={customWidgetSchema} />
			</ContextProvider>,
		);

		// then
		expect(wrapper.find('customWidget').length).toBe(1);
	});

	it('should pass validation message from schema over message from errors', () => {
		// given
		const errors = { 'user,firstname': 'This is not ok' };
		const customValidationMessageSchema = {
			...schema,
			validationMessage: 'My custom validation message',
		};

		// when
		const wrapper = mount(
			<ContextProvider valueUpdater={value => ({ ...value, state: { ...value.state, errors } })}>
				<Widget schema={customValidationMessageSchema} />
			</ContextProvider>,
		);

		// then
		expect(
			wrapper
				.find('.has-error .help-block')
				.last()
				.text(),
		).toBe('My custom validation message');
	});

	it('should pass message from errors when there is no validation message in schema', () => {
		// given
		const errors = { 'user,firstname': 'This is not ok' };

		// when
		const wrapper = mount(
			<ContextProvider valueUpdater={value => ({ ...value, state: { ...value.state, errors } })}>
				<Widget schema={schema} />
			</ContextProvider>,
		);

		// then
		expect(
			wrapper
				.find('.has-error .help-block')
				.last()
				.text(),
		).toBe('This is not ok');
	});

	it("should render null when widgetId is 'hidden'", () => {
		// given
		const hidden = { ...schema, widget: 'hidden' };

		// when
		const wrapper = mount(
			<ContextProvider>
				<Widget schema={hidden} />
			</ContextProvider>,
		);

		// then
		expect(wrapper.find('Widget > Text').length).toBe(0);
	});

	it('should render widget when conditions are met', () => {
		// given
		const withConditions = {
			...schema,
			condition: {
				and: [
					{ in: [{ var: 'user.firstname' }, ['toto', 'my firstname']] },
					{ '==': [{ var: 'user.lastname' }, 'my lastname'] },
				],
			},
		};

		// when
		const wrapper = mount(
			<ContextProvider>
				<Widget schema={withConditions} />
			</ContextProvider>,
		);

		// then
		expect(wrapper.find('Widget > Text').length).toBe(1);
	});

	it('should render null when conditions are not met', () => {
		// given
		const withConditions = {
			...schema,
			condition: {
				and: [
					{ in: [{ var: 'user.firstname' }, ['toto', 'my firstname']] },
					{ '==': [{ var: 'user.lastname' }, 'my lastname is not here'] },
				],
			},
		};

		// when
		const wrapper = mount(
			<ContextProvider>
				<Widget schema={withConditions} />
			</ContextProvider>,
		);

		// then
		expect(wrapper.find('Widget > Text').length).toBe(0);
	});

	it('should pass value updating status', () => {
		// when
		const wrapper = mount(
			<ContextProvider valueUpdater={value => ({ ...value, updating: [schema.key.join('.')] })}>
				<Widget schema={schema} />
			</ContextProvider>,
		);

		// then
		expect(wrapper.find('Widget > Text').prop('valueIsUpdating')).toBe(true);
	});
});
