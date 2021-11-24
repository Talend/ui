import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import AppGuidedTour, { DEFAULT_LOCAL_STORAGE_KEY } from './AppGuidedTour.component';
import Stepper from '../Stepper';

const DEFAULT_PROPS = {
	appName: 'app name',
	isOpen: true,
	localStorageKey: DEFAULT_LOCAL_STORAGE_KEY,
	steps: [],
	demoContentSteps: [],
	onImportDemoContent: () => {},
	onRequestClose: () => {},
	onRequestOpen: () => {},
};

describe('AppGuidedTour', () => {
	beforeEach(() => {
		localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, null);
	});
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
	it('should import content by default on first time use', () => {
		const wrapper = mount(<AppGuidedTour {...DEFAULT_PROPS} />);
		expect(wrapper.find('Toggle').prop('checked')).toBe(true);
	});
	it('should not import content by default when opening from menu', () => {
		localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, 'true');
		const wrapper = mount(<AppGuidedTour {...DEFAULT_PROPS} />);
		expect(wrapper.find('Toggle').prop('checked')).toBe(false);
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
			demoContentSteps: [
				{ label: 'Importing dataset', status: Stepper.LOADING_STEP_STATUSES.FAILURE },
			],
		});

		expect(wrapper.find('Tour').prop('goToStep')).toBe(1);
		expect(wrapper.find('DemoContentStep').length).toBe(1);
	});
	it('should reset state on close', () => {
		const onRequestCloseMock = jest.fn();
		localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, 'true');

		const wrapper = mount(<AppGuidedTour {...DEFAULT_PROPS} onRequestClose={onRequestCloseMock} />);

		act(() => {
			wrapper.find('button[data-tour-elem="right-arrow"]').simulate('click');
		});
		act(() => {
			wrapper.find('Tour').prop('onRequestClose')();
		});

		expect(onRequestCloseMock).toHaveBeenCalled();
		expect(wrapper.find('Tour').prop('goToStep')).toBe(0);
		expect(wrapper.find('Toggle').prop('checked')).toBe(false);
	});
	it('Should open if local storage flag is not set', () => {
		const onRequestOpenMock = jest.fn();
		mount(<AppGuidedTour {...DEFAULT_PROPS} isOpen={false} onRequestOpen={onRequestOpenMock} />);
		expect(onRequestOpenMock).toHaveBeenCalled();
	});
	it('Should not open if local storage flag is set', () => {
		localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, 'true');
		const onRequestOpenMock = jest.fn();
		mount(<AppGuidedTour {...DEFAULT_PROPS} isOpen={false} onRequestOpen={onRequestOpenMock} />);
		expect(onRequestOpenMock).not.toHaveBeenCalled();
	});
	it('Should set a local storage flag when closed', () => {
		const onCloseMock = jest.fn();
		const wrapper = mount(<AppGuidedTour {...DEFAULT_PROPS} onClose={onCloseMock} />);
		act(() => {
			wrapper.find('Tour').prop('onRequestClose')();
		});
		expect(localStorage.getItem(DEFAULT_LOCAL_STORAGE_KEY)).toBe('true');
	});
	it('Should not show demo content form if no step is provided', () => {
		const onRequestOpenMock = jest.fn();
		const wrapper = mount(
			<AppGuidedTour
				{...DEFAULT_PROPS}
				isOpen={false}
				onRequestOpen={onRequestOpenMock}
				demoContentSteps={null}
			/>,
		);
		expect(wrapper.find('Toggle')).toHaveLength(0);
	});
});
