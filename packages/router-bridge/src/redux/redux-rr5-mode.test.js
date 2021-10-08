import { push, replace } from './index';

describe('redux action - rr5 mode', () => {
	it('should return cmf router action on push', () => {
		// given
		const url = '/lol/mdr';
		const type = 'REDIRECT';

		// when
		const action = push(url, null, { type });

		// then
		expect(action).toEqual({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				args: [url, null],
				method: 'push',
			},
		});
	});

	it('should return cmf router action on replace', () => {
		// given
		const url = '/lol/mdr';
		const type = 'REDIRECT';

		// when
		const action = replace(url, null, { type });

		// then
		expect(action).toEqual({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				args: [url, null],
				method: 'replace',
			},
		});
	});
});
