import type { PropsWithChildren } from 'react';

import { Token, Tokens } from '../../../src/tokens/types';

export type TokensProps<T extends Token = Token> = PropsWithChildren<{
	tokens: Tokens<T>;
}>;

export type PropsWithToken<T extends Token = Token> = {
	token: T;
};
