import React, { FunctionComponent } from 'react';
import { DocsContainer, DocsContainerProps } from '@storybook/addon-docs/blocks';
import TableOfContents from './TableOfContents';
import BackToTop from './BackToTop';

const DocsContainerHOC: FunctionComponent<DocsContainerProps> = props => {
	return (
		<React.Fragment>
			<TableOfContents />
			<DocsContainer {...props} />
			<BackToTop />
		</React.Fragment>
	);
};

export default DocsContainerHOC;
