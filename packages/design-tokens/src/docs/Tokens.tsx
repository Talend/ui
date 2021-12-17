// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

import { Dictionary, TokenType } from '../types';

import { groupByType } from './TokenFormatter';

import TokensDefinitionList from './TokensDefinitionList';

import TokensBorder from './TokensBorder';
import TokensBranding from './TokensBranding';
import TokensBreakpoint from './TokensBreakpoint';
import TokensColor from './TokensColor';
import TokensElevation from './TokensElevation';
import TokensGradient from './TokensGradient';
import TokensMeasure from './TokensMeasure';
import TokensOpacity from './TokensOpacity';
import TokensRadius from './TokensRadius';
import TokensShadow from './TokensShadow';
import TokensTypography from './TokensTypography';
import TokensTransition from './TokensTransition';

const Tokens = ({ dictionary }: { dictionary: Dictionary }) => {
	const [filter, setFilter] = React.useState('');
	return (
		<div>
			<input
				aria-label="Search for a token"
				type="search"
				onChange={e => setFilter(e.currentTarget.value)}
			/>
			{Object.entries(groupByType(dictionary)).map(([type, tokens], index) => {
				let TokensComponent = TokensDefinitionList;
				switch (type) {
					case TokenType.BORDER:
						TokensComponent = TokensBorder;
						break;
					case TokenType.BRANDING:
						TokensComponent = TokensBranding;
						break;
					case TokenType.BREAKPOINT:
						TokensComponent = TokensBreakpoint;
						break;
					case TokenType.COLOR:
						TokensComponent = TokensColor;
						break;
					case TokenType.ELEVATION:
						TokensComponent = TokensElevation;
						break;
					case TokenType.GRADIENT:
						TokensComponent = TokensGradient;
						break;
					case TokenType.MEASURE:
						TokensComponent = TokensMeasure;
						break;
					case TokenType.OPACITY:
						TokensComponent = TokensOpacity;
						break;
					case TokenType.RADIUS:
						TokensComponent = TokensRadius;
						break;
					case TokenType.SHADOW:
						TokensComponent = TokensShadow;
						break;
					case TokenType.TRANSITION:
						TokensComponent = TokensTransition;
						break;
					case TokenType.TYPOGRAPHY:
						TokensComponent = TokensTypography;
						break;
					default:
						break;
				}
				return (
					<section key={index}>
						<h2 className="sbdocs sbdocs-h2">{type}</h2>
						<TokensComponent filter={filter} tokens={tokens} />
					</section>
				);
			})}
		</div>
	);
};

export default Tokens;
