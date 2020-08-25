import React from 'react';

import Layout from '../components/Layout';

export type FullProps = {
	header?: React.ReactElement<any>;
	main?: React.ReactElement<any>;
};

const Full: React.FC<FullProps> = ({ header, main }: FullProps) => (
	<Layout hasScreenHeight header={header} main={main} />
);

export default Full;
