import PropTypes from 'prop-types';
import classNames from 'classnames';
import Toggle from '@talend/react-components/lib/Toggle';

function noop() {}

jest.unmock('@talend/design-system');

export default function TextModeToggle(props) {
	return (
		<div className={classNames('form-group', props.className)}>
			<dt>
				<label htmlFor={props.id} className="control-label sr-only">
					{props.schema.title}
				</label>
				<div aria-hidden>
					<Toggle
						id={props.id}
						checked={props.value}
						disabled
						label={props.schema.title}
						onChange={noop}
					/>
				</div>
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
		value: PropTypes.bool,
		id: PropTypes.string.isRequired,
		schema: PropTypes.shape({
			required: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
		}),
	};
}
