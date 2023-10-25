import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OverlayTrigger from './OverlayTrigger.component';

jest.mock('./overlay', () => ({
	getAdaptedPlacement: () => 'top',
	getOverlayElement: () => ({
		getBoundingClientRect: () => ({
			bottom: 290,
			height: 100,
			top: 190,
		}),
	}),
	getContainerElement: () => ({
		getBoundingClientRect: () => ({
			bottom: 270,
			top: 0,
		}),
	}),
}));

const Overlay = <div data-testid="TestOverlay">Overlay</div>;

describe('OverlayTrigger', () => {
	it('should wrap the children with an overlay', () => {
		const overlayPlacement = 'top';
		render(
			<OverlayTrigger
				overlayId="myId"
				overlayRef={() => {}}
				overlayComponent={Overlay}
				overlayPlacement={overlayPlacement}
			>
				<div>wrap me</div>
			</OverlayTrigger>,
		);
		expect(screen.queryByTestId('TestOverlay')).not.toBeInTheDocument();
		userEvent.click(screen.getByText('wrap me'));
		expect(screen.getByTestId('TestOverlay')).toBeInTheDocument();
	});

	it('should determinate the adapted position when the overlay is open', () => {
		render(
			<OverlayTrigger
				overlayId="myId"
				overlayRef={() => {}}
				overlayComponent={Overlay}
				overlayPlacement="bottom"
			>
				<div>wrap me</div>
			</OverlayTrigger>,
		);
		userEvent.click(screen.getByText('wrap me'));
		expect(screen.getByRole('tooltip')).toHaveClass('top');
	});
});
