import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import HeaderBar from '../Header';
import Menu from '../Menu';
import Layout from '../Layout';
import FullHeight from '../FullHeightLayout';

import tokens from '../../../tokens';

export default {
	title: 'Components/Layout',

	parameters: {
		component: Layout,
	},
};

const Box = styled.div`
	display: flex;
	flex-basis: 100%;
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

const Header = () => (
	<HeaderBar>
		<strong>App name</strong>
	</HeaderBar>
);

const Nav = () => (
	<Menu>
		<Menu.Item iconBefore="information" href="#A" active>
			Link A
		</Menu.Item>
		<Menu.Item iconBefore="warning" href="#B">
			Link B
		</Menu.Item>
		<Menu.Item iconBefore="cross" href="#C">
			Link C
		</Menu.Item>
	</Menu>
);

const Main = () => (
	<section>
		<article>
			<header>Heading</header>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut vestibulum sapien. Donec
				accumsan, lorem at consequat semper, lacus neque consectetur ex, ut finibus dolor urna in
				justo. Nunc maximus arcu vitae nibh semper, quis luctus magna vestibulum. Curabitur quis
				mauris luctus, interdum erat laoreet, ultrices nulla. Sed non mauris hendrerit, tempus risus
				quis, finibus ligula. Proin in turpis tortor. Aliquam erat volutpat. Nunc vitae egestas
				felis. Praesent scelerisque sit amet mauris eget tristique. Nullam a ipsum libero.
			</p>
		</article>
	</section>
);

const FullScreenHeightLayout = props => <Layout hasScreenHeight hasOverflow={false} {...props} />;

export const Full = () => (
	<FullScreenHeightLayout
		header={<Box>Header</Box>}
		nav={<Box>Nav</Box>}
		main={<Box>Main</Box>}
		aside={<Box>Aside</Box>}
		footer={<Box>Footer</Box>}
	/>
);

export const MainOnly = () => <FullScreenHeightLayout main={<Box>Main</Box>} />;

export const WithoutNav = () => (
	<FullScreenHeightLayout
		header={<Box>Header</Box>}
		main={<Box>Main</Box>}
		footer={<Box>Footer</Box>}
	/>
);

export const WithoutFooter = () => (
	<FullScreenHeightLayout header={<Box>Header</Box>} nav={<Box>Nav</Box>} main={<Box>Main</Box>} />
);

const FullInContainer = ({ footer = true }) => (
	<FullHeight
		heading={<Box>Heading</Box>}
		body={<Box style={{ height: '200rem' }}>Body</Box>}
		footer={footer ? <Box>Footer</Box> : null}
	/>
);

export const Composed = () => (
	<FullScreenHeightLayout
		header={<Header />}
		nav={<Nav />}
		main={<FullInContainer footer={false} />}
	/>
);
export const ComposedWithAside = () => (
	<FullScreenHeightLayout
		header={<Header />}
		nav={<Nav />}
		main={<FullInContainer footer={false} />}
		aside={<FullInContainer />}
	/>
);
