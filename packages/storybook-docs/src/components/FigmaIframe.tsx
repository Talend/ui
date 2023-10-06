import classnames from 'classnames';

import styles from './FigmaIframe.module.scss';

const iframeProps = {
	height: 600,
	width: '100%',
	allowFullScreen: true,
};

export const FigmaIframe = ({ light, dark, ...rest }: { light?: string; dark?: string }) => (
	<>
		{light ? (
			<iframe
				title="Figma"
				{...iframeProps}
				{...rest}
				className={classnames(styles.iframe, 'figma-iframe figma-iframe--light')}
				src={`https://www.figma.com/embed?embed_host=storybook&url=\
                  ${light}`}
			/>
		) : null}
		{dark ? (
			<iframe
				title="Figma"
				{...iframeProps}
				{...rest}
				className={classnames(styles.iframe, 'figma-iframe figma-iframe--dark')}
				src={`https://www.figma.com/embed?embed_host=storybook&url=\
				  ${dark}`}
			/>
		) : null}
	</>
);
