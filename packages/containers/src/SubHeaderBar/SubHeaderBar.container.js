import React from 'react';
import PropTypes from 'prop-types';
import { SubHeaderBar as Component } from '@talend/react-components';
import Immutable from 'immutable';
import omit from 'lodash/omit';
import { componentState, cmfConnect } from '@talend/react-cmf';

export const DEFAULT_STATE = new Immutable.Map({
	editMode: false,
});

class SubHeaderBar extends React.Component {
	static propTypes = {
		// ...componentState,
		actionCreatorCancel: PropTypes.func,
		actionCreatorEdit: PropTypes.func,
		actionCreatorValidate: PropTypes.func,
		onClickCancel: PropTypes.func,
		onClickEdit: PropTypes.func,
		onClickValidate: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.onClickCancel = this.onClickCancel.bind(this);
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onClickValidate = this.onClickValidate.bind(this);
	}

	onClickValidate(event) {
		if (this.props.actionCreatorValidate) {
			this.dispatchActionCreator(this.props.actionCreatorValidate, event, {
				props: this.props,
			});
		}
		if (this.props.onClickValidate) {
			this.props.onClickValidate(event);
		}
	}

	onClickCancel(event) {
		this.props.setState({ editMode: false });
		if (this.props.actionCreatorCancel) {
			this.dispatchActionCreator(this.props.actionCreatorCancel, event, {
				props: this.props,
			});
		}
		if (this.props.onClickCancel) {
			this.props.onClickCancel(event);
		}
	}

	onClickEdit(event) {
		this.props.setState({ editMode: !this.props.state.get('editMode') });
		if (this.props.actionCreatorEdit) {
			this.dispatchActionCreator(this.props.actionCreatorEdit, event, {
				props: this.props,
			});
		}
		if (this.props.onClickEdit) {
			this.props.onClickEdit(event);
		}
	}

	render() {
		const state = this.props.state || DEFAULT_STATE;
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS), {
			editMode: state.get('editMode'),
			onClickEdit: this.onClickEdit,
			onClickCancel: this.onClickCancel,
			onClickValidate: this.onClickValidate,
		});
		return <Component {...props} />;
	}
}

export default SubHeaderBar;
