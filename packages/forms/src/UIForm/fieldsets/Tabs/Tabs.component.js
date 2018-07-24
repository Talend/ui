import PropTypes from 'prop-types';
import React from 'react';
import { Tabs as RBTabs, Tab as RBTab } from 'react-bootstrap';
import classNames from 'classnames';

import Fieldset from '../Fieldset';
import { isValid } from '../../utils/validation';
import theme from './Tabs.scss';

/* TODO
- role: tablist
- role: tab
- role: tabpanel
- aria-selected: true|false
- aria-orientation: horizontal
- aria-control=id du tabPanel

Behavior:
- on focus on tablist, the focus should be on active element
- left/right to focus on previous/next in a circular manner
- home/end to go to the first/last tab
- ENTER/SPACE to activate

ARIA Authoring practices 1.1
 */

export default function Tabs(props) {
	const { schema, ...restProps } = props;
	const tabs = schema.items;

	return (
		<RBTabs className={classNames(theme['tf-tabs'], 'tf-tabs')} id={`${restProps.id}-tabs`}>
			{tabs.map((tabSchema, index) => {
				const tabIsValid = isValid(tabSchema, restProps.errors);
				return (
					<RBTab
						eventKey={index}
						key={index}
						title={tabSchema.title}
						tabClassName={classNames({ [theme['has-error']]: !tabIsValid })}
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
				PropTypes.shape({
					title: PropTypes.string.isRequired,
					items: PropTypes.array.isRequired,
				}),
			).isRequired,
		}).isRequired,
	};
}
