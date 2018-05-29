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
	focusedSectionIndex: null,
	focusedItemIndex: null,
});

/**
 * The Typeahead React container
 */
export default class Typeahead extends React.Component {
	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onToggle() {
		this.props.setState(() => ({
			docked: !this.props.state.get('docked', true),
			focusedSectionIndex: null,
			focusedItemIndex: null,
			items: [],
		}));
	}

	onBlur(event) {
		const { onBlur } = this.props;

		this.onToggle();

		if (onBlur) {
			onBlur(event);
		}
	}

	onSelect(event, value) {
		const { onSelect } = this.props;

		if (onSelect) {
			onSelect(event, value);
		}
	}

	onKeyDown(event, data) {
		const { onKeyDown } = this.props;
		const {
			highlightedItemIndex,
			newHighlightedItemIndex,
			highlightedSectionIndex,
			newHighlightedSectionIndex,
		} = data;

		if (onKeyDown) {
			onKeyDown(event, data);
		}

		switch (event.key) {
			case KEYS.DOWN:
			case KEYS.UP:
				event.preventDefault();
				this.props.setState(() => ({
					focusedSectionIndex: newHighlightedSectionIndex,
					focusedItemIndex: newHighlightedItemIndex,
				}));
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
				this.onBlur(event);
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
			onSelect: this.onSelect,
			onKeyDown: this.onKeyDown,
			docked: state.get('docked'),
			searching: state.get('searching'),
			focusedSectionIndex: state.get('focusedSectionIndex'),
			focusedItemIndex: state.get('focusedItemIndex'),
			items: items.toJS ? items.toJS() : items,
		};

		return <Component {...props} />;
	}
}

Typeahead.displayName = DISPLAY_NAME;
Typeahead.propTypes = {
	...componentState.propTypes,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
};
