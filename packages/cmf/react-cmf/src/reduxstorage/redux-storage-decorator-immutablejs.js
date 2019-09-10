// FIXME: should be contribution
import { fromJS } from 'immutable';

export default (engine, whitelist = []) => ({
	...engine,

	load() {
		if (process.env.NODE_ENV !== 'production') {
			// eslint-disable-next-line no-console
			console.warn('DEPRECATED: this API will be removed in the next major release');
		}
		return engine.load().then(result => {
			whitelist.forEach(keys => {
				if (typeof keys === 'string') {
					keys = [keys]; // eslint-disable-line no-param-reassign
				}
				let tmp = result;
				keys.forEach((key, index) => {
					if (tmp && index === keys.length - 1) {
						tmp[key] = fromJS(tmp[key]);
					} else if (tmp) {
						tmp = tmp[key];
					}
				});
			});
			return result;
		});
	},
});
