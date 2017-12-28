import React from 'react';
import { storiesOf } from '@storybook/react';
import { icons, headerProps, sidePanelProps } from './branding/branding';
import { HeaderBar, SidePanel, IconsProvider, Layout } from '../src/index';
import BrandingConfigurer from './branding/BrandingConfigurer';

storiesOf('Branding')
	.addDecorator(story => (
		<div>
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.addWithInfo('default', () => {
		const header = (<HeaderBar {...headerProps} />);
		const sidePanel = (<SidePanel {...sidePanelProps} />);
		return (
			<Layout
				header={header}
				mode="TwoColumns"
				one={sidePanel}
			>
				<BrandingConfigurer />
			</Layout>
		);
	});
