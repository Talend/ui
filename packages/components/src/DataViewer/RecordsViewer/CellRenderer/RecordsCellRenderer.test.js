import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Component from './RecordsCellRenderer.component';

jest.mock('../../Core', () => ({
	Tree: jest.fn(props => (
		<div data-testid="tree">
			{props.value.data}
			<div data-testid="props" data-props={JSON.stringify(props)}></div>
			<button onClick={() => props.onToggle()}>Click me</button>
		</div>
	)),
}));
jest.unmock('@talend/design-system');

describe('RecordsCellRenderer', () => {
	it('should render Tree from Core', async () => {
		const user = userEvent.setup();

		const onToggle = jest.fn();
		render(
			<Component index={0} value={[{ data: 'myData' }]} onToggle={onToggle} measure={jest.fn()} />,
		);
		expect(screen.getByTestId('tree')).toBeInTheDocument();
		await user.click(screen.getByRole('button'));
		expect(onToggle).toHaveBeenCalled();
		const props = JSON.parse(screen.getByTestId('props').dataset.props);
		expect(props).toMatchSnapshot();
	});
});
