import React from 'react';

import { getDisplayName } from './TokenFormatter';
import { PropsWithToken } from './TokensTypes';

const TokenName = ({ token, ...rest }: React.HTMLAttributes<HTMLDivElement> & PropsWithToken) => (
	<div {...rest}>{getDisplayName(token?.name)}</div>
);

export default TokenName;
