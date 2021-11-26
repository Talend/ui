import React from 'react';
import { render, act } from '../../../test-utils';

import {Icon} from './Icon';

describe('Icon', () => {

	it('should render from svg', () => {
		const { container } = render(<Icon name="svg-dd" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render from src', () => {
		const wrapper = render(<Icon name="src-/foo/bar.png" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with provided className', () => {
		const wrapper = render(<Icon name="svg-dd" className="custom-class" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should support extra props', () => {
		const wrapper = render(<Icon name="svg-dd" className="custom-class" data-custom="hello" />);
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
		const wrapper = render(<Icon name="remote-/assets/icons/my-icon.svg" />);
		expect(wrapper.getElement()).toMatchSnapshot();

		await act(async () => {
			await cache.first();
			await cache.resolve();
		});

		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith('/assets/icons/my-icon.svg', {
			headers: { Accept: 'image/svg+xml' },
		});
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
