import initStoryshots from '@storybook/addon-storyshots';

jest.mock('@storybook/addon-a11y', () => {
	function checkA11y(storyFn, context) {
		return storyFn(context);
	}
	return { checkA11y };
});

initStoryshots({
	configPath: 'src/Skeleton/__snapshots__',
});
