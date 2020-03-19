import { useMemo } from 'react';
import { sfPath } from '@talend/json-schema-form-core';

function getName(key) {
	if (!key) {
		return undefined;
	}
	const dotKey = key.join('.');

	// on arrays, we need to use bracket notation for RHF to nest the elements in an array
	// replace the '.number.' instances by '[number]'
	// ex: users.3.identities.0.firstname
	// - should match .3. and .0.
	// - returns users[3].identities[0].firstname
	const name = dotKey.replace(/\.([0-9]+)\./g, dotIndex =>
		dotIndex.replace('.', '[').replace('.', '].'),
	);

	// match the '.number' at the end
	// ex: users[3]identities.0
	// - should match .0
	// - returns users[3]identities[0]
	return name.replace(/\.([0-9]+)$/, dotIndex => `[${dotIndex.replace('.', '')}]`);
}

export default function useIdentifiers({ schema, id }) {
	const { key } = schema;
	return useMemo(
		() => ({
			name: getName(key),
			id: sfPath.name(key, '_', id),
		}),
		[key, id],
	);
}
