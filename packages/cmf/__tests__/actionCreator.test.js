import { mock } from '../src';
import actionCreatorAPI from '../src/actionCreator';

describe('CMF action', () => {
	let context;

	beforeEach(() => {
		context = mock.store.context();
	});

	it('get should return a function', () => {
		const id = 'myactioncreator';

		function creator() {}
		context.registry = {};
		context.registry[`actionCreator:${id}`] = creator;
		const actionCreator = actionCreatorAPI.get(context, id);
		expect(typeof actionCreator).toBe('function');
	});

	it('get should throw an error if you try to get a not registred action creator', () => {
		const id = 'myactioncreator';
		context.registry = {};
		const test = () => actionCreatorAPI.get(context, id);
		expect(test).toThrowError(`actionCreator not found in the registry: ${id}`);
	});

	it('get should throw an error if you try to register undefined', () => {
		const id = 'myactioncreator';
		context.registry = {};
		const test = () => actionCreatorAPI.register(id, undefined, context);
		expect(test).toThrowError();
	});

	it('should register an actionCreator in context', () => {
		const creator = jest.fn();
		const id = 'myactioncreator';
		context.registry = {};
		actionCreatorAPI.register(id, creator, context);

		expect(context.registry).toEqual({
			'actionCreator:myactioncreator': creator,
		});
	});
});
