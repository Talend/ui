/* eslint-disable import/prefer-default-export */
import Form from '@talend/react-forms';
import MultiSelect, { MultiSelectTextMode } from './MultiSelect';
import withNameResolver from './NameResolver';

const {
	multiSelectTag: MultiSelectTagWidget,
	datalist: DatalistWidget,
} = Form.UIForm.utils.widgets;

export default {
	datalist: withNameResolver(DatalistWidget),
	multiSelectTag: withNameResolver(MultiSelectTagWidget),
	multiSelect: withNameResolver(MultiSelect),
	multiSelect_text: withNameResolver(MultiSelectTextMode),
};
