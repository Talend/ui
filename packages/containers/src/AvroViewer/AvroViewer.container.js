import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { AvroViewer as Component } from '@talend/react-components';

export const DEFAULT_STATE = Immutable.Map({
	highlighted: Immutable.List(),
});

export default class AvroViewer extends React.Component {
	static displayName = 'Container(AvroViewer)';
	static propTypes = {
		sample: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(event, jsonpath) {
		const state = this.props.state || DEFAULT_STATE;
		const adaptedJsonPath = jsonpath
			.replace(/[-[{}()*+?.,\\^$|#\s]/g, '\\$&')
			.replace(/\[]/g, '[[0-9]+]');
		this.props.setState({
			highlighted: state.get('highlighted').set(0, new RegExp(`^${adaptedJsonPath}$`)),
		});
		if (this.props.onSelect) {
			this.props.dispatchActionCreator(this.props.actionCreatorSelect, event, {
				props: this.props,
			});
		}
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		const leftProps = {
			data: this.props.sample.schema,
			onSelect: this.onSelect,
		};
		const rightProps = {
			data: this.props.sample.data,
			schema: this.props.sample.schema,
			highlighted: state.get('highlighted').toJS(),
			// highlighted: this.props.customRight.withHighlight ? highlighted : undefined,
		};
		return <Component {...this.props} leftProps={leftProps} rightProps={rightProps} />;
	}
}
