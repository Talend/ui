/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactElement, Component as RComponent, ReactNode } from 'react';
import omit from 'lodash/omit';

import Inject from './Inject';

type ToTextProps = {
	text?: string | string[];
};

type Component = Record<string, any> & {
	(props: any): ReactElement<any> | null;
	displayName?: string;
	propTypes?: any;
};

export function toText(props: ToTextProps) {
	if (Array.isArray(props.text)) {
		return props.text.map((sentence, index) => <p key={index}>{sentence}</p>);
	}
	return props.text;
}

const OMIT_PROPS = [
	'setState',
	'deleteState',
	'updateState',
	'componentId',
	'state',
	'initState',
	'getCollection',
	'dispatch',
	'dispatchActionCreator',
];

const BLACK_LISTED_ATTR = [
	'childContextTypes', // not authorized on function component
	'propTypes', // already set by HOC
];

const COMPONENT_EXCEPTIONS = {
	MenuItem: (props: any) => props.divider,
};

function isNotBlackListedAttr(attr: string) {
	return !BLACK_LISTED_ATTR.includes(attr);
}

type WrapperProps = {
	getComponent: (key: string) => RComponent | Component;
	components: { [key: string]: RComponent | Component };
	text?: string | string[];
	children: ReactNode;
};

export default function wrap(Component: Component, key: string) {
	const Wrapper: any = ({ getComponent, components, text, ...props }: WrapperProps) => {
		const injected = Inject.all(getComponent, components);
		const newprops = { ...omit(props, OMIT_PROPS) };
		if (key === 'MenuItem' && COMPONENT_EXCEPTIONS[key](props)) {
			return <Component {...newprops} />;
		}
		return (
			<Component {...newprops}>
				{injected('children')}
				{toText({ text })}
				{props.children}
			</Component>
		);
	};
	(Object.keys(Component) as any).filter(isNotBlackListedAttr).forEach((attr: string) => {
		Wrapper[attr] = Component[attr];
	});
	Wrapper.displayName = key;
	return Wrapper;
}
