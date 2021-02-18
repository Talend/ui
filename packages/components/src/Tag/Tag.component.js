import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from '@talend/design-system';

/**
 * Proxy to https://design.talend.com/?path=/docs/components-tag--default-story#tag
 */
const CoralTag = ({ bsStyle, ...rest }) => {
	let StyledTag = Tag;
	switch (bsStyle?.toLowerCase()) {
		case 'info':
			StyledTag = Tag.Information;
			break;
		case 'success':
			StyledTag = Tag.Success;
			break;
		case 'warning':
			StyledTag = Tag.Warning;
			break;
		case 'danger':
			StyledTag = Tag.Destructive;
			break;
		default:
			break;
	}
	return <StyledTag {...rest} />;
};

CoralTag.displayName = 'Tag';

CoralTag.propTypes = {
	bsStyle: PropTypes.string,
};

export default CoralTag;
