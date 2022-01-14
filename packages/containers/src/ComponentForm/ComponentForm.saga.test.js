import { call, select, put } from 'redux-saga/effects';
import { fromJS, Map } from 'immutable';
import cmf from '@talend/react-cmf';

import * as sagas from './ComponentForm.sagas';
import ConnectedTCompForm, { TCompForm } from './ComponentForm.component';

describe('ComponentForm saga', () => {
	describe('*checkFormComponentId', () => {
		it('checkFormComponentId return true if provided componentId and action type match action', () => {
			const componentId = 'componentId';
			const actionType = 'actionType';

			const testAction = { type: actionType, componentId };

			const test = sagas.checkFormComponentId(componentId, actionType);
			expect(test(testAction)).toBe(true);
		});

		it('checkFormComponentId return false if provided componentId does not match action', () => {
			const componentId = 'componentId';
			const actionType = 'actionType';

			const testAction = { type: actionType, componentId };

			const test = sagas.checkFormComponentId('anotherComponentId', actionType);
			expect(test(testAction)).toBe(false);
		});

		it('checkFormComponentId return false if provided action type does not match action', () => {
			const componentId = 'componentId';
			const actionType = 'actionType';

			const testAction = { type: actionType, componentId };

			const test = sagas.checkFormComponentId(componentId, 'anotherActionType');
			expect(test(testAction)).toBe(false);
		});
	});

	describe('*onDidMount', () => {
		it('should select component jsonSchema', () => {
			// given
			const props = {
				componentId: 'MyComponentId',
				definitionURL: 'http://lol',
				uiSpecPath: 'my.component.state.uiSpec',
			};
			const jsonSchema = {
				properties: {
					_datasetMetadata: {
						properties: {
							name: {
								title: 'Name',
								type: 'string',
							},
							type: {
								title: 'Types',
								type: 'string',
							},
						},
						type: 'object',
					},
				},
			};
			const gen = sagas.onDidMount(props);

			// when
			const selectJsonSchema = gen.next().value;
			expect(selectJsonSchema.payload).toBeDefined();
			expect(selectJsonSchema.type).toBe('SELECT');
			const selector = selectJsonSchema.payload.selector;
			const jsonSchemaSelection = selector({
				cmf: {
					components: fromJS({
						[TCompForm.displayName]: { [props.componentId]: { jsonSchema } },
					}),
				},
			});

			// then
			expect(jsonSchemaSelection.toJS()).toEqual(jsonSchema);
		});

		it('should NOT fetch uiSpec when it is already fetched', () => {
			// given
			const props = {
				componentId: 'MyComponentId',
				definitionURL: 'http://lol',
				uiSpecPath: 'my.component.state.uiSpec',
			};
			const jsonSchema = {
				properties: {
					_datasetMetadata: {
						properties: {
							name: {
								title: 'Name',
								type: 'string',
							},
							type: {
								title: 'Types',
								type: 'string',
							},
						},
						type: 'object',
					},
				},
			};
			const gen = sagas.onDidMount(props);

			// when
			gen.next(); // select

			// then
			expect(gen.next(jsonSchema).done).toBe(true);
		});

		it('should fetch uiSpec when it is not already fetched', () => {
			// given
			const props = {
				componentId: 'MyComponentId',
				definitionURL: 'http://lol',
				uiSpecPath: 'my.component.state.uiSpec',
			};
			const gen = sagas.onDidMount(props);

			// when
			gen.next(); // select
			const fetchUiSpecStep = gen.next();

			// then
			expect(fetchUiSpecStep.done).toBe(false);
		});

		it('should NOT fetch uiSpec when provided', () => {
			// given
			const jsonSchema = {
				properties: {
					_datasetMetadata: {
						properties: {
							name: {
								title: 'Name',
								type: 'string',
							},
							type: {
								title: 'Types',
								type: 'string',
							},
						},
						type: 'object',
					},
				},
			};
			const props = {
				componentId: 'MyComponentId',
				definitionURL: 'http://lol',
				definition: jsonSchema,
			};
			const gen = sagas.onDidMount(props);

			// when
			gen.next(); // select

			// then
			expect(gen.next().value.payload.action.cmf.componentState.componentState).toEqual({
				initialState: jsonSchema,
				...jsonSchema,
			});
		});
	});

	describe('*fetchDefinition', () => {
		const componentId = 'MyComponentId';
		function getReduxStore() {
			return {
				cmf: {
					components: fromJS({
						[TCompForm.displayName]: { [componentId]: {} },
					}),
				},
			};
		}
		const jsonSchema = {
			properties: {
				name: {
					title: 'Name',
					type: 'string',
				},
			},
			type: 'object',
		};
		const uiSchema = [{ key: 'name' }];
		const data = {
			my: {
				component: {
					state: {
						uiSpec: { jsonSchema, uiSchema },
					},
				},
			},
		};

		it('should fetch ui specs', () => {
			// given
			const props = {
				componentId,
				definitionURL: 'http://lol',
				uiSpecPath: 'my.component.state.uiSpec',
			};
			const gen = sagas.fetchDefinition(props);

			// when
			const fetchStep = gen.next().value;

			// then
			expect(fetchStep).toEqual(call(cmf.sagas.http.get, props.definitionURL));
		});

		it('should reset ui specs and store response on fetch error', () => {
			// given
			const props = {
				componentId,
				definitionURL: 'http://lol',
				uiSpecPath: 'my.component.state.uiSpec',
			};
			const response = { ok: false, message: 'this is wrong' };
			const gen = sagas.fetchDefinition(props);

			// when
			gen.next(); // fetch step
			const errorStep = gen.next({ response }).value;
			expect(errorStep.payload).toBeDefined();
			expect(errorStep.type).toBe('PUT');
			const setStateAction = errorStep.payload.action(null, getReduxStore);

			// then
			expect(setStateAction).toEqual({
				cmf: {
					componentState: {
						componentName: 'ComponentForm',
						componentState: new Map({
							jsonSchema: undefined,
							uiSchema: undefined,
							response,
							dirty: false,
						}),
						key: 'MyComponentId',
						type: 'REACT_CMF.COMPONENT_MERGE_STATE',
					},
				},
				type: 'ComponentForm.setState',
			});
		});

		it('should put selected part of the response', () => {
			// given
			const props = {
				componentId,
				definitionURL: 'http://lol',
				uiSpecPath: 'my.component.state.uiSpec',
			};
			const response = { ok: true };
			const gen = sagas.fetchDefinition(props);

			// when
			gen.next(); // fetch step
			const nextStep = gen.next({ response, data }).value;

			// then
			expect(nextStep.payload.action).toEqual({
				cmf: {
					componentState: {
						componentName: 'ComponentForm',
						componentState: {
							definition: data,
							jsonSchema,
							uiSchema,
							initialState: {
								jsonSchema,
								uiSchema,
							},
						},
						key: 'MyComponentId',
						type: 'REACT_CMF.COMPONENT_MERGE_STATE',
					},
				},
				type: 'ComponentForm.setState',
			});
		});

		it('should put all response data in component state', () => {
			// given
			const props = {
				componentId,
				definitionURL: 'http://lol',
			};
			const response = { ok: true };
			const gen = sagas.fetchDefinition(props);

			// when
			gen.next(); // fetch step
			const nextStep = gen.next({ response, data }).value;

			// then
			expect(nextStep.payload.action).toEqual({
				cmf: {
					componentState: {
						componentName: 'ComponentForm',
						componentState: { ...data, initialState: data },
						key: 'MyComponentId',
						type: 'REACT_CMF.COMPONENT_MERGE_STATE',
					},
				},
				type: 'ComponentForm.setState',
			});
		});
		it('should init form with provided state', () => {
			// given
			const props = {
				componentId,
				definitionURL: 'http://lol',
				data: {
					jsonSchema: {},
				},
			};
			const response = { ok: true };
			const gen = sagas.fetchDefinition(props);

			// when
			gen.next(); // fetch step
			const nextStep = gen.next({ response, data }).value;

			// then
			expect(nextStep.payload.action).toEqual({
				cmf: {
					componentState: {
						componentName: 'ComponentForm',
						componentState: { ...data, initialState: data, ...props.data },
						key: 'MyComponentId',
						type: 'REACT_CMF.COMPONENT_MERGE_STATE',
					},
				},
				type: 'ComponentForm.setState',
			});
		});
	});

	describe('onFormSubmit', () => {
		const componentId = 'form';
		const prevState = {
			cmf: { components: fromJS({ [TCompForm.displayName]: { [componentId]: {} } }) },
		};
		const mergeStatePayload = {
			cmf: {
				componentState: {
					componentName: 'ComponentForm',
					componentState: fromJS({
						initialState: { jsonSchema: undefined, uiSchema: undefined, properties: 'prop' },
					}),
					key: 'form',
					type: 'REACT_CMF.COMPONENT_MERGE_STATE',
				},
			},
			type: 'ComponentForm.setState',
		};
		let submitUrl = 'http://test.com';
		let action = { componentId: 'form', properties: 'prop' };
		const data = { message: 'fetch failed' };

		it('should return on submit success if the http request has worked', () => {
			// given
			const response = { ok: true };
			const gen = sagas.onFormSubmit(componentId, submitUrl, action);
			// when
			expect(gen.next().value).toEqual(select());
			expect(gen.next(prevState).value).toEqual(put(mergeStatePayload));
			expect(gen.next().value).toEqual(call(cmf.sagas.http.post, submitUrl, action.properties));
			expect(gen.next({ response, data }).value).toEqual(
				put({
					type: TCompForm.ON_SUBMIT_SUCCEED,
					data,
					formData: action.properties,
					response,
					componentId,
				}),
			);
			// then
			expect(gen.next().value).toEqual(undefined);
		});

		it('should return on submit failed if the http request has failed', () => {
			// given
			const response = { ok: false };
			const gen = sagas.onFormSubmit(componentId, submitUrl, action);
			// when
			expect(gen.next().value).toEqual(select());
			expect(gen.next(prevState).value).toEqual(put(mergeStatePayload));
			expect(gen.next().value).toEqual(call(cmf.sagas.http.post, submitUrl, action.properties));
			expect(gen.next({ response, data }).value).toEqual(
				put({
					type: TCompForm.ON_SUBMIT_FAILED,
					data,
					formData: action.properties,
					response,
					componentId,
				}),
			);
			// then
			expect(gen.next().value).toEqual(undefined);
		});

		it('should return nothing if there is not the matched component id', () => {
			// given
			action = { componentId: 'form2', properties: 'prop' };
			const gen = sagas.onFormSubmit(componentId, submitUrl, action);
			// when
			const value = gen.next().value;
			// then
			expect(value).toEqual(undefined);
		});

		it('should return nothing if there is no submit url', () => {
			// given

			submitUrl = '';
			action = { componentId: 'form', properties: 'prop' };
			const gen = sagas.onFormSubmit(componentId, submitUrl, action);
			// when
			expect(gen.next().value).toEqual(select());
			expect(gen.next(prevState).value).toEqual(put(mergeStatePayload));
			// then
			expect(gen.next().value).toEqual(undefined);
		});
	});

	describe('handleSetDirtyState', () => {
		it('should dispatch an action to update the component form statu', () => {
			// given
			const componentId = 'myId';
			const dirty = true;
			// when
			const gen = sagas.handleSetDirtyState({ componentId, dirty });
			// then
			expect(gen.next().value).toEqual(select(ConnectedTCompForm.getState, componentId));
			expect(gen.next(Map({})).value).toEqual(
				put({
					cmf: {
						componentState: {
							componentName: 'ComponentForm',
							componentState: Map({
								dirty: true,
							}),
							key: 'myId',
							type: 'REACT_CMF.COMPONENT_MERGE_STATE',
						},
					},
					type: 'ComponentForm.setState',
				}),
			);
			expect(gen.next().done).toBe(true);
		});
	});
});
