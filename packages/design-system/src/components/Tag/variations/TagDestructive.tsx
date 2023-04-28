import { forwardRef, Ref } from 'react';

import TagPrimitive, { TagProps as PrimitiveTagProps } from '../primitive';

import style from './TagDestructive.module.scss';

type TagProps = Omit<PrimitiveTagProps, 'className'>;

const TagDestructive = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));

export default TagDestructive;
