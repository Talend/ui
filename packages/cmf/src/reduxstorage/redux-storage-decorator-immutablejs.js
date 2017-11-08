// FIXME: should be contribution
import { fromJS } from 'immutable';

export default (engine, whitelist = []) => ({
	...engine,

	load() {
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
