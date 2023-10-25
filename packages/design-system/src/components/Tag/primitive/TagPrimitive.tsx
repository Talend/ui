import { forwardRef, HTMLAttributes, Ref } from 'react';

import style from './TagPrimitive.module.scss';

export type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style'>;

const Tag = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => {
	return <span {...props} ref={ref} className={`${style.tag} ${props.className}`} />;
});
Tag.displayName = 'Tag';

export default Tag;
