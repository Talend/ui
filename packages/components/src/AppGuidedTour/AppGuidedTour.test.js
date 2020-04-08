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
			wrapper.find('Tour').prop('getCurrentStep')(1);
		});
		expect(onImportDemoContentMock).not.toHaveBeenCalled();
	});
	it('should trigger import function if "load demo content" is selected', () => {
		const onImportDemoContentMock = jest.fn();

		const wrapper = mount(
			<AppGuidedTour {...DEFAULT_PROPS} onImportDemoContent={onImportDemoContentMock} />,
		);
		act(() => {
			wrapper.find('Toggle').prop('onChange')({ target: { checked: true } });
		});
		act(() => {
			wrapper.find('Tour').prop('getCurrentStep')(1);
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
			wrapper.find('Tour').prop('getCurrentStep')(1);
		});
		wrapper.setProps({
			demoContentSteps: [{ label: 'Importing dataset', status: LOADING_STEP_STATUSES.FAILURE }],
		});

		expect(wrapper.find('Tour').prop('goToStep')).toBe(1);
	});
});
