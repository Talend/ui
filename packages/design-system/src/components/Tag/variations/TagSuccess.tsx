import React, { forwardRef, HTMLAttributes, Ref } from 'react';

import TagPrimitive from '../primitive';

import style from './TagSuccess.module.scss';

type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>;

const TagSuccess = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));

export default TagSuccess;
