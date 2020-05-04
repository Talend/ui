import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TabBar from '@talend/react-components/lib/TabBar';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Widget from '../../Widget';
import { isValid } from '../../utils/validation';
import theme from './Tabs.scss';
import { I18N_DOMAIN_FORMS } from '../../../constants';

function Tabs(props) {
	const [selectedKey, setSelectedKey] = useState(0);
	const { t } = useTranslation(I18N_DOMAIN_FORMS);

	const { schema, ...restProps } = props;
	const tabs = schema.items.map((item, index) => {
		const tabIsValid = isValid(item, restProps.errors);
		return {
			key: index,
			label: item.title,
			className: classNames({ [theme['has-error']]: !tabIsValid }),
			'aria-label': tabIsValid
				? undefined
				: `${item.title} (${t('TF_TABS_HAS_ERRORS', { defaultValue: 'has errors' })})`,
			children: (
				<Widget
					{...restProps}
					schema={{ widget: 'fieldset', ...item, options: { ...item.options, hideTitle: true } }}
				/>
			),
		};
	});

	return (
		<TabBar
			className={classNames(theme['tf-tabs'], 'tf-tabs')}
			id={`${restProps.id}-tabs`}
			items={tabs}
			onSelect={(_, item) => setSelectedKey(item.key)}
			selectedKey={selectedKey}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Tabs.propTypes = {
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

export default Tabs;
