import { forwardRef, Ref } from 'react';

import TagPrimitive, { TagProps as PrimitiveTagProps } from '../primitive';

import style from './TagDestructive.module.css';

type TagProps = Omit<PrimitiveTagProps, 'className'>;

const TagDestructive = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));
TagDestructive.displayName = 'TagDestructive';

export default TagDestructive;
