import React, { PropsWithChildren } from 'react';

import Layout from '../components/Layout';

export type FullProps = PropsWithChildren<any> & {
	header?: React.ReactElement<any>;
};

const Full: React.FC<FullProps> = ({ header, children }: FullProps) => (
	<Layout hasScreenHeight header={header}>
		{children}
	</Layout>
);

export default Full;
