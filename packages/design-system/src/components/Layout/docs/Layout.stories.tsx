import React from 'react';
import { Area } from '~docs';

import Layout from '../Layout';
import Column from '../Column';

export default {
	title: 'Components/Layout',

	parameters: {
		component: Layout,
	},
};

export const Full = () => (
	<Layout
		hasScreenHeight
		header={<Area>Header</Area>}
		nav={<Area>Nav</Area>}
		main={<Area>Main</Area>}
		aside={<Area>Aside</Area>}
		footer={<Area>Footer</Area>}
	/>
);

export const MainOnly = () => <Layout hasScreenHeight main={<Area>Main</Area>} />;

export const WithoutNav = () => (
	<Layout
		hasScreenHeight
		header={<Area>Header</Area>}
		main={<Area>Main</Area>}
		footer={<Area>Footer</Area>}
	/>
);

export const WithoutFooter = () => (
	<Layout
		hasScreenHeight
		header={<Area>Header</Area>}
		nav={<Area>Nav</Area>}
		main={<Area>Main</Area>}
	/>
);

export const FullColumn = ({ footer = true }: { footer?: boolean }) => (
	<Column
		heading={<Area>Heading</Area>}
		body={<Area style={{ height: '200rem' }}>Body</Area>}
		footer={footer ? <Area>Footer</Area> : null}
	/>
);

export const Card = () => <Area style={{ flex: '0 0 25rem', height: '25rem' }}>Card</Area>;
