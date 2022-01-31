import React from 'react';

import { Tag, TagDefault, TagDestructive, TagInformation, TagSuccess, TagWarning } from '.';

export default {
	component: Tag,
};

export const Default = props => <TagDefault {...props}>Example</TagDefault>;

export const Information = props => <TagInformation {...props}>Example</TagInformation>;

export const Success = props => <TagSuccess {...props}>Example</TagSuccess>;

export const Warning = props => <TagWarning {...props}>Example</TagWarning>;

export const Destructive = props => <TagDestructive {...props}>Example</TagDestructive>;

export const VariantDefault = props => (
	<Tag {...props} variant="default">
		Example
	</Tag>
);

export const VariantInformation = props => (
	<Tag {...props} variant="information">
		Example
	</Tag>
);

export const VariantSuccess = props => (
	<Tag {...props} variant="success">
		Example
	</Tag>
);

export const VariantWarning = props => (
	<Tag {...props} variant="warning">
		Example
	</Tag>
);

export const VariantDestructive = props => (
	<Tag {...props} variant="destructive">
		Example
	</Tag>
);

export const Ellipsis = props => (
	<TagDefault {...props}>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum nunc non diam vehicula
		gravida. Pellentesque nisi velit, porttitor nec facilisis at, egestas quis magna. Sed tempus
		convallis orci, quis aliquet risus porta eu. In hac habitasse platea dictumst. Vestibulum porta,
		magna quis porta commodo, lacus elit venenatis eros, varius fringilla enim justo sed lectus.
		Donec at tortor imperdiet, tincidunt lacus ac, viverra nisi. Vivamus feugiat, ligula in
		venenatis faucibus, quam justo molestie libero, bibendum feugiat sapien turpis in neque.
	</TagDefault>
);
