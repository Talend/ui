import React, { forwardRef, HTMLAttributes, Ref } from 'react';

import TagPrimitive from '../primitive';

import style from './TagWarning.module.scss';

type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>;

const TagWarning = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));

export default TagWarning;
