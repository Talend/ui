import React from 'react';
import { shallow } from 'enzyme';
import ActionButtonOverlay from './ActionButtonOverlay.component';

describe('ActionButtonOverlay', () => {
	it('should wrap the children with an overlay', () => {
		const Overlay = <div>Overlay</div>;
		const wrapper = shallow(
			<ActionButtonOverlay
				overlayId="myId"
				overlayRef={() => {}}
				overlayComponent={Overlay}
				overlayPlacement="top"
			>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should prevent the scrolling', () => {
		const Overlay = <div>Overlay</div>;
		const wrapper = shallow(
			<ActionButtonOverlay overlayComponent={Overlay} preventScrolling>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should inject the overlay', () => {
		const Overlay = <div>Overlay</div>;
		const wrapper = shallow(
			<ActionButtonOverlay overlayComponent="Overlay" getComponent={() => Overlay}>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
