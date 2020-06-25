import React from 'react';
import { shallow } from 'enzyme';
import Stepper from './Stepper.component';

describe('Stepper Component', () => {
	describe('render', () => {
		it('should render when there is no errors in the steps', () => {
			// given
			const title = 'Test';
			const steps = [
				{ label: 'Fetch Sample', status: Stepper.LOADING_STEP_STATUSES.SUCCESS },
				{ label: 'Global Quality', status: Stepper.LOADING_STEP_STATUSES.LOADING },
				{ label: 'Flattening', status: Stepper.LOADING_STEP_STATUSES.LOADING },
				{ label: 'Column Quality', status: Stepper.LOADING_STEP_STATUSES.PENDING },
			];
			const renderActions = jest.fn();
			// when
			const wrapper = shallow(
				<Stepper steps={steps} title={title} renderActions={renderActions} />,
			);
			// then
			expect(renderActions).toHaveBeenCalledWith(false);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render when there is an errors in the steps', () => {
			// given
			const title = 'Test';
			const steps = [
				{
					label: 'Fetch Sample',
					status: Stepper.LOADING_STEP_STATUSES.SUCCESS,
				},
				{
					label: 'Global Quality',
					status: Stepper.LOADING_STEP_STATUSES.FAILURE,
					message: { label: "We couldn't connect to the remote engine" },
				},
				{ label: 'Flattening', status: Stepper.LOADING_STEP_STATUSES.ABORTED },
				{ label: 'Column Quality', status: Stepper.LOADING_STEP_STATUSES.ABORTED },
			];
			const renderActions = jest.fn();
			// when
			const wrapper = shallow(
				<Stepper steps={steps} title={title} renderActions={renderActions}>
					Import successfull
				</Stepper>,
			);
			// then
			expect(renderActions).toHaveBeenCalledWith(true);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
