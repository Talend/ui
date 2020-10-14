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
		nodeId: parsedUrl.searchParams.get("node-id"), 
	};
}

const FigmaImage = ({ src, alt, ...rest }) => {
	const [data, setData] = React.useState();

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
