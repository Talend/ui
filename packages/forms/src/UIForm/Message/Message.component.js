import PropTypes from 'prop-types';

import { InlineMessageDestructive, InlineMessageInformation } from '@talend/design-system';

export default function Message(props) {
	const { description, descriptionId, errorId, errorMessage, isValid } = props;

	return description || errorMessage ? (
		<div className={props.className}>
			{isValid
				? description && (
						<InlineMessageInformation
							id={descriptionId}
							description={description}
							role={undefined}
							aria-live={undefined}
							data-test="fieldTemplate.inlineMessage"
						/>
				  )
				: errorMessage && (
						<InlineMessageDestructive
							id={errorId}
							description={errorMessage}
							aria-live="assertive"
							data-test="fieldTemplate.inlineMessageError"
						/>
				  )}
		</div>
	) : null;
}

if (process.env.NODE_ENV !== 'production') {
	Message.propTypes = {
		className: PropTypes.string,
		description: PropTypes.string,
		descriptionId: PropTypes.string.isRequired,
		errorId: PropTypes.string.isRequired,
		errorMessage: PropTypes.string,
		isValid: PropTypes.bool,
	};
}
