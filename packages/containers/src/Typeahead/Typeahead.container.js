import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { cmfConnect, componentState } from '@talend/react-cmf';
import { Typeahead as Component } from '@talend/react-components';
import omit from 'lodash/omit';

const KEYS = {
	DOWN: 'ArrowDown',
	UP: 'ArrowUp',
	ENTER: 'Enter',
	ESC: 'Escape',
};

export const DISPLAY_NAME = 'Container(Typeahead)';
export const DEFAULT_STATE = new Immutable.Map({
	docked: true,
	searching: false,
});

/**
 * The Typeahead React container
 */
export default class Typeahead extends React.Component {
	static displayName = DISPLAY_NAME;
	static propTypes = {
		...componentState.propTypes,
		onSelect: PropTypes.func,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		onBlurActionCreator: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onToggle() {
		this.props.setState(() => ({
			docked: !this.props.state.get('docked', true),
			items: [],
		}));
	}

	onBlur(event) {
		const { onBlur, onBlurActionCreator } = this.props;

		this.onToggle();

		if (onBlur) {
			onBlur(event);
		}
		if (onBlurActionCreator) {
			this.props.dispatchActionCreator(onBlurActionCreator, event);
		}
	}

	onKeyDown(event, data) {
		const {
			highlightedItemIndex,
			newHighlightedItemIndex,
			highlightedSectionIndex,
			newHighlightedSectionIndex,
		} = data;

		if (this.props.onKeyDown) {
			this.props.onKeyDown(event, data);
		}

		switch (event.key) {
			case KEYS.DOWN:
			case KEYS.UP:
				event.preventDefault();
				this.props.dispatchActionCreator(this.props.onKeyDownActionCreator, event, {
					props: this.props,
					value: {
						focusedSectionIndex: newHighlightedSectionIndex,
						focusedItemIndex: newHighlightedItemIndex,
					},
				});
				break;
			case KEYS.ENTER:
				event.preventDefault();
				if (highlightedItemIndex !== null && highlightedItemIndex !== null) {
					this.onSelect(event, {
						sectionIndex: highlightedSectionIndex,
						itemIndex: highlightedItemIndex,
					});
				}
				break;
			case KEYS.ESC:
				event.preventDefault();
				this.onToggle();
				break;
			default:
		}
	}

	render() {
		const { state = DEFAULT_STATE, items } = this.props;
		const props = {
			...omit(this.props, cmfConnect.INJECTED_PROPS),
			onToggle: this.onToggle,
			onBlur: this.onBlur,
			onKeyDown: this.onKeyDown,
			docked: state.get('docked'),
			searching: state.get('searching'),
			items: items.toJS ? items.toJS() : items,
		};

		return <Component {...props} />;
	}
}
