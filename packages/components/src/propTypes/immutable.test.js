import { List, Map } from 'immutable';
import { immutableListPropType } from './immutable';

describe('immutableListPropType', () => {
	it('should return null when prop is an Immutable.List', () => {
		const props = { items: List() };
		expect(immutableListPropType(props, 'items', 'TestComponent')).toBeNull();
	});

	it('should return null when prop is undefined (optional)', () => {
		const props = {};
		expect(immutableListPropType(props, 'items', 'TestComponent')).toBeNull();
	});

	it('should return null when prop is null (optional)', () => {
		const props = { items: null };
		expect(immutableListPropType(props, 'items', 'TestComponent')).toBeNull();
	});

	it('should return Error when prop is a plain array', () => {
		const props = { items: [] };
		const result = immutableListPropType(props, 'items', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toContain('items');
		expect(result.message).toContain('TestComponent');
		expect(result.message).toContain('Immutable.List');
	});

	it('should return Error when prop is a plain object', () => {
		const props = { items: {} };
		const result = immutableListPropType(props, 'items', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});

	it('should return Error when prop is an Immutable.Map', () => {
		const props = { items: Map() };
		const result = immutableListPropType(props, 'items', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});
});

describe('immutableListPropType.isRequired', () => {
	it('should return Error when prop is undefined', () => {
		const props = {};
		const result = immutableListPropType.isRequired(props, 'items', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});

	it('should return Error when prop is null', () => {
		const props = { items: null };
		const result = immutableListPropType.isRequired(props, 'items', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});

	it('should return null when prop is an Immutable.List', () => {
		const props = { items: List() };
		expect(immutableListPropType.isRequired(props, 'items', 'TestComponent')).toBeNull();
	});

	it('should return Error when prop is not an Immutable.List', () => {
		const props = { items: [] };
		const result = immutableListPropType.isRequired(props, 'items', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});
});
