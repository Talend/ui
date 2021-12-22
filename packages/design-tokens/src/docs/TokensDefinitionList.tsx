import React from 'react';

import { ColorToken, Token } from '../types';
import { TokensProps } from './TokensTypes';

import TokenSkeleton from './TokenSkeleton';
import TokensDefinitionListItem from './TokensDefinitionListItem';

import S from './Tokens.scss';
import { getCssName, getDisplayName, getScssName } from './TokenFormatter';

const TokensDefinitionList = ({ tokens, children }: TokensProps) => {
	const [filter, setFilter] = React.useState('');
	const filterId = 'filter';
	return (
		<>
			<div className={S.tokenFilter}>
				<form>
					<label htmlFor={filterId}>
						Search for
						<input
							id={filterId}
							type="search"
							placeholder="token value..."
							onChange={event => setFilter(event.currentTarget.value)}
						/>
					</label>
				</form>
			</div>
			<dl className={S.tokens}>
				{(tokens as Token[]).map((token, index) => {
					const filterInLowerCase = filter.trim().toLocaleLowerCase();
					const isShown =
						!filter.length ||
						[
							token.name,
							token.description,
							getDisplayName(token.name),
							getCssName(token.name),
							getScssName(token.name),
							'hex' in token ? (token as ColorToken).hex : token.value,
						].some(value => value?.toLocaleLowerCase().includes(filterInLowerCase));
					return isShown ? (
						<TokensDefinitionListItem key={index} token={token}>
							{typeof children === 'function' ? children({ token }) : children}
						</TokensDefinitionListItem>
					) : (
						<TokenSkeleton />
					);
				})}
			</dl>
		</>
	);
};

export default TokensDefinitionList;
