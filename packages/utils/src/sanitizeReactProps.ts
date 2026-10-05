const blockedPropNames = [
	'__proto__',
	'constructor',
	'prototype',
	'dangerouslySetInnerHTML',
	'innerHTML',
	'outerHTML',
	'srcDoc',
	'componentClass',
	'as',
	'forwardedAs',
	'ref',
	'children',
] as const;

const blockedProps = new Set(blockedPropNames.map(key => key.toLowerCase()));

type BlockedProp = (typeof blockedPropNames)[number];

export function sanitizeReactProps<Props extends object, ExtraBlockedProp extends string = never>(
	props: Props,
	extraBlockedProps: readonly ExtraBlockedProp[] = [],
): Omit<Props, BlockedProp | ExtraBlockedProp> {
	const result: Record<string, unknown> = {};
	const blockedLower = new Set(extraBlockedProps.map(key => key.toLowerCase()));
	for (const key of Object.keys(props)) {
		const normalizedKey = key.toLowerCase();
		if (!blockedProps.has(normalizedKey) && !blockedLower.has(normalizedKey)) {
			result[key] = (props as Record<string, unknown>)[key];
		}
	}
	return result as Omit<Props, BlockedProp | ExtraBlockedProp>;
}
