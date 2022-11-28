import React from 'react';
import classnames from 'classnames';

import styles from './FigmaIframe.module.scss';

const iframeProps = {
	height: 600,
	width: '100%',
	allowFullScreen: true,
};

const FigmaIframe = ({ light, dark, ...rest }: { light?: string; dark?: string }) => (
	<>
		{light && (
			<iframe
				{...iframeProps}
				{...rest}
				className={classnames(styles.iframe, 'figma-iframe figma-iframe--light')}
				src={`https://www.figma.com/embed?embed_host=storybook&url=\
                  ${light}`}
			/>
		)}
		{dark && (
			<iframe
				{...iframeProps}
				{...rest}
				className={classnames(styles.iframe, 'figma-iframe figma-iframe--dark')}
				src={`https://www.figma.com/embed?embed_host=storybook&url=\
				  ${dark}`}
			/>
		)}
	</>
);

export default FigmaIframe;
