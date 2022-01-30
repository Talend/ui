import React from 'react';
import Tag from '../primitive/Tag';

import style from './Tag.success.module.scss';

type TagProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'className'>;

const TagVariant = React.forwardRef((props: TagProps, ref: React.Ref<HTMLSpanElement>) => (
	<Tag {...props} ref={ref} className={style.tag} />
));

TagVariant.displayName = 'TagSuccess';

export default TagVariant;
