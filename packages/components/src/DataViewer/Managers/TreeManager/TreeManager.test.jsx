import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TreeManager, {
	addPathsToCollection,
	removePathsFromCollection,
} from './TreeManager.container';

describe('addPathsToCollection', () => {
	it('should add the jsonpath to the paths collection', () => {
		const myMap = {};
		const myList = [];
		const newMap = addPathsToCollection(0, myMap, myList, 'jsonpath');
		expect(newMap[0]).toEqual(['jsonpath']);
	});
});

describe('removePathsFromCollection', () => {
	it('should remove the jsonpath to the paths collection', () => {
		const myList = ['jsonpath', 'somestuff'];
		const myMap = { 0: myList };
		const newCollection = removePathsFromCollection(0, myMap, myList, 'jsonpath');
		expect(newCollection[0]).toEqual(['somestuff']);
	});
});

describe('TreeManager#onToggle', () => {
	const props = {
		setState: jest.fn(),
	};
	it('when the handler emitter is an union, and has been click for the first time', async () => {
		const user = userEvent.setup();

		// given
		const options = {
			firstClickUnion: true,
		};
		// when
		const setStateSpy = jest.spyOn(TreeManager.prototype, 'setState');
		render(
			<TreeManager
				{...props}
				wrappedComponent={prop => (
					<div data-testid="wrapped">
						<button data-testid="btn" onClick={e => prop.onToggle(e, options, 0)}></button>
					</div>
				)}
			/>,
		);
		await user.click(screen.getByTestId('btn'));
		// then nothing
		expect(setStateSpy).not.toHaveBeenCalled();
	});
	it('default', async () => {
		const user = userEvent.setup();

		// when
		const options = {
			firstClickUnion: false,
		};
		// given
		const setStateSpy = jest.spyOn(TreeManager.prototype, 'setState');
		render(
			<TreeManager
				{...props}
				wrappedComponent={prop => (
					<div data-testid="wrapped">
						<button data-testid="btn" onClick={e => prop.onToggle(e, options, 0)}></button>
					</div>
				)}
			/>,
		);
		await user.click(screen.getByTestId('btn'));
		// then
		expect(setStateSpy).toHaveBeenCalled();
	});
});
