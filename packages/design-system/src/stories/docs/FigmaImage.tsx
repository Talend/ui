import { useContext, useState, useEffect, memo } from 'react';
import type { ImgHTMLAttributes } from 'react';
import { FileImageResponse } from 'figma-js';

import styles from './FigmaImage.module.scss';

import FigmaContext from './FigmaContext';

function getMetadata(url: string) {
	const parsedUrl = new URL(url);
	return {
		projectId: parsedUrl.pathname.split('/')[2],
		nodeId: parsedUrl.searchParams.get('node-id'),
	};
}

const FigmaImagePlaceholder = memo(() => {
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

const FigmaImage = ({
	src,
	alt = '',
	full = false,
	...rest
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; full?: boolean }) => {
	const figma = useContext(FigmaContext);

	const [fileImageResponse, setFileImageResponse] = useState<FileImageResponse>();

	useEffect(() => {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('/sw.js').then(
					registration => {
						// Registration was successful
						// eslint-disable-next-line no-console
						console.log('ServiceWorker registration successful with scope: ', registration.scope);
					},
					err => {
						// registration failed :(
						// eslint-disable-next-line no-console
						console.log('ServiceWorker registration failed: ', err);
					},
				);
			});
		} else {
			// eslint-disable-next-line no-console
			console.log('Service workers are not supported.');
		}
	}, []);

	useEffect(() => {
		if (src) {
			const { projectId, nodeId } = getMetadata(src);
			figma
				.fileImages(projectId, {
					ids: [nodeId || ''],
				})
				.then(({ data }) => setFileImageResponse(data))
				.catch(reason => {
					console.error(
						'[FigmaImage] Verify that you use STORYBOOK_FIGMA_ACCESS_TOKEN correctly!',
						reason,
					);
				});
		}
	}, [src, figma]);

	if (!figma.isConfigured) {
		return <FigmaImagePlaceholder />;
	}

	if (!fileImageResponse) {
		return <span>Fetching data from Figma server...</span>;
	}

	return Object.values(fileImageResponse.images).map((image: string, index: number) => (
		<figure className={styles.image} key={index}>
			<img
				style={{
					width: full ? '100%' : 'auto',
				}}
				src={image}
				alt={alt}
				{...rest}
			/>
		</figure>
	));
};

export default FigmaImage;
