import React from 'react';

import { Token } from '../types';
import TokenSkeleton from './TokenSkeleton';
import ColorDescription from './ColorDescription';
import { TokensProps } from './TokensTypes';

import S from './Tokens.scss';

const TokensDefinitionList = ({ tokens, filter, children }: TokensProps) => (
	<dl className={S.tokens}>
		{(tokens as Token[]).map((token, index) =>
			!filter.length || token.name.toLocaleLowerCase().includes(filter.toLocaleString()) ? (
				<ColorDescription key={index} token={token}>
					{typeof children === 'function' ? children({ token }) : children}
				</ColorDescription>
			) : (
				<TokenSkeleton />
			),
		)}
	</dl>
);

export default TokensDefinitionList;
