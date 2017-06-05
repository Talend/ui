import React, { PropTypes } from 'react';
import { Tabs as RBTabs, Tab as RBTab } from 'react-bootstrap';

import Fieldset from './Fieldset';
import { isValid } from '../utils/validation';
import theme from './Tabs.scss';

export default function Tabs(props) {
	const { schema, ...restProps } = props;
	const tabs = schema.items;

	return (
		<RBTabs className={theme['tf-tabs']}>
			{tabs.map((tabSchema, index) => {
				const tabClassName = isValid(tabSchema, restProps.errors) ?
					null :
					theme['has-error'];
				return (
					<RBTab
						eventKey={index}
						key={index}
						title={tabSchema.title}
						tabClassName={tabClassName}
					>
						<Fieldset {...restProps} schema={tabSchema} />
					</RBTab>
				);
			})}
		</RBTabs>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Tabs.propTypes = {
		errors: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		schema: PropTypes.shape({
			items: PropTypes.arrayOf(
				React.PropTypes.shape({
					title: PropTypes.string.isRequired,
					items: PropTypes.array.isRequired,
				})
			).isRequired,
		}).isRequired,
	};
}
