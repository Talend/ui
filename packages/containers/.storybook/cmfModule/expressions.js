import { action } from '@storybook/addon-actions';

export default {
	isTrueExpression: (context, first) => {
		action('isTrueExpression')(context, first);
		return !!first;
	},
	isFlagExpression: (config, flagId) => {
		const flagStatus = config.context.store.getState().app.flags[flagId];
		action('isFlagExpression')(config, flagId, flagStatus);
		return flagStatus;
	},
	getItems: () => [
		{ label: 'label1', actionCreator: 'item1:action' },
		{ label: 'label2', actionCreator: 'item2:action' },
	],
	modelHasLabel: context => {
		action('modelHasLabel')(context);
		return !!context.payload.model.label;
	},
};
