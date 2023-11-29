import PropTypes from 'prop-types';

import { Tabs } from '@talend/design-system';

import { isValid } from '../../utils/validation';
import Widget from '../../Widget';

function TabsAdapter(props) {
	const { schema, ...restProps } = props;

	const tabs = schema.items.map((item, index) => {
		const tabIsValid = isValid(item, restProps.errors);
		return {
			key: index,
			tabTitle: {
				title: item.title,
				id: `${restProps.id}-tabs-${index}`,
				error: !tabIsValid,
			},
			tabContent: (
				<Widget
					{...restProps}
					schema={{ widget: 'fieldset', ...item, options: { ...item.options, hideTitle: true } }}
				/>
			),
		};
	});

	return <Tabs id={`${restProps.id}-tabs`} tabs={tabs} />;
}

if (process.env.NODE_ENV !== 'production') {
	TabsAdapter.propTypes = {
		errors: PropTypes.object,
		schema: PropTypes.shape({
			items: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string.isRequired,
					items: PropTypes.array.isRequired,
				}),
			).isRequired,
		}).isRequired,
	};
}

export default TabsAdapter;
