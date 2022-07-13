import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import DefinitionListItemColor from './DefinitionListItem/DefinitionListItemColor';
import Tabs from '../../../../../src/components/WIP/Tabs';

const TokensDefinitionList = ({ tokens, children }: TokensProps) => {
	const filteredTokens = {
		neutral: tokens.filter((token: Token) => token.name.includes('ColorNeutral')),
		accent: tokens.filter((token: Token) => token.name.includes('ColorAccent')),
		success: tokens.filter((token: Token) => token.name.includes('ColorSuccess')),
		danger: tokens.filter((token: Token) => token.name.includes('ColorDanger')),
		warning: tokens.filter((token: Token) => token.name.includes('ColorWarning')),
		beta: tokens.filter((token: Token) => token.name.includes('ColorBeta')),
		charts: tokens.filter((token: Token) => token.name.includes('ColorCharts')),
		illustration: tokens.filter((token: Token) => token.name.includes('ColorIllustration')),
		assistive: tokens.filter((token: Token) => token.name.includes('ColorAssistive')),
		branding: tokens.filter((token: Token) => token.name.includes('ColorBranding')),
	};

	return (
		<Tabs>
			<Tabs.TabList>
				{Object.keys(filteredTokens).map((entry: string) => (
					<Tabs.Tab>{entry}</Tabs.Tab>
				))}
			</Tabs.TabList>

			{Object.values(filteredTokens).map((entries: Token[]) => (
				<Tabs.TabPanel>
					<dl>
						{entries.map((token, index) => (
							<DefinitionListItemColor key={index} token={token} />
						))}
					</dl>
				</Tabs.TabPanel>
			))}
		</Tabs>
	);
};

export default TokensDefinitionList;
