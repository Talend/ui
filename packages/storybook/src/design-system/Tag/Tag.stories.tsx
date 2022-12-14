import React from 'react';
import { ComponentStory } from '@storybook/react';

import {
	Tag,
	TagDefault,
	TagDestructive,
	TagInformation,
	TagSuccess,
	TagWarning,
	TagBeta,
	tagDestructive
} from '@talend/design-system';

export default {
	component: Tag,
};

export const Default: ComponentStory<typeof TagDefault> = props => (
	<TagDefault {...props}>Example</TagDefault>
);

export const Information: ComponentStory<typeof TagInformation> = props => (
	<TagInformation {...props}>Example</TagInformation>
);

export const Success: ComponentStory<typeof TagSuccess> = props => (
	<TagSuccess {...props}>Example</TagSuccess>
);

export const Warning: ComponentStory<typeof TagWarning> = props => (
	<TagWarning {...props}>Example</TagWarning>
);

export const Destructive: ComponentStory<typeof tagDestructive> = props => (
	<TagDestructive {...props}>Example</TagDestructive>
);

export const Beta: ComponentStory<typeof tagDestructive> = props => (
	<TagBeta {...props}>Example</TagBeta>
);

export const VariantDefault: ComponentStory<typeof Tag> = props => (
	<Tag {...props} variant="default">
		Example
	</Tag>
);

export const VariantInformation: ComponentStory<typeof Tag> = props => (
	<Tag {...props} variant="information">
		Example
	</Tag>
);

export const VariantSuccess: ComponentStory<typeof Tag> = props => (
	<Tag {...props} variant="success">
		Example
	</Tag>
);

export const VariantWarning: ComponentStory<typeof Tag> = props => (
	<Tag {...props} variant="warning">
		Example
	</Tag>
);

export const VariantDestructive: ComponentStory<typeof Tag> = props => (
	<Tag {...props} variant="destructive">
		Example
	</Tag>
);

export const VariantBeta: ComponentStory<typeof Tag> = props => (
	<Tag {...props} variant="beta">
		Example
	</Tag>
);

export const Ellipsis: ComponentStory<typeof TagDefault> = props => (
	<TagDefault {...props}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum nunc non diam vehicula
		gravida. Pellentesque nisi velit, porttitor nec facilisis at, egestas quis magna. Sed tempus
		convallis orci, quis aliquet risus porta eu. In hac habitasse platea dictumst. Vestibulum porta,
		magna quis porta commodo, lacus elit venenatis eros, varius fringilla enim justo sed lectus.
		Donec at tortor imperdiet, tincidunt lacus ac, viverra nisi. Vivamus feugiat, ligula in
		venenatis faucibus, quam justo molestie libero, bibendum feugiat sapien turpis in neque.
	</TagDefault>
);
