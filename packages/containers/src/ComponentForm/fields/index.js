/* eslint-disable import/prefer-default-export */
import DatalistWidget from '@talend/react-forms/lib/UIForm/fields/Datalist';
import MultiSelectTagWidget from '@talend/react-forms/lib/UIForm/fields/MultiSelectTag';
import MultiSelect, { MultiSelectTextMode } from './MultiSelect';
import withNameResolver from './NameResolver';

export default {
	datalist: withNameResolver(DatalistWidget),
	multiSelectTag: withNameResolver(MultiSelectTagWidget),
	multiSelect: MultiSelect,
	multiSelect_text: MultiSelectTextMode,
};
