import React from 'react';

import S from './Tokens.scss';

const TokenSkeleton = (props: React.HTMLAttributes<HTMLDivElement>) => (
	<div {...props} className={S.skeleton} />
);

export default TokenSkeleton;
