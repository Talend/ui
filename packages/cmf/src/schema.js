import registry from './registry';

const SCHEMA_PREFIX = 'Schema';

function register(id, schema) {
	registry.register(`${SCHEMA_PREFIX}:${id}`, schema);
}

function get(id, context) {
	registry.getFromRegistry(`${SCHEMA_PREFIX}:${id}`, context);
}

export default {
	register,
	get,
};
