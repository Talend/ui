import Header from './Header.component';
import HeaderInput from './HeaderInput.component';
import HeaderSelected from './HeaderSelected.component';
import getDefaultT from '../../translate';
import { propTypes } from '../Enumeration.propTypes';
import {
	DISPLAY_MODE_ADD,
	DISPLAY_MODE_DEFAULT,
	DISPLAY_MODE_SEARCH,
	DISPLAY_MODE_SELECTED,
} from '../displayModes';

export function HeaderEnumeration({
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
	headerError: propTypes.headerError,
	displayMode: propTypes.displayMode,
	headerInput: propTypes.headerInput,
	headerDefault: propTypes.headerDefault,
	headerSelected: propTypes.headerSelected,
	onInputChange: propTypes.onInputChange,
	onAddKeyDown: propTypes.onAddKeyDown,
	id: propTypes.id,
	items: propTypes.items,
	required: propTypes.required,
	inputValue: propTypes.inputValue,
	inputRef: propTypes.inputRef,
	label: propTypes.label,
	t: propTypes.t,
};

HeaderEnumeration.defaultProps = {
	t: getDefaultT(),
};
