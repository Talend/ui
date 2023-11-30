import { Component as RComponent } from 'react';

import Immutable from 'immutable';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';

import { cmfConnect, componentState } from '@talend/react-cmf';
import Component from '@talend/react-components/lib/Typeahead';

export const DISPLAY_NAME = 'Container(Typeahead)';
export const DEFAULT_STATE = new Immutable.Map({
	docked: true,
	searching: false,
	focusedSectionIndex: null,
	focusedItemIndex: null,
	items: null,
});

/**
 * The Typeahead React container
 */
export default class Typeahead extends RComponent {
	static displayName = DISPLAY_NAME;

	static propTypes = {
		...componentState.propTypes,
		onSelect: PropTypes.func,
		onBlur: PropTypes.func,
	};

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
			items: null,
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
			case 'Down':
			case 'ArrowDown':
			case 'Up':
			case 'ArrowUp':
				event.preventDefault();
				this.props.setState(() => ({
					focusedSectionIndex: newHighlightedSectionIndex,
					focusedItemIndex: newHighlightedItemIndex,
				}));
				break;
			case 'Enter':
				event.preventDefault();
				if (highlightedItemIndex !== null && highlightedItemIndex !== null) {
					this.onSelect(event, {
						sectionIndex: highlightedSectionIndex,
						itemIndex: highlightedItemIndex,
					});
				}
				break;
			case 'Esc':
			case 'Escape':
				event.preventDefault();
				this.onBlur(event);
				break;
			default:
		}
	}

	render() {
		const { items } = this.props;
		const props = {
			...omit(this.props, cmfConnect.INJECTED_PROPS),
			...this.props.state.toJS(),
			onToggle: this.onToggle,
			onBlur: this.onBlur,
			onSelect: this.onSelect,
			onKeyDown: this.onKeyDown,
			items: items && items.toJS ? items.toJS() : items,
		};

		return <Component {...props} />;
	}
}
