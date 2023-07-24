import { forwardRef, Ref } from 'react';

import TagPrimitive, { TagProps as PrimitiveTagProps } from '../primitive';

import style from './TagSuccess.module.scss';

type TagProps = Omit<PrimitiveTagProps, 'className'>;

const TagSuccess = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));

export default TagSuccess;
