import { forwardRef, Ref } from 'react';

import TagPrimitive, { TagProps as PrimitiveTagProps } from '../primitive';

import style from './TagDefault.module.scss';

type TagProps = Omit<PrimitiveTagProps, 'className'>;

const TagDefault = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));

export default TagDefault;
