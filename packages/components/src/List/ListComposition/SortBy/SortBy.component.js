import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavDropdown, Nav, MenuItem } from 'react-bootstrap';
import uuid from 'uuid';

import { useListContext } from '../context';

function SortBy(props) {
	const { id, options, onChange } = props;
	const { t } = useListContext();

	const selectedOption = props.selected || options[0].key;

	const onSelect = (value, event) => {
		if (onChange) {
			onChange(event, value);
		}
	};

	const selectedLabel = options.find(option => option.key === selectedOption).label;

	return (
		<React.Fragment>
			<Navbar.Text>
				<label htmlFor={id}>{t('LIST_TOOLBAR_SORT_BY', { defaultValue: 'Sort by:' })}</label>
			</Navbar.Text>

			<Nav>
				<NavDropdown
					id={id}
					title={selectedLabel}
					onSelect={onSelect}
					aria-label={t('LIST_CHANGE_DISPLAY_MODE', {
						defaultValue: 'Change sorting option. Current sorting: {{sortBy}}.',
						sortBy: selectedLabel,
					})}
				>
					{options.map(({ key, label }) => (
						<MenuItem
							id={`${id}-${key}`}
							key={key}
							eventKey={key}
							aria-label={label}
						>
							{label}
						</MenuItem>
					))}
				</NavDropdown>
			</Nav>
		</React.Fragment>
	);
}

SortBy.defaultProps = {
	id: uuid.v4(),
};

SortBy.propTypes = {
	id: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			label: PropTypes.string,
		})).required,
	selected: PropTypes.string,
	onChange: PropTypes.func,
};

export default SortBy;
