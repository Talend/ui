import React from 'react';
import CMFStory from './CMFStory';
import CMFDecorator from './CMFDecorator';
import register from './register';

export default {
	addWithCMF(storyName, storyFn, options) {
		let add = this.add;
		if (this.add) {
			add = this.add;
		}
		let state;
		if (options) {
			state = options.state;
		}
		if (!state) {
			state = null;
		}
		add(
			storyName,
			() => (
				<CMFStory
					state={state}
					reducer={options.reducer}
					enhancer={options.enhancer}
					middleware={options.middleware}
					sagaMiddleware={options.sagaMiddleware}
				>
					{storyFn()}
				</CMFStory>
			),
			{ showInline: true },
		);
	},
};

export { CMFDecorator, CMFStory, register };
