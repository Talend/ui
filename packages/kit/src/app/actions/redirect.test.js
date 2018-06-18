import redirect from './redirect';

describe('Redirect action', () => {
	it('should create a CMF redirection action', () => {
		// given
		const event = {};
		const data = {
			action: { path: '/my/resource/$id/history' },
			model: { id: 'myModelId' },
		};

		// when
		const action = redirect(event, data);

		// then
		expect(action).toMatchSnapshot();
	});
});
