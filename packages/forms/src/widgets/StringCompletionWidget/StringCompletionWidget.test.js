import React from 'react';
import { shallow } from 'enzyme';
import StringCompletionWidget from './StringCompletionWidget';

function fetchItems() {
	return [{
		title: 'A',
		suggestions: [{
			title: 'Apple',
		}, {
			title: 'Apricot',
		}],
	}, {
		title: 'B',
		suggestions: [{
			title: 'Banana',
		}],
	}, {
		title: 'C',
		suggestions: [{
			title: 'Cherry',
		}],
	}];
}

const options = { itemsSrc: '/test.json' };

describe('StringCompletionWidget', () => {
	it('should render', () => {
		const wrapper = shallow(
			<StringCompletionWidget options={options} fetchItems={fetchItems} />
		);
		expect(wrapper.prop('items')).toBeDefined();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render without items', () => {
		const wrapper = shallow(
			<StringCompletionWidget options={{}} fetchItems={() => {}} />
		);
		expect(wrapper.prop('items')).toEqual([]);
		expect(wrapper).toMatchSnapshot();
	});

	it('should call fetchItems', () => {
		const fi = jest.fn();
		shallow(
			<StringCompletionWidget options={options} fetchItems={fi} />
		);
		expect(fi.mock.calls[0][0]).toBeDefined();
		expect(fi.mock.calls.length).toBe(1);
	});
});
