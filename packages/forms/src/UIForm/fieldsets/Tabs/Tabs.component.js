import PropTypes from 'prop-types';
import { Tabs } from '@talend/design-system';
import { useTranslation } from 'react-i18next';

import Widget from '../../Widget';
import { isValid } from '../../utils/validation';
import theme from './Tabs.module.scss';
import { I18N_DOMAIN_FORMS } from '../../../constants';

function TabsAdapter(props) {
	const { schema, ...restProps } = props;

	const { t } = useTranslation(I18N_DOMAIN_FORMS);

	const tabs = schema.items.map((item, index) => {
		const tabIsValid = isValid(item, restProps.errors);
		return {
			key: index,
			tabTitle: {
				title: item.title,
				id: `${restProps.id}-tabs-${index}`,
			},
			tabContent: tabIsValid ? (
				<Widget
					{...restProps}
					schema={{ widget: 'fieldset', ...item, options: { ...item.options, hideTitle: true } }}
				/>
			) : (
				<div
					className={theme['has-error']}
					aria-label={`${item.title} (${t('TF_TABS_HAS_ERRORS', { defaultValue: 'has errors' })})`}
				>
					<Widget
						{...restProps}
						schema={{ widget: 'fieldset', ...item, options: { ...item.options, hideTitle: true } }}
					/>
				</div>
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
