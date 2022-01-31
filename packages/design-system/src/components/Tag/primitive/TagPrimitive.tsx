import React, { forwardRef, HTMLAttributes, Ref } from 'react';

import style from './TagPrimitive.module.scss';

type TagProps = HTMLAttributes<HTMLSpanElement>;

const Tag = forwardRef((props: TagProps, ref: Ref<HTMLSpanElement>) => {
	return <span {...props} ref={ref} className={`${style.tag} ${props.className}`} />;
});

export default Tag;
