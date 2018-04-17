import PropTypes from 'prop-types';
import React from 'react';
import ListView from '@talend/react-components/lib/ListView';
import { translate } from 'react-i18next';

import { I18N_DOMAIN_FORMS } from '../../constants';
import { DEFAULT_I18N, getDefaultTranslate } from '../../translate';
import { abort, search } from './ListViewWidget.actions';

import {
	onAbortHandler,
	onAddKeyDown,
	onInputChange,
	onItemChange,
	onToggleAll,
} from './ListViewWidget.handlers';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DEFAULT_ITEM_HEIGHT = 33;

function getItems(options, value, instance) {
	return options.enumOptions.map((option, index) => ({
		index,
		checked: value.indexOf(option.value) !== -1,
		label: option.label,
		value: option.value,
		onChange: onItemChange.bind(instance),
	}));
}

class ListViewWidget extends React.Component {
	constructor(props) {
		super(props);
		const { options, value, t } = props;

		this.timerSearch = null;
		this.value = value;

		this.defaultHeaderActions = [
			{
				...search,
				label: t('LISTVIEW_WIDGET_SEARCH', { defaultValue: 'Search for specific values' }),
				onClick: this.changeDisplayToSearchMode.bind(this),
			},
		];
		this.searchInputsActions = [
			{
				...abort,
				label: t('LISTVIEW_WIDGET_ABORT', { defaultValue: 'Abort' }),
				onClick: onAbortHandler.bind(this),
			},
		];

		let defaultDisplayMode = DISPLAY_MODE_DEFAULT;
		if (props.schema && props.schema.displayMode) {
			defaultDisplayMode = props.schema.displayMode;
		}

		const items = getItems(options, value, this);

		this.state = {
			displayMode: defaultDisplayMode,
			required: !!(props.schema && props.schema.required),
			headerLabel: props.schema && props.schema.title,
			headerDefault: this.defaultHeaderActions,
			headerSelected: this.selectedHeaderActions,
			headerInput: this.addInputs,
			onToggleAll: onToggleAll.bind(this),
			onInputChange: onInputChange.bind(this),
			onAddKeyDown: onAddKeyDown.bind(this),
			onAbortHandler: onAbortHandler.bind(this),
			toggleAllChecked: items.length === items.filter(i => i.checked).length,
			getItemHeight: () => DEFAULT_ITEM_HEIGHT,
			items,
			displayedItems: items,
		};
	}

	componentWillReceiveProps(nextProps) {
		const options = this.props.options || {};
		const nextOptions = nextProps.options || {};
		if (options.enumOptions !== nextOptions.enumOptions) {
			const items = getItems(nextOptions, nextProps.value, this);
			this.setState({ items, displayedItems: items });
		}
	}

	setFormData() {
		this.props.onChange(
			this.state.items.filter(item => item.checked).map(itemChecked => itemChecked.value),
		);
	}

	callActionHandler(actionName, value, successHandler, errorHandler) {
		if (
			this.props.registry &&
			this.props.registry.formContext &&
			this.props.registry.formContext.handleAction !== undefined
		) {
			this.props.registry.formContext.handleAction(
				this.props.id,
				actionName,
				value,
				successHandler,
				errorHandler,
			);
			return true;
		}
		return false;
	}

	changeDisplayToSearchMode() {
		this.setState({
			headerInput: this.searchInputsActions,
			displayMode: DISPLAY_MODE_SEARCH,
		});
	}

	render() {
		const listViewProps = {
			...this.state,
			items: this.state.displayedItems,
			id: this.props.id,
			t: this.props.t,
		};
		return (
			<div>
				<ListView {...listViewProps} />
			</div>
		);
	}
}

ListViewWidget.defaultProps = {
	options: {
		enumOptions: [],
	},
	t: getDefaultTranslate,
};

if (process.env.NODE_ENV !== 'production') {
	ListViewWidget.propTypes = {
		id: PropTypes.string,
		registry: PropTypes.object, // eslint-disable-line
		formData: PropTypes.array, // eslint-disable-line
		schema: PropTypes.object, // eslint-disable-line
		onChange: PropTypes.func.isRequired,
		value: PropTypes.any,
		options: PropTypes.shape({
			enumOptions: PropTypes.array,
		}).isRequired,
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_FORMS, { i18n: DEFAULT_I18N })(ListViewWidget);
