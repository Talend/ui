import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';

import Inject from './Inject';

export function toText(props) {
	if (Array.isArray(props.text)) {
		return props.text.map((sentence, index) => <p key={index}>{sentence}</p>);
	}
	return props.text;
}

export default function wrap(Component, key) {
	const Wrapper = ({ getComponent, components, text, ...props }) => {
		const injected = Inject.all(getComponent, components);
		const newprops = Object.assign({}, omit(props, cmfConnect.INJECTED_PROPS));
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
		...cmfConnect.propTypes,
		text: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	};
	return cmfConnect({})(Wrapper);
}
