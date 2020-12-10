import React from 'react';
import styled from 'styled-components';
import * as Figma from 'figma-js';

const client = Figma.Client({
	personalAccessToken: process.env.STORYBOOK_FIGMA_ACCESS_TOKEN,
});

const Figure = styled.figure`
	display: flex;
	align-items: center;
	justify-content: center;
`;

function getMetadata(url) {
	const parsedUrl = new URL(url);
	return {
		projectId: parsedUrl.pathname.split('/')[2],
		nodeId: parsedUrl.searchParams.get('node-id'),
	};
}

const FigmaImage = ({ src, alt = '', ...rest }) => {
	if (!process.env.STORYBOOK_FIGMA_ACCESS_TOKEN) {
		return (
			<div
				style={{
					height: '5rem',
					color: 'black',
					backgroundColor: 'gray',
					backgroundImage:
						'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)',
					borderRadius: '.4rem',
					opacity: '.5',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				Figma is not configured
			</div>
		);
	}

	const [data, setData] = React.useState();

	React.useEffect(() => {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('/sw.js').then(
					registration => {
						// Registration was successful
						console.log('ServiceWorker registration successful with scope: ', registration.scope);
					},
					err => {
						// registration failed :(
						console.log('ServiceWorker registration failed: ', err);
					},
				);
			});
		} else {
			console.log('Service workers are not supported.');
		}
	}, []);

	React.useEffect(() => {
		const { projectId, nodeId } = getMetadata(src);
		client
			.fileImages(projectId, {
				ids: [nodeId],
			})
			.then(({ data }) => setData(data));
	}, [src]);

	if (!data) {
		return <span>Fetching data from Figma server...</span>;
	}

	return Object.values(data.images).map((image, index) => (
		<Figure key={index}>
			<img src={image} alt={alt} {...rest} />
		</Figure>
	));
};

export default FigmaImage;
