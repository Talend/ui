import React from 'react';
import { Dictionary, Token } from '../types';

export type TokensProps = React.PropsWithChildren<any> & {
	filter: string;
	tokens: Dictionary;
};

export type PropsWithToken = {
	token: Token;
};
