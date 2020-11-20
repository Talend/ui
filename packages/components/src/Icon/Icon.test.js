import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Icon from './Icon.component';

describe('Icon', () => {
	it('should render fontawesome', () => {
		const wrapper = shallow(<Icon name="fa-bars" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render from custom font', () => {
		const wrapper = shallow(<Icon name="icon-test" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render from svg', () => {
		const wrapper = shallow(<Icon name="svg-dd" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render from src', () => {
		const wrapper = shallow(<Icon name="src-/foo/bar.png" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should fails if no id found', () => {
		expect(Icon).toThrowError(Error, 'Invariant Violation: no id provided');
	});

	it('should render with provided className', () => {
		const wrapper = shallow(<Icon name="svg-dd" className="custom-class" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should support extra props', () => {
		const wrapper = shallow(<Icon name="svg-dd" className="custom-class" data-custom="hello" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should support remote svg', async () => {
		const cache = {};
		const mockIconResponseText = new Promise(resolve => {
			cache.resolve = () => {
				resolve('<svg><g><path d=""/></g></svg>');
				return Promise.resolve({});
			};
		});
		const mockFetchPromise = new Promise(resolve => {
			cache.first = () => {
				resolve({
					status: 200,
					ok: true,
					headers: {
						get: () => 'image/svg+xml',
					},
					text: () => mockIconResponseText,
				});
				return Promise.resolve({});
			};
		});
		jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
		// test first render
		const wrapper = mount(<Icon name="remote-/assets/icons/my-icon.svg" />);
		expect(wrapper.getElement()).toMatchSnapshot();

		await act(async () => {
			await cache.first();
			await cache.resolve();
			wrapper.update();
		});

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith('/assets/icons/my-icon.svg', {
			headers: { Accept: 'image/svg+xml' },
			mode: 'cors',
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
