import cmf from '@talend/react-cmf';

import { fetch, show, hide } from './AboutDialog.sagas';
import Connected from './AboutDialog.connect';
import Constants from './AboutDialog.constant';

describe('AboutDialog sagas', () => {
	describe('fetch', () => {
		const url = '/foo/bar';
		const action = { url };
		const response = {
			displayVersion: 'Summer 18',
			services: [
				{
					versionId: '2.7.1-SNAPSHOT',
					buildId: '46a37b5-4906068-302d47a',
					serviceName: 'API',
				},
				{
					versionId: '2.7.1-SNAPSHOT',
					buildId: '46a37b5-4906068-302d47a',
					serviceName: 'Preparation',
				},
				{
					versionId: '2.7.1-SNAPSHOT',
					buildId: '46a37b5-4906068-302d47a',
					serviceName: 'Transformation',
				},
			],
		};
		const converted = {
			version: 'Summer 18',
			services: [
				{
					version: '2.7.1-SNAPSHOT',
					build: '46a37b5-4906068-302d47a',
					name: 'API',
				},
				{
					version: '2.7.1-SNAPSHOT',
					build: '46a37b5-4906068-302d47a',
					name: 'Preparation',
				},
				{
					version: '2.7.1-SNAPSHOT',
					build: '46a37b5-4906068-302d47a',
					name: 'Transformation',
				},
			],
		};

		it('should fetch AboutDialog versions', () => {
			const httpResponse = { response: { ok: true }, data: response };

			const gen = fetch(action);

			// Toggle loading flag
			let effect = gen.next().value;
			let expected = Connected.setStateAction({ loading: true });
			expect(effect.payload.action).toEqual(expected);

			// HTTP call
			effect = gen.next().value;
			expect(effect.payload.fn).toEqual(cmf.sagas.http.get);
			expect(effect.payload.args).toEqual([url]);

			// Update CMF collections
			effect = gen.next(httpResponse).value;
			expected = cmf.actions.collections.addOrReplace(Constants.COLLECTION_ID, converted);
			expect(effect.payload.action).toEqual(expected);

			// Toggle fetching flag
			effect = gen.next().value;
			expected = Connected.setStateAction({ loading: false });
			expect(effect.payload.action).toEqual(expected);

			const { done } = gen.next();

			expect(done).toBe(true);
		});
	});

	it('should hide the about modal', () => {
		const gen = hide();

		const effect = gen.next().value;
		const expected = Connected.setStateAction({ show: false });
		expect(effect.payload.action).toEqual(expected);

		expect(gen.next().done).toBe(true);
	});

	it('should show the about modal', () => {
		const gen = show({ payload: { url: 'hey' } });

		const effect = gen.next().value;

		const expected = Connected.setStateAction({ show: true });
		expect(effect.payload[0].payload.action).toEqual(expected);

		expect(effect.payload[1].payload.args).toEqual([{ payload: { url: 'hey' } }]);

		expect(gen.next().done).toBe(true);
	});
});
