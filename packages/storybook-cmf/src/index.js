import React from 'react';
import CMFStory from './CMFStory';
import CMFDecorator from './CMFDecorator';
import register from './register';

export default {
	addWithCMF(storyName, storyFn, options) {
		let add = this.add;
		if (this.addWithInfo) {
			add = this.addWithInfo;
		}
		let state;
		if (options) {
			state = options.state;
		}
		if (!state) {
			state = null;
		}
		add(storyName, () => (
			<CMFStory
				state={state}
				reducer={options.reducer}
				enhancer={options.enhancer}
				middleware={options.middleware}
			>
				{storyFn()}
			</CMFStory>
		), { showInline: true });
	},
};

export {
	CMFDecorator,
	CMFStory,
	register,
};
