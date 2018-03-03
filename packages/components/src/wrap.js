import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import Inject from './Inject';

export function toText(props) {
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

export default function wrap(Component, key) {
	const Wrapper = ({ getComponent, components, text, ...props }) => {
		const injected = Inject.all(getComponent, components);
		const newprops = Object.assign({}, omit(props, OMIT_PROPS));
		return (
			<Component {...newprops}>
				{injected('children')}
				{toText({ text })}
				{props.children}
			</Component>
		);
	};
	Object.keys(Component).forEach(attr => {
		Wrapper[attr] = Component[attr];
	});
	Wrapper.displayName = key;
	Wrapper.propTypes = {
		text: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		children: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.arrayOf(PropTypes.node),
		]),
		getComponent: PropTypes.func,
		components: PropTypes.shape({
			children: PropTypes.arrayOf(PropTypes.shape({
				component: PropTypes.string,
				componentId: PropTypes.string,
			})),
		}),
	};
	return Wrapper;
}
