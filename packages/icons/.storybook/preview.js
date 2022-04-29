import React from 'react';
import addons from '@storybook/addons';
import { DocsContainer } from '@storybook/addon-docs';
import { themes } from '@storybook/theming';
import { DARK_MODE_EVENT_NAME, UPDATE_DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

export const parameters = {
	darkMode: {
		dark: { ...themes.dark },
		light: { ...themes.light },
	},
	docs: {
		container: props => {
			const [isDark, setDark] = React.useState();

			const onChangeHandler = () => {
				channel.emit(UPDATE_DARK_MODE_EVENT_NAME);
			};

			React.useEffect(() => {
				channel.on(DARK_MODE_EVENT_NAME, setDark);
				return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
			}, [channel, setDark]);

			React.useEffect(() => {
				document.body.dataset.theme = isDark ? 'dark' : 'light';
			}, [isDark]);

			const { id: storyId, storyById } = props.context;
			const {
				parameters: { docs = {} },
			} = storyById(storyId);
			docs.theme = isDark ? themes.dark : themes.light;

			return (
				<div>
					{/*
					<input type="checkbox" onChange={onChangeHandler} checked={isDark} />
					*/}
					<DocsContainer {...props} />
				</div>
			);
		},
	},
};
