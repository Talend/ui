import { fn as action } from 'storybook/test';

export default {
	isTrueExpression: (context, first) => {
		action()(context, first);
		return !!first;
	},
	isFlagExpression: (config, flagId) => {
		const flagStatus = config.context.store.getState().app.flags[flagId];
		action()(config, flagId, flagStatus);
		return flagStatus;
	},
	getItems: () => [
		{ label: 'label1', actionCreator: 'item1:action' },
		{ label: 'label2', actionCreator: 'item2:action' },
	],
	modelHasLabel: context => {
		action()(context);
		return !!context.payload.model.label;
	},
};
