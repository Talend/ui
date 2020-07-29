import React from 'react';

import Layout from '../Layout';

export default {
	title: 'Components/Layout',

	parameters: {
		component: Layout,
	},
};

const Header = () => <h1>Header</h1>;

const Aside = () => (
	<nav>
		<ul>
			<li>Link A</li>
			<li>Link B</li>
			<li>Link C</li>
		</ul>
	</nav>
);

const Main = () => (
	<section>
		<h1>Heading</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut vestibulum sapien. Donec
			accumsan, lorem at consequat semper, lacus neque consectetur ex, ut finibus dolor urna in
			justo. Nunc maximus arcu vitae nibh semper, quis luctus magna vestibulum. Curabitur quis
			mauris luctus, interdum erat laoreet, ultrices nulla. Sed non mauris hendrerit, tempus risus
			quis, finibus ligula. Proin in turpis tortor. Aliquam erat volutpat. Nunc vitae egestas felis.
			Praesent scelerisque sit amet mauris eget tristique. Nullam a ipsum libero.
		</p>
	</section>
);

const Footer = () => (
	<div>
		<ul>
			<li>Link a</li>
			<li>Link b</li>
			<li>Link c</li>
		</ul>
		<span>© 2020 Cobalt</span>
	</div>
);

const FullScreenHeightLayout = props => <Layout hasScreenHeight {...props} />;

export const Full = () => (
	<FullScreenHeightLayout
		header={<Header />}
		aside={<Aside />}
		main={<Main />}
		footer={<Footer />}
	/>
);
export const MainOnly = () => <FullScreenHeightLayout main={<Main />} />;
export const WithoutHeader = () => (
	<FullScreenHeightLayout aside={<Aside />} main={<Main />} footer={<Footer />} />
);
export const WithoutAside = () => (
	<FullScreenHeightLayout header={<Header />} main={<Main />} footer={<Footer />} />
);
export const WithoutFooter = () => (
	<FullScreenHeightLayout header={<Header />} aside={<Aside />} main={<Main />} />
);

const Container = ({ children }) => (
	<div className="flex overflow-hidden border-solid border-4 border-gray-600">{children}</div>
);

export const InContainer = () => (
	<Container>
		<Layout main={<Main />} footer={<Footer />} />
	</Container>
);
export const FullInContainer = () => (
	<Container>
		<Layout header={<Header />} main={<Main />} footer={<Footer />} />
	</Container>
);

export const Composed = () => (
	<FullScreenHeightLayout
		hasOverflow={false}
		header={<Header />}
		aside={<Aside />}
		main={
			<Container>
				<Layout header={<Header />} main={<Main />} footer={<Footer />} />
			</Container>
		}
		footer={<Footer />}
	/>
);
