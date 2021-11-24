import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import keys from 'lodash/keys';
import { cmfConnect } from '@talend/react-cmf';

/**
 * ShortcutManager matches shortcuts to the current route to redirect to a new
 * one
 *
 * @extends {React}
 */
class ShortcutManager extends React.Component {
	static displayName = 'Container(ShortcutManager)';

	static propTypes = {
		...cmfConnect.propTypes,
	};

	static contextTypes = {
		store: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.redirect = this.redirect.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleRegexMatching = this.handleRegexMatching.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	// eslint-disable-next-line class-methods-use-this
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	redirect(event, path) {
		this.props.dispatchActionCreator('redirect', event, { action: { path } });
	}

	handleRegexMatching(event, redirectMap, pathname) {
		const match = keys(redirectMap).find(key => RegExp(key, 'm').test(pathname));
		if (match) {
			if (redirectMap[match].startsWith('/')) {
				this.redirect(event, redirectMap[match]);
			} else {
				this.props.dispatchActionCreator(redirectMap[match], event);
			}
		}
	}

	handleKeyPress(event) {
		const redirectMap = this.props.redirectMap[keycode(event.keyCode)];
		if (redirectMap) {
			if (redirectMap[this.props.pathname]) {
				this.redirect(event, redirectMap[this.props.pathname]);
			} else {
				this.handleRegexMatching(event, redirectMap, this.props.pathname);
			}
		}
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return null;
	}
}

export default ShortcutManager;
