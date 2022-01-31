import React, { forwardRef, HTMLAttributes, Ref } from 'react';

import TagPrimitive from '../primitive';

import style from './TagInformation.module.scss';

type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className'>;

const TagInformation = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => (
	<TagPrimitive {...props} ref={ref} className={style.tag} />
));

export default TagInformation;
