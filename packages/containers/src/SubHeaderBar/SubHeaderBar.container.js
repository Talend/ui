import React from 'react';
import PropTypes from 'prop-types';
import { SubHeaderBar as Component } from '@talend/react-components';
import Immutable from 'immutable';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';

export const DISPLAY_NAME = 'Container(SubHeaderBar)';
export const DEFAULT_STATE = new Immutable.Map({});

class SubHeaderBar extends React.Component {
	static displayName = DISPLAY_NAME;

	static propTypes = {
		...cmfConnect.propTypes,
		actionCreatorCancel: PropTypes.string,
		actionCreatorEdit: PropTypes.string,
		actionCreatorSubmit: PropTypes.string,
		actionCreatorChange: PropTypes.string,
		actionCreatorGoBack: PropTypes.string,
		onCancel: PropTypes.func,
		onEdit: PropTypes.func,
		onSubmit: PropTypes.func,
		onChange: PropTypes.func,
		onGoBack: PropTypes.func,
		title: PropTypes.string,
	};

	static contextTypes = {
		registry: PropTypes.object,
		store: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.onGoBack = this.onGoBack.bind(this);
	}

	onGoBack(event) {
		if (this.props.onGoBack) {
			this.props.onGoBack(event);
		}
		if (this.props.actionCreatorGoBack) {
			this.props.dispatchActionCreator(this.props.actionCreatorGoBack, event, {
				props: this.props,
			});
		}
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		const hasGoBack = this.props.onGoBack || this.props.actionCreatorGoBack;
		const props = Object.assign(
			{},
			omit(this.props, cmfConnect.INJECTED_PROPS),
			{
				onEdit: this.onEdit,
				onCancel: this.onCancel,
				onSubmit: this.onSubmit,
				onChange: this.onChange,
				onGoBack: hasGoBack && this.onGoBack,
			},
			{
				...state.toJS(),
			},
		);
		return <Component {...props} />;
	}
}

export default SubHeaderBar;
