jest.mock('react-router-dom', () => {
	throw new Error();
});

import { push, replace } from './index';

describe('redux action - legacy mode', () => {
	it('should return cmf router action on push', () => {
		// given
		const url = '/lol/mdr';
		const type = 'REDIRECT';

		// when
		const action = push(url, null, { type });

		// then
		expect(action).toEqual({
			type,
			cmf: {
				routerPush: url,
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
			type,
			cmf: {
				routerReplace: url,
			},
		});
	});
});
