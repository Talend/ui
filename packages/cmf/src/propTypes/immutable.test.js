import { Map, List } from 'immutable';
import { immutableMapPropType, immutableListPropType } from './immutable';

describe('immutableMapPropType', () => {
	it('should return null when prop is an Immutable.Map', () => {
		const props = { state: Map() };
		expect(immutableMapPropType(props, 'state', 'TestComponent')).toBeNull();
	});

	it('should return null when prop is undefined (optional)', () => {
		const props = {};
		expect(immutableMapPropType(props, 'state', 'TestComponent')).toBeNull();
	});

	it('should return null when prop is null (optional)', () => {
		const props = { state: null };
		expect(immutableMapPropType(props, 'state', 'TestComponent')).toBeNull();
	});

	it('should return Error when prop is a plain object', () => {
		const props = { state: {} };
		const result = immutableMapPropType(props, 'state', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
		expect(result.message).toContain('state');
		expect(result.message).toContain('TestComponent');
		expect(result.message).toContain('Immutable.Map');
	});

	it('should return Error when prop is an array', () => {
		const props = { state: [] };
		const result = immutableMapPropType(props, 'state', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});

	it('should return Error when prop is an Immutable.List', () => {
		const props = { state: List() };
		const result = immutableMapPropType(props, 'state', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});
});

describe('immutableMapPropType.isRequired', () => {
	it('should return Error when prop is undefined', () => {
		const props = {};
		const result = immutableMapPropType.isRequired(props, 'state', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});

	it('should return Error when prop is null', () => {
		const props = { state: null };
		const result = immutableMapPropType.isRequired(props, 'state', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});

	it('should return null when prop is an Immutable.Map', () => {
		const props = { state: Map() };
		expect(immutableMapPropType.isRequired(props, 'state', 'TestComponent')).toBeNull();
	});

	it('should return Error when prop is not an Immutable.Map', () => {
		const props = { state: {} };
		const result = immutableMapPropType.isRequired(props, 'state', 'TestComponent');
		expect(result).toBeInstanceOf(Error);
	});
});

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
