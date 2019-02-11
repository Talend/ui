import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Toggle from '@talend/react-components/lib/Toggle';
import FieldTemplate from '../../FieldTemplate';
import theme from './TextMode.scss';

export default function TextModeToggle(props) {
	return (
		<div
			className={classNames(theme['tc-toggle-text-mode'], 'tc-toggle-text-mode', props.className)}
		>
			<dt>
				<label htmlFor={props.id} className="control-label">
					<FieldTemplate
						description={props.description}
						descriptionId={props.descriptionId}
						errorId={props.errorId}
						errorMessage={props.errorMessage}
						isValid={props.isValid}
						required={props.schema.required}
					>
						<Toggle
							checked={props.value}
							disabled
							id={props.id}
							label={props.schema.title}
							// eslint-disable-next-line jsx-a11y/aria-proptypes
							aria-hidden
						/>
					</FieldTemplate>
				</label>
			</dt>
			<dd id={props.id} className="sr-only">
				{String(props.value)}
			</dd>
		</div>
	);
}

TextModeToggle.defaultProps = {
	value: false,
};

if (process.env.NODE_ENV !== 'production') {
	TextModeToggle.propTypes = {
		className: PropTypes.string,
		description: PropTypes.string,
		descriptionId: PropTypes.string,
		errorId: PropTypes.string,
		errorMessage: PropTypes.string,
		value: PropTypes.bool,
		isValid: PropTypes.bool,
		id: PropTypes.string,
		schema: PropTypes.shape({
			required: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
		}),
	};
}
