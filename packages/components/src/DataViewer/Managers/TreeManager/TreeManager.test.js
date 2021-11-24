import React from 'react';
import Immutable from 'immutable';
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
		expect(newMap.get(0)).toEqual(Immutable.List(['jsonpath']));
	});
});

describe('removePathsFromCollection', () => {
	it('should remove the jsonpath to the paths collection', () => {
		const myList = Immutable.List(['jsonpath', 'somestuff']);
		const myMap = Immutable.Map({ 0: myList });
		const newCollection = removePathsFromCollection(0, myMap, myList, 'jsonpath');
		expect(newCollection.get(0)).toEqual(Immutable.List(['somestuff']));
	});
});

describe('TreeManager#onToggle', () => {
	const event = {};
	const props = {
		wrappedComponent: jest.fn(),
		setState: jest.fn(),
	};
	it('when the handler emitter is an union, and has been click for the first time', () => {
		// given
		const options = {
			firstClickUnion: true,
		};
		// when
		const setStateSpy = jest.spyOn(TreeManager.prototype, 'setState');
		const wrapper = shallow(<TreeManager {...props} />);
		wrapper.instance().onToggle(event, options, 0);
		// then nothing
		expect(setStateSpy).not.toHaveBeenCalled();
	});
	it('default', () => {
		// when
		const options = {
			firstClickUnion: false,
		};
		// given
		const setStateSpy = jest.spyOn(TreeManager.prototype, 'setState');
		const wrapper = shallow(<TreeManager {...props} />);
		wrapper.instance().onToggle(event, options, 0);
		// then
		expect(setStateSpy).toHaveBeenCalled();
		// expect(wrapper.state('expandedNodes'));
	});
});
