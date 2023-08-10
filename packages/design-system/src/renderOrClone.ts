import { cloneElement, isValidElement, type ReactNode } from 'react';

export type GeneratorFunction<T extends ReactNode, P, R = unknown> = (props: P, ref?: R) => T;

export type ChildOrGenerator<T extends ReactNode, P, R = unknown> = T | GeneratorFunction<T, P, R>;

/**
 * Utility function for `renderOrClone`.
 * This function is a trick to check if given element is a function but without loosing expected signature (generator function).
 * Is is barely like casting function when invoking it but in more elegant way.
 * @param element element to check
 * @returns true if element is a function. Because function's signature is restricted (see type `GeneratorFunction`) we can
 * infer it is a generator function
 */
function isGeneratorFunction<T extends ReactNode, P, R = unknown>(
	element: ChildOrGenerator<T, P, R>,
): element is GeneratorFunction<T, P, R> {
	return typeof element === 'function';
}

export function renderOrClone<T extends ReactNode, P, R = unknown>(
	children: ChildOrGenerator<T, P, R>,
	props: P,
	ref?: R,
) {
	if (isGeneratorFunction(children)) {
		return children(props, ref);
	}

	if (isValidElement(children) && props) {
		return cloneElement(children, { ref, ...props });
	}

	// If here it means "children" is not a function nor a clonable element - so return it
	return children as T;
}
