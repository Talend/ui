import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

const Iframe = styled.iframe`
	border-radius: 0.4rem;
	box-shadow: rgb(0 0 0 / 10%) 0 1px 3px 0;
	border: 1px solid rgba(0, 0, 0, 0.1);
`;

const iframeProps = {
	height: 600,
	width: '100%',
	allowFullScreen: true,
};

const FigmaIframe = ({ light, dark, ...rest }: { light?: DefaultTheme; dark?: DefaultTheme }) => (
	<>
		{light && (
			<Iframe
				{...iframeProps}
				{...rest}
				className="figma-iframe figma-iframe--light"
				src={`https://www.figma.com/embed?embed_host=storybook&url=\
                  ${light}`}
			/>
		)}
		{dark && (
			<Iframe
				{...iframeProps}
				{...rest}
				className="figma-iframe figma-iframe--dark"
				src={`https://www.figma.com/embed?embed_host=storybook&url=\
				  ${dark}`}
			/>
		)}
	</>
);

export default FigmaIframe;
