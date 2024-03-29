import PropTypes from 'prop-types';

import theme from './TextModeArrayTemplate.module.scss';

function renderListItem(val, index, renderItem) {
	const valueIsObject = typeof val === 'object';
	const classNames = valueIsObject ? theme.block : undefined;
	return (
		<li key={index} className={classNames}>
			{valueIsObject ? renderItem(index) : val}
		</li>
	);
}

export default function TextModeArrayTemplate(props) {
	const { id, renderItem, schema, value } = props;
	return (
		<div className={theme['tf-array-text-mode']}>
			<dt className="tf-title-text-mode" id={id}>
				{schema.title}
			</dt>

			<dd>
				<ol aria-labelledby={id}>
					{value.map((val, index) => renderListItem(val, index, renderItem))}
				</ol>
			</dd>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TextModeArrayTemplate.propTypes = {
		id: PropTypes.string,
		renderItem: PropTypes.func,
		schema: PropTypes.object.isRequired,
		value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
	};
}
