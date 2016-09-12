jest.mock('react-router');
jest.mock('react-router-redux', () => {
	return {
		syncHistoryWithStore(module, store) {
			return { module, store };
		},
	};
});
import { hashHistory } from 'react-router';
import history from '../src/history';

describe('uiAbstraction history', () => {
	it('shoud expose a get method', () => {
		expect(typeof history.get).toBe('function');
	});
	it('shoud return an history object for the router', () => {
		const store = {};
		const routerHistory = history.get(store);
		expect(typeof routerHistory).toBe('object');
		expect(routerHistory.module).toBe(hashHistory);
		expect(routerHistory.store).toBe(store);
	});
});
