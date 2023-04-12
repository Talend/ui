import Immutable from 'immutable';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shallow } from 'enzyme';
import TreeManager, {
	addPathsToCollection,
	removePathsFromCollection,
} from './TreeManager.container';

describe('addPathsToCollection', () => {
	it('should add the jsonpath to the paths collection', () => {
		const myMap = Immutable.Map();
		const myList = Immutable.List();
		const newMap = addPathsToCollection(0, myMap, myList, 'jsonpath');
		expect(newMap.get(0).toJS()).toEqual(['jsonpath']);
	});
});

describe('removePathsFromCollection', () => {
	it('should remove the jsonpath to the paths collection', () => {
		const myList = Immutable.List(['jsonpath', 'somestuff']);
		const myMap = Immutable.Map({ 0: myList });
		const newCollection = removePathsFromCollection(0, myMap, myList, 'jsonpath');
		expect(newCollection.get(0).toJS()).toEqual(['somestuff']);
	});
});

describe('TreeManager#onToggle', () => {
	const event = {};
	const props = {
		setState: jest.fn(),
	};
	it('when the handler emitter is an union, and has been click for the first time', async () => {
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
		await userEvent.click(screen.getByTestId('btn'));
		// then nothing
		expect(setStateSpy).not.toHaveBeenCalled();
	});
	it('default', async () => {
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
		await userEvent.click(screen.getByTestId('btn'));
		// then
		expect(setStateSpy).toHaveBeenCalled();
		// expect(wrapper.state('expandedNodes'));
	});
});
