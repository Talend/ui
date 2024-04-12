import { forwardRef, Ref } from 'react';

import TagPrimitive, { TagProps as PrimitiveTagProps } from '../primitive';
import style from './TagWarning.module.css';

type TagProps = Omit<PrimitiveTagProps, 'className'>;

const TagWarning = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));
TagWarning.displayName = 'TagWarning';

export default TagWarning;
