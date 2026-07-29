import { forwardRef } from 'react';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgeTagProps = Omit<BadgePrimitiveProps, 'semanticIcon'>;

const BadgeTag = forwardRef<HTMLSpanElement, BadgeTagProps>((props, ref) => {
	return <BadgePrimitive {...props} ref={ref} semanticIcon={'none'} />;
});

BadgeTag.displayName = 'BadgeTag';

export default BadgeTag;
