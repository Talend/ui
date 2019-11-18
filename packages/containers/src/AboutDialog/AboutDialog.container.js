import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Map } from 'immutable';
import { cmfConnect } from '@talend/react-cmf';
import Component from '@talend/react-components/lib/AboutDialog';
import Constants from './AboutDialog.constant';

export const DEFAULT_STATE = new Map({
	expanded: false,
});

class AboutDialog extends React.Component {
	static displayName = 'Container(AboutDialog)';
	static propTypes = {
		icon: PropTypes.string,
		copyrights: PropTypes.string,
		...cmfConnect.propTypes,
	};

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.hide = this.hide.bind(this);
	}

	toggle() {
		this.props.setState(({ state }) => ({ expanded: !state.get('expanded') }));
	}

	hide() {
		this.props.dispatch({ type: Constants.ABOUT_DIALOG_HIDE });
	}

	render() {
		const { state, ...props } = this.props;
		return (
			<Component
				onToggle={this.toggle}
				onHide={this.hide}
				expanded={state.get('expanded')}
				show={state.get('show')}
				loading={state.get('loading')}
				{...omit(props, cmfConnect.INJECTED_PROPS)}
			/>
		);
	}
}

export default AboutDialog;
