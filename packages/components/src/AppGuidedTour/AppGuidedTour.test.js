import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import AppGuidedTour from './AppGuidedTour.component';
import { LOADING_STEP_STATUSES } from '../Stepper';

const DEFAULT_PROPS = {
	appName: 'app name',
	isOpen: true,
	steps: [],
	demoContentSteps: [],
	onImportDemoContent: () => {},
	onRequestClose: () => {},
};

describe('AppGuidedTour', () => {
	it('should not trigger import function if "load demo content" is not selected', () => {
		const onImportDemoContentMock = jest.fn();

		const wrapper = mount(
			<AppGuidedTour {...DEFAULT_PROPS} onImportDemoContent={onImportDemoContentMock} />,
		);
		act(() => {
			wrapper.find('Toggle').prop('onChange')({ target: { checked: false } });
		});
		act(() => {
			wrapper.find('button[data-tour-elem="right-arrow"]').simulate('click');
		});
		expect(onImportDemoContentMock).not.toHaveBeenCalled();
	});
	it('should trigger import function if "load demo content" is selected', () => {
		const onImportDemoContentMock = jest.fn();

		const wrapper = mount(
			<AppGuidedTour {...DEFAULT_PROPS} onImportDemoContent={onImportDemoContentMock} />,
		);
		act(() => {
			wrapper.find('button[data-tour-elem="right-arrow"]').simulate('click');
		});

		expect(onImportDemoContentMock).toHaveBeenCalled();
	});
	it('should stay on import step if import is not successful', () => {
		const onImportDemoContentMock = jest.fn();

		const wrapper = mount(
			<AppGuidedTour {...DEFAULT_PROPS} onImportDemoContent={onImportDemoContentMock} />,
		);
		act(() => {
			wrapper.find('Toggle').prop('onChange')({ target: { checked: true } });
		});
		act(() => {
			wrapper.find('button[data-tour-elem="right-arrow"]').simulate('click');
		});
		wrapper.setProps({
			demoContentSteps: [{ label: 'Importing dataset', status: LOADING_STEP_STATUSES.FAILURE }],
		});

		expect(wrapper.find('Tour').prop('goToStep')).toBe(1);
	});
	it('should reset state on close', () => {
		const onRequestCloseMock = jest.fn();
		const wrapper = mount(<AppGuidedTour {...DEFAULT_PROPS} onRequestClose={onRequestCloseMock} />);

		act(() => {
			wrapper.find('button[data-tour-elem="right-arrow"]').simulate('click');
		});
		act(() => {
			wrapper.find('Tour').prop('onRequestClose')();
		});

		expect(onRequestCloseMock).toHaveBeenCalled();
		expect(wrapper.find('Tour').prop('goToStep')).toBe(0);
	});
});
