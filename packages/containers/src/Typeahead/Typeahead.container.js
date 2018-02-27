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

export const DISPLAY_NAME = 'Container(TreeView)';
export const DEFAULT_STATE = new Immutable.Map({
	docked: true,
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
	};

	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onToggle() {
		this.props.setState(() => ({
			docked: !this.props.state.get('docked', true),
		}));
	}

	onChange(event, data) {
		if (this.props.onChange) {
			this.props.onChange(event, data.value);
		}

		if (this.props.onChangeActionCreator) {
			this.props.dispatchActionCreator(this.props.onChangeActionCreator, event, {
				props: this.props,
				value: data.value,
			});
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

	onSelect(event) {
		if (this.props.onSelect) {
			this.props.onSelect(event, event.target.value);
		}

		if (this.props.onSelectActionCreator) {
			this.props.dispatchActionCreator(this.props.onSelectActionCreator, event, {
				props: this.props,
				value: event.target.value,
			});
		}
	}

	render() {
		const { state = DEFAULT_STATE } = this.props;
		const docked = state.get('docked');
		const props = Object.assign({}, omit(this.props, cmfConnect.INJECTED_PROPS), {
			onToggle: this.onToggle,
			onBlur: this.onToggle,

			onChange: this.onChange,
			onKeyDown: this.onKeyDown,
			onSelect: this.onSelect,

			docked,
		});

		return <Component {...props} />;
	}
}
