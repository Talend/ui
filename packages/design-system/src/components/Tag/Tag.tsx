import React from 'react';

import Primitive from './primitive';
import { TagDefault, TagInformation, TagSuccess, TagWarning, TagDestructive } from './variations';

export enum TagVariant {
	Default = 'Default',
	Information = 'Information',
	Success = 'Success',
	Warning = 'Warning',
	Destructive = 'Destructive',
}

type TagProps = typeof Primitive & {
	variant?: TagVariant;
};

const Tag = React.forwardRef(({ variant, ...rest }: TagProps, ref: React.Ref<HTMLSpanElement>) => {
	switch (variant) {
		case TagVariant.Information:
			return <TagInformation {...rest} ref={ref} />;
		case TagVariant.Success:
			return <TagSuccess {...rest} ref={ref} />;
		case TagVariant.Warning:
			return <TagWarning {...rest} ref={ref} />;
		case TagVariant.Destructive:
			return <TagDestructive {...rest} ref={ref} />;
		default:
			return <TagDefault {...rest} ref={ref} />;
	}
});

Tag.displayName = 'Tag';

export default Tag;
