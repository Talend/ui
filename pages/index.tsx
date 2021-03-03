import React from 'react';

import { Button, IconsProvider, Link, Tag, ThemeProvider } from '../src';

export default function () {
	return (
		<ThemeProvider>
			<ThemeProvider.GlobalStyle />
			<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
			<h1>Catalog</h1>
			<section>
				<h2>Links</h2>
				<Link href="#">Link</Link>
			</section>
			<section>
				<h2>Buttons</h2>
				<h3>Primary</h3>
				<Button.Primary>Button primary</Button.Primary>
				<Button.Primary icon="talend-plus">Button primary</Button.Primary>
				<Button.Primary small>Button primary small</Button.Primary>
				<h3>Destructive</h3>
				<Button.Destructive>Button destructive</Button.Destructive>
				<Button.Destructive icon="talend-plus">Button destructive</Button.Destructive>
				<Button.Destructive small>Button destructive small</Button.Destructive>
				<h3>Secondary</h3>
				<Button.Secondary>Button secondary</Button.Secondary>
				<Button.Secondary icon="talend-plus">Button secondary</Button.Secondary>
				<Button.Secondary small>Button secondary small</Button.Secondary>
				<h3>Tertiary</h3>
				<Button.Tertiary>Button tertiary</Button.Tertiary>
				<Button.Tertiary icon="talend-plus">Button tertiary</Button.Tertiary>
				<Button.Tertiary small>Button tertiary small</Button.Tertiary>
			</section>
			<section>
				<h2>Tags</h2>
				<Tag.Success>Tag</Tag.Success>
				<Tag.Destructive>Tag</Tag.Destructive>
				<Tag.Information>Tag</Tag.Information>
				<Tag.Warning>Tag</Tag.Warning>
			</section>
		</ThemeProvider>
	);
}
