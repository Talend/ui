import { Component as RComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';
import Component from '@talend/react-components/lib/AboutDialog';
import Constants from './AboutDialog.constant';

export const DEFAULT_STATE = {
	expanded: false,
};

class AboutDialog extends RComponent {
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
		this.props.setState(({ state }) => ({ expanded: !state?.expanded }));
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
				expanded={state?.expanded}
				show={state?.show}
				loading={state?.loading}
				{...omit(props, cmfConnect.INJECTED_PROPS)}
			/>
		);
	}
}

export default AboutDialog;
