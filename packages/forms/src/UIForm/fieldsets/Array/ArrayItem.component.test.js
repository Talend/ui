import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ArrayItem from './ArrayItem.component';

jest.unmock('@talend/design-system');

describe('Array Item component', () => {
	it('should render control panel with item content', () => {
		// when
		const { container } = render(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id="talend-control-3"
				index={3}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should NOT render reorder control panel when value.isClosed is true', () => {
		// when
		render(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id="talend-control-3"
				index={3}
				isClosed
				onRemove={jest.fn()}
				onReorder={jest.fn()}
			/>,
		);

		// then
		expect(screen.queryByLabelText('Move down')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Move up')).not.toBeInTheDocument();
	});

	it('should NOT render moveUp/moveDown with no reorder callback', () => {
		// when
		render(
			<ArrayItem
				hasMoveDown={false}
				hasMoveUp
				id="talend-control-3"
				index={3}
				onRemove={jest.fn()}
			/>,
		);

		// then
		expect(screen.queryByLabelText('Move down')).not.toBeInTheDocument();
		expect(screen.queryByLabelText('Move up')).not.toBeInTheDocument();
	});

	it('should disable moveDown', () => {
		// when
		render(
			<ArrayItem
				hasMoveDown={false}
				hasMoveUp
				id="talend-control-3"
				index={3}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
			/>,
		);

		// then
		expect(screen.getByLabelText('Move down')).toBeDisabled();
		expect(screen.getByLabelText('Move up')).toBeVisible();
	});

	it('should disable moveUp', () => {
		// when
		render(
			<ArrayItem
				hasMoveDown
				hasMoveUp={false}
				id="talend-control-3"
				index={3}
				onRemove={jest.fn()}
				onReorder={jest.fn()}
			/>,
		);

		// then
		expect(screen.getByLabelText('Move down')).toBeVisible();
		expect(screen.getByLabelText('Move up')).toBeDisabled();
	});

	it('should disable delete button', () => {
		let deleteAction;
		const renderItem = (index, { actions }) => {
			deleteAction = actions[0];
		};
		// when
		render(
			<ArrayItem
				id="disabled-array-item"
				index={3}
				renderItem={renderItem}
				disabled
				onRemove={jest.fn()}
			/>,
		);
		// then

		expect(deleteAction.disabled).toBe(true);
	});

	it('should trigger onRemove when remove button is clicked', async () => {
		// given
		const onRemove = jest.fn();
		render(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id="talend-control-3"
				index={3}
				onRemove={onRemove}
				onReorder={jest.fn()}
			/>,
		);

		// when
		await userEvent.click(screen.getByLabelText('Delete'));

		// then
		expect(onRemove).toBeCalledWith(expect.anything(), 3);
	});

	it('should not render the remove button in ArrayItem if the widget is closeable', () => {
		// It will be rendered inside the widget instead
		render(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id="talend-control-3"
				index={3}
				isCloseable
				onRemove={jest.fn()}
			/>,
		);
		expect(screen.queryByLabelText('Delete')).not.toBeInTheDocument();
	});

	it('should trigger onReorder when moveUp button is clicked', async () => {
		// given
		const onReorder = jest.fn();
		render(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id="talend-control-3"
				index={3}
				onRemove={jest.fn()}
				onReorder={onReorder}
			/>,
		);

		// when
		await userEvent.click(screen.getByLabelText('Move up'));

		// then
		expect(onReorder).toBeCalledWith(expect.anything(), { previousIndex: 3, nextIndex: 2 });
	});

	it('should trigger onReorder when moveDown button is clicked', async () => {
		// given
		const onReorder = jest.fn();
		render(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id="talend-control-3"
				index={3}
				onRemove={jest.fn()}
				onReorder={onReorder}
			/>,
		);

		// when
		await userEvent.click(screen.getByLabelText('Move down'));

		// then
		expect(onReorder).toBeCalledWith(expect.anything(), { previousIndex: 3, nextIndex: 4 });
	});
	it('should support readonly (do not display actions)', () => {
		// given
		const onReorder = jest.fn();
		const renderItem = jest.fn(() => null);
		// when
		render(
			<ArrayItem
				hasMoveDown
				hasMoveUp
				id="talend-control-3"
				index={3}
				renderItem={renderItem}
				onRemove={jest.fn()}
				onReorder={onReorder}
				readOnly
			/>,
		);

		// then
		// can t find delete action
		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.queryAllByRole('button')).toHaveLength(0);
		expect(renderItem).toHaveBeenCalledWith(3, { actions: [] });
	});
});
