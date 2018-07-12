import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';
import addSchemaMock from '../../../mock/add';

import {
	toJS,
	resolveNameForTitleMap,
	keepOnlyDatasetMetadataProperties,
	TCompForm,
} from './ComponentForm.component';

jest.mock('component-kit.js', () => ({
	createTriggers({ url, customRegistry }) {
		function trigger() {
			trigger.isCalled = true;
			return Promise.resolve(trigger.data || {});
		}
		trigger.mockInfo = { url, customRegistry };
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
	});

	describe('#keepOnlyDatasetMetadataProperties', () => {
		it('should only keep dataset metadata', () => {
			// given
			const body = { jsonSchema: {}, uiSchema: [] };
			const properties = { _datasetMetadata: { type: 'lol' }, other: 'mdr', another_one: 'ptdr' };

			// when
			const result = keepOnlyDatasetMetadataProperties({ body, properties });

			// then
			expect(result).toEqual({
				jsonSchema: {},
				uiSchema: [],
				properties: { _datasetMetadata: { type: 'lol' } },
			});
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
			const state = fromJS({
				...addSchemaMock.ui,
				errors: { key: 'This is wrong' },
			});

			// when
			const wrapper = shallow(<TCompForm state={state} />);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should memoize uiSpecs and errors', () => {
			// given
			const state = fromJS({
				...addSchemaMock.ui,
				errors: { key: 'This is wrong' },
			});

			const wrapper = shallow(<TCompForm state={state} />);
			const jsonSchema = wrapper.props().jsonSchema;
			const uiSchema = wrapper.props().uiSchema;
			const errors = wrapper.props().errors;

			// when
			wrapper.instance().forceUpdate();
			wrapper.update();

			// then
			expect(wrapper.props().jsonSchema).toBe(jsonSchema);
			expect(wrapper.props().uiSchema).toBe(uiSchema);
			expect(wrapper.props().errors).toBe(errors);
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

			// when
			const wrapper = shallow(
				<TCompForm state={state} definitionURL={oldUrl} dispatch={dispatch} />,
			);
			wrapper.setProps({ definitionURL: newUrl });

			// then
			expect(dispatch).toBeCalledWith({
				type: TCompForm.ON_DEFINITION_URL_CHANGED,
				state,
				definitionURL: newUrl,
				dispatch,
			});
		});
	});

	describe('events', () => {
		const state = fromJS(addSchemaMock.ui);

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
				const wrapper = shallow(
					<TCompForm state={state} setState={setState} dispatch={dispatch} dispatchOnChange />,
				);

				// when
				wrapper.instance().onChange(event, changePayload);

				// then
				const args = dispatch.mock.calls[0][0];
				expect(args.type).toBe(TCompForm.ON_CHANGE);
				expect(args.component).toBe(TCompForm.displayName);
				expect(args.event).toBe(event);
				expect(args.schema).toBe(changePayload.schema);
				expect(args.value).toBe(changePayload.value);
				expect(args.properties).toBe(changePayload.properties);
			});
		});

		describe('#onTrigger', () => {
			it('should call component-kit trigger', () => {
				// given
				const wrapper = shallow(<TCompForm state={state} />);
				const trigger = wrapper.instance().trigger;
				expect(trigger.isCalled).toBeFalsy();

				// when
				wrapper.instance().onTrigger(event, changePayload);

				// then
				expect(trigger.isCalled).toBe(true);
			});

			it('should register trigger result properties in state', () => {
				// given
				const wrapper = shallow(<TCompForm state={state} />);
				const properties = { type: selectedType.value };
				const trigger = wrapper.instance().trigger;
				trigger.mockReturnWith({ properties });

				// when
				return wrapper
					.instance()
					.onTrigger(event, changePayload)
					.then(() => {
						expect(wrapper.state()).toEqual({ properties });
					});
			});
			it('should set cmf state with errors, and schemas', () => {
				// given
				const setState = jest.fn();
				const wrapper = shallow(<TCompForm state={state} setState={setState} />);
				const trigger = wrapper.instance().trigger;
				const data = {
					errors: {},
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
					_datasetMetadata: {
						type: selectedType.value,
					},
				};
				const dispatch = jest.fn();
				const wrapper = shallow(<TCompForm state={state} dispatch={dispatch} />);

				// when
				wrapper.instance().onSubmit(event, payload);

				// then
				const args = dispatch.mock.calls[0][0];
				expect(args.type).toBe(TCompForm.ON_SUBMIT);
				expect(args.component).toBe(TCompForm.displayName);
				expect(args.event).toBe(event);
				expect(args.properties).toEqual(payload);
			});
		});
	});
});
