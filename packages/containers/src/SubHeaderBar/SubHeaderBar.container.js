import React from 'react';
import PropTypes from 'prop-types';
import { SubHeaderBar as Component } from '@talend/react-components';
import Immutable from 'immutable';
import omit from 'lodash/omit';
import { componentState, cmfConnect } from '@talend/react-cmf';

export const DISPLAY_NAME = 'Container(SubHeaderBar)';
export const DEFAULT_STATE = new Immutable.Map({
	editMode: false,
});

class SubHeaderBar extends React.Component {
	static displayName = DISPLAY_NAME;

	static propTypes = {
		...componentState.propTypes,
		actionCreatorCancel: PropTypes.string,
		actionCreatorEdit: PropTypes.string,
		actionCreatorSubmit: PropTypes.string,
		actionCreatorChange: PropTypes.string,
		actionCreatorBackArrow: PropTypes.string,
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
		this.onCancel = this.onCancel.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onGoBack = this.onGoBack.bind(this);
	}

	onSubmit(event, data) {
		this.props.setState(() => ({
			editMode: false,
		}));
		if (this.props.onSubmit) {
			this.props.onSubmit(event, data);
		}
		if (this.props.actionCreatorSubmit) {
			this.props.dispatchActionCreator(this.props.actionCreatorSubmit, event, {
				props: this.props,
				data,
			});
		}
	}

	onCancel(event) {
		this.props.setState(() => ({
			editMode: false,
		}));
		if (this.props.onCancel) {
			this.props.onCancel(event);
		}
		if (this.props.actionCreatorCancel) {
			this.props.dispatchActionCreator(this.props.actionCreatorCancel, event, {
				props: this.props,
			});
		}
	}

	onEdit(event) {
		this.props.setState(() => ({
			editMode: !this.props.state.get('editMode', false),
		}));
		if (this.props.onEdit) {
			this.props.onEdit(event);
		}
		if (this.props.actionCreatorEdit) {
			this.props.dispatchActionCreator(this.props.actionCreatorEdit, event, {
				props: this.props,
			});
		}
	}

	onChange(event) {
		if (this.props.onChange) {
			this.props.onChange(event, event.target.value);
		}
		if (this.props.actionCreatorChange) {
			this.props.dispatchActionCreator(this.props.actionCreatorChange, event, {
				props: this.props,
				value: event.target.value,
			});
		}
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
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS), {
			editMode: state.get('editMode', false),
			onEdit: this.onEdit,
			onCancel: this.onCancel,
			onSubmit: this.onSubmit,
			onChange: this.onChange,
			onGoBack: this.onGoBack,
		});
		return <Component {...props} />;
	}
}

export default SubHeaderBar;
