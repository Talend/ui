import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import Inject from './Inject';

type ToTextProps = {
	text?: string | string[];
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
	MenuItem: props => props.divider,
};

function isNotBlackListedAttr(attr) {
	return !BLACK_LISTED_ATTR.includes(attr);
}

type WrapperProps = {
	getComponent: (key: string) => React.Component | React.PureComponent;
	components: { [key: string]: React.Component | React.PureComponent };
	text?: string | string[];
	children: React.ReactNode;
};

export default function wrap(Component: React.Component | React.PureComponent, key: string) {
	const Wrapper = ({ getComponent, components, text, ...props }: WrapperProps) => {
		const injected = Inject.all(getComponent, components);
		const newprops = { ...omit(props, OMIT_PROPS) };
		if (COMPONENT_EXCEPTIONS[key] && COMPONENT_EXCEPTIONS[key](props)) {
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
	Object.keys(Component)
		.filter(isNotBlackListedAttr)
		.forEach(attr => {
			Wrapper[attr] = Component[attr];
		});
	Wrapper.displayName = key;
	return Wrapper;
}
