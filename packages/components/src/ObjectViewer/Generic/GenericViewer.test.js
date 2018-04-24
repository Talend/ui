import React from 'react';
import { shallow } from 'enzyme';
import Component from './GenericViewer.component';

/*
const schema = [
	{
		name: 'id',
		doc: 'Id',
		type: {
			type: 'integer',
		},
		'@talend-quality@': {
			0: 5,
			1: 65,
			'-1': 30,
		},
	},
];
const data = [
	{
		value: {
			id: {
				value: 0,
				quality: 1,
			},
			name: {
				value: 'Nom de la gare',
				quality: 1,
			},
			price: {
				value: 'Code UIC',
				quality: 1,
			},
			date: {
				value: Date.now(),
				quality: 1,
			},
		},
		quality: 1,
	},
];

const sample = {
	schema,
	data,
};
*/

describe('GenericViewer', () => {
	it('should render', () => {
		const wrapper = shallow(<Component />);
		expect(wrapper).toMatchSnapshot();
	});
});
