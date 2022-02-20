import React from 'react';

import * as S from './Tag.style';

export type TagProps = React.PropsWithChildren<any>;

// @see https://www.selbekk.io/blog/2020/05/forwarding-refs-in-typescript/
const Tag = React.forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
	return <S.Tag ref={ref} {...props} />;
});

export default Tag;
