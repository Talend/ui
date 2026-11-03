import { isSafeUrl } from '@talend/utils';

/**
 * Drop the `href` prop when it does not resolve to an http(s) url (or a relative one),
 * so a `javascript:` or `data:` url coming from data is never rendered on an anchor.
 * The returned props then behave as a click-only entry.
 * @param {object} props props that may contain an href
 * @returns {object} the same props, or a copy without the unsafe href
 */
export default function sanitizeHref(props) {
	if (!props || !('href' in props) || isSafeUrl(props.href)) {
		return props;
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { href, ...safeProps } = props;
	return safeProps;
}
