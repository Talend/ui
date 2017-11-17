import omit from 'lodash/omit';

const IGNORED_PROPS = [
	'bsStyle',
	'inProgress',
	'disabled',
	'hideLabel',
	'link',
	'onMouseDown',
	'tooltipPlacement',
	'tooltip',
	'tooltipLabel',
	'available',
];

export default function getRClick(action) {
	const { label, model, onClick, ...rest } = omit(action, IGNORED_PROPS);

	return (
		onClick &&
		(event =>
			onClick(event, {
				action: { label, ...rest },
				model,
			}))
	);
}
