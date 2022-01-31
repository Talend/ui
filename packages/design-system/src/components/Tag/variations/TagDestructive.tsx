import React, { forwardRef, HTMLAttributes, Ref } from 'react';

import TagPrimitive from '../primitive';

import style from './TagDestructive.module.scss';

type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>;

const TagDestructive = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));

export default TagDestructive;
