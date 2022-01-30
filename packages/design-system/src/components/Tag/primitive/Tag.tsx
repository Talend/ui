import React from 'react';

import style from './Tag.module.scss';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
	label?: string;
};

const Tag = React.forwardRef(({ label, ...props }: TagProps, ref: React.Ref<HTMLSpanElement>) => {
	return (
		<span {...props} ref={ref} className={`${style.tag} ${props.className}`}>
			{label}
		</span>
	);
});

export default Tag;
