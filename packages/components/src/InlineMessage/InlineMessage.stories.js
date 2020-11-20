/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import IconsProvider from '../IconsProvider';
import { InlineMessage } from './InlineMessage.component';

const props = {
	type: 'success',
	title: 'Validation title.',
	description: 'Validation and successful messages',
	icon: 'talend-check-circle',
};

const Wrapper = ({ width, children }) => <div style={{ width }}>{children}</div>;

storiesOf('Messaging & Communication/InlineMessage', module)
	.add('default', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<h1>InlineMessage</h1>
			<h2>Definition</h2>
			<p>
				Inline message highlights information necessary to display for the user in many different
				contexts. It can be additional information related to system status, it can be a required
				action to complete the current task.
			</p>
			<h2>Examples</h2>
			<h3>
				InlineMessage type is <code>success</code>
			</h3>
			<InlineMessage {...props} />
			<h3>
				InlineMessage type is <code>info</code>
			</h3>
			<InlineMessage
				{...{ ...props }}
				type="info"
				title="Info title."
				description="Info message"
				icon="talend-info-circle"
				link={{
					href: 'https://my.custom.link',
					label: 'See more',
				}}
			/>
			<h3>
				InlineMessage type is <code>warning</code>
			</h3>
			<InlineMessage
				{...{ ...props }}
				type="warning"
				title="Warning title."
				description="Warning message"
				icon="talend-warning"
			/>
			<h3>
				InlineMessage type is <code>error</code>
			</h3>
			<InlineMessage
				{...props}
				type="error"
				title="Error title."
				description="Error message"
				icon="talend-cross-circle"
			/>
			<h3>
				InlineMessage type is <code>success</code> and parent width is 400px
			</h3>
			<Wrapper width="400px">
				<InlineMessage
					{...props}
					description="Validation and successful message to test wrapping text if its too long."
				/>
			</Wrapper>
			<br />
		</div>
	))
	.add('withBackground', () => (
		<div>
			<IconsProvider
				bundles={[
					'https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg',
				]}
			/>
			<h1>InlineMessage</h1>
			<h2>
				<code>withBackground</code> prop is passed
			</h2>
			<h2>Examples</h2>
			<h3>
				InlineMessage type is <code>success</code>
			</h3>
			<InlineMessage {...props} withBackground />
			<h3>
				InlineMessage type is <code>info</code>
			</h3>
			<InlineMessage
				{...{ ...props }}
				type="info"
				title="Info title."
				description="Info message"
				icon="talend-info-circle"
				link={{
					href: 'https://my.custom.link',
					label: 'See more',
				}}
				withBackground
			/>
			<h3>
				InlineMessage type is <code>warning</code>
			</h3>
			<InlineMessage
				{...{ ...props }}
				type="warning"
				title="Warning title."
				description="Warning message"
				icon="talend-warning"
				withBackground
			/>
			<h3>
				InlineMessage type is <code>error</code>
			</h3>
			<InlineMessage
				{...props}
				type="error"
				title="Error title."
				description="Error message"
				icon="talend-cross-circle"
				withBackground
			/>
			<h3>
				InlineMessage type is <code>success</code> and parent width is 400px
			</h3>
			<Wrapper width="400px">
				<InlineMessage
					{...props}
					description="Validation and successful message to test wrapping text if its too long."
					withBackground
				/>
			</Wrapper>
			<br />
		</div>
	));
