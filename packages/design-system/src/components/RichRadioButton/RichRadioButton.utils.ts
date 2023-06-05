import { Tag, TagBeta, TagDestructive, TagInformation, TagSuccess, TagWarning } from '../Tag';
import { TagVariant } from '../Tag/Tag';
import { RichRadioButtonTag } from './RichRadioButton.types';

export const getTagVariant = (tag: RichRadioButtonTag) => {
	switch (tag.variant) {
		case TagVariant.beta:
			return TagBeta;

		case TagVariant.destructive:
			return TagDestructive;

		case TagVariant.information:
			return TagInformation;

		case TagVariant.success:
			return TagSuccess;

		case TagVariant.warning:
			return TagWarning;

		default:
			return Tag;
	}
};
