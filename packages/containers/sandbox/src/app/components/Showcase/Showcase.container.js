import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from '@talend/react-components';
import { Inject } from '@talend/react-cmf';

import EmptyShowcase from './EmptyShowcase';
import theme from './Showcase.scss';

const Showcase = ({ content }) => {
	const child = content.component === 'EmptyShowcase'
		? <EmptyShowcase />
		: <Inject {...content} />;

	return (
		<Layout
			mode="TwoColumns"
			header={<Inject component="HeaderBar" />}
			one={<Inject component="SidePanel" />}
		>
			<div className={theme['showcase-component']}>{child}</div>
		</Layout>
	);
};

Showcase.displayName = 'Showcase';

Showcase.propTypes = {
	content: PropTypes.object,
};

export default Showcase;
