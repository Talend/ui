import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';
import addSchemaMock from './ComponentForm.test.schema.json';

import { toJS, resolveNameForTitleMap, TCompForm } from './ComponentForm.component';

jest.mock('./kit', () => ({
	createTriggers({ url, customRegistry, security }) {
		function trigger() {
			trigger.isCalled = true;
			return Promise.resolve(trigger.data || {});
		}
		trigger.mockInfo = { url, customRegistry, security };
		trigger.mockReturnWith = function mockReturnWith(data) {
			this.data = data;
		};
		return trigger;
	},
}));

describe('ComponentForm', () => {
	describe('#toJS', () => {
		it('should return null for no object', () => {
			// when
			const result = toJS();

			// then
			expect(result).toBe(null);
		});

		it('should return js object', () => {
			// given
			const immutableObject = new Map({ a: 1, b: 2 });

			// when
			const result = toJS(immutableObject);

			// then
			expect(result).toEqual({ a: 1, b: 2 });
		});
	});

	describe('#resolveNameForTitleMap', () => {
		it('should do nothing when there is no titleMap', () => {
			// given
			const schema = {
				key: ['my', 'awesome', 'value'],
			};
			const properties = { my: { awesome: { value: 'correct value' } } };
			const value = 'my awesome value';

			// when
			resolveNameForTitleMap({ schema, properties, value });

			// then
			expect(properties.my.awesome).toEqual({ value: 'correct value' });
		});

		it('should add titleMap entry name', () => {
			// given
			const schema = {
				key: ['my', 'awesome', 'value'],
				titleMap: [
					{
						name: 'Not this one',
						value: 'no',
					},
					{
						name: 'Neither this one',
						value: 'neither',
					},
					{
						name: 'Yes this is the name',
						value: 'correct value',
					},
				],
			};
			const properties = { my: { awesome: { value: 'correct value' } } };
			const value = 'correct value';

			// when
			resolveNameForTitleMap({ schema, properties, value });

			// then
			expect(properties.my.awesome).toEqual({
				value: 'correct value',
				$value_name: 'Yes this is the name',
			});
		});

		it('should add titleMap entry name for array', () => {
			// given
			const schema = {
				key: ['my', 'awesome', 'value'],
				titleMap: [
					{
						name: 'Not this one',
						value: 'no',
					},
					{
						name: 'Neither this one',
						value: 'neither',
					},
					{
						name: 'Yes this is the name',
						value: 'correct value',
					},
				],
			};
			const properties = { my: { awesome: { value: ['correct value', 'neither'] } } };
			const value = ['correct value', 'neither'];

			// when
			resolveNameForTitleMap({ schema, properties, value });

			// then
			expect(properties.my.awesome).toEqual({
				value: ['correct value', 'neither'],
				$value_name: ['Yes this is the name', 'Neither this one'],
			});
		});

		it('should remove titleMap entry name when there is no value anymore', () => {
			// given
			const schema = {
				key: ['my', 'awesome', 'value'],
				titleMap: [
					{
						name: 'Not this one',
						value: 'no',
					},
				],
			};
			const properties = { my: { awesome: { value: '', $value_name: 'Not this one' } } };
			const value = '';

			// when
			resolveNameForTitleMap({ schema, properties, value });

			// then
			expect(properties.my.awesome).toEqual({ value: '' });
		});

		it('should add multi sections titleMap entry name', () => {
			// given
			const schema = {
				key: ['my', 'awesome', 'value'],
				titleMap: [
					{
						title: 'First section',
						suggestions: [
							{
								name: 'Not this one',
								value: 'no',
							},
							{
								name: 'Neither this one',
								value: 'neither',
							},
							{
								name: 'Yes this is the name',
								value: 'correct value',
							},
						],
					},
					{
						title: 'Second section',
						suggestions: [
							{
								name: 'Nope, really',
								value: 'nope',
							},
							{
								name: 'It is a no no',
								value: 'nono',
							},
							{
								name: 'Sadly not me',
								value: 'notme',
							},
						],
					},
				],
			};
			const properties = { my: { awesome: { value: 'correct value' } } };
			const value = 'correct value';

			// when
			resolveNameForTitleMap({ schema, properties, value });

			// then
			expect(properties.my.awesome).toEqual({
				value: 'correct value',
				$value_name: 'Yes this is the name',
			});
		});

		it('should add multi sections titleMap entry name for array', () => {
			// given
			const schema = {
				key: ['my', 'awesome', 'value'],
				titleMap: [
					{
						title: 'First section',
						suggestions: [
							{
								name: 'Not this one',
								value: 'no',
							},
							{
								name: 'Neither this one',
								value: 'neither',
							},
							{
								name: 'Yes this is the name',
								value: 'correct value',
							},
						],
					},
					{
						title: 'Second section',
						suggestions: [
							{
								name: 'Nope, really',
								value: 'nope',
							},
							{
								name: 'Yeah, me',
								value: 'me',
							},
							{
								name: 'Sadly not me',
								value: 'notme',
							},
						],
					},
				],
			};
			const properties = { my: { awesome: { value: ['correct value', 'me'] } } };
			const value = ['correct value', 'me'];

			// when
			resolveNameForTitleMap({ schema, properties, value });

			// then
			expect(properties.my.awesome).toEqual({
				value: ['correct value', 'me'],
				$value_name: ['Yes this is the name', 'Yeah, me'],
			});
		});

		it('should remove multi sections titleMap entry name when there is no value anymore', () => {
			// given
			const schema = {
				key: ['my', 'awesome', 'value'],
				titleMap: [
					{
						title: 'First section',
						suggestions: [
							{
								name: 'Not this one',
								value: 'no',
							},
							{
								name: 'Neither this one',
								value: 'neither',
							},
						],
					},
					{
						title: 'Second section',
						suggestions: [
							{
								name: 'Nope, really',
								value: 'nope',
							},
							{
								name: 'Sadly not me',
								value: 'notme',
							},
						],
					},
				],
			};
			const properties = { my: { awesome: { value: '', $value_name: 'Sadly not me' } } };
			const value = '';

			// when
			resolveNameForTitleMap({ schema, properties, value });

			// then
			expect(properties.my.awesome).toEqual({ value: '' });
		});
	});

	describe('#render', () => {
		it("should render a CircularProgress when we don't have the schema", () => {
			// given
			const state = new Map({});

			// when
			const wrapper = shallow(<TCompForm state={state} />);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a response status', () => {
			// given
			const state = fromJS({ response: { statusText: 'we had an error' } });

			// when
			const wrapper = shallow(<TCompForm state={state} />);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a UIForm', () => {
			// given
			const state = fromJS(addSchemaMock.ui);

			// when
			const wrapper = shallow(<TCompForm state={state} />);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should memoize uiSpecs', () => {
			// given
			const state = fromJS(addSchemaMock.ui);

			const wrapper = shallow(<TCompForm state={state} />);
			const jsonSchema = wrapper.props().jsonSchema;
			const uiSchema = wrapper.props().uiSchema;

			// when
			wrapper.instance().forceUpdate();
			wrapper.update();

			// then
			expect(wrapper.props().jsonSchema).toBe(jsonSchema);
			expect(wrapper.props().uiSchema).toBe(uiSchema);
		});
	});

	describe('#security', () => {
		it('should pass security props to createTrigger', () => {
			const state = fromJS(addSchemaMock.ui);
			const wrapper = shallow(
				<TCompForm
					state={state}
					triggerURL="http://trigger"
					CSRFTokenCookieKey="fooCookie"
					CSRFTokenHeaderKey="fooHeader"
				/>,
			);
			const trigger = wrapper.instance().trigger;
			expect(trigger).toBeDefined();
			expect(trigger.mockInfo.security.CSRFTokenCookieKey).toBe('fooCookie');
			expect(trigger.mockInfo.security.CSRFTokenHeaderKey).toBe('fooHeader');
		});
	});
	describe('#update', () => {
		it('should recreate trigger if triggerURL or customTriggers props change', () => {
			// given
			const state = fromJS(addSchemaMock.ui);
			const oldTriggerURL = 'http://old';
			const newTriggerURL = 'http://new';
			const oldCustomTriggers = { oldCustomReload: () => {} };
			const newCustomTriggers = { newCustomReload: () => {} };

			const wrapper = shallow(
				<TCompForm state={state} triggerURL={oldTriggerURL} customTriggers={oldCustomTriggers} />,
			);
			const oldTrigger = wrapper.instance().trigger;
			expect(oldTrigger).toBeDefined();
			expect(oldTrigger.mockInfo.url).toBe(oldTriggerURL);
			expect(oldTrigger.mockInfo.customRegistry.oldCustomReload).toBeDefined();

			// when
			wrapper.setProps({ triggerURL: newTriggerURL });

			// then
			const newTrigger = wrapper.instance().trigger;
			expect(newTrigger).toBeDefined();
			expect(newTrigger.mockInfo.url).toBe(newTriggerURL);
			expect(newTrigger.mockInfo.customRegistry.oldCustomReload).toBeDefined();

			// when
			wrapper.setProps({ customTriggers: newCustomTriggers });

			// then
			const evenNewerTrigger = wrapper.instance().trigger;
			expect(evenNewerTrigger).toBeDefined();
			expect(evenNewerTrigger.mockInfo.url).toBe(newTriggerURL);
			expect(evenNewerTrigger.mockInfo.customRegistry.oldCustomReload).not.toBeDefined();
			expect(evenNewerTrigger.mockInfo.customRegistry.newCustomReload).toBeDefined();
		});

		it('should dispatch new definitionURL props', () => {
			// given
			const state = fromJS(addSchemaMock.ui);
			const dispatch = jest.fn();
			const oldUrl = 'http://old';
			const newUrl = 'http://new';
			const componentState = { properties: { name: 'old' } };

			// when
			const wrapper = shallow(
				<TCompForm state={state} definitionURL={oldUrl} dispatch={dispatch} />,
			);
			wrapper.setState(componentState);
			wrapper.setProps({ definitionURL: newUrl });

			// then
			expect(dispatch).toBeCalledWith({
				definitionURL: newUrl,
				dispatch,
				state,
				type: TCompForm.ON_DEFINITION_URL_CHANGED,
				...componentState,
			});
		});
	});

	describe('events', () => {
		const state = fromJS({ ...addSchemaMock.ui, initialState: addSchemaMock.ui });

		// extract type field schema
		const typeSchema = {
			...addSchemaMock.ui.uiSchema[0].items[1],
			key: ['_datasetMetadata', 'type'],
		};
		const selectedType = typeSchema.titleMap[0];

		// onChange parameters: simulate change on type field
		const event = { target: {}, persist: jest.fn() };
		const changePayload = {
			schema: typeSchema,
			properties: {
				_datasetMetadata: {
					type: selectedType.value,
				},
			},
			value: selectedType.value,
		};

		describe('#onChange', () => {
			it('should dispatch dirty state', () => {
				// given
				const setState = jest.fn();
				const wrapper = shallow(<TCompForm state={state} setState={setState} />);

				// when
				wrapper.instance().onChange(event, changePayload);

				// then
				expect(setState).toBeCalledWith({ dirty: true });
			});

			it('should NOT dispatch dirty state if it is already dirty', () => {
				// given
				const dirtyState = fromJS({
					...addSchemaMock.ui,
					dirty: true,
				});
				const setState = jest.fn();
				const wrapper = shallow(<TCompForm state={dirtyState} setState={setState} />);

				// when
				wrapper.instance().onChange(event, changePayload);

				// then
				expect(setState).not.toBeCalled();
			});

			it('should set form data in state', () => {
				// given
				const setState = jest.fn();
				const wrapper = shallow(<TCompForm state={state} setState={setState} />);

				// when
				wrapper.instance().onChange(event, changePayload);

				// then
				expect(wrapper.state()).toEqual({
					properties: {
						_datasetMetadata: {
							type: selectedType.value,
							$type_name: selectedType.name,
						},
					},
				});
			});

			it('should dispatch change', () => {
				// given
				const setState = jest.fn();
				const dispatch = jest.fn();
				const componentId = 'MyComponentId';
				const wrapper = shallow(
					<TCompForm
						componentId={componentId}
						state={state}
						setState={setState}
						dispatch={dispatch}
						dispatchOnChange
					/>,
				);

				// when
				wrapper.instance().onChange(event, changePayload);

				// then
				const args = dispatch.mock.calls[0][0];
				expect(args.type).toBe(TCompForm.ON_CHANGE);
				expect(args.component).toBe(TCompForm.displayName);
				expect(args.componentId).toBe(componentId);
				expect(args.event).toBe(undefined);
				expect(args.schema).toBe(changePayload.schema);
				expect(args.value).toBe(changePayload.value);
				expect(args.properties).toBe(changePayload.properties);
			});
		});

		describe('#onTrigger', () => {
			it('should call kit trigger', () => {
				// given
				const wrapper = shallow(<TCompForm state={state} dispatch={jest.fn()} />);
				const trigger = wrapper.instance().trigger;
				expect(trigger.isCalled).toBeFalsy();

				// when
				wrapper.instance().onTrigger(event, changePayload);

				// then
				expect(trigger.isCalled).toBe(true);
			});

			it('should set cmf state with schemas', () => {
				// given
				const setState = jest.fn();
				const wrapper = shallow(
					<TCompForm state={state} setState={setState} dispatch={jest.fn()} />,
				);
				const trigger = wrapper.instance().trigger;
				const data = {
					jsonSchema: addSchemaMock.ui.jsonSchema,
					uiSchema: addSchemaMock.ui.uiSchema,
				};
				trigger.mockReturnWith(data);

				// when
				return wrapper
					.instance()
					.onTrigger(event, changePayload)
					.then(() => {
						expect(setState).toBeCalledWith(data);
					});
			});
		});

		describe('#onSubmit', () => {
			it('should dispatch submit action', () => {
				// given
				const payload = {
					$datasetMetadata: {
						type: selectedType.value,
					},
				};
				const dispatch = jest.fn();
				const componentId = 'MyComponentId';
				const wrapper = shallow(
					<TCompForm componentId={componentId} state={state} dispatch={dispatch} />,
				);

				// when
				wrapper.instance().onSubmit(event, payload);

				// then
				const args = dispatch.mock.calls[0][0];
				expect(args.type).toBe(TCompForm.ON_SUBMIT);
				expect(args.component).toBe(TCompForm.displayName);
				expect(args.componentId).toBe(componentId);
				expect(args.event).toBe(undefined);
				expect(args.properties).toEqual(payload);
			});
		});

		describe('#onReset', () => {
			it('should reset form state', () => {
				// given
				const setState = jest.fn();
				const dispatch = jest.fn();
				const componentId = 'MyComponentId';
				const wrapper = shallow(
					<TCompForm
						componentId={componentId}
						setState={setState}
						state={state}
						dispatch={dispatch}
					/>,
				);

				// when
				wrapper.instance().onChange(event, changePayload);

				// change state
				expect(wrapper.state()).toEqual({
					properties: {
						_datasetMetadata: {
							type: selectedType.value,
							$type_name: selectedType.name,
						},
					},
				});
				// when
				wrapper.instance().onReset();

				// change state back to initial state provided by addSchemaMock.ui
				// with dirty set to false since the form got reseted
				expect(wrapper.state()).toEqual({
					properties: {
						_datasetMetadata: {},
					},
				});
			});
		});
	});
});
