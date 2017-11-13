import React, { PropTypes } from 'react';
import { componentState } from '@talend/react-cmf'
import { Map } from 'immutable';

import Component from './SelectObject.component';

export const DEFAULT_STATE = new Map({});

class SelectObject extends React.Component {
	static displayName = 'CMFContainer(SelectObject)';
	static propTypes = {
		...componentState.propTypes,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		return (
			<Component
			/>
		);
	}
}

export default SelectObject;
