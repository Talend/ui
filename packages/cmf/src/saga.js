import registry from './registry';

export function register(id, saga, context) {
	registry.addToRegistry(`SAGA:${id}`, saga, context);
}

export function get(id, context) {
	return registry.getFromRegistry(`SAGA:${id}`, context);
}

export const registerMany = registry.getRegisterMany(register);
