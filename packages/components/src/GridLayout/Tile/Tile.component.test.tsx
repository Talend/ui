/* eslint-disable jsx-a11y/no-static-element-interactions */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TileContext, TileContextType } from './context';
import Tile from './Tile.component';

type TestComponentProps = {
	context: TileContextType;
};

function TestComponent({ context }: TestComponentProps) {
	return (
		<div data-testid="TestComponent" data-displaymode={context.displayMode}>
			<input type="text" />
			<button onClick={() => context.setDisplayMode('edit')}>edit</button>
		</div>
	);
}

function Consumer() {
	return <TileContext.Consumer>{value => <TestComponent context={value} />}</TileContext.Consumer>;
}

describe('Grid tiles', () => {
	it('should render children and setup context', async () => {
		const user = userEvent.setup();

		// given
		render(
			<Tile>
				<Consumer />
			</Tile>,
		);
		// when
		await user.click(screen.getByText('edit'));

		// then
		expect(screen.getByTestId('TestComponent')).toBeVisible();
		expect(screen.getByTestId('TestComponent').dataset.displaymode).toBe('edit');
	});
	it('should manage onMouseDown from input', () => {
		// given
		const onMouseDown = jest.fn();
		render(
			<div onMouseDown={onMouseDown}>
				<Tile>
					<Consumer />
				</Tile>
			</div>,
		);
		const input = screen.getByRole('textbox');

		// when
		input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

		// then
		expect(onMouseDown).not.toHaveBeenCalled();
	});
});
