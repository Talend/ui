import React from 'react';

import Tag, { TagDefault, TagInformation, TagSuccess, TagWarning, TagDestructive } from '.';

export default {
	component: Tag,
};

const defaultProps = {
	label: 'Example',
};

export const Default = props => <TagDefault {...defaultProps} {...props} />;

export const Information = props => <TagInformation {...defaultProps} {...props} />;

export const Success = props => <TagSuccess {...defaultProps} {...props} />;

export const Warning = props => <TagWarning {...defaultProps} {...props} />;

export const Destructive = props => <TagDestructive {...defaultProps} {...props} />;

export const Ellipsis = props => (
	<TagDefault
		{...defaultProps}
		{...props}
		label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum nunc non diam vehicula gravida. Pellentesque nisi velit, porttitor nec facilisis at, egestas quis magna. Sed tempus convallis orci, quis aliquet risus porta eu. In hac habitasse platea dictumst. Vestibulum porta, magna quis porta commodo, lacus elit venenatis eros, varius fringilla enim justo sed lectus. Donec at tortor imperdiet, tincidunt lacus ac, viverra nisi. Vivamus feugiat, ligula in venenatis faucibus, quam justo molestie libero, bibendum feugiat sapien turpis in neque."
	/>
);
