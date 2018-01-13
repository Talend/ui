import mock from '../src/mock';
import actionCreatorAPI from '../src/actionCreator';

describe('CMF action', () => {
	let context;

	beforeEach(() => {
		context = mock.context();
	});

	it('get should return a function', () => {
		const id = 'myactioncreator';

		function creator() {}
		context.registry = {};
		context.registry[`actionCreator:${id}`] = creator;
		const actionCreator = actionCreatorAPI.get(context, id);
		expect(typeof actionCreator).toBe('function');
	});
	it('get should throw an error', () => {
		const id = 'myactioncreator';
		context.registry = {};
		const test = () => actionCreatorAPI.get(context, id);
		expect(test).toThrowError(`actionCreator not found in the registry: ${id}`);
	});
});
