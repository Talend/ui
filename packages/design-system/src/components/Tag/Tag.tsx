import React, { forwardRef, Ref } from 'react';

import { TagProps as PrimitiveTagProps } from './primitive';
import {
	TagDefault,
	TagInformation,
	TagSuccess,
	TagWarning,
	TagDestructive,
	TagBeta,
} from './variations';

enum TagVariant {
	default = 'default',
	information = 'information',
	success = 'success',
	warning = 'warning',
	destructive = 'destructive',
	beta = 'beta',
}

type TagProps = Omit<PrimitiveTagProps, 'className'> & {
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
		case TagVariant.beta:
			return <TagBeta {...rest} ref={ref} />;
		default:
			return <TagDefault {...rest} ref={ref} />;
	}
});

export default Tag;
