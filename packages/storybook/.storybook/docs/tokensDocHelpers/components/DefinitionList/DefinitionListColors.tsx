import { StackVertical, TabsKit } from '@talend/design-system';

import { Token } from '../../../../../src/tokens/types';
import { TokensProps } from '../../TokensTypes';
import DefinitionListItemColor from './DefinitionListItem/DefinitionListItemColor';

const TokensDefinitionList = ({ tokens }: TokensProps) => {
	const filteredTokens = {
		neutral: tokens.filter((token: Token) => token.name.includes('ColorNeutral')),
		accent: tokens.filter((token: Token) => token.name.includes('ColorAccent')),
		info: tokens.filter((token: Token) => token.name.includes('ColorInfo')),
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
		<TabsKit selectedId="neutral">
			<TabsKit.TabList>
				{Object.keys(filteredTokens).map((tokenKey: string) => (
					<TabsKit.Tab size="L" key={tokenKey} id={tokenKey}>
						{tokenKey}
					</TabsKit.Tab>
				))}
			</TabsKit.TabList>

			<StackVertical gap="L" padding={{ x: 0, y: 'L' }}>
				{Object.entries(filteredTokens).map(tokenEntry => (
					<TabsKit.TabPanel key={tokenEntry[0]} id={tokenEntry[0]}>
						<StackVertical gap="S">
							{tokenEntry[1].map((token, index) => (
								<DefinitionListItemColor key={`${token.name}-${index}`} token={token} />
							))}
						</StackVertical>
					</TabsKit.TabPanel>
				))}
			</StackVertical>
		</TabsKit>
	);
};

export default TokensDefinitionList;
