import actionCreator from './actionCreator';
import expression from './expression';
import sagas from './sagas';

const cache = {};

// eslint-disable-next-line import/prefer-default-export
export function onLazyComponent(module) {
	if (!cache[module] && module.default) {
		cache[module] = true;
		if (module.default.actions) {
			actionCreator.registerMany(module.default.actions);
		}
		if (module.default.expressions) {
			expression.registerMany(module.default.expressions);
		}
		if (module.default.sagas) {
			sagas.registerMany(module.default.sagas);
		}
	}
	return module;
}
