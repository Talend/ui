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
		expect(wrapper).toMatchSnapshot();
	});
});
