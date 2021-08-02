import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import getDefaultT from '../translate';
import headerPropTypes from './Header/Header.propTypes';
import ItemEditPropTypes from './Items/Item/ItemEdit.propTypes';
import Action from '../Actions/Action';
import Header from './Header/Header.component';
import HeaderInput from './Header/HeaderInput.component';
import HeaderSelected from './Header/HeaderSelected.component';
import Items from './Items/Items.component';
import theme from './Enumeration.scss';
import I18N_DOMAIN_COMPONENTS from '../constants';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_ADD = 'DISPLAY_MODE_ADD';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';
const DISPLAY_MODE_SELECTED = 'DISPLAY_MODE_SELECTED';

function enumerationClasses(classNameProp) {
	return classNames(
		{
			[theme['tc-enumeration']]: true,
			'tc-enumeration': true,
		},
		classNameProp,
	);
}

export function EnumerationComponent(props) {
	return (
		<div id={props.id} className={enumerationClasses(props.className)}>
			<HeaderEnumeration {...props} />
			<ItemsEnumeration {...props} />
		</div>
	);
}

EnumerationComponent.displayName = 'Enumeration';

EnumerationComponent.defaultProps = {
	id: 'tc-enumeration',
};
EnumerationComponent.propTypes = {
	displayMode: PropTypes.oneOf([
		DISPLAY_MODE_DEFAULT,
		DISPLAY_MODE_ADD,
		DISPLAY_MODE_SELECTED,
		DISPLAY_MODE_EDIT,
		DISPLAY_MODE_SEARCH,
	]),
	inputRef: PropTypes.func,
	required: PropTypes.bool,
	headerError: PropTypes.string,
	headerDefault: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)).isRequired,
	headerInput: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)),
	headerSelected: PropTypes.arrayOf(PropTypes.shape(headerPropTypes)),
	id: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			values: PropTypes.arrayOf(PropTypes.string),
		}),
	).isRequired,
	searchCriteria: PropTypes.string,
	itemsProp: PropTypes.shape({
		key: PropTypes.string,
		getItemHeight: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
		onSubmitItem: PropTypes.func,
		onChangeItem: PropTypes.func,
		onSelectItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		onLoadData: PropTypes.func,
		actionsDefault: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
			PropTypes.func,
		]),
		actionsDefaultPersistent: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
			PropTypes.func,
		]),
		actionsEdit: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
			PropTypes.func,
		]),
	}).isRequired,
	onInputChange: PropTypes.func.isRequired,
	onAddKeyDown: PropTypes.func,
	inputPlaceholder: PropTypes.string,
	inputValue: PropTypes.string,
	label: PropTypes.string,
	showCheckboxes: PropTypes.bool,
	className: PropTypes.string,
	t: PropTypes.func.isRequired,
	...ItemEditPropTypes,
};

function hintClasses() {
	return classNames({
		[theme['tc-enumeration-hint']]: true,
		'tc-enumeration-hint': true,
	});
}

function EmptyListPlaceholder({ displayMode, t }) {
	return (
		<p className={hintClasses()}>
			{displayMode === DISPLAY_MODE_DEFAULT
				? t('ENUMERATION_EMPTY_LIST', { defaultValue: 'The list is empty' })
				: t('ENUMERATION_EMPTY_PLACEHOLDER_SEARCH', { defaultValue: 'No results' })}
		</p>
	);
}

EmptyListPlaceholder.propTypes = {
	displayMode: EnumerationComponent.propTypes.displayMode,
	t: PropTypes.func.isRequired,
};

function ItemsEnumeration(props) {
	if (props.items.length > 0) {
		return (
			<Items
				id={props.id}
				items={props.items}
				itemsProp={props.itemsProp}
				currentEdit={props.currentEdit}
				searchCriteria={props.searchCriteria}
				showCheckboxes={props.showCheckboxes}
			/>
		);
	}
	return <EmptyListPlaceholder displayMode={props.displayMode} t={props.t} />;
}

ItemsEnumeration.propTypes = {
	id: EnumerationComponent.propTypes.id,
	items: EnumerationComponent.propTypes.items,
	itemsProp: EnumerationComponent.propTypes.itemsProp,
	searchCriteria: EnumerationComponent.propTypes.searchCriteria,
	showCheckboxes: EnumerationComponent.propTypes.showCheckboxes,
	t: PropTypes.func.isRequired,
	...ItemEditPropTypes,
};

function HeaderEnumeration({
	displayMode,
	headerError,
	onInputChange,
	onAddKeyDown,
	headerInput,
	headerDefault,
	headerSelected,
	id,
	items,
	required,
	inputValue,
	inputRef,
	label,
	t,
}) {
	switch (displayMode) {
		case DISPLAY_MODE_SEARCH: {
			const propsInput = {
				headerInput,
				onInputChange,
				onAddKeyDown,
				headerError,
				id: `${id}_search`,
				inputRef,
				inputPlaceholder: t('ENUMERATION_PLACEHOLDER_SEARCH', { defaultValue: 'Search' }),
				inputLabel: t('ENUMERATION_SEARCH_LABEL', { defaultValue: 'Enter search term' }),
			};
			return <HeaderInput {...propsInput} />;
		}
		case DISPLAY_MODE_ADD: {
			const propsInput = {
				headerInput,
				onInputChange,
				onAddKeyDown,
				headerError,
				id: `${id}_add`,
				inputRef,
				value: inputValue,
				inputPlaceholder: t('ENUMERATION_NEW_ENTRY', { defaultValue: 'New entry' }),
				inputLabel: t('ENUMERATION_NEW_ENTRY_LABEL', { defaultValue: 'Enter new entry name' }),
			};
			return <HeaderInput {...propsInput} />;
		}
		case DISPLAY_MODE_DEFAULT: {
			const propsDefault = {
				headerDefault,
				required,
				label: label || t('ENUMERATION_HEADER_LABEL', { defaultValue: 'Values' }),
			};

			return <Header {...propsDefault} />;
		}
		case DISPLAY_MODE_SELECTED: {
			const propsSelected = {
				headerSelected,
				nbItemsSelected: items.filter(item => item.isSelected && item.isSelected === true).length,
			};
			return <HeaderSelected {...propsSelected} />;
		}
		default:
			return null;
	}
}

HeaderEnumeration.propTypes = {
	headerError: EnumerationComponent.propTypes.headerError,
	displayMode: EnumerationComponent.propTypes.displayMode,
	headerInput: EnumerationComponent.propTypes.headerInput,
	headerDefault: EnumerationComponent.propTypes.headerDefault,
	headerSelected: EnumerationComponent.propTypes.headerSelected,
	onInputChange: EnumerationComponent.propTypes.onInputChange,
	onAddKeyDown: EnumerationComponent.propTypes.onAddKeyDown,
	id: EnumerationComponent.propTypes.id,
	items: EnumerationComponent.propTypes.items,
	required: EnumerationComponent.propTypes.required,
	inputValue: EnumerationComponent.propTypes.inputValue,
	inputRef: EnumerationComponent.propTypes.inputRef,
	label: EnumerationComponent.propTypes.label,
	t: PropTypes.func.isRequired,
};

HeaderEnumeration.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(EnumerationComponent);
