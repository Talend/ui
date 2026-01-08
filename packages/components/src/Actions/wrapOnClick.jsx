/**
 * @typedef {Object} ActionProps
 * @property {TYPE_DROPDOWN | TYPE_SPLIT_DROPDOWN | TYPE_ICON_TOGGLE | TYPE_FILE} displayMode
 * @property {Object.<String, Component>} renderers
 */

function noOp() {}

export default function wrapOnClick(action) {
	const { model, onClick, ...rest } = action;
	const eventHandler = onClick || noOp;

	return event =>
		eventHandler(event, {
			action: { ...rest },
			model,
		});
}
