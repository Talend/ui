import { isSafeUrl } from '@talend/utils';

/**
 * Drop the `href` prop when it does not resolve to an http(s) url (or a relative one),
 * so a `javascript:` or `data:` url coming from data is never rendered on an anchor.
 * HTML attribute names are case-insensitive, so any non canonical casing variant
 * (`HREF`, `Href`, ...) is always dropped: it could otherwise override the validated `href`.
 * The returned props then behave as a click-only entry.
 * @param {object} props props that may contain an href
 * @returns {object} the same props, or a copy without the unsafe href and its casing variants
 */
export default function sanitizeHref(props) {
	if (!props) {
		return props;
	}
	const keys = Object.keys(props);
	const hasVariant = keys.some(key => key !== 'href' && key.toLowerCase() === 'href');
	const hasUnsafeHref = 'href' in props && !isSafeUrl(props.href);
	if (!hasVariant && !hasUnsafeHref) {
		return props;
	}
	return Object.fromEntries(
		Object.entries(props).filter(
			([key]) => key.toLowerCase() !== 'href' || (key === 'href' && !hasUnsafeHref),
		),
	);
}
