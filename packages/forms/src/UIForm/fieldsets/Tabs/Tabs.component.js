import PropTypes from 'prop-types';
import React from 'react';
import TabBar from '@talend/react-components/lib/TabBar';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import Widget from '../../Widget';
import { isValid } from '../../utils/validation';
import theme from './Tabs.scss';
import { I18N_DOMAIN_FORMS } from '../../../constants';
import getDefaultT from '../../../translate';

class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedKey: 0 };
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(event, item) {
		this.setState({ selectedKey: item.key });
	}

	render() {
		const { schema, t, ...restProps } = this.props;
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
		const { selectedKey } = this.state;

		return (
			<TabBar
				className={classNames(theme['tf-tabs'], 'tf-tabs')}
				id={`${restProps.id}-tabs`}
				items={tabs}
				onSelect={this.onSelect}
				selectedKey={selectedKey}
			/>
		);
	}
}
Tabs.defaultProps = {
	t: getDefaultT(),
};

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
		t: PropTypes.func,
	};
}

export default withTranslation(I18N_DOMAIN_FORMS)(Tabs);
