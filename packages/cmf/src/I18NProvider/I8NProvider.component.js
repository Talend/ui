import React from 'react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import { I18nextProvider } from 'react-i18next';
import LangDetector from 'i18next-browser-languagedetector';

import cmfConnect from '../cmfConnect';

const memoize = {};

const ACTIVATE_ATTR = 'activate-i18n';
const OMIT_ATTRS = [ACTIVATE_ATTR, 'use'];

/**
 * @example
{
    "views": {
        "I18NextProvider#default": {
            "activate-i18n": true,
            "useExpression": "i18nUse",
            "fallbackLng": "en",
            "debug": false,
            "detectionExpression": {
              "id": "mergeCookieDomain",
              "args": [{
                "order": ["querystring"]
              }]
            }
        }
    }
}

 */
class I18NProvider extends React.Component {
	static propTypes = {
		use: PropTypes.array,
		children: PropTypes.node,
	};

	constructor(props) {
		super(props);
		this.getI18N = this.getI18N.bind(this);
	}

	getI18N() {
		if (!memoize.i18n) {
			const config = omit(this.props, OMIT_ATTRS);
			memoize.i18n = i18next;
			if (Array.isArray(this.props.use)) {
				this.props.use.forEach(useme => {
					memoize.i18n = memoize.i18n.use(useme);
				});
			} else {
				memoize.i18n = memoize.i18n
				.use(XHR)
				.use(LangDetector);
			}
			memoize.i18n.init(config);
		}
		return memoize.i18n;
	}
	render() {
		if (this.props[ACTIVATE_ATTR]) {
			return (
				<I18nextProvider i18n={this.getI18N()}>
					{this.props.children}
				</I18nextProvider>
			);
		}
		return this.props.children;
	}
}

export default cmfConnect({})(I18NProvider);
