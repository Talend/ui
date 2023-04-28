import { forwardRef, Ref } from 'react';

import TagPrimitive, { TagProps as PrimitiveTagProps } from '../primitive';

import style from './TagBeta.module.scss';

type TagProps = Omit<PrimitiveTagProps, 'className'>;

const TagBeta = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));

export default TagBeta;
