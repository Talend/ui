import { screen, render } from '@testing-library/react';
import Grid from './index';

describe('Grid tiles', () => {
	it('should compute tile with default skeleton', () => {
		// given
		// when
		render(<Grid isLoading />);

		// then
		const skels = screen.getAllByLabelText('text Loading...');
		expect(skels.length).toBe(3);
	});
	it('should compute tile custom skeleton', () => {
		// given
		const defaultConfiguration = [
			{ key: 'skel4', 'data-grid': { w: 2, h: 2, x: 0, y: 0, i: 'skel4' } },
		];
		// when
		render(<Grid isLoading skeletonConfiguration={defaultConfiguration} />);

		// then
		const skels = screen.getAllByLabelText('text Loading...');
		expect(skels.length).toBe(1);
	});
});
