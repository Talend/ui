import React, { forwardRef, HTMLAttributes, Ref } from 'react';

import { TagDefault, TagInformation, TagSuccess, TagWarning, TagDestructive } from './variations';

enum TagVariant {
	default = 'default',
	information = 'information',
	success = 'success',
	warning = 'warning',
	destructive = 'destructive',
}

type TagProps = HTMLAttributes<HTMLSpanElement> & {
	/**
	 * Tag variation depending on its semantic
	 */
	variant?: keyof typeof TagVariant;
};

const Tag = forwardRef(({ variant, ...rest }: TagProps, ref: Ref<HTMLSpanElement>) => {
	switch (variant) {
		case TagVariant.information:
			return <TagInformation {...rest} ref={ref} />;
		case TagVariant.success:
			return <TagSuccess {...rest} ref={ref} />;
		case TagVariant.warning:
			return <TagWarning {...rest} ref={ref} />;
		case TagVariant.destructive:
			return <TagDestructive {...rest} ref={ref} />;
		default:
			return <TagDefault {...rest} ref={ref} />;
	}
});

export default Tag;
