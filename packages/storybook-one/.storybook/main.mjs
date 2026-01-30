import { createMainConfig } from '@talend/scripts-config-storybook-lib/main';

const STORIES = [
	{
		titlePrefix: 'Design System',
		directory: `../../design-system/src`,
		files: `**/*.stories.@(tsx)`,
	},
	`../../components/src/**/*.stories.@(jsx|tsx)`,
	`../../forms/@(src|stories)/**/*.stories.@(jsx|tsx)`,
	`../../dataviz/src/**/*.stories.@(jsx|tsx)`,
	`../../icons/stories/**/*.stories.@(jsx|tsx)`,
	`../../faceted-search/stories/**/*.stories.@(jsx|tsx)`,
];

export default createMainConfig({
	stories: STORIES,
});
