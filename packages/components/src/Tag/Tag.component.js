import React from 'react';
import PropTypes from 'prop-types';
import { Tag as CoralTag } from '@talend/design-system';

/**
 * Proxy to https://design.talend.com/?path=/docs/components-tag--default-story#tag
 */
const Tag = ({ bsStyle, ...rest }) => {
	let StyledTag = CoralTag;
	switch (bsStyle?.toLowerCase()) {
		case 'info':
			StyledTag = CoralTag.Information;
			break;
		case 'success':
			StyledTag = CoralTag.Success;
			break;
		case 'warning':
			StyledTag = CoralTag.Warning;
			break;
		case 'danger':
			StyledTag = CoralTag.Destructive;
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
