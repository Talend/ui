import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { componentState, cmfConnect } from '@talend/react-cmf';
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
		this.onFilter = this.onFilter.bind(this);
		this.state = {};
	}

	onFilter(event) {
		this.setState({query: event.target.value});
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		const props = omit(this.props, cmfConnect.INJECTED_PROPS);
		props.onFilter = this.onFilter;
		return <Component {...props} />;
	}
}

export default SelectObject;
