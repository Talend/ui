import PropTypes from 'prop-types';

import Badge from '@talend/react-components/lib/Badge';

import { TextMode as FieldTemplate } from '../../FieldTemplate';

import theme from './TextMode.module.css';

function getLabel(titleMap, value) {
	const itemConf = titleMap?.find(item => item.value === value);
	if (itemConf) {
		return itemConf.name;
	}
	return value;
}

export default function MultiSelectTagTextMode({ id, schema, value }) {
	const { title, labelProps } = schema;
	const badges = value.map(val => getLabel(schema.titleMap, val)).filter(Boolean);

	return (
		<FieldTemplate id={id} label={title} labelProps={labelProps}>
			{badges?.length && (
				<ul aria-labelledby={id} className={theme['tc-badge-list']}>
					{badges.map((val, index) => (
						<li key={val || index}>
							<Badge label={val} />
						</li>
					))}
				</ul>
			)}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	MultiSelectTagTextMode.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.shape({
			title: PropTypes.string,
			labelProps: PropTypes.object,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
		}).isRequired,
		value: PropTypes.arrayOf(PropTypes.string),
	};
}

MultiSelectTagTextMode.defaultProps = {
	value: [],
};
