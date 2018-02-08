import registry from './registry';

export function register(id, saga, context) {
	registry.addToRegistry(`SAGA_${id}`, saga, context);
}

export function get(id, context) {
	return registry.getFromRegistry(`SAGA_${id}`, context);
}
