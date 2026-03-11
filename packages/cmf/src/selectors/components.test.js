import { Map, List, fromJS } from 'immutable';
import { describe, it, expect } from 'vitest';
import { getComponentState, getAllComponentStates, getComponentStateProperty } from './components';

const makeState = componentsMap => ({
	cmf: {
		components: fromJS(componentsMap),
	},
});

describe('components.getComponentState', () => {
	const state = makeState({
		'Container(List)': {
			default: { searchQuery: 'hello', sortBy: 'name' },
			other: { searchQuery: 'world' },
		},
	});

	it('returns plain JS object for a known component instance', () => {
		const result = getComponentState(state, 'Container(List)', 'default');
		expect(result).toEqual({ searchQuery: 'hello', sortBy: 'name' });
		expect(typeof result.get).toBe('undefined');
	});

	it('returns undefined for an unknown component name', () => {
		expect(getComponentState(state, 'Unknown', 'default')).toBeUndefined();
	});

	it('returns undefined for an unknown instance id', () => {
		expect(getComponentState(state, 'Container(List)', 'missing')).toBeUndefined();
	});
});

describe('components.getAllComponentStates', () => {
	const state = makeState({
		'Container(List)': {
			default: { searchQuery: '' },
			secondary: { searchQuery: 'test' },
		},
	});

	it('returns all instances as plain JS object', () => {
		const result = getAllComponentStates(state, 'Container(List)');
		expect(result).toEqual({
			default: { searchQuery: '' },
			secondary: { searchQuery: 'test' },
		});
		expect(typeof result.get).toBe('undefined');
	});

	it('returns undefined for an unknown component name', () => {
		expect(getAllComponentStates(state, 'Unknown')).toBeUndefined();
	});
});

describe('components.getComponentStateProperty', () => {
	const notifications = new List([{ id: '1', message: 'Hi' }]);
	const state = {
		cmf: {
			components: new Map({
				'Container(Notification)': new Map({
					Notification: new Map({
						notifications,
					}),
				}),
				'Container(List)': new Map({
					default: new Map({
						searchQuery: 'test',
					}),
				}),
			}),
		},
	};

	it('returns plain scalar value for a string property', () => {
		const result = getComponentStateProperty(state, 'Container(List)', 'default', 'searchQuery');
		expect(result).toBe('test');
	});

	it('returns plain JS array for an Immutable List property', () => {
		const result = getComponentStateProperty(
			state,
			'Container(Notification)',
			'Notification',
			'notifications',
		);
		expect(result).toEqual([{ id: '1', message: 'Hi' }]);
		expect(Array.isArray(result)).toBe(true);
	});

	it('returns undefined for an unknown component', () => {
		expect(getComponentStateProperty(state, 'Unknown', 'default', 'foo')).toBeUndefined();
	});

	it('returns undefined for a missing property', () => {
		expect(
			getComponentStateProperty(state, 'Container(List)', 'default', 'notExist'),
		).toBeUndefined();
	});

	it('returns defaultValue when component state is not found', () => {
		expect(getComponentStateProperty(state, 'Unknown', 'default', 'foo', [])).toEqual([]);
	});

	it('returns defaultValue when property is not found', () => {
		expect(
			getComponentStateProperty(state, 'Container(List)', 'default', 'notExist', 'fallback'),
		).toBe('fallback');
	});
});
