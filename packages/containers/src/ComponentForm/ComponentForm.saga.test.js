import { call } from 'redux-saga/effects';
import { fromJS, Map } from 'immutable';
import cmf from '@talend/react-cmf';

import * as sagas from './ComponentForm.sagas';
import { TCompForm } from './ComponentForm.component';

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
			expect(selectJsonSchema.SELECT).toBeDefined();
			const selector = selectJsonSchema.SELECT.selector;
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
			expect(errorStep.PUT).toBeDefined();
			const setStateAction = errorStep.PUT.action(null, getReduxStore);

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
			expect(nextStep.PUT.action).toEqual({
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
			expect(nextStep.PUT.action).toEqual({
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
	});
});
