import React from 'react';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import DefinitionListItemColor from './DefinitionListItem/DefinitionListItemColor';
import { TabsKit as Tabs } from '../../../../../src/components/WIP/Tabs';
import { StackVertical } from '@talend/design-system';

const TokensDefinitionList = ({ tokens }: TokensProps) => {
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
					<Tabs.Tab size="L" key={entry}>
						{entry}
					</Tabs.Tab>
				))}
			</Tabs.TabList>

			<StackVertical gap="L" padding={{ x: 0, y: 'L' }}>
				{Object.values(filteredTokens).map((entries: Token[], index) => (
					<Tabs.TabPanel key={index}>
						<StackVertical gap="S">
							{entries.map((token, index) => (
								<DefinitionListItemColor key={`${token.name}-${index}`} token={token} />
							))}
						</StackVertical>
					</Tabs.TabPanel>
				))}
			</StackVertical>
		</Tabs>
	);
};

export default TokensDefinitionList;
