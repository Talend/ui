import React from 'react';

import { Token } from '../types';
import { TokensProps } from './TokensTypes';

import TokenSkeleton from './TokenSkeleton';
import TokensDefinitionListItem from './TokensDefinitionListItem';

import S from './Tokens.scss';

const TokensDefinitionList = ({ tokens, children }: TokensProps) => {
	const [filter, setFilter] = React.useState('');
	return (
		<>
			<input type="search" onChange={event => setFilter(event.currentTarget.value)} />
			<dl className={S.tokens}>
				{(tokens as Token[]).map((token, index) =>
					!filter.length ||
					token.name.toLocaleLowerCase().includes(filter.toLocaleString()) ||
					token.value.toLocaleLowerCase().includes(filter.toLocaleString()) ? (
						<TokensDefinitionListItem key={index} token={token}>
							{typeof children === 'function' ? children({ token }) : children}
						</TokensDefinitionListItem>
					) : (
						<TokenSkeleton />
					),
				)}
			</dl>
		</>
	);
};

export default TokensDefinitionList;
