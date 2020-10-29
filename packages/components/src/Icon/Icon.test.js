import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import Icon from './Icon.component';

let container;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

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
	it('should support remote svg', () => {
		// mock jest
		const mockSuccessResponse = {
			status: 200,
			ok: true,
		};
		const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
		const mockFetchPromise = Promise.resolve({
			text: () => mockJsonPromise,
		});
		jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
		// test first render
		const wrapper = mount(<Icon name="remote-/assets/icons/my-icon.svg" />);
		expect(wrapper.getElement()).toMatchSnapshot();
		wrapper.update();

		// act(() => {
		// 	ReactDOM.render(<Icon name="remote-/assets/icons/my-icon.svg" />, container);
		// });

		// expect(container.querySelector('svg')).toMatchSnapshot();
		// act(() => {
		// 	setTimeout(() => {}, 1);
		// });
		// expect(container.querySelector('svg')).toMatchSnapshot();
		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith('/assets/icons/my-icon.svg', {
			headers: { Accept: 'image/svg+xml' },
		});
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
