import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';
import add from '../../../mock/add';

import {
	toJS,
	resolveNameForTitleMap,
	keepOnlyDatasetMetadataProperties,
	TCompForm,
} from './ComponentForm.component';

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
			...add.ui,
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
			...add.ui,
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
