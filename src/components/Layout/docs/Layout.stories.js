import React from 'react';
import styled from 'styled-components';
import Layout from '../Layout';
import Column from '../Column';

export default {
	title: 'Components/Layout',

	parameters: {
		component: Layout,
	},
};

const Box = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	margin: 1rem;
	padding: 0.5rem;
	min-height: 0;
	font-weight: bold;
	font-size: 2rem;
	color: coral;
	background: cornsilk;
	border: 1px dashed coral;
	border-radius: 1rem;
`;

export const Full = () => (
	<Layout
		hasScreenHeight
		header={<Box>Header</Box>}
		nav={<Box>Nav</Box>}
		main={<Box>Main</Box>}
		aside={<Box>Aside</Box>}
		footer={<Box>Footer</Box>}
	/>
);

export const MainOnly = () => <Layout hasScreenHeight main={<Box>Main</Box>} />;

export const WithoutNav = () => (
	<Layout
		hasScreenHeight
		header={<Box>Header</Box>}
		main={<Box>Main</Box>}
		footer={<Box>Footer</Box>}
	/>
);

export const WithoutFooter = () => (
	<Layout hasScreenHeight header={<Box>Header</Box>} nav={<Box>Nav</Box>} main={<Box>Main</Box>} />
);

const FullColumn = ({ footer = true }) => (
	<Column
		heading={<Box>Heading</Box>}
		body={<Box style={{ height: '200rem' }}>Body</Box>}
		footer={footer ? <Box>Footer</Box> : null}
	/>
);

const Card = () => <Box style={{ flex: '0 0 25rem', height: '25rem' }}>Card</Box>;
