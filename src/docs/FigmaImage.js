import React from 'react';
import styled from 'styled-components';

import FigmaContext from './FigmaContext';

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

const FigmaImagePlaceholder = React.memo(() => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '5rem',
				color: 'black',
				backgroundColor: 'gray',
				backgroundImage:
					'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.5) 35px, rgba(255,255,255,.5) 70px)',
				borderRadius: '.4rem',
				opacity: '.5',
			}}
		>
			Figma is not configured
		</div>
	);
});

const FigmaImage = ({ src, alt = '', ...rest }) => {
	const figma = React.useContext(FigmaContext);

	if (!figma.isConfigured) {
		return <FigmaImagePlaceholder />;
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
		figma
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
