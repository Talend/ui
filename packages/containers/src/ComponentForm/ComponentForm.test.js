import { render, screen } from '@testing-library/react';
import { fromJS, Map } from 'immutable';

import cmf, { mock } from '@talend/react-cmf';

import { resolveNameForTitleMap, TCompForm, toJS } from './ComponentForm.component';
import addSchemaMock from './ComponentForm.test.schema.json';

jest.unmock('@talend/design-system');

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
	let App;
	beforeAll(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {},
		});
		App = config.App;
	});
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
			render(
				<App {...mock.store.context()}>
					<TCompForm
						state={state}
						triggerURL="http://foo.com/rpc"
						definitionURL="http://foo.com/definition.json"
					/>
				</App>,
			);

			// then
			expect(screen.getByTestId('form.skeleton')).toBeVisible();
			// eslint-disable-next-line jest-dom/prefer-in-document
			expect(screen.queryByRole('form')).toBeNull();
		});

		it('should render a response status', () => {
			// given
			const state = fromJS({ response: { statusText: 'we had an error' } });

			// when
			render(
				<App {...mock.store.context()}>
					<TCompForm
						state={state}
						triggerURL="http://foo.com/rpc"
						definitionURL="http://foo.com/definition.json"
					/>
				</App>,
			);

			// then
			expect(screen.getByText('we had an error')).toBeVisible();
		});

		it('should render a UIForm', () => {
			// given
			const state = fromJS(addSchemaMock.ui);

			// when
			const { container } = render(
				<App {...mock.store.context()}>
					<TCompForm
						state={state}
						triggerURL="http://foo.com/rpc"
						definitionURL="http://foo.com/definition.json"
					/>
				</App>,
			);

			// then
			expect(document.querySelector('form')).toBeVisible();
			expect(container.firstChild).toMatchSnapshot();
		});
	});

	describe('#security', () => {
		it('should pass security props to createTrigger', () => {
			const state = fromJS(addSchemaMock.ui);
			const instance = new TCompForm({
				state,
				triggerURL: 'http://trigger',
				CSRFTokenCookieKey: 'fooCookie',
				CSRFTokenHeaderKey: 'fooHeader',
			});
			// instance.componentDidUpdate({ state });
			const trigger = instance.trigger;
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
			const props = {
				state,
				triggerURL: oldTriggerURL,
				customTriggers: oldCustomTriggers,
			};
			const instance = new TCompForm(props);

			const oldTrigger = instance.trigger;
			expect(oldTrigger).toBeDefined();
			expect(oldTrigger.mockInfo.url).toBe(oldTriggerURL);
			expect(oldTrigger.mockInfo.customRegistry.oldCustomReload).toBeDefined();

			// when
			// props.triggerURL = newTriggerURL;
			instance.props.triggerURL = newTriggerURL;
			instance.componentDidUpdate({ ...props, triggerURL: oldTriggerURL });

			// then
			const newTrigger = instance.trigger;
			expect(newTrigger).toBeDefined();
			expect(newTrigger.mockInfo.url).toBe(newTriggerURL);
			expect(newTrigger.mockInfo.customRegistry.oldCustomReload).toBeDefined();

			// when
			props.customTriggers = newCustomTriggers;
			instance.componentDidUpdate({ ...props, customTriggers: oldCustomTriggers });

			// then
			const evenNewerTrigger = instance.trigger;
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
			const props = {
				state,
				definitionURL: oldUrl,
				triggerURL: 'http://trigger',
				dispatch,
			};
			const { rerender } = render(<TCompForm {...props} />);
			rerender(<TCompForm {...props} definitionURL={newUrl} />);

			// then
			expect(dispatch).toHaveBeenCalledWith({
				triggerURL: 'http://trigger',
				definitionURL: newUrl,
				dispatch,
				state,
				type: TCompForm.ON_DEFINITION_URL_CHANGED,
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
				const props = {
					state,
					setState,
				};
				const instance = new TCompForm(props);
				// render(<TCompForm state={state} setState={setState} />);

				// when
				instance.onChange(event, changePayload);

				// then
				expect(setState).toHaveBeenCalledWith({ dirty: true });
			});

			it('should NOT dispatch dirty state if it is already dirty', () => {
				// given
				const dirtyState = fromJS({
					...addSchemaMock.ui,
					dirty: true,
				});
				const setState = jest.fn();
				const instance = new TCompForm({
					state: dirtyState,
					setState,
				});

				// when
				instance.onChange(event, changePayload);

				// then
				expect(setState).not.toHaveBeenCalled();
			});

			it('should set form data in state', () => {
				// given
				const setState = jest.fn();
				const instance = new TCompForm({
					state,
					setState,
				});

				// when
				instance.setState = jest.fn();
				instance.onChange(event, changePayload);

				// then
				expect(instance.setState).toHaveBeenCalledWith({
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
				const instance = new TCompForm({
					componentId,
					state,
					setState,
					dispatch,
					dispatchOnChange: true,
				});

				// when
				instance.onChange(event, changePayload);

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
				const instance = new TCompForm({
					state,
					dispatch: jest.fn(),
				});
				const trigger = instance.trigger;
				expect(trigger.isCalled).toBeFalsy();

				// when
				instance.onTrigger(event, changePayload);

				// then
				expect(trigger.isCalled).toBe(true);
			});

			it('should set cmf state with schemas', () => {
				// given
				const setState = jest.fn();
				const instance = new TCompForm({
					state,
					setState,
					dispatch: jest.fn(),
				});
				const trigger = instance.trigger;
				const data = {
					jsonSchema: addSchemaMock.ui.jsonSchema,
					uiSchema: addSchemaMock.ui.uiSchema,
				};
				trigger.mockReturnWith(data);

				// when
				return instance.onTrigger(event, changePayload).then(() => {
					expect(setState).toHaveBeenCalledWith(data);
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
				const instance = new TCompForm({
					componentId,
					state,
					dispatch,
				});

				// when
				instance.onSubmit(event, payload);

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
				const instance = new TCompForm({
					componentId,
					state,
					setState,
					dispatch,
				});

				// when
				instance.setState = jest.fn();
				instance.onChange(event, changePayload);

				// change state
				expect(instance.setState).toHaveBeenCalledWith({
					properties: {
						_datasetMetadata: {
							type: selectedType.value,
							$type_name: selectedType.name,
						},
					},
				});
				// when
				instance.onReset();

				// change state back to initial state provided by addSchemaMock.ui
				// with dirty set to false since the form got reseted
				expect(instance.setState).toHaveBeenCalledWith({
					properties: {
						_datasetMetadata: {},
					},
				});
			});
		});
	});
});
