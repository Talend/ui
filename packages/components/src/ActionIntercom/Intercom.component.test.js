/* eslint-disable import/imports-first */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import Intercom from './Intercom.component';
import IntercomService from './Intercom.service';

jest.mock('./Intercom.service', () => ({
	init: jest.fn(),
	boot: jest.fn(),
	update: jest.fn(),
	shutdown: jest.fn(),
	onHide: jest.fn(),
	onShow: jest.fn(),
	setPosition: jest.fn(),
}));

const config = {
	app_id: 'a218987bc6f',
	name: 'Jimmy Somsanith',
	email: 'jsomsanith@talend.com',
	company: {
		id: '1',
		name: 'talend',
	},
};

describe('Intercom button', () => {
	let insertionElement;
	let scriptElement;
	beforeEach(() => {
		insertionElement = document.createElement('div');
		scriptElement = document.createElement('script');
		document.body.appendChild(scriptElement);
		document.body.appendChild(insertionElement);
	});

	afterEach(() => {
		document.body.removeChild(scriptElement);
		document.body.removeChild(insertionElement);
		jest.clearAllMocks();
	});

	it('should render a button', () => {
		// when
		const wrapper = mount(<Intercom id="my-intercom" config={config} />, {
			attachTo: insertionElement,
		});

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should boot intercom at mount', () => {
		// given
		expect(IntercomService.boot).not.toBeCalled();

		// when
		mount(<Intercom id="my-intercom" config={config} />, {
			attachTo: insertionElement,
		});

		// then
		expect(IntercomService.boot).toBeCalledWith('#my-intercom', config);
	});

	it('should update intercom on config change', () => {
		// given
		const wrapper = mount(<Intercom id="my-intercom" config={config} />, {
			attachTo: insertionElement,
		});
		expect(IntercomService.boot.mock.calls.length).toBe(1);

		const newConfig = { app_id: 'lol' };

		// when
		wrapper.setProps({
			id: 'my-intercom',
			config: newConfig,
		});

		// then
		expect(IntercomService.boot.mock.calls.length).toBe(2);
		expect(IntercomService.boot).toBeCalledWith('#my-intercom', newConfig);
	});

	it('should shutdown intercom at unmount', () => {
		// given
		const wrapper = mount(<Intercom id="my-intercom" config={config} />, {
			attachTo: insertionElement,
		});
		expect(IntercomService.shutdown).not.toBeCalled();

		// when
		wrapper.unmount();

		// then
		expect(IntercomService.shutdown).toBeCalled();
	});

	it('should change label on open/close', () => {
		// given
		const wrapper = mount(<Intercom id="my-intercom" config={config} />, {
			attachTo: insertionElement,
		});
		const onShow = IntercomService.onShow.mock.calls[0][0];
		const onHide = IntercomService.onHide.mock.calls[0][0];

		expect(wrapper.find('TooltipTrigger').prop('label')).toBe('Chat with Talend Support');

		// when/then show
		act(() => {
			onShow();
		});
		wrapper.update();
		expect(wrapper.find('TooltipTrigger').prop('label')).toBe('Close chat with Talend Support');

		// when/then hide
		act(() => {
			onHide();
		});
		wrapper.update();
		expect(wrapper.find('TooltipTrigger').prop('label')).toBe('Chat with Talend Support');
	});

	it('should set messenger position', () => {
		// given
		expect(IntercomService.setPosition).not.toBeCalled();

		// when
		mount(<Intercom id="my-intercom" config={config} />, {
			attachTo: insertionElement,
		});

		// then
		expect(IntercomService.setPosition).toBeCalled();
	});

	it('should focus on trigger button on hide', () => {
		// given
		const wrapper = mount(<Intercom id="my-intercom" config={config} />, {
			attachTo: insertionElement,
		});
		const onShow = IntercomService.onShow.mock.calls[0][0];
		const onHide = IntercomService.onHide.mock.calls[0][0];

		act(() => {
			onShow();
		});
		wrapper.update();

		const triggerButton = document.querySelector('#my-intercom');

		// when
		act(() => {
			onHide();
		});
		wrapper.update();

		// then
		expect(document.activeElement).toBe(triggerButton);
	});
});
