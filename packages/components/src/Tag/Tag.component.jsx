import PropTypes from 'prop-types';

import {
	Tag as CoralTag,
	TagBeta as CoralTagBeta,
	TagDestructive as CoralTagDestructive,
	TagInformation as CoralTagInformation,
	TagSuccess as CoralTagSuccess,
	TagWarning as CoralTagWarning,
} from '@talend/design-system';

/**
 * Proxy to https://design.talend.com/?path=/docs/components-tag--default-story#tag
 */
const Tag = ({ bsStyle, ...rest }) => {
	let StyledTag = CoralTag;
	switch (bsStyle?.toLowerCase()) {
		case 'info':
			StyledTag = CoralTagInformation;
			break;
		case 'success':
			StyledTag = CoralTagSuccess;
			break;
		case 'warning':
			StyledTag = CoralTagWarning;
			break;
		case 'danger':
			StyledTag = CoralTagDestructive;
			break;
		case 'beta':
			StyledTag = CoralTagBeta;
			break;
		default:
			break;
	}
	return <StyledTag {...rest} />;
};

Tag.displayName = 'Tag';

Tag.propTypes = {
	bsStyle: PropTypes.string,
};

export default Tag;
