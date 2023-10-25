import PropTypes from 'prop-types';
import Action from '../Actions/Action';
import headerPropTypes from './Header/Header.propTypes';
import ItemEditPropTypes from './Items/Item/ItemEdit.propTypes';

import {
	DISPLAY_MODE_ADD,
	DISPLAY_MODE_DEFAULT,
	DISPLAY_MODE_EDIT,
	DISPLAY_MODE_SEARCH,
	DISPLAY_MODE_SELECTED,
} from './displayModes';

export const propTypes = {
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
