import React from 'react';
import Tag from '../primitive/Tag';

import style from './Tag.warning.module.scss';

type TagProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'className'>;

const TagVariant = React.forwardRef((props: TagProps, ref: React.Ref<HTMLSpanElement>) => (
	<Tag {...props} ref={ref} className={style.tag} />
));

TagVariant.displayName = 'TagWarning';

export default TagVariant;
