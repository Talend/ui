import { forwardRef, Ref } from 'react';

import TagPrimitive, { TagProps as PrimitiveTagProps } from '../primitive';
import style from './TagBeta.module.css';

type TagProps = Omit<PrimitiveTagProps, 'className'>;

const TagBeta = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));
TagBeta.displayName = 'TagBeta';

export default TagBeta;
