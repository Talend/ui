import reduxLocalStorage from '../../src/reduxstorage/reduxLocalStorage';

describe('reduxLocalStorage', () => {
	it('should expose API', () => {
		expect(typeof reduxLocalStorage.loadInitialState).toBe('function');
		expect(typeof reduxLocalStorage.saveOnReload).toBe('function');
	});
	it('should saveOnReload listen the beforeunload event', () => {
		const original = window.addEventListener;
		const cstate = { foo: 'bar' };
		const listener = jest.fn();
		window.addEventListener = listener;
		reduxLocalStorage.saveOnReload({
			engine: {
				save: state => state,
			},
			store: {
				getState: () => cstate,
			},
		});
		window.addEventListener = original;
		expect(listener).toHaveBeenCalled();
	});
	it('should loadInitialState', (done) => {
		const localStorage = {
			'data-streams-redux': '{"cmf":{"components":{"SidePanel":{"default":{"toggle":true}}}}}',
		};
		function getItem(key) {
			return localStorage[key];
		}
		localStorage.getItem = getItem;
		const origin = window.localStorage;
		window.localStorage = localStorage;
		reduxLocalStorage
			.loadInitialState({
				key: 'data-streams-redux',
				whitelist: [['cmf', 'components', 'SidePanel'], ['cmf', 'components', 'Container(Form)']],
			})
			.then(
				(storage) => {
					expect(
						storage.initialState.cmf.components.getIn(['SidePanel', 'default', 'toggle'])
					).toBe(true);
					done();
					window.localStorage = origin;
				},
				(error) => {
					throw new Error(error);
				}
			);
	});
});
